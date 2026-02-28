import { Pool } from "pg";
import nodemailer from "nodemailer";
import { syncOrderToSanity } from "@/actions/sync-order";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set");
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
});

export async function query(text: string, params?: any[]) {
  const client = await pool.connect();
  try {
    return await client.query(text, params);
  } finally {
    client.release();
  }
}

// Email transporter configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Your Gmail
    pass: process.env.EMAIL_PASS, // Your Gmail App Password
  },
});

export async function createOrder(
  userId: string,
  items: any[],
  total: number,
  shippingInfo: any,
  paymentMethod: string = "cash_on_delivery"
) {
  try {
    const result = await query(
      `INSERT INTO orders (user_id, total, status, shipping_info, items, payment_method)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id, created_at`,
      [
        userId,
        total,
        "pending",
        JSON.stringify(shippingInfo),
        JSON.stringify(items),
        paymentMethod,
      ]
    );

    const order = result.rows[0];

    // Sync order to Sanity
    try {
      const sanityId = await syncOrderToSanity({
        orderId: order.id,
        customerName: shippingInfo.firstName + " " + shippingInfo.lastName,
        customerEmail: shippingInfo.email,
        customerPhone: shippingInfo.phone,
        total: total,
        paymentMethod: paymentMethod,
        shippingAddress: shippingInfo.address + ", " + shippingInfo.city + ", " + shippingInfo.state + " " + shippingInfo.zipCode,
        items: items,
        orderDate: order.created_at,
      });
      if (sanityId) {
        console.log(`Order synced to Sanity: ${sanityId}`);
      }
    } catch (sanityError) {
      console.error("Failed to sync order to Sanity:", sanityError);
      // Don't fail the order if Sanity sync fails
    }

    // Send emails (optional - won't fail if email not configured)
    try {
      if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        await sendOrderEmails(order.id, items, total, shippingInfo, userId);
        console.log(`Order emails sent for order #${order.id}`);
      } else {
        console.log('Email not configured - order created but no emails sent');
      }
    } catch (emailError: any) {
      console.error('Email sending failed (order still created):', emailError.message);
    }

    return { success: true, orderId: order.id };
  } catch (error: any) {
    console.error("Error creating order:", error);
    return { success: false, error: error.message || "Failed to create order" };
  }
}

