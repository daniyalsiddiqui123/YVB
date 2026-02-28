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
          <div className="rounded-3xl p-8 md:p-16 mb-16 shadow-2xl bg-gradient-to-br from-blue-900/90 via-blue-800/80 to-blue-900/90 backdrop-blur-xl border border-blue-400/30">
            <div className="max-w-3xl">
              {/* Badge */}
              <div className="inline-flex items-center space-x-2 bg-blue-500/20 backdrop-blur-xl px-4 py-2 rounded-full mb-6 border border-blue-300/30">
                <Star className="w-4 h-4 text-yellow-300 fill-yellow-300" />
                <span className="text-sm font-bold text-white">PREMIUM COLLECTION</span>
              </div>

              {/* Title */}
              <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight drop-shadow-lg">
                Men's
                <br />
                <span className="bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500 bg-clip-text text-transparent">
                  Collection
                </span>
              </h1>

              {/* Description */}
              <p className="text-blue-100 text-lg md:text-xl mb-8 leading-relaxed font-medium">
                Bold, sophisticated, and unforgettable. Discover fragrances that define modern masculinity and leave a lasting impression.
              </p>

              {/* Features Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                <div className="flex flex-col items-center text-center p-4 rounded-2xl bg-blue-500/10 backdrop-blur-xl border border-blue-400/30 hover:bg-blue-500/20 transition-all">
                  <Shield className="w-8 h-8 text-blue-300 mb-2" />
                  <span className="text-white font-bold text-sm">Premium Quality</span>
                </div>
                <div className="flex flex-col items-center text-center p-4 rounded-2xl bg-blue-500/10 backdrop-blur-xl border border-blue-400/30 hover:bg-blue-500/20 transition-all">
                  <Award className="w-8 h-8 text-blue-300 mb-2" />
                  <span className="text-white font-bold text-sm">Award Winning</span>
                </div>
                <div className="flex flex-col items-center text-center p-4 rounded-2xl bg-blue-500/10 backdrop-blur-xl border border-blue-400/30 hover:bg-blue-500/20 transition-all">
                  <Clock className="w-8 h-8 text-blue-300 mb-2" />
                  <span className="text-white font-bold text-sm">24h Long Lasting</span>
                </div>
                <div className="flex flex-col items-center text-center p-4 rounded-2xl bg-blue-500/10 backdrop-blur-xl border border-blue-400/30 hover:bg-blue-500/20 transition-all">
                  <Truck className="w-8 h-8 text-blue-300 mb-2" />
                  <span className="text-white font-bold text-sm">Free Shipping</span>
                </div>
              </div>
            </div>
          </div>

          {/* Products Section */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-black mb-2">
                  Our Fragrances
                </h2>
                <p className="text-black/60">
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
