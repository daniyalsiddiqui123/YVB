"use client";

import Link from "next/link";
import type { Route } from "next";
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

  const quickLinks: { href: Route; label: string }[] = [
    { href: ROUTES.HOME, label: "Home" },
    { href: ROUTES.MEN, label: "Men" },
    { href: ROUTES.WOMEN, label: "Women" },
    { href: ROUTES.CART, label: "Cart" },
  ];

  const customerService: { href: Route; label: string }[] = [
    { href: "/contact" as Route, label: "Contact Us" },
    { href: "/shipping" as Route, label: "Shipping Info" },
    { href: "/returns" as Route, label: "Returns" },
    { href: "/faq" as Route, label: "FAQ" },
  ];

  const company: { href: Route; label: string }[] = [
    { href: "/about" as Route, label: "About Us" },
    { href: "/privacy" as Route, label: "Privacy Policy" },
    { href: "/terms" as Route, label: "Terms of Service" },
    { href: "/careers" as Route, label: "Careers" },
  ];

  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

          {/* Brand */}
          <div>
            <Link href={ROUTES.HOME}>
              <h2 className="text-2xl font-bold mb-4">YVB FRAGRANCES</h2>
            </Link>
            <p className="text-white/70 mb-6">
              Discover luxury fragrances crafted with elegance and precision.
            </p>

            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a key={social.label} href={social.href}>
                  <social.icon className="w-5 h-5 hover:scale-110 transition" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <ShoppingBag className="w-4 h-4" /> Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-white/70 hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Heart className="w-4 h-4" /> Customer Care
            </h3>
            <ul className="space-y-2">
              {customerService.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-white/70 hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Star className="w-4 h-4" /> Company
            </h3>
            <ul className="space-y-2">
              {company.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-white/70 hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        <div className="border-t border-white/10 mt-12 pt-6 text-center text-white/50 text-sm">
          © {currentYear} YVB Fragrances. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
