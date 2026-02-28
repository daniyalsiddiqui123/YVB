# 🔧 Product Page Troubleshooting Guide

## ✅ What We've Verified:

1. ✅ **Products exist in Sanity** - 6 products confirmed
2. ✅ **Sanity connection works** - Can fetch products
3. ✅ **Queries work** - All product slugs found
4. ✅ **Schema is correct** - Product schema properly defined

---

## 🎯 Step-by-Step Test:

### **Step 1: Open Men's Page**
```
http://localhost:3000/men
```

### **Step 2: Check if Products Show**
- Do you see product cards?
  - **If NO**: Products aren't loading on the listing page
  - **If YES**: Click on any product

### **Step 3: Check Browser Console (F12)**
When you click a product, you should see:
```
=== PRODUCT PAGE DEBUG ===
Slug from params: midnight-blue
All params: { slug: 'midnight-blue' }
Fetching product with slug: midnight-blue
=== SANITY QUERY DEBUG ===
Looking for slug: midnight-blue
Query: *[_type == "product" && slug.current == $slug][0]
Params: { slug: 'midnight-blue' }
Result: Found: Midnight Blue
```

### **Step 4: Tell Us What You See**

#### **Scenario A: No Debug Logs**
- The product page isn't loading at all
- **Fix**: Check if the link URL is correct
- Right-click product → Inspect → Check `<a href="">` value

#### **Scenario B: Shows "No slug provided!"**
- The slug isn't being passed correctly
- **Fix**: Product card link is wrong
- Should be: `/product/midnight-blue`
- Check ProductCard.tsx line 24

#### **Scenario C: Shows "Fetched product: null"**
- Query isn't finding the product
- **Fix**: Slug format mismatch
- Check if slug in Sanity matches exactly

#### **Scenario D: Shows product data but still says "Not Found"**
- Component state issue
- **Fix**: Check the `if (!product)` condition

---

## 🔍 Common Issues & Fixes:

### **Issue 1: Products Don't Show on /men or /women**

**Check:**
1. Is Sanity Studio running? (`cd sanity-studio && npm run dev`)
2. Are products published (not draft)?
3. Is gender set correctly?

**Fix:**
```bash
# Re-run seed script
node scripts/seed-products.js
```

---

### **Issue 2: Click Product → 404 or "Product Not Found"**

**Check Console for:**
```
Slug from params: ???
```

**Possible Causes:**
1. **Wrong slug format** - Should be `midnight-blue` not `Midnight Blue`
2. **Route not working** - Check `src/app/product/[slug]/page.tsx` exists
3. **Cache issue** - Restart dev server

**Fix:**
```bash
# Clear cache and restart
rm -rf .next
npm run dev
```

---

### **Issue 3: Product Detail Page Shows Wrong Data**

**Check:**
1. Console logs for slug
2. Sanity Studio for correct slug
3. ProductCard.tsx for correct link generation

**Fix:**
Make sure ProductCard uses:
```typescript
const productSlug = product.slug?.current || product._id;
<Link href={`/product/${productSlug}`}>
```

---

## 📝 What To Report:

When asking for help, include:

1. **URL you're on**: (e.g., `/men`, `/product/midnight-blue`)
2. **Console logs**: Copy all logs from F12 console
3. **What you clicked**: Which product, what happened
4. **Error message**: Exact text shown

---

## 🎉 Success Indicators:

You'll know it's working when:
1. Click product → URL changes to `/product/midnight-blue`
2. Page shows product name, price, description
3. Console shows "Found: Midnight Blue"
4. Add to Cart button works
5. Buy Now button works

---

## 🚀 Quick Test Commands:

```bash
# Test Sanity connection
node scripts/test-sanity.js

# Test product queries
node scripts/test-product-page.js

# Re-seed products
node scripts/seed-products.js

# Restart server
npm run dev
```

---

## 💡 Last Resort:

If nothing works:
1. Delete all products in Sanity Studio
2. Run `node scripts/seed-products.js`
3. Restart dev server
4. Clear browser cache (Ctrl+Shift+R)
5. Try again

---

**Current Status:**
- ✅ 6 products in Sanity
- ✅ All queries working
- ✅ Backend confirmed working
- ⏳ Frontend needs testing

**Next Step:** Open http://localhost:3000/men and check browser console!
