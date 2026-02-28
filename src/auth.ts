// Re-export everything from the auth route
export { GET, POST } from "@/app/api/auth/[...nextauth]/route";

// Export auth utilities
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const auth = () => getServerSession(authOptions);
export { signIn, signOut } from "next-auth/react";
