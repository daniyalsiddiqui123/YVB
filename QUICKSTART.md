# YVB Fragrances - Quick Start Guide

## 🚀 Start Both Servers

### Terminal 1 - Main Website (Port 3000)
```bash
npm run dev
```
Open: **http://localhost:3000**

### Terminal 2 - Sanity Studio (Port 3333)
```bash
cd sanity-studio
npm run dev
```
Open: **http://localhost:3333**

## 📋 Before You Start

### 1. Set Environment Variables (.env.local)
```env
# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your-sanity-token

# Neon PostgreSQL
DATABASE_URL=postgresql://user:password@host.neon.tech/dbname?sslmode=require

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here
```

### 2. Get Sanity Credentials
1. Go to https://sanity.io/manage
2. Create/sign in to your account
3. Create a new project named "YVB Fragrances"
4. Copy Project ID from dashboard
5. Generate API token: Settings → API → Tokens → Add API token (Editor role)

### 3. Set Up Database
1. Go to https://neon.tech
2. Create account/sign in
3. Create new project
4. Copy connection string
5. Add to `.env.local` as `DATABASE_URL`

## 🎯 What You Can Do Now

### Website (localhost:3000)
- ✅ View landing page
- ✅ Browse Men's collection (navy theme)
- ✅ Browse Women's collection (cherry theme)
- ✅ Login/Signup
- ✅ Add items to cart (requires login)
- ✅ Checkout (requires login)
- ✅ View order history in profile

### Sanity Studio (localhost:3333)
- ✅ Sign in with Sanity account
- ✅ Create products
- ✅ Upload images
- ✅ Set prices
- ✅ Mark as bestseller
- ✅ Assign to Men/Women category

## ➕ Adding Your First Product

1. Open **http://localhost:3333**
2. Click **"Products"** → **"Create new"**
3. Fill in:
   - **Name**: e.g., "Midnight Blue"
   - **Slug**: Auto-generated (e.g., "midnight-blue")
   - **Gender**: Select "men" or "women"
   - **Price**: e.g., 89.99
   - **Description**: Product description
   - **Image**: Upload product photo
   - **Best Seller**: Check if applicable
   - **Category**: Select fragrance type
   - **In Stock**: Keep checked
4. Click **"Publish"**

The product will appear on your website instantly!

## 🎨 Customization

### Change Hero Banner
Replace `public/hero-banner.jpg` with your image

### Modify Colors
Edit `tailwind.config.js`:
- `cherry.DEFAULT`: "#990F02" (Women theme)
- `navy.DEFAULT`: "#002366" (Men theme)

### Update Site Title
Edit `src/app/layout.tsx` metadata

## 📁 Project Structure
```
D:\perfume_website\
├── src/                    # Main Next.js app
│   ├── app/               # Pages (home, men, women, cart, etc.)
│   ├── components/        # Reusable components
│   ├── lib/              # Utilities (Sanity, DB, cart store)
│   └── sanity/           # Sanity schemas
├── sanity-studio/        # Standalone Sanity Studio
│   ├── app/studio/       # Studio pages
│   └── sanity.config.ts  # Studio configuration
└── .env.local            # Environment variables
```

## 🔧 Troubleshooting

### Sanity Studio won't start
- Check if Project ID and Dataset are correct in `.env.local`
- Run `npm install` in `sanity-studio` folder
- Clear browser cache

### Database connection error
- Verify Neon connection string format
- Check if database exists in Neon dashboard
- Tables auto-create on first user registration

### Products not showing
- Ensure products are **Published** in Sanity (not Draft)
- Check Sanity credentials in `.env.local`
- Clear Next.js cache: delete `.next` folder and restart

## 📞 Support

- Sanity Docs: https://www.sanity.io/docs
- Next.js Docs: https://nextjs.org/docs
- Neon Docs: https://neon.tech/docs
