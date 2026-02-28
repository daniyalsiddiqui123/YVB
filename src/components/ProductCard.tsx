"use client";

import { motion } from "framer-motion";
import { ShoppingCart, Eye, Star } from "lucide-react";
import { Product } from "@/types";
import { urlFor } from "@/lib/sanity";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/lib/cart-store";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
  theme?: "navy" | "cherry";
}

export default function ProductCard({ product, theme = "navy" }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  const themeClasses = theme === "navy" 
    ? "hover:shadow-navy/20" 
    : "hover:shadow-cherry/20";

  const buttonClasses = theme === "navy"
    ? "btn-glass-navy"
    : "btn-glass-cherry";

  const productSlug = product.slug?.current || product._id;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -8 }}
      className={`glass-card-hover rounded-2xl overflow-hidden group ${themeClasses}`}
    >
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
        <Link href={`/product/${productSlug}`}>
          {product.image?.asset ? (
            <img
              src={urlFor(product.image).width(600).height(600).url()}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <div className="text-center p-4">
                <ShoppingCart className="w-16 h-16 mx-auto mb-2 opacity-20" />
                <p className="text-sm">No Image</p>
                <p className="text-xs mt-1">Add via Sanity</p>
              </div>
            </div>
          )}
        </Link>
        
        {product.bestseller && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className={`absolute top-3 left-3 px-3 py-1.5 rounded-full text-xs font-bold text-white flex items-center space-x-1 shadow-lg ${
              theme === "navy" ? "bg-gradient-to-r from-navy to-navy/80" : "bg-gradient-to-r from-cherry to-cherry/80"
            }`}
          >
            <Star className="w-3 h-3 fill-white" />
            <span>Best Seller</span>
          </motion.div>
        )}

        {!product.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center backdrop-blur-sm">
            <span className="text-white font-bold text-lg">Out of Stock</span>
          </div>
        )}

        {/* Quick View Button */}
        <Link
          href={`/product/${productSlug}`}
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20 backdrop-blur-[2px]"
        >
          <div className={`${buttonClasses} flex items-center space-x-2 px-6 py-3 rounded-xl`}>
            <Eye className="w-5 h-5" />
            <span className="font-semibold">Quick View</span>
          </div>
        </Link>
      </div>

      {/* Product Info */}
      <div className="p-5 space-y-3">
        <Link href={`/product/${productSlug}`}>
          <h3 className="font-bold text-lg text-gray-900 line-clamp-1 hover:text-navy transition-colors cursor-pointer">
            {product.name}
          </h3>
        </Link>
        
        {product.category && (
          <p className="text-sm text-gray-500 capitalize">
            {product.category.replace("_", " ")}
          </p>
        )}

        <p className="text-sm text-gray-600 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between pt-2">
          <span className={`text-2xl font-black ${
            theme === "navy" ? "text-navy" : "text-cherry"
          }`}>
            {formatPrice(product.price)}
          </span>

          <button
            onClick={() => addItem(product)}
            disabled={!product.inStock}
            className={`${buttonClasses} p-3 rounded-xl flex items-center justify-center hover:scale-110 transition-transform`}
            aria-label="Add to cart"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
