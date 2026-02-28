# YVB Fragrances - Luxury Perfume E-commerce

A full-stack production-ready perfume e-commerce website built with Next.js 16, Sanity CMS, and Neon PostgreSQL.

## 🎨 Design System

**Theme Colors:**
- White base
- Cherry Red: `#990F02` (Women theme)
- Navy Blue: `#002366` (Men theme)

**Style:**
- Premium, luxury aesthetic
- Glassmorphism (backdrop-blur, bg-white/10, border-white/20, shadow-xl)
- Rounded 2xl components
- Smooth transitions
- Fully responsive

## 🚀 Tech Stack

- **Frontend:** Next.js 16 (App Router), TypeScript, Tailwind CSS v4
- **UI Components:** shadcn/ui, Radix UI, Framer Motion
- **CMS:** Sanity (latest) for product management
- **Database:** Neon Serverless PostgreSQL
- **Authentication:** NextAuth/Auth.js (latest) with credentials provider
- **State Management:** Zustand

## 📁 Project Structure

```
src/
├── actions/          # Server Actions
│   ├── auth.ts       # Authentication actions
│   ├── orders.ts     # Order management actions
│   └── products.ts   # Product fetching actions
├── app/              # Next.js App Router
│   ├── api/          # API routes
│   ├── cart/         # Cart page (protected)
│   ├── checkout/     # Checkout page (protected)
│   ├── login/        # Login page
│   ├── men/          # Men's collection page
│   ├── profile/      # User profile/orders (protected)
│   ├── signup/       # Registration page
│   ├── women/        # Women's collection page
│   └── studio/       # Sanity Studio (optional)
├── components/       # React components
│   ├── Header.tsx    # Glassmorphic header
│   ├── ProductCard.tsx
│   └── AuthProvider.tsx
├── lib/              # Utilities and configurations
│   ├── cart-store.ts # Zustand cart store
│   ├── constants.ts  # App constants
│   ├── db.ts         # Database connection
│   ├── sanity.ts     # Sanity client
│   └── utils.ts      # Helper functions
├── sanity/           # Sanity CMS configuration
│   └── schema/       # Content schemas
│       ├── product.ts
│       └── index.ts
├── auth.ts           # Auth configuration
├── middleware.ts     # Route protection middleware
└── types/            # TypeScript types
    └── index.ts
```

## 🛠️ Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Create a `.env.local` file in the root directory:

```env
# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your-sanity-api-token

# Neon PostgreSQL Database
DATABASE_URL=postgresql://user:password@host.neon.tech/dbname?sslmode=require

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-key-generate-with-openssl
```

#### Generate NextAuth Secret

```bash
openssl rand -base64 32
```

### 3. Set Up Sanity CMS

1. Create a Sanity account at [sanity.io](https://sanity.io)
2. Create a new project
3. Get your Project ID and Dataset from the Sanity dashboard
4. Add the environment variables to `.env.local`

**To run Sanity Studio for managing products:**

Open a **new terminal** and run:

```bash
cd sanity-studio
npm run dev
```

Then access Sanity Studio at:
- **Embedded:** http://localhost:3000/studio (in your main app)
- **Direct:** http://localhost:3333 (standalone)

**Note:** The Sanity Studio runs on port 3333 and is embedded in the main app via iframe at `/studio` route. Make sure both servers are running!

### 4. Set Up Neon PostgreSQL

1. Create a Neon account at [neon.tech](https://neon.tech)
2. Create a new database project
3. Copy the connection string
4. Add it to `DATABASE_URL` in `.env.local`

The database tables will be created automatically on first run.

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the website.

## 📄 Pages & Routes

| Route | Description | Protected |
|-------|-------------|-----------|
| `/` | Landing page with hero banner and best sellers | No |
| `/men` | Men's fragrance collection | No |
| `/women` | Women's fragrance collection | No |
| `/login` | User login | No |
| `/signup` | User registration | No |
| `/cart` | Shopping cart | Yes |
| `/checkout` | Checkout page | Yes |
| `/profile` | User profile and orders | Yes |

## 🔐 Authentication

- Credentials-based authentication (email/password)
- Passwords are hashed using bcrypt
- JWT-based sessions
- Protected routes redirect to login if not authenticated

## 🛒 Cart & Checkout

- Cart state persisted in localStorage using Zustand
- Add/remove items
- Update quantities
- Checkout requires authentication
- Orders saved to PostgreSQL database

## 🎨 Glassmorphism Classes

The following CSS classes are available in `globals.css`:

- `.glass` - Base glassmorphism
- `.glass-header` - Sticky header with blur
- `.glass-card` - Card with glass effect
- `.glass-navy` - Navy-themed glass
- `.glass-cherry` - Cherry-themed glass
- `.btn-navy` - Navy button
- `.btn-cherry` - Cherry button
- `.btn-glass-navy` - Glass navy button
- `.btn-glass-cherry` - Glass cherry button
- `.input-glass` - Glass input field

## 📦 Database Schema

### Users Table
```sql
- id (SERIAL PRIMARY KEY)
- email (VARCHAR UNIQUE)
- password (VARCHAR, hashed)
- name (VARCHAR)
- created_at, updated_at (TIMESTAMP)
```

### Orders Table
```sql
- id (SERIAL PRIMARY KEY)
- user_id (INTEGER, FK)
- total (DECIMAL)
- status (VARCHAR)
- shipping_info (JSONB)
- items (JSONB)
- created_at, updated_at (TIMESTAMP)
```

## 🚀 Production Build

```bash
npm run build
npm start
```

## 📝 Adding Products via Sanity

1. Navigate to `/studio` (if Sanity Studio is set up)
2. Log in with your Sanity credentials
3. Go to "Products" section
4. Click "Create new"
5. Fill in:
   - Product Name
   - Gender (Men/Women)
   - Price
   - Description
   - Image
   - Mark as "Best Seller" if applicable
6. Publish the product

## 🎯 Features

- ✅ Glassmorphic design with blur effects
- ✅ Responsive layout
- ✅ Men/Women themed sections
- ✅ Authentication (login/signup)
- ✅ Protected routes (cart, checkout, profile)
- ✅ Shopping cart with Zustand
- ✅ Order management
- ✅ Sanity CMS integration
- ✅ PostgreSQL database
- ✅ SEO optimized metadata

## 📄 License

ISC
