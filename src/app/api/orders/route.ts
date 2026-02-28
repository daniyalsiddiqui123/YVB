import { NextResponse } from "next/server";
import { createClient } from "@sanity/client";

const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json({ error: "Email required" }, { status: 400 });
    }

    const query = `*[_type == "order" && customerEmail == $email] | order(orderDate desc) {
      orderId,
      customerName,
      customerEmail,
      status,
      total,
      paymentMethod,
      shippingAddress,
      items[] {
        productName,
        quantity,
        price
      },
      trackingNumber,
      notes,
      orderDate,
      shippedDate,
      deliveredDate
    }`;

    const orders = await sanityClient.fetch(query, { email });
    
    return NextResponse.json(orders || []);
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}
