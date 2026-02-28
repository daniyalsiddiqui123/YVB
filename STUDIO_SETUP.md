# 🎨 Access Sanity Studio at /studio

## ✅ Quick Access

**Sanity Studio is now available at:**
- **http://localhost:3000/studio** (embedded in your app)
- **http://localhost:3333** (standalone)

---

## 🚀 How to Run Both Servers

You need **TWO terminals** running simultaneously:

### Terminal 1 - Main Website (Port 3000)
```bash
cd D:\perfume_website
npm run dev
```
→ Opens at: http://localhost:3000

### Terminal 2 - Sanity Studio (Port 3333)
```bash
cd D:\perfume_website\sanity-studio
npm run dev
```
→ Opens at: http://localhost:3333 (embedded at /studio)

---

## 📋 Before First Use

### 1. Configure Sanity Credentials

Update `.env.local` with your actual Sanity project:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your-actual-project-id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your-generated-token
```

**Get credentials from:**
1. Go to https://sanity.io/manage
2. Sign in or create account
3. Create project "YVB Fragrances"
4. Copy Project ID from dashboard
5. Generate token: Settings → API → Tokens → Add API token (Editor role)

### 2. Restart Sanity Studio

After adding credentials, restart the Sanity Studio server:
```bash
# In Terminal 2, press Ctrl+C then:
cd sanity-studio
npm run dev
```

---

## 🎯 Using Sanity Studio

### Access Methods:

**Option 1: Embedded (Recommended)**
- Visit: http://localhost:3000/studio
- Integrated with your app's design
- Shows helpful info banner

**Option 2: Direct**
- Visit: http://localhost:3333
- Full Sanity Studio interface
- No iframe restrictions

### First Time Setup:

1. **Sign In**
   - Use your Sanity account credentials
   - Same as sanity.io/manage

2. **Navigate Studio**
   - Click "Products" in left sidebar
   - View all products or create new

3. **Add Your First Product**
   - Click "Create new" button
   - Fill in details:
     - **Name**: Product name (e.g., "Midnight Blue")
     - **Slug**: Auto-generated (e.g., "midnight-blue")
     - **Gender**: Select "men" or "women"
     - **Price**: e.g., 89.99
     - **Description**: Product description
     - **Image**: Upload product photo
     - **Best Seller**: Check if applicable
     - **Category**: Select fragrance type
     - **In Stock**: Keep checked
   - Click **"Publish"** (top right)

4. **View on Website**
   - Products appear instantly on website
   - Best sellers show on homepage
   - Gender-specific products on /men or /women

---

## 🔧 Troubleshooting

### Studio shows blank/white screen at /studio
- Check if Sanity Studio server is running (Terminal 2)
- Verify credentials in `.env.local`
- Try direct access: http://localhost:3333

### "Project not found" error
- Check `NEXT_PUBLIC_SANITY_PROJECT_ID` is correct
- Ensure project exists at sanity.io/manage
- Restart Sanity Studio server

### Can't sign in to Studio
- Clear browser cache
- Try incognito/private mode
- Check internet connection

### Products not showing on website
- Ensure products are **Published** (not Draft)
- Check Sanity credentials match in both `.env.local` files
- Clear Next.js cache: delete `.next` folder

### CORS errors in console
- This is normal for iframe embedding
- Use "Open Full Studio" button if issues persist

---

## 📁 Project Structure

```
D:\perfume_website\
├── src/app/studio/        # Embedded studio page
│   └── page.tsx          # Iframe wrapper
├── sanity-studio/         # Standalone Sanity Studio
│   ├── app/studio/       # Studio pages
│   ├── sanity.config.ts  # Configuration
│   └── package.json
└── .env.local            # Shared credentials
```

---

## 💡 Pro Tips

1. **Keep both terminals running** while developing
2. **Use Direct Studio** (port 3333) for complex editing
3. **Use Embedded Studio** (/studio) for quick updates
4. **Publish changes** to see them on website immediately
5. **Use Draft mode** in Sanity to preview before publishing

---

## 📞 Need Help?

- **Sanity Docs:** https://www.sanity.io/docs
- **Studio Configuration:** https://www.sanity.io/docs/studio
- **Schema Types:** https://www.sanity.io/docs/schema-types

---

## ✨ What's Configured

- ✅ Products schema with all fields
- ✅ Gender categorization (Men/Women)
- ✅ Bestseller flag
- ✅ Price tracking
- ✅ Image upload with hotspot
- ✅ Category selection
- ✅ Stock management

Your Sanity Studio is ready to use! 🎉
