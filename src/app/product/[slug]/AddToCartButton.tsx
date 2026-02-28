"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShoppingCart, Zap, Check } from "lucide-react";
import { useCartStore } from "@/lib/cart-store";

export default function AddToCartButton({ product, theme }: { product: any; theme: string }) {
  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);
  const [showPopup, setShowPopup] = useState(false);

  const handleAddToCart = () => {
    addItem(product);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000);
  };

  const handleBuyNow = () => {
    addItem(product);
    router.push("/cart");
  };

  return (
    <>
      <div className="flex gap-4 mb-8">
        <button
          onClick={handleAddToCart}
          className={`flex-1 flex items-center justify-center space-x-3 px-8 py-5 rounded-2xl font-bold text-gray-900 text-lg transition-all hover:scale-105 shadow-lg hover:shadow-xl ${
            theme === "navy"
              ? "bg-gradient-to-r from-navy/10 via-navy/20 to-navy/10"
              : "bg-gradient-to-r from-cherry/10 via-cherry/20 to-cherry/10"
          }`}
        >
          <ShoppingCart className="w-6 h-6" />
          <span>Add to Cart</span>
        </button>
        <button
          onClick={handleBuyNow}
          className={`flex-1 flex items-center justify-center space-x-3 px-8 py-5 rounded-2xl font-bold text-gray-900 text-lg transition-all hover:scale-105 shadow-lg hover:shadow-xl ${
            theme === "navy"
              ? "bg-gradient-to-r from-cherry/10 via-cherry/20 to-cherry/10"
              : "bg-gradient-to-r from-navy/10 via-navy/20 to-navy/10"
          }`}
        >
          <Zap className="w-6 h-6" />
          <span>Buy Now</span>
        </button>
      </div>

      {showPopup && (
        <div className="fixed bottom-8 right-8 z-50">
          <div className="glass-card bg-gradient-to-r from-green-400/90 to-green-500/90 text-gray-900 p-6 rounded-2xl shadow-2xl flex items-center space-x-4 backdrop-blur-xl border border-white/50">
            <div className="w-14 h-14 rounded-full bg-white/50 flex items-center justify-center">
              <Check className="w-8 h-8 text-green-700" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-lg text-gray-900">Added to Cart!</p>
              <p className="text-gray-700 text-sm">{product.name}</p>
            </div>
            <button
              onClick={() => router.push("/cart")}
              className="px-6 py-3 bg-green-700 text-white rounded-xl font-bold hover:bg-green-800 transition-colors shadow-lg"
            >
              View Cart
            </button>
          </div>
        </div>
      )}
    </>
  );
}
