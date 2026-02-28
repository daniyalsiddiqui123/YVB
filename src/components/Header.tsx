"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingCart, User, LogOut, Package } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { ROUTES } from "@/lib/constants";
import { useCartStore } from "@/lib/cart-store";

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { data: session } = useSession();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const cartItemCount = useCartStore((state) => state.items.reduce((acc, item) => acc + item.quantity, 0));

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: ROUTES.HOME, label: "Home" },
    { href: ROUTES.MEN, label: "Men" },
    { href: ROUTES.WOMEN, label: "Women" },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="h-full w-full bg-white/10 bg-clip-padding backdrop-filter backdrop-blur-xl border-b border-white/20">
          <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
            <div className="flex items-center justify-between h-14 sm:h-16 md:h-20">
              {/* Logo - YVB on Left */}
              <div className="flex-shrink-0">
                <Link href={ROUTES.HOME} className="flex items-center space-x-2 group">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="relative"
                  >
                    <span className="text-xl sm:text-2xl md:text-3xl font-black bg-gradient-to-br from-navy via-[#002366] to-cherry bg-clip-text text-transparent drop-shadow-lg">
                      YVB
                    </span>
                  </motion.div>
                </Link>
              </div>

              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center space-x-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="relative px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-300 hover:bg-white/50"
                  >
                    <span className={`${isActive(link.href) ? "text-navy font-bold" : "text-gray-700 hover:text-navy"}`}>
                      {link.label}
                    </span>
                    {isActive(link.href) && (
                      <motion.div
                        layoutId="navIndicator"
                        className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-gradient-to-r from-navy to-cherry rounded-full"
                      />
                    )}
                  </Link>
                ))}
              </nav>

              {/* Right Side Actions */}
              <div className="flex items-center space-x-1.5 sm:space-x-2">
                {/* Cart */}
                <Link href={ROUTES.CART} className="relative p-1.5 sm:p-2 rounded-lg glass-card-hover hover:scale-110 transition-all">
                  <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
                  {cartItemCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-red-600 text-white text-[10px] w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center font-bold shadow-lg border-2 border-white"
                    >
                      {cartItemCount}
                    </motion.span>
                  )}
                </Link>

                {/* Profile - Desktop */}
                {session ? (
                  <>
                    <div className="relative hidden md:block">
                      <button
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                        className="p-1.5 sm:p-2 rounded-lg glass-card-hover hover:scale-110 transition-all"
                      >
                        <User className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
                      </button>

                      <AnimatePresence>
                        {isProfileOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            className="absolute right-0 mt-2 w-48 glass-card-strong rounded-xl py-2 z-50 shadow-2xl overflow-hidden"
                          >
                            <div className="px-3 py-2 border-b border-white/20">
                              <p className="text-xs sm:text-sm font-bold text-gray-900">{session.user?.name}</p>
                              <p className="text-[10px] text-gray-500 truncate">{session.user?.email}</p>
                            </div>
                            <Link
                              href={ROUTES.PROFILE}
                              className="flex items-center px-3 py-2 text-xs text-gray-700 hover:bg-white/50"
                              onClick={() => setIsProfileOpen(false)}
                            >
                              <Package className="w-3 h-3 mr-2 text-navy" />
                              My Orders
                            </Link>
                            <button
                              onClick={() => {
                                signOut({ callbackUrl: ROUTES.HOME });
                                setIsProfileOpen(false);
                              }}
                              className="flex items-center w-full px-3 py-2 text-xs text-red-600 hover:bg-white/50"
                            >
                              <LogOut className="w-3 h-3 mr-2" />
                              Sign Out
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Mobile Profile Link - Shows in burger menu */}
                    <div className="md:hidden">
                      <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="p-1.5 sm:p-2 rounded-lg glass-card-hover"
                      >
                        <User className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
                      </button>
                    </div>
                  </>
                ) : (
                  <Link href={ROUTES.LOGIN} className="hidden sm:block btn-navy text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-semibold">
                    Sign In
                  </Link>
                )}

                {/* Mobile Menu Button */}
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="lg:hidden p-1.5 sm:p-2 rounded-lg glass-card-hover"
                >
                  {isMenuOpen ? (
                    <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
                  ) : (
                    <Menu className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu - Fixed below navbar */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden fixed top-14 sm:top-16 left-0 right-0 z-40"
          >
            <div className="h-full w-full bg-white/10 bg-clip-padding backdrop-filter backdrop-blur-xl border-b border-white/20 shadow-2xl">
              <nav className="px-4 py-4 space-y-2 max-h-[70vh] overflow-y-auto">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-300 ${isActive(link.href) ? "bg-gradient-to-r from-navy/10 to-cherry/10 text-navy" : "text-gray-700 hover:bg-white/50"}`}
                  >
                    {link.label}
                  </Link>
                ))}
                
                {/* Profile Section - Mobile */}
                {session ? (
                  <>
                    <div className="border-t border-white/20 pt-3 mt-3">
                      <div className="px-4 py-2 mb-2">
                        <p className="text-sm font-bold text-gray-900">{session.user?.name}</p>
                        <p className="text-xs text-gray-500 truncate">{session.user?.email}</p>
                      </div>
                      <Link
                        href={ROUTES.PROFILE}
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center py-3 px-4 text-sm text-gray-700 hover:bg-white/50 rounded-xl"
                      >
                        <Package className="w-4 h-4 mr-3 text-navy" />
                        My Orders
                      </Link>
                      <button
                        onClick={() => {
                          signOut({ callbackUrl: ROUTES.HOME });
                          setIsMenuOpen(false);
                        }}
                        className="flex items-center w-full py-3 px-4 text-sm text-red-600 hover:bg-white/50 rounded-xl"
                      >
                        <LogOut className="w-4 h-4 mr-3" />
                        Sign Out
                      </button>
                    </div>
                  </>
                ) : (
                  <Link
                    href={ROUTES.LOGIN}
                    onClick={() => setIsMenuOpen(false)}
                    className="block btn-navy text-center py-3 rounded-xl font-semibold text-sm mt-2"
                  >
                    Sign In
                  </Link>
                )}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
