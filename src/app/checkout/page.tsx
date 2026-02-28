"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Check, DollarSign, CreditCard, Truck } from "lucide-react";
import { useCartStore } from "@/lib/cart-store";
import { formatPrice } from "@/lib/utils";
import { ROUTES } from "@/lib/constants";
import { createOrder } from "@/actions/orders";

interface ShippingForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  apartment: string;
  city: string;
  state: string;
  zipCode: string;
}

export default function CheckoutPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [orderTotal, setOrderTotal] = useState<number>(0);

  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const total = useCartStore((state) => state.getTotal());

  const [formData, setFormData] = useState<ShippingForm>({
    firstName: "",
    lastName: "",
    email: session?.user?.email || "",
    phone: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    zipCode: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const shippingInfo = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        address: `${formData.address}${formData.apartment ? `, ${formData.apartment}` : ""}`,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
      };

      const cartItems = items.map((item) => ({
        productId: item.product._id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
      }));

      // Calculate total from items to ensure it's correct
      const calculatedTotal = cartItems.reduce(
        (sum, item) => sum + (item.price * item.quantity),
        0
      );

      console.log("Placing order with:", { cartItems, total, calculatedTotal, shippingInfo });

      const result = await createOrder(
        cartItems,
        calculatedTotal,
        shippingInfo,
        "cash_on_delivery"
      );

      console.log("Order result:", result);

      if (result.success && result.orderId) {
        setOrderId(result.orderId);
        setOrderTotal(calculatedTotal); // Save the total before clearing cart
        setOrderComplete(true);
        clearCart();
      } else {
        console.error("Order failed:", result.error);
        alert(result.error || "Failed to create order. Please try again.");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert(`Error: ${error.message || "An error occurred. Please try again."}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!session) {
    router.push(`${ROUTES.LOGIN}?redirect=${ROUTES.CHECKOUT}`);
    return null;
  }

  if (items.length === 0 && !orderComplete) {
    router.push(ROUTES.CART);
    return null;
  }

  if (orderComplete && orderId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-100 via-gray-50 to-blue-50 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-12 rounded-3xl text-center max-w-2xl"
        >
          <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Check className="w-12 h-12 text-white" />
          </div>
          
          <h1 className="text-4xl font-black text-gray-900 mb-4">
            Order Confirmed!
          </h1>
          
          <p className="text-xl text-gray-600 mb-6">
            Thank you for your order, {session.user?.name}!
          </p>
          
          <div className="glass-card p-6 rounded-2xl mb-8 bg-white/50">
            <p className="text-sm text-gray-600 mb-2">Order Number</p>
            <p className="text-3xl font-black text-navy">#{orderId}</p>
          </div>
          
          <div className="glass-card p-6 rounded-2xl mb-8 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200">
            <div className="flex items-center justify-center space-x-3 mb-3">
              <DollarSign className="w-6 h-6 text-amber-600" />
              <h3 className="text-lg font-bold text-amber-800">Cash on Delivery</h3>
            </div>
            <p className="text-amber-700">
              Please keep <strong className="text-amber-900">Rs. {orderTotal.toLocaleString('en-PK')}</strong> ready in cash when your order arrives.
            </p>
          </div>
          
          <div className="glass-card p-6 rounded-2xl mb-8 bg-blue-50 border border-blue-200">
            <div className="flex items-center justify-center space-x-3 mb-3">
              <Truck className="w-6 h-6 text-blue-600" />
              <h3 className="text-lg font-bold text-blue-800">Estimated Delivery</h3>
            </div>
            <p className="text-blue-700">
              Your order will arrive in <strong className="text-blue-900">3-5 business days</strong>
            </p>
          </div>
          
          <div className="mb-8">
            <p className="text-gray-600 mb-4">
              A confirmation email has been sent to <strong className="text-navy">{formData.email}</strong>
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href={ROUTES.PROFILE} className="btn-navy flex-1 px-8 py-4 rounded-2xl font-bold text-lg">
              View My Orders
            </Link>
            <Link href={ROUTES.HOME} className="btn-glass-navy flex-1 px-8 py-4 rounded-2xl font-bold text-lg">
              Continue Shopping
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-gray-50 to-blue-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href={ROUTES.CART}
            className="flex items-center space-x-2 text-gray-600 hover:text-navy transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Cart</span>
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Shipping Form */}
          <div className="lg:col-span-2 space-y-6">
            <div className="glass-card p-8 rounded-3xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Shipping Information
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="input-glass w-full"
                    placeholder="John"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="input-glass w-full"
                    placeholder="Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="input-glass w-full"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="input-glass w-full"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Address *
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className="input-glass w-full"
                    placeholder="123 Main Street"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Apartment, suite, etc. (optional)
                  </label>
                  <input
                    type="text"
                    name="apartment"
                    value={formData.apartment}
                    onChange={handleInputChange}
                    className="input-glass w-full"
                    placeholder="Apt 4B"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className="input-glass w-full"
                    placeholder="New York"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    State *
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    required
                    className="input-glass w-full"
                    placeholder="NY"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    ZIP Code *
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    required
                    className="input-glass w-full"
                    placeholder="10001"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="glass-card p-6 rounded-3xl sticky top-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Order Summary
              </h2>

              {/* Items */}
              <div className="space-y-3 mb-6 max-h-60 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.product._id} className="flex justify-between text-sm pb-3 border-b border-gray-100">
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{item.product.name}</p>
                      <p className="text-gray-500 text-xs">Qty: {item.quantity}</p>
                    </div>
                    <span className="text-gray-700 font-bold">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-3 mb-6 pt-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-semibold">{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600 font-semibold">Free</span>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-xl font-black text-gray-900">
                    <span>Total</span>
                    <span className="text-navy">{formatPrice(total)}</span>
                  </div>
                </div>
              </div>

              {/* Payment Method - COD Only */}
              <div className="glass-card p-5 rounded-2xl mb-6 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-amber-800">Cash on Delivery</h3>
                </div>
                <p className="text-sm text-amber-700">
                  Pay with cash when your order arrives. No online payment required.
                </p>
              </div>

              {/* Place Order Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-navy px-8 py-5 rounded-2xl font-bold text-lg transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl hover:shadow-2xl"
              >
                {isSubmitting ? "Processing..." : "Place Order - COD"}
              </button>

              <p className="text-xs text-gray-500 text-center mt-4">
                By placing this order, you agree to our Terms of Service.
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