async function sendOrderEmails(
  orderId: string,
  items: any[],
  total: number,
  shippingInfo: any,
  userId: string
) {
  try {
    // Configure nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Get user email
    const userResult = await query(
      "SELECT email, name FROM users WHERE id = $1",
      [userId]
    );
    const user = userResult.rows[0];

    if (!user) {
      console.log('User not found, skipping emails');
      return;
    }

    // Email to Admin
    const adminEmail = {
      from: `"YVB Fragrances" <${process.env.EMAIL_USER}>`,
      to: "piratesdaniyal@gmail.com",
      subject: `📦 New Order #${orderId} - Cash on Delivery`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #002366;">🎉 New Order Received!</h2>
          <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <p><strong>Order ID:</strong> #${orderId}</p>
            <p><strong>Payment Method:</strong> Cash on Delivery</p>
            <p><strong>Total Amount:</strong> Rs. ${total.toLocaleString('en-PK')}</p>
            <p><strong>Order Date:</strong> ${new Date().toLocaleDateString('en-PK')}</p>
          </div>
          
          <h3 style="color: #002366;">Customer Information</h3>
          <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <p><strong>Name:</strong> ${user.name}</p>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Shipping Address:</strong></p>
            <p>${shippingInfo.address}</p>
            <p>${shippingInfo.city}, ${shippingInfo.state} ${shippingInfo.zipCode}</p>
            <p><strong>Phone:</strong> ${shippingInfo.phone}</p>
          </div>
          
          <h3 style="color: #002366;">Order Items</h3>
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <thead>
              <tr style="background: #002366; color: white;">
                <th style="padding: 12px; text-align: left;">Product</th>
                <th style="padding: 12px;">Quantity</th>
                <th style="padding: 12px; text-align: right;">Price</th>
              </tr>
            </thead>
            <tbody>
              ${items.map((item: any) => `
                <tr style="border-bottom: 1px solid #ddd;">
                  <td style="padding: 12px;">${item.name}</td>
                  <td style="padding: 12px; text-align: center;">${item.quantity}</td>
                  <td style="padding: 12px; text-align: right;">Rs. ${(item.price * item.quantity).toLocaleString('en-PK')}</td>
                </tr>
              `).join('')}
            </tbody>
            <tfoot>
              <tr style="background: #f8f9fa; font-weight: bold;">
                <td colspan="2" style="padding: 12px; text-align: right;">Total:</td>
                <td style="padding: 12px; text-align: right; color: #990F02; font-size: 18px;">Rs. ${total.toLocaleString('en-PK')}</td>
              </tr>
            </tfoot>
          </table>
          
          <div style="background: #fff3cd; padding: 15px; border-radius: 10px; margin: 20px 0; border-left: 4px solid #ffc107;">
            <p style="margin: 0; color: #856404;">
              <strong>⚠️ Payment Method:</strong> Cash on Delivery<br>
              Please collect <strong>Rs. ${total.toLocaleString('en-PK')}</strong> when delivering the order.
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 2px solid #002366;">
            <p style="color: #666;">Thank you for using YVB Fragrances!</p>
            <p style="color: #999; font-size: 12px;">Luxury in Every Drop</p>
          </div>
        </div>
      `,
    };

    // Email to Customer
    const customerEmail = {
      from: `"YVB Fragrances" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: `✅ Order Confirmation #${orderId} - YVB Fragrances`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #002366, #990F02); padding: 30px; border-radius: 15px 15px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px;">🎉 Order Confirmed!</h1>
            <p style="color: white; margin: 10px 0 0 0; font-size: 16px;">Thank you for your order</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 20px; margin: 20px 0; border-radius: 10px;">
            <p><strong>Order Number:</strong> #${orderId}</p>
            <p><strong>Order Date:</strong> ${new Date().toLocaleDateString('en-PK')}</p>
            <p><strong>Payment Method:</strong> <span style="color: #990F02; font-weight: bold;">Cash on Delivery</span></p>
          </div>
          
          <h3 style="color: #002366;">Shipping Address</h3>
          <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <p><strong>${user.name}</strong></p>
            <p>${shippingInfo.address}</p>
            <p>${shippingInfo.city}, ${shippingInfo.state} ${shippingInfo.zipCode}</p>
            <p><strong>Phone:</strong> ${shippingInfo.phone}</p>
          </div>
          
          <h3 style="color: #002366;">Order Summary</h3>
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <thead>
              <tr style="background: #002366; color: white;">
                <th style="padding: 12px; text-align: left;">Product</th>
                <th style="padding: 12px;">Qty</th>
                <th style="padding: 12px; text-align: right;">Price</th>
              </tr>
            </thead>
            <tbody>
              ${items.map((item: any) => `
                <tr style="border-bottom: 1px solid #ddd;">
                  <td style="padding: 12px;">${item.name}</td>
                  <td style="padding: 12px; text-align: center;">${item.quantity}</td>
                  <td style="padding: 12px; text-align: right;">Rs. ${(item.price * item.quantity).toLocaleString('en-PK')}</td>
                </tr>
              `).join('')}
            </tbody>
            <tfoot>
              <tr style="background: #f8f9fa; font-weight: bold;">
                <td colspan="2" style="padding: 12px; text-align: right;">Total:</td>
                <td style="padding: 12px; text-align: right; color: #990F02; font-size: 18px;">Rs. ${total.toLocaleString('en-PK')}</td>
              </tr>
            </tfoot>
          </table>
          
          <div style="background: #d4edda; padding: 20px; border-radius: 10px; margin: 20px 0; border-left: 4px solid #28a745;">
            <h4 style="margin: 0 0 10px 0; color: #155724;">✅ Payment on Delivery</h4>
            <p style="margin: 0; color: #155724;">
              Please keep <strong style="color: #155724;">Rs. ${total.toLocaleString('en-PK')}</strong> ready in cash when your order arrives.
            </p>
          </div>
          
          <div style="background: #fff3cd; padding: 15px; border-radius: 10px; margin: 20px 0;">
            <p style="margin: 0; color: #856404;">
              <strong>📦 Estimated Delivery:</strong> 3-5 business days<br>
              We'll send you a tracking number once your order ships!
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 2px solid #002366;">
            <h3 style="color: #002366; margin: 0 0 10px 0;">YVB FRAGRANCES</h3>
            <p style="color: #666; margin: 0;">Luxury in Every Drop</p>
            <p style="color: #999; font-size: 12px; margin-top: 10px;">
              Questions? Reply to this email or contact us at piratesdaniyal@gmail.com
            </p>
          </div>
        </div>
      `,
    };

    // Send both emails
    console.log('Sending admin email to:', adminEmail.to);
    console.log('Sending customer email to:', customerEmail.to);
    
    await transporter.sendMail(adminEmail);
    console.log('Admin email sent successfully');
    
    await transporter.sendMail(customerEmail);
    console.log('Customer email sent successfully');

  } catch (error: any) {
    console.error("Error in sendOrderEmails:", error);
    console.error("Error details:", {
      message: error.message,
      stack: error.stack,
      EMAIL_USER: process.env.EMAIL_USER ? 'configured' : 'not configured',
      EMAIL_PASS: process.env.EMAIL_PASS ? 'configured' : 'not configured',
    });
    throw error;
  }
}

export async function getUserOrders(userId: string) {
  try {
    const result = await query(
      `SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC`,
      [userId]
    );
    return result.rows;
  } catch (error) {
    console.error("Error fetching orders:", error);
    return [];
  }
}

export default pool;
