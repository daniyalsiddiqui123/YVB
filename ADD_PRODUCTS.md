# 🎯 How to Add Products to Your Website

## Step 1: Open Sanity Studio

Go to: **http://localhost:3333**

(Make sure Sanity Studio is running: `cd sanity-studio && npm run dev`)

---

## Step 2: Sign In

1. Click **"Sign in"** or **"Create account"**
2. Use your Sanity account credentials
3. You'll see the Sanity Studio dashboard

---

## Step 3: Create Your First Product

### Click "Products" → "Create new"

### Fill in the details:

#### **Name** (required)
```
Example: Midnight Blue
```

#### **Slug** (auto-generated)
```
midnight-blue
```
(This will be the URL: yoursite.com/product/midnight-blue)

#### **Gender** (required)
- Select: **men** or **women**

#### **Price** (required)
```
Example: 89.99
```

#### **Description** (required, 10-500 characters)
```
Example: A sophisticated fragrance for the modern man. 
Notes of bergamot, lavender, and sandalwood create an 
unforgettable scent that lasts all day.
```

#### **Image** (required)
1. Click **"Add image"** or drag & drop
2. Upload a product photo (recommended: 800x800px square)
3. Click **"Done"**

#### **Best Seller** (optional)
- Check this box if it's a popular product
- It will appear on the homepage

#### **Category** (optional)
Select from:
- Eau de Parfum
- Eau de Toilette
- Parfum
- Cologne

#### **In Stock** (default: checked)
- Keep checked for available products
- Uncheck if out of stock

---

## Step 4: Publish

1. Click the green **"Publish"** button (top right)
2. Wait for confirmation
3. Your product is now live!

---

## Step 5: View on Website

1. Go to: **http://localhost:3000/men** (or /women)
2. You'll see your product!
3. Click on the product card
4. It will open the full product detail page

---

## ✅ Product Page Features

Once you click a product, you'll see:

- ✅ **Large product image**
- ✅ **Product name & price**
- ✅ **Description**
- ✅ **Quantity selector**
- ✅ **Add to Cart button** → Shows green popup!
- ✅ **Buy Now button** → Shows blue popup & redirects to cart!
- ✅ **Wishlist button** (heart icon)
- ✅ **Best Seller badge** (if checked)
- ✅ **Category tag**
- ✅ **Free Shipping & Authentic badges**

---

## 🎨 Example Product Data

Here's an example of a complete product:

```
Name: Midnight Blue
Slug: midnight-blue (auto)
Gender: men
Price: 89.99
Description: A sophisticated fragrance featuring notes 
of bergamot, sea salt, and warm amber. Perfect for 
evening wear and special occasions.
Image: [Upload perfume bottle photo]
Best Seller: ✓ (checked)
Category: Eau de Parfum
In Stock: ✓ (checked)
```

---

## 🔧 Troubleshooting

### "Product Not Found"
- Make sure you **Published** the product (not just saved as draft)
- Check if the product has a valid **slug**
- Refresh the page (Ctrl+R)

### No products showing on Men's/Women's page
- Check if you created products for that gender
- Make sure products are **Published**
- Check browser console for errors (F12)

### Image not showing
- Make sure you uploaded an image
- Click "Done" after uploading
- Publish the product after adding image

---

## 📱 Test the Full Flow

1. **Add product in Sanity** (http://localhost:3333)
2. **Publish it**
3. **Visit website** (http://localhost:3000/men or /women)
4. **Click the product** → Opens detail page
5. **Click "Add to Cart"** → Green popup appears!
6. **Click "Buy Now"** → Blue popup → Redirects to cart!

---

## 🎉 That's It!

Your e-commerce website is fully functional with:
- ✅ Sanity CMS for product management
- ✅ Product listing pages (Men/Women)
- ✅ Product detail pages
- ✅ Shopping cart functionality
- ✅ Add to Cart & Buy Now buttons
- ✅ Popup notifications
- ✅ Real-time cart count in navbar

**Start adding products now!** 🚀
