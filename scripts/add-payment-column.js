import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set");
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
});

async function addPaymentMethodColumn() {
  try {
    console.log("Adding payment_method column to orders table...");
    
    await pool.query(`
      ALTER TABLE orders 
      ADD COLUMN IF NOT EXISTS payment_method VARCHAR(50) DEFAULT 'cash_on_delivery'
    `);
    
    console.log("✅ payment_method column added successfully!");
    console.log("Default value: 'cash_on_delivery'");
    
    await pool.end();
  } catch (error) {
    console.error("❌ Error adding column:", error.message);
    await pool.end();
    process.exit(1);
  }
}

addPaymentMethodColumn();
