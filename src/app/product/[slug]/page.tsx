import { Suspense } from "react";
import { getProductBySlug } from "@/actions/products";
import { notFound } from "next/navigation";
import { urlFor } from "@/lib/sanity";
import { formatPrice } from "@/lib/utils";
import { ShoppingCart, Heart, Star, Truck, Shield, Check, Zap, ArrowLeft } from "lucide-react";
import Link from "next/link";
import AddToCartButton from "./AddToCartButton";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  
  if (!product) {
    return { title: "Product Not Found" };
  }
  
  return {
    title: `${product.name} | YVB Fragrances`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-gray-50 to-blue-50">
        <div className="text-center glass-card p-12 rounded-3xl max-w-md">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-6">This product doesn't exist or hasn't been published yet.</p>
          <Link href="/" className="btn-navy inline-block">← Back to Home</Link>
        </div>
      </div>
    );
  }

  const theme = product.gender === "men" ? "navy" : "cherry";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-gray-50 to-blue-50">
      {/* Header */}
      <div className="glass-header">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Link
            href={product.gender === "men" ? "/men" : "/women"}
            className="flex items-center space-x-2 text-gray-700 hover:text-navy transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back</span>
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image */}
          <div className="glass-card rounded-3xl p-8 overflow-hidden relative">
            <div className="aspect-square rounded-2xl bg-gray-100">
              {product.image?.asset ? (
                <img
                  src={urlFor(product.image).width(800).height(800).url()}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <div className="text-center">
                    <ShoppingCart className="w-20 h-20 mx-auto mb-4 opacity-20" />
                    <p className="text-lg">No Image</p>
                    <p className="text-sm">Add via Sanity Studio</p>
                  </div>
                </div>
              )}
            </div>
            {product.bestseller && (
              <div className="absolute top-6 left-6 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg flex items-center space-x-2">
                <Star className="w-4 h-4 fill-white" />
                <span>Best Seller</span>
              </div>
            )}
            <button className="absolute top-6 right-6 p-3 glass-card rounded-full hover:scale-110 transition-transform shadow-lg">
              <Heart className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          {/* Info */}
          <div className="flex flex-col justify-center">
            <div className="flex items-center space-x-2 mb-4">
              <span className={`px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider ${
                theme === "navy" 
                  ? "bg-gradient-to-r from-navy/10 to-navy/20 text-navy" 
                  : "bg-gradient-to-r from-cherry/10 to-cherry/20 text-cherry"
              }`}>
                {product.category?.replace("_", " ") || "Fragrance"}
              </span>
              {product.inStock && (
                <span className="px-4 py-1.5 rounded-full text-sm font-bold text-green-600 bg-green-100 flex items-center space-x-1 shadow-sm">
                  <Check className="w-4 h-4" />
                  <span>In Stock</span>
                </span>
              )}
            </div>

            <h1 className="text-5xl font-black text-gray-900 mb-4">{product.name}</h1>
            
            <div className="flex items-center space-x-3 mb-6">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                ))}
              </div>
              <span className="text-gray-600 font-medium">(4.9 / 5.0)</span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-500">128 reviews</span>
            </div>

            <div className="mb-8 flex items-baseline space-x-4">
              <span className={`text-5xl font-bold ${
                theme === "navy" ? "text-navy" : "text-cherry"
              }`}>
                {formatPrice(product.price)}
              </span>
              <span className="text-xl text-gray-400 line-through">
                {formatPrice(product.price * 1.3)}
              </span>
              <span className="px-4 py-1.5 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full text-sm font-bold shadow-lg">
                -30% OFF
              </span>
            </div>

            <div className="glass-card p-6 rounded-2xl mb-8">
              <h3 className="text-base font-semibold text-gray-800 mb-3">Description</h3>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Add to Cart & Buy Now Buttons (Client Component) */}
            <Suspense fallback={<div className="h-20">Loading...</div>}>
              <AddToCartButton product={product} theme={theme} />
            </Suspense>

            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="glass-card p-5 rounded-2xl flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  theme === "navy" ? "bg-gradient-to-br from-navy/90 to-navy/70" : "bg-gradient-to-br from-cherry/90 to-cherry/70"
                } text-white shadow-lg`}>
                  <Truck className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Free Shipping</p>
                  <p className="text-sm text-gray-500">Orders $50+</p>
                </div>
              </div>
              <div className="glass-card p-5 rounded-2xl flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  theme === "navy" ? "bg-gradient-to-br from-navy/90 to-navy/70" : "bg-gradient-to-br from-cherry/90 to-cherry/70"
                } text-white shadow-lg`}>
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Authentic</p>
                  <p className="text-sm text-gray-500">100% Genuine</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
