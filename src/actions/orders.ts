"use server";

import { auth } from "@/auth";
import { createOrder as dbCreateOrder, getUserOrders as dbGetUserOrders } from "@/lib/db";

export interface CreateOrderResult {
  success: boolean;
  orderId?: string;
  error?: string;
}

export async function createOrder(
  items: any[],
  total: number,
  shippingInfo: any,
  paymentMethod: string = "cash_on_delivery"
): Promise<CreateOrderResult> {
  try {
    const session = await auth();

    if (!session?.user) {
      return { success: false, error: "You must be logged in to place an order" };
    }

    const userId = (session.user as any).id;

    // Call dbCreateOrder with correct parameters
    const result = await dbCreateOrder(userId, items, total, shippingInfo, paymentMethod);
    return result;
  } catch (error) {
    console.error("Error creating order:", error);
    return { success: false, error: "Failed to create order. Please try again." };
  }
}

export async function getUserOrders() {
  try {
    const session = await auth();

    if (!session?.user) {
      return [];
    }

    const userId = (session.user as any).id;
    const orders = await dbGetUserOrders(userId);
    return orders;
  } catch (error) {
    console.error("Error fetching orders:", error);
    return [];
  }
}
