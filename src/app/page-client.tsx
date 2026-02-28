"use client";

import { Suspense } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Star, Truck, Award, Shield, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { ROUTES } from "@/lib/constants";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section - Enhanced */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background with gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy/90 to-cherry">
          <div className="absolute inset-0 bg-[url('/hero-banner.jpg')] bg-cover bg-center opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30" />
        </div>

        {/* Animated particles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-navy/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cherry/30 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 flex justify-center"
          >
            <div className="glass px-6 py-3 rounded-full flex items-center space-x-3 glow-navy">
              <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              <span className="text-sm font-semibold text-white tracking-wide">PREMIUM LUXURY FRAGRANCES</span>
              <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-6xl md:text-8xl lg:text-9xl font-black text-white mb-8 drop-shadow-2xl"
          >
            YVB FRAGRANCES
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-2xl md:text-3xl text-white/95 mb-12 font-light tracking-wide"
          >
            Luxury in Every Drop
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Link
              href={ROUTES.MEN}
              className="btn-glass-navy flex items-center space-x-3 px-10 py-5 text-xl rounded-2xl glow-navy"
            >
              <span>Shop Men</span>
              <ArrowRight className="w-6 h-6" />
            </Link>

            <Link
              href={ROUTES.WOMEN}
              className="btn-glass-cherry flex items-center space-x-3 px-10 py-5 text-xl rounded-2xl glow-cherry"
            >
              <span>Shop Women</span>
              <ArrowRight className="w-6 h-6" />
            </Link>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <div className="w-8 h-14 border-2 border-white/40 rounded-full flex items-start justify-center p-3">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-2 h-2 bg-white/70 rounded-full"
            />
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 bg-gradient-to-r from-navy/5 via-white to-cherry/5 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-navy/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-cherry/5 rounded-full blur-3xl" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                icon: <Award className="w-8 h-8" />,
                title: "Premium Quality",
                description: "Finest ingredients",
                color: "navy",
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: "Long Lasting",
                description: "24h fragrance",
                color: "cherry",
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: "Authentic",
                description: "100% genuine",
                color: "navy",
              },
              {
                icon: <Truck className="w-8 h-8" />,
                title: "Free Shipping",
                description: "Orders $50+",
                color: "cherry",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="premium-card p-8 rounded-3xl text-center group"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 transition-transform duration-300 group-hover:scale-110 ${
                  feature.color === "navy" ? "bg-gradient-to-br from-navy to-navy/70" : "bg-gradient-to-br from-cherry to-cherry/70"
                } text-white shadow-lg`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 luxury-gradient opacity-5" />
        
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-card p-12 md:p-16 rounded-3xl text-center relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-navy/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-cherry/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
            
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                Find Your Signature Scent
              </h2>
              
              <p className="text-gray-600 mb-10 text-xl leading-relaxed">
                Explore our complete collection and discover fragrances that speak to you.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Link href={ROUTES.MEN} className="btn-navy px-10 py-5 text-lg rounded-2xl">
                  Browse Men's Collection
                </Link>
                <Link href={ROUTES.WOMEN} className="btn-cherry px-10 py-5 text-lg rounded-2xl">
                  Browse Women's Collection
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
