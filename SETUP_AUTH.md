# 🔧 Fix "Failed to Register User" Error

## Problem
The registration fails because the database is not configured or tables don't exist yet.

## Solution

### Step 1: Set Up Database URL

1. **Get Neon PostgreSQL connection string:**
   - Go to https://neon.tech
   - Sign in/create account
   - Create a new project
   - Copy the connection string

2. **Add to `.env.local`:**
   ```env
   DATABASE_URL=postgresql://user:password@host.neon.tech/dbname?sslmode=require
   ```

### Step 2: Initialize Database Tables

Run this command in your terminal:

```bash
npm run db:init
```

This will create all required tables:
- ✅ users
- ✅ accounts
- ✅ sessions  
- ✅ verification_tokens
- ✅ orders

### Step 3: Test Registration

1. Restart your dev server: `npm run dev`
2. Go to http://localhost:3000/signup
3. Try registering again

---

## Alternative: Quick Test Without Database

If you want to test without setting up the database, you can temporarily disable authentication:

1. Comment out the middleware in `src/middleware.ts`
2. Remove cart/checkout protection

But for production, you'll need the database!

---

## Common Errors

### "DATABASE_URL not found"
→ Add the DATABASE_URL to `.env.local` (see Step 1)

### "password authentication failed"
→ Check your Neon credentials are correct

### "relation 'users' does not exist"
→ Run `npm run db:init` to create tables

### "Cannot find module 'dotenv'"
→ Run `npm install` to install dependencies

---

## Need Help?

1. Check console logs for specific error messages
2. Verify `.env.local` exists and has correct values
3. Test database connection in Neon dashboard
