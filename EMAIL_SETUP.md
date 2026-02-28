# 📧 Email Setup Guide for Order Notifications

## ✅ What's Configured:

1. ✅ **Cash on Delivery** - Only payment method available
2. ✅ **Admin Email** - Orders sent to `piratesdaniyal@gmail.com`
3. ✅ **Customer Email** - Order confirmation sent to customer
4. ✅ **Beautiful Email Templates** - Professional HTML emails

---

## 🔧 Step 1: Get Gmail App Password

To send emails, you need a Gmail App Password:

### **Enable 2-Factor Authentication:**
1. Go to: https://myaccount.google.com/security
2. Enable **2-Step Verification** (if not already enabled)

### **Generate App Password:**
1. Go to: https://myaccount.google.com/apppasswords
2. Select app: **Mail**
3. Select device: **Other (Custom name)**
4. Enter: `YVB Fragrances`
5. Click **Generate**
6. **Copy the 16-character password** (e.g., `abcd efgh ijkl mnop`)

---

## 🔧 Step 2: Update .env.local

Open `.env.local` and replace the app password:

```env
# BEFORE:
EMAIL_PASS=your-gmail-app-password-here

# AFTER (example):
EMAIL_PASS=abcd efgh ijkl mnop
```

**Remove spaces** from the password:
```env
EMAIL_PASS=abcdefghijklmnop
```

---

## 🔧 Step 3: Update Database

Run this to add the payment_method column:

```bash
node scripts/init-db.js
```

Or the column will be added automatically on first order.

---

## 📧 Email Templates

### **Admin Email (piratesdaniyal@gmail.com):**

**Subject:** 📦 New Order #12345 - Cash on Delivery

**Contains:**
- Order ID and date
- Customer name and email
- Shipping address
- Order items with quantities and prices
- Total amount
- Payment method reminder (COD)

### **Customer Email:**

**Subject:** ✅ Order Confirmation #12345 - YVB Fragrances

**Contains:**
- Order confirmation banner
- Order number and date
- Shipping address
- Order summary with items
- Total amount
- **Cash on Delivery reminder**
- Estimated delivery time (3-5 days)
- Contact information

---

## 🧪 Test the Checkout:

1. **Add products to cart**
2. **Go to checkout:** http://localhost:3000/checkout
3. **Fill in shipping info**
4. **Click "Place Order - COD"**
5. **Check emails:**
   - Admin: `piratesdaniyal@gmail.com`
   - Customer: The email you entered

---

## 📦 Order Flow:

```
Customer Places Order (COD)
         ↓
Order saved to database
         ↓
Email to Admin (piratesdaniyal@gmail.com)
         ↓
Email to Customer (confirmation)
         ↓
Admin prepares order
         ↓
Ship order
         ↓
Collect cash on delivery
```

---

## 🎨 Email Features:

### **Admin Email:**
- ✅ Professional HTML design
- ✅ YVB branding (Navy & Cherry colors)
- ✅ Complete order details
- ✅ Customer information
- ✅ COD payment reminder

### **Customer Email:**
- ✅ Beautiful gradient header
- ✅ Order confirmation with checkmark
- ✅ Shipping address
- ✅ Order summary table
- ✅ **Green COD reminder box**
- ✅ Delivery estimate
- ✅ Contact information
- ✅ YVB branding

---

## 🔍 Troubleshooting:

### **Emails not sending?**

1. **Check app password** - Make sure it's correct (no spaces)
2. **Check 2FA** - Must be enabled on Gmail account
3. **Check console** - Look for email errors in terminal
4. **Check spam** - Emails might go to spam folder

### **Database error?**

Run the init script:
```bash
node scripts/init-db.js
```

---

## 📝 Notes:

- **Emails are sent from:** `piratesdaniyal@gmail.com`
- **Admin emails go to:** `piratesdaniyal@gmail.com`
- **Customer emails go to:** Email entered at checkout
- **Payment method:** Cash on Delivery only
- **Order status:** Starts as "pending"

---

## 🎉 Ready to Test!

1. **Set up Gmail App Password**
2. **Add to .env.local**
3. **Restart dev server**
4. **Place a test order**
5. **Check both emails!**

**Your checkout with COD and email notifications is ready!** 🚀
