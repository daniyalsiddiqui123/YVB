export default {
  name: "order",
  title: "Orders",
  type: "document",
  fields: [
    {
      name: "orderId",
      title: "Order ID",
      type: "number",
      readOnly: true,
    },
    {
      name: "customerName",
      title: "Customer Name",
      type: "string",
      readOnly: true,
    },
    {
      name: "customerEmail",
      title: "Customer Email",
      type: "string",
      readOnly: true,
    },
    {
      name: "customerPhone",
      title: "Customer Phone",
      type: "string",
      readOnly: true,
    },
    {
      name: "status",
      title: "Order Status",
      type: "string",
      options: {
        list: [
          { title: "Pending", value: "pending" },
          { title: "Processing", value: "processing" },
          { title: "Shipped", value: "shipped" },
          { title: "Out for Delivery", value: "out_for_delivery" },
          { title: "Delivered", value: "delivered" },
          { title: "Cancelled", value: "cancelled" },
        ],
      },
      initialValue: "pending",
    },
    {
      name: "total",
      title: "Total Amount (PKR)",
      type: "number",
      readOnly: true,
    },
    {
      name: "paymentMethod",
      title: "Payment Method",
      type: "string",
      readOnly: true,
      initialValue: "Cash on Delivery",
    },
    {
      name: "shippingAddress",
      title: "Shipping Address",
      type: "text",
      readOnly: true,
    },
    {
      name: "items",
      title: "Order Items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "productName",
              title: "Product Name",
              type: "string",
            },
            {
              name: "quantity",
              title: "Quantity",
              type: "number",
            },
            {
              name: "price",
              title: "Price (PKR)",
              type: "number",
            },
          ],
          preview: {
            select: {
              productName: "productName",
              quantity: "quantity",
              price: "price",
            },
            prepare(selection: any) {
              const { productName, quantity, price } = selection;
              return {
                title: productName,
                subtitle: `Qty: ${quantity} - Rs. ${price?.toLocaleString('en-PK')}`,
              };
            },
          },
        },
      ],
      readOnly: true,
    },
    {
      name: "trackingNumber",
      title: "Tracking Number",
      type: "string",
      description: "Add tracking number when order is shipped",
    },
    {
      name: "notes",
      title: "Internal Notes",
      type: "text",
      description: "Add notes about this order (not visible to customer)",
    },
    {
      name: "orderDate",
      title: "Order Date",
      type: "datetime",
      readOnly: true,
    },
    {
      name: "shippedDate",
      title: "Shipped Date",
      type: "datetime",
      readOnly: true,
    },
    {
      name: "deliveredDate",
      title: "Delivered Date",
      type: "datetime",
      readOnly: true,
    },
  ],
  preview: {
    select: {
      orderId: "orderId",
      customerName: "customerName",
      total: "total",
      status: "status",
      orderDate: "orderDate",
    },
    prepare(selection: any) {
      const { orderId, customerName, total, status, orderDate } = selection;
      const statusLabels: any = {
        pending: "🟡 Pending",
        processing: "🔵 Processing",
        shipped: "🚚 Shipped",
        out_for_delivery: "📦 Out for Delivery",
        delivered: "✅ Delivered",
        cancelled: "❌ Cancelled",
      };

      const orderIdDisplay = typeof orderId === 'number' ? orderId.toString() : (orderId || 'Unknown');

      return {
        title: `Order #${orderIdDisplay.substring(0, 8)}`,
        subtitle: `${customerName || 'Unknown'} - Rs. ${total?.toLocaleString('en-PK') || 0} - ${statusLabels[status] || status}`,
        media: () => {
          const statusEmoji: any = {
            pending: "🟡",
            processing: "🔵",
            shipped: "🚚",
            out_for_delivery: "📦",
            delivered: "✅",
            cancelled: "❌",
          };
          return statusEmoji[status] || "📦";
        },
      };
    },
  },
};
