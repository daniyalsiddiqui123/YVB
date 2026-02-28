export async function getOrdersByCustomerEmail(email: string) {
  try {
    console.log("=== FETCHING ORDERS FROM API ===");
    console.log("Email:", email);
    
    // Add timestamp to prevent caching
    const response = await fetch(`/api/orders?email=${encodeURIComponent(email)}&t=${Date.now()}`, {
      cache: 'no-store',
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }
    
    const orders = await response.json();
    console.log("✅ Orders fetched from API:", orders?.length || 0);
    
    return orders || [];
  } catch (error) {
    console.error("❌ Error fetching orders from API:", error);
    return [];
  }
}

export async function getOrderById(orderId: number) {
  try {
    const response = await fetch(`/api/orders/${orderId}`, {
      cache: 'no-store',
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const order = await response.json();
    return order || null;
  } catch (error) {
    console.error("Error fetching order:", error);
    return null;
  }
}
