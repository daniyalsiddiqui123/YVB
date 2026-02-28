"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Package, Calendar, DollarSign, ChevronRight, Truck, CheckCircle, AlertCircle } from "lucide-react";
import Link from "next/link";
import { ROUTES } from "@/lib/constants";
import { formatPrice } from "@/lib/utils";
import { getOrdersByCustomerEmail } from "@/actions/get-orders";

interface Order {
  orderId: number;
  customerName: string;
  customerEmail: string;
  status: string;
  total: number;
  paymentMethod: string;
  shippingAddress: string;
  items: Array<{
    productName: string;
    quantity: number;
    price: number;
  }>;
  trackingNumber?: string;
  orderDate: string;
  shippedDate?: string;
  deliveredDate?: string;
}

const statusConfig = {
  pending: { color: "bg-yellow-100 text-yellow-700", label: "🟡 Pending" },
  processing: { color: "bg-blue-100 text-blue-700", label: "🔵 Processing" },
  shipped: { color: "bg-purple-100 text-purple-700", label: "🚚 Shipped" },
  out_for_delivery: { color: "bg-indigo-100 text-indigo-700", label: "📦 Out for Delivery" },
  delivered: { color: "bg-green-100 text-green-700", label: "✅ Delivered" },
  cancelled: { color: "bg-red-100 text-red-700", label: "❌ Cancelled" },
};

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push(ROUTES.LOGIN);
      return;
    }

    if (!session?.user?.email) {
      setError("No email found. Please log in again.");
      setLoading(false);
      return;
    }

    async function fetchOrders() {
      try {
        const email = session?.user?.email;
        if (!email) return;
        
        console.log("Fetching orders for email:", email);
        const fetchedOrders = await getOrdersByCustomerEmail(email);
        console.log("Fetched orders:", fetchedOrders);

        if (!fetchedOrders || fetchedOrders.length === 0) {
          console.log("No orders found for this email");
        }

        setOrders(fetchedOrders || []);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError("Failed to load orders. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, [session, status, router]);

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-navy" />
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 via-gray-50 to-blue-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Welcome Section */}
          <div className="glass-card rounded-3xl p-8 mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome, {session.user?.name}
            </h1>
            <p className="text-gray-600">Email: {session.user?.email}</p>
          </div>

          {/* Orders Section */}
          <div className="glass-card rounded-3xl p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                <Package className="w-6 h-6 mr-2 text-navy" />
                My Orders ({orders.length})
              </h2>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-6 flex items-start space-x-4">
                <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
                <div>
                  <p className="font-bold text-red-800">Error Loading Orders</p>
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              </div>
            )}

            {orders.length === 0 && !error ? (
              <div className="text-center py-12">
                <Package className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500 mb-4">You haven't placed any orders yet.</p>
                <p className="text-gray-400 text-sm mb-6">
                  Orders will appear here after you checkout
                </p>
                <Link href={ROUTES.HOME} className="btn-navy inline-flex items-center">
                  Start Shopping
                  <ChevronRight className="w-5 h-5 ml-1" />
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order, index) => {
                  const statusStyle = statusConfig[order.status as keyof typeof statusConfig] || statusConfig.pending;

                  return (
                    <motion.div
                      key={order.orderId}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="border border-gray-200 rounded-2xl p-6 hover:shadow-xl transition-shadow bg-white"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                        <div>
                          <p className="font-bold text-lg text-gray-900">
                            Order #{order.orderId}
                          </p>
                          <div className="flex items-center text-sm text-gray-500 mt-1">
                            <Calendar className="w-4 h-4 mr-1" />
                            {new Date(order.orderDate).toLocaleDateString("en-PK", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </div>
                          <p className="text-sm text-gray-600 mt-1">
                            👤 {order.customerName}
                          </p>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="text-sm text-gray-500">Total</p>
                            <p className="font-bold text-navy text-xl">
                              {formatPrice(order.total)}
                            </p>
                          </div>
                          <span className={`px-4 py-2 rounded-full text-xs font-bold ${statusStyle.color}`}>
                            {statusStyle.label}
                          </span>
                        </div>
                      </div>

                      <div className="border-t border-gray-100 pt-4">
                        <p className="text-sm text-gray-600 mb-3">
                          <span className="font-medium">📍 Shipping to:</span> {order.shippingAddress}
                        </p>
                        
                        {order.trackingNumber && (
                          <div className="flex items-center space-x-2 text-sm text-navy mb-3 bg-blue-50 p-3 rounded-xl">
                            <Truck className="w-4 h-4" />
                            <span className="font-medium">Tracking:</span>
                            <span className="font-mono">{order.trackingNumber}</span>
                          </div>
                        )}
                        
                        {order.status === "delivered" && order.deliveredDate && (
                          <div className="flex items-center space-x-2 text-sm text-green-600 mb-3 bg-green-50 p-3 rounded-xl">
                            <CheckCircle className="w-4 h-4" />
                            <span>Delivered on {new Date(order.deliveredDate).toLocaleDateString("en-PK")}</span>
                          </div>
                        )}

                        <div className="bg-gray-50 rounded-xl p-4 mt-4">
                          <p className="text-sm font-bold text-gray-700 mb-3">📦 Order Items ({order.items.length}):</p>
                          <div className="space-y-2">
                            {order.items.map((item, idx) => (
                              <div key={idx} className="flex justify-between text-sm bg-white p-3 rounded-lg border border-gray-100">
                                <span className="text-gray-700 font-medium">
                                  {item.productName} × {item.quantity}
                                </span>
                                <span className="font-bold text-gray-900">
                                  {formatPrice(item.price * item.quantity)}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </main>
  );
}
