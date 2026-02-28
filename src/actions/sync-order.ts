import { createClient } from "@sanity/client";

const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: "2024-01-01",
  useCdn: false,
});

export async function syncOrderToSanity(orderData: {
  orderId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  total: number;
  paymentMethod: string;
  shippingAddress: string;
  items: any[];
  orderDate: string;
}) {
  try {
    const doc = {
      _type: "order",
      orderId: orderData.orderId,
      customerName: orderData.customerName,
      customerEmail: orderData.customerEmail,
      customerPhone: orderData.customerPhone,
      status: "pending",
      total: orderData.total,
      paymentMethod: orderData.paymentMethod,
      shippingAddress: orderData.shippingAddress,
      items: orderData.items.map((item) => ({
        _type: "orderItem",
        productName: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
      orderDate: orderData.orderDate,
    };

    // Check if order already exists
    const existingOrder = await sanityClient.fetch(
      `*[_type == "order" && orderId == $orderId][0]`,
      { orderId: orderData.orderId }
    );

    if (existingOrder) {
      console.log(`Order ${orderData.orderId} already exists in Sanity`);
      return existingOrder._id;
    }

    // Create new order
    const result = await sanityClient.create(doc);
    console.log(`Order ${orderData.orderId} synced to Sanity: ${result._id}`);
    return result._id;
  } catch (error) {
    console.error("Error syncing order to Sanity:", error);
    return null;
  }
}

export async function updateOrderStatusInSanity(
  orderId: string,
  status: string,
  additionalData?: {
    trackingNumber?: string;
    shippedDate?: string;
    deliveredDate?: string;
  }
) {
  try {
    // First, find the document ID
    const orderDoc = await sanityClient.fetch(
      `*[_type == "order" && orderId == $orderId][0]`,
      { orderId }
    );

    if (!orderDoc) {
      console.log(`Order ${orderId} not found in Sanity`);
      return null;
    }

    const updates: any = {
      status,
    };

    if (additionalData?.trackingNumber) {
      updates.trackingNumber = additionalData.trackingNumber;
    }

    if (additionalData?.shippedDate) {
      updates.shippedDate = additionalData.shippedDate;
    }

    if (additionalData?.deliveredDate) {
      updates.deliveredDate = additionalData.deliveredDate;
    }

    // Use the document ID to update
    const result = await sanityClient
      .patch(orderDoc._id)
      .set(updates)
      .commit();

    console.log(`Order ${orderId} status updated to ${status}`);
    return result;
  } catch (error) {
    console.error("Error updating order status in Sanity:", error);
    return null;
  }
}
