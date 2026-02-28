import { Suspense } from "react";
import { getProductsByGender } from "@/actions/products";
import ProductCard from "@/components/ProductCard";
import { Heart, Sparkles, Flower2 } from "lucide-react";

export const metadata = {
  title: "Women's Fragrances | YVB Fragrances",
  description: "Discover elegant fragrances for women. Delicate, alluring, and captivating scents.",
};

export default async function WomenPage() {
  const products = await getProductsByGender("women");

  return (
    <main className="min-h-screen section-women">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="glass-cherry rounded-3xl p-8 md:p-12 mb-12">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                Women's Collection
              </h1>
              <p className="text-white/80 text-lg md:text-xl mb-6">
                Elegant, alluring, and captivating. Discover fragrances that embody feminine grace.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center space-x-2 text-white/70">
                  <Heart className="w-5 h-5" />
                  <span className="text-sm">Romantic Scents</span>
                </div>
                <div className="flex items-center space-x-2 text-white/70">
                  <Sparkles className="w-5 h-5" />
                  <span className="text-sm">Enchanting</span>
                </div>
                <div className="flex items-center space-x-2 text-white/70">
                  <Flower2 className="w-5 h-5" />
                  <span className="text-sm">Floral Notes</span>
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
                    theme="cherry"
                  />
                ))}
              </div>
            ) : (
              <div className="glass-card rounded-2xl p-12 text-center">
                <Heart className="w-20 h-20 mx-auto mb-4 text-gray-300" />
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
