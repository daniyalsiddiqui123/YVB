"use server";

import { query } from "@/lib/db";
import bcrypt from "bcryptjs";
import { signIn, signOut } from "next-auth/react";
import { ROUTES } from "@/lib/constants";

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

export async function register(data: RegisterInput) {
  try {
    console.log("Attempting to register user:", data.email);
    console.log("DATABASE_URL set:", !!process.env.DATABASE_URL);
    
    // Check if user already exists
    const existingUser = await query(
      "SELECT id FROM users WHERE email = $1",
      [data.email]
    );

    if (existingUser.rows.length > 0) {
      return { error: "Email already registered" };
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(data.password, 12);

    // Create user
    const result = await query(
      "INSERT INTO users (email, password, name) VALUES ($1, $2, $3) RETURNING id, email, name",
      [data.email, hashedPassword, data.name]
    );

    const user = result.rows[0];
    console.log("User created successfully:", user.id);

    // Auto sign in after registration
    await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    return { success: true, user: { id: user.id, email: user.email, name: user.name } };
  } catch (error) {
    console.error("Registration error:", error);
    console.error("Error details:", JSON.stringify(error, null, 2));
    
    // Return more specific error message
    if (error instanceof Error) {
      if (error.message.includes("DATABASE_URL")) {
        return { error: "Database not configured. Please set DATABASE_URL in .env.local" };
      }
      if (error.message.includes("relation \"users\" does not exist")) {
        return { error: "Database tables not created yet. Run: npm run db:init" };
      }
      if (error.message.includes("password authentication failed")) {
        return { error: "Database password incorrect. Check your DATABASE_URL" };
      }
      if (error.message.includes("duplicate key")) {
        return { error: "Email already registered" };
      }
    }
    
    return { error: `Registration failed: ${error instanceof Error ? error.message : "Unknown error"}` };
  }
}

export async function login(email: string, password: string) {
  try {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      return { error: result.error };
    }

    return { success: true };
  } catch (error) {
    console.error("Login error:", error);
    return { error: "Failed to login" };
  }
}

export async function logout() {
  await signOut({ redirect: false });
  return { success: true };
}

export async function checkAuth() {
  try {
    const { default: nextAuth } = await import("next-auth/react");
    const session = await nextAuth.getSession();
    return { authenticated: !!session, session };
  } catch (error) {
    return { authenticated: false, session: null };
  }
}
