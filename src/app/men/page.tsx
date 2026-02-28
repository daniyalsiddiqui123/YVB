import { Suspense } from "react";
import { getProductsByGender } from "@/actions/products";
import ProductCard from "@/components/ProductCard";
import { Shield, Award, Clock, Star, Truck } from "lucide-react";

export const metadata = {
  title: "Men's Fragrances | YVB Fragrances",
  description: "Discover sophisticated fragrances for men. Bold, confident, and unforgettable scents.",
};

export default async function MenPage() {
  const products = await getProductsByGender("men");

  return (
    <main className="min-h-screen section-men">
      {/* Hero Banner */}
      <section className="relative py-24 px-4 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `radial-gradient(circle at 3px 3px, rgba(65, 105, 225, 0.4) 1px, transparent 0)`,
              backgroundSize: "50px 50px",
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Hero Card */}
          <div className="glass-navy rounded-3xl p-8 md:p-16 mb-16 shadow-2xl">
            <div className="max-w-3xl">
              {/* Badge */}
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-xl px-4 py-2 rounded-full mb-6 border border-white/20">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className="text-sm font-semibold text-white">PREMIUM COLLECTION</span>
              </div>

              {/* Title */}
              <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
                Men's
                <br />
                <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                  Collection
                </span>
              </h1>

              {/* Description */}
              <p className="text-white/80 text-lg md:text-xl mb-8 leading-relaxed">
                Bold, sophisticated, and unforgettable. Discover fragrances that define modern masculinity and leave a lasting impression.
              </p>

              {/* Features Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                <div className="flex flex-col items-center text-center p-4 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
                  <Shield className="w-8 h-8 text-blue-400 mb-2" />
                  <span className="text-white font-semibold text-sm">Premium Quality</span>
                </div>
                <div className="flex flex-col items-center text-center p-4 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
                  <Award className="w-8 h-8 text-blue-400 mb-2" />
                  <span className="text-white font-semibold text-sm">Award Winning</span>
                </div>
                <div className="flex flex-col items-center text-center p-4 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
                  <Clock className="w-8 h-8 text-blue-400 mb-2" />
                  <span className="text-white font-semibold text-sm">24h Long Lasting</span>
                </div>
                <div className="flex flex-col items-center text-center p-4 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
                  <Truck className="w-8 h-8 text-blue-400 mb-2" />
                  <span className="text-white font-semibold text-sm">Free Shipping</span>
                </div>
              </div>
            </div>
          </div>

          {/* Products Section */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  Our Fragrances
                </h2>
                <p className="text-white/70">
                  {products.length} premium scents available
                </p>
              </div>
            </div>

            <Suspense
              fallback={
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="glass-card rounded-2xl h-96 animate-pulse" />
                  ))}
                </div>
              }
            >
              {products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {products.map((product) => (
                    <ProductCard
                      key={product._id}
                      product={product}
                      theme="navy"
                    />
                  ))}
                </div>
              ) : (
                <div className="glass-navy rounded-3xl p-12 text-center">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white/10 flex items-center justify-center">
                    <Award className="w-10 h-10 text-white/50" />
                  </div>
                  <p className="text-white text-lg mb-2">
                    No products available yet
                  </p>
                  <p className="text-white/60 text-sm">
                    Check back soon for our latest men's fragrances
                  </p>
                </div>
              )}
            </Suspense>
          </div>
        </div>
      </section>
    </main>
  );
}
