"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Instagram,
  Facebook,
  Twitter,
  Mail,
  Phone,
  MapPin,
  Heart,
  Star,
  ShoppingBag,
} from "lucide-react";
import { ROUTES } from "@/lib/constants";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
  ];

  const quickLinks = [
    { href: String(ROUTES.HOME), label: "Home" },
    { href: String(ROUTES.MEN), label: "Men" },
    { href: String(ROUTES.WOMEN), label: "Women" },
    { href: String(ROUTES.CART), label: "Cart" },
  ];

  const customerService = [
    { href: "#", label: "Contact Us" },
    { href: "#", label: "Shipping Info" },
    { href: "#", label: "Returns" },
    { href: "#", label: "FAQ" },
  ];

  const company = [
    { href: "#", label: "About Us" },
    { href: "#", label: "Privacy Policy" },
    { href: "#", label: "Terms of Service" },
    { href: "#", label: "Careers" },
  ];

  return (
    <footer className="relative bg-gradient-to-br from-navy via-[#001a4d] to-cherry text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 3px 3px, rgba(255,255,255,0.2) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Floating Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.2, 1], x: [0, 50, 0] }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute top-20 left-20 w-64 h-64 bg-white/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], x: [0, -50, 0] }}
          transition={{ duration: 18, repeat: Infinity }}
          className="absolute bottom-20 right-20 w-80 h-80 bg-white/5 rounded-full blur-3xl"
        />
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Link
                href={ROUTES.HOME}
                className="inline-flex items-center space-x-3 mb-6"
              >
                <div className="text-3xl font-black bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-transparent">
                  YVB FRAGRANCES
                </div>
              </Link>

              <p className="text-white/80 leading-relaxed mb-6 max-w-sm">
                Discover luxury fragrances that define elegance and
                sophistication. Premium scents crafted with the finest
                ingredients from around the world.
              </p>

              {/* Social Links */}
              <div className="flex items-center space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="w-12 h-12 rounded-xl glass-card flex items-center justify-center hover:scale-110 hover:bg-white/10 transition-all duration-300 group"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5 text-white/80 group-hover:text-white transition-colors" />
                  </motion.a>
                ))}
              </div>

              {/* Contact Info */}
              <div className="mt-8 space-y-3">
                <div className="flex items-center space-x-3 text-white/70">
                  <Mail className="w-5 h-5" />
                  <span className="text-sm">contact@yvbfragrances.com</span>
                </div>
                <div className="flex items-center space-x-3 text-white/70">
                  <Phone className="w-5 h-5" />
                  <span className="text-sm">+92 3001234567</span>
                </div>
                <div className="flex items-center space-x-3 text-white/70">
                  <MapPin className="w-5 h-5" />
                  <span className="text-sm">Pakistan, Karachi</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-lg font-bold mb-6 flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5" />
              <span>Quick Links</span>
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors duration-300 hover:translate-x-2 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Customer Service */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-lg font-bold mb-6 flex items-center space-x-2">
              <Heart className="w-5 h-5" />
              <span>Customer Care</span>
            </h3>
            <ul className="space-y-3">
              {customerService.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors duration-300 hover:translate-x-2 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-lg font-bold mb-6 flex items-center space-x-2">
              <Star className="w-5 h-5" />
              <span>Company</span>
            </h3>
            <ul className="space-y-3">
              {company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors duration-300 hover:translate-x-2 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="border-t border-white/10 pt-8 mt-8"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <div className="text-white/60 text-sm text-center md:text-left">
              <p>© {currentYear} YVB Fragrances. All rights reserved.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
