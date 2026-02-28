import { Suspense } from "react";
import { getProductsByGender } from "@/actions/products";
import ProductCard from "@/components/ProductCard";
import { Shield, Award, Clock } from "lucide-react";

export const metadata = {
  title: "Men's Fragrances | YVB Fragrances",
  description: "Discover sophisticated fragrances for men. Bold, confident, and unforgettable scents.",
};

export default async function MenPage() {
  const products = await getProductsByGender("men");

  return (
    <main className="min-h-screen section-men">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="glass-navy rounded-3xl p-8 md:p-12 mb-12">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                Men's Collection
              </h1>
              <p className="text-white/80 text-lg md:text-xl mb-6">
                Bold, sophisticated, and unforgettable. Discover fragrances that define modern masculinity.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center space-x-2 text-white/70">
                  <Shield className="w-5 h-5" />
                  <span className="text-sm">Premium Quality</span>
                </div>
                <div className="flex items-center space-x-2 text-white/70">
                  <Award className="w-5 h-5" />
                  <span className="text-sm">Long Lasting</span>
                </div>
                <div className="flex items-center space-x-2 text-white/70">
                  <Clock className="w-5 h-5" />
                  <span className="text-sm">24h Fragrance</span>
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
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
              <div className="glass-card rounded-2xl p-12 text-center">
                <Shield className="w-20 h-20 mx-auto mb-4 text-gray-300" />
                <p className="text-gray-500 text-lg mb-4">
                  No products available yet.
                </p>
                <p className="text-gray-400 text-sm">
                  Add products via Sanity Studio at http://localhost:3333
                </p>
              </div>
            )}
          </Suspense>
        </div>
      </section>
    </main>
  );
}
