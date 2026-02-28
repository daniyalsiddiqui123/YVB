"use client";

import { ArrowRight, Sparkles, Star, Truck, Award, Shield, Zap } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ROUTES } from "@/lib/constants";
import Link from "next/link";

export default function HomePage() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Fixed Vibrant Background */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-navy via-[#001a4d] to-cherry">
        <motion.div
          style={{ y }}
          className="absolute inset-0 opacity-20"
        >
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `radial-gradient(circle at 3px 3px, rgba(255,255,255,0.15) 1px, transparent 0)`,
              backgroundSize: "50px 50px",
            }}
          />
        </motion.div>
      </div>

      {/* Hero Section - Fully Responsive */}
      <section className="relative min-h-[80vh] sm:min-h-[85vh] flex items-center justify-center px-4 sm:px-6 py-12">
        <div className="relative z-10 text-center max-w-6xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 sm:mb-6 flex justify-center"
          >
            <div className="glass px-3 sm:px-6 py-2 sm:py-3 rounded-full flex items-center space-x-2 sm:space-x-3 shadow-2xl">
              <Star className="w-3 h-3 sm:w-5 sm:h-5 text-yellow-400 fill-yellow-400" />
              <span className="text-[10px] sm:text-sm font-semibold text-white tracking-wider">PREMIUM LUXURY FRAGRANCES</span>
              <Star className="w-3 h-3 sm:w-5 sm:h-5 text-yellow-400 fill-yellow-400" />
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white mb-4 sm:mb-6 leading-none"
            style={{
              textShadow: '0 8px 32px rgba(0,0,0,0.4), 0 0 60px rgba(0,35,102,0.5)'
            }}
          >
            YVB
            <br />
            <span className="bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-transparent">
              FRAGRANCES
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-base sm:text-2xl md:text-3xl text-white/95 mb-6 sm:mb-10 font-light tracking-[0.2em] px-2"
          >
            LUXURY IN EVERY DROP
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-sm mx-auto"
          >
            <Link
              href={ROUTES.MEN}
              className="btn-glass-navy flex items-center justify-center space-x-2 px-4 sm:px-8 py-3 sm:py-4 text-sm sm:text-lg rounded-xl w-full transition-all hover:scale-105"
            >
              <span>Shop Men</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </Link>

            <Link
              href={ROUTES.WOMEN}
              className="btn-glass-cherry flex items-center justify-center space-x-2 px-4 sm:px-8 py-3 sm:py-4 text-sm sm:text-lg rounded-xl w-full transition-all hover:scale-105"
            >
              <span>Shop Women</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section - Fully Responsive */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12"
          >
            <div className="inline-flex items-center space-x-2 glass px-3 sm:px-6 py-2 sm:py-3 rounded-full mb-4 sm:mb-6 shadow-xl">
              <Sparkles className="w-4 h-4 sm:w-6 sm:h-6 text-yellow-500" />
              <span className="text-xs sm:text-sm font-bold text-white tracking-wider">WHY CHOOSE YVB</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 px-2">
              The Premium Difference
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              {
                icon: <Award className="w-6 h-6 sm:w-10 sm:h-10" />,
                title: "Premium Quality",
                description: "Finest ingredients from around the world",
                color: "navy",
              },
              {
                icon: <Zap className="w-6 h-6 sm:w-10 sm:h-10" />,
                title: "Long Lasting",
                description: "24-hour lasting fragrance",
                color: "cherry",
              },
              {
                icon: <Shield className="w-6 h-6 sm:w-10 sm:h-10" />,
                title: "100% Authentic",
                description: "Genuine products guaranteed",
                color: "navy",
              },
              {
                icon: <Truck className="w-6 h-6 sm:w-10 sm:h-10" />,
                title: "Free Shipping",
                description: "On orders over Rs. 5,000",
                color: "cherry",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="glass-navy p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl text-center hover:-translate-y-2 transition-all duration-500 hover:shadow-2xl"
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl mb-3 sm:mb-4 ${
                  feature.color === "navy"
                    ? "bg-gradient-to-br from-white/20 to-white/10 shadow-lg"
                    : "bg-gradient-to-br from-white/20 to-white/10 shadow-lg"
                } text-white`}>
                  {feature.icon}
                </div>
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Fully Responsive */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy/50 via-navy/40 to-cherry/50" />

        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-navy p-6 sm:p-10 md:p-14 lg:p-16 rounded-2xl sm:rounded-3xl text-center relative overflow-hidden shadow-2xl"
          >
            <div className="relative z-10">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-4 sm:mb-6 text-white drop-shadow-2xl"
              >
                Find Your Signature Scent
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-sm sm:text-lg md:text-xl text-white/90 mb-6 sm:mb-10 leading-relaxed px-2"
              >
                Explore our complete collection and discover fragrances that speak to you.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-md mx-auto"
              >
                <Link href={ROUTES.MEN} className="btn-navy px-4 sm:px-8 py-3 sm:py-4 text-sm sm:text-lg rounded-xl shadow-xl hover:shadow-2xl transition-all hover:scale-105 w-full">
                  Browse Men's Collection
                </Link>
                <Link href={ROUTES.WOMEN} className="btn-cherry px-4 sm:px-8 py-3 sm:py-4 text-sm sm:text-lg rounded-xl shadow-xl hover:shadow-2xl transition-all hover:scale-105 w-full">
                  Browse Women's Collection
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
