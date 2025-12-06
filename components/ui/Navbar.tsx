// components/ui/Navbar.tsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ShoppingCart,
  Search,
  User,
  Heart,
  Moon,
  Sun,
  Globe,
  Phone,
} from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [language, setLanguage] = useState<"bn" | "en">("bn");
  const [cartCount] = useState(3);
  const [wishlist] = useState(7);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "হোম", nameEn: "Home", href: "/" },
    { name: "প্রোডাক্ট", nameEn: "Products", href: "/products" },
    { name: "ক্যাটেগরি", nameEn: "Categories", href: "/categories" },
    { name: "স্পেশাল অফার", nameEn: "Offers", href: "/offers" },
    { name: "যোগাযোগ", nameEn: "Contact", href: "/contact" },
  ];

  return (
    <>
      {/* Background Glow */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-pink-500/10 to-orange-500/20 blur-3xl" />
      </div>

      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-white/80 dark:bg-gray-900/90 backdrop-blur-xl shadow-2xl border-b border-white/20 dark:border-gray-800"
            : "bg-white/60 dark:bg-gray-900/70 backdrop-blur-xl"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="relative group">
              <motion.div
                whileHover={{ scale: 1.08 }}
                className="text-3xl font-black bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 bg-clip-text text-transparent"
              >
                ShopKoro
              </motion.div>
              <motion.div
                className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-30 group-hover:opacity-60 transition duration-1000"
                layoutId="logoGlow"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={link.href}
                    className="relative px-5 py-3 text-gray-700 dark:text-gray-200 font-medium rounded-2xl overflow-hidden group block"
                  >
                    <span className="relative z-10">
                      {language === "bn" ? link.name : link.nameEn}
                    </span>
                    <motion.span
                      className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl"
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 1 }}
                      transition={{ duration: 0.4 }}
                    />
                    <motion.div
                      className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                      initial={{ width: 0 }}
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.4 }}
                    />
                  </Link>
                </motion.div>
              ))}

              {/* Language Switcher */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setLanguage(language === "bn" ? "en" : "bn")}
                className="ml-4 p-3 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
              >
                <Globe size={20} className="text-gray-700 dark:text-gray-300" />
              </motion.button>

              {/* Theme Toggle */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 180 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsDark(!isDark)}
                className="ml-3 p-3 rounded-full bg-gray-100 dark:bg-gray-800"
              >
                <AnimatePresence mode="wait">
                  {isDark ? (
                    <motion.div
                      key="sun"
                      initial={{ rotate: -180, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 180, opacity: 0 }}
                    >
                      <Sun size={20} className="text-yellow-500" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="moon"
                      initial={{ rotate: 180, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -180, opacity: 0 }}
                    >
                      <Moon size={20} className="text-gray-700" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>

            {/* Right Icons */}
            <div className="flex items-center space-x-3">
              {/* Search */}
              <motion.button
                whileHover={{ scale: 1.15 }}
                className="p-3 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 hover:from-purple-500/20 hover:to-pink-500/20 transition-all"
              >
                <Search size={20} className="text-gray-700 dark:text-gray-300" />
              </motion.button>

              {/* Wishlist */}
              <motion.div className="relative">
                <motion.button
                  whileHover={{ scale: 1.2, rotate: [0, -10, 10, -10, 0] }}
                  className="p-3 rounded-2xl bg-red-500/10 hover:bg-red-500/20 transition-all"
                >
                  <Heart size={20} className="text-red-500 fill-red-500/30" />
                </motion.button>
                {wishlist > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-lg"
                  >
                    {wishlist}
                  </motion.span>
                )}
              </motion.div>

              {/* Cart */}
              <motion.div className="relative">
                <motion.button
                  whileHover={{ scale: 1.2, rotate: [0, 10, -10, 10, 0] }}
                  className="p-3 rounded-2xl bg-gradient-to-br from-orange-500/20 to-pink-500/20 hover:from-orange-500/30 hover:to-pink-500/30 transition-all"
                >
                  <ShoppingCart size={22} className="text-orange-600" />
                </motion.button>
                {cartCount > 0 && (
                  <motion.span
                    layoutId="cartCount"
                    className="absolute -top-2 -right-2 bg-gradient-to-br from-orange-500 to-pink-600 text-white text-xs font-bold rounded-full min-w-[24px] h-6 flex items-center justify-center shadow-2xl px-2"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </motion.div>

              {/* User */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                className="hidden md:block p-3 rounded-2xl bg-gray-100 dark:bg-gray-800"
              >
                <User size={20} />
              </motion.button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden p-3 rounded-2xl bg-gray-100 dark:bg-gray-800"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Full Screen Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -100 }}
              className="fixed inset-0 bg-gradient-to-br from-purple-600 via-pink-600 to-orange-600 z-40 pt-24 px-8"
            >
              <div className="flex flex-col space-y-8 text-white">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="text-3xl font-bold hover:text-yellow-300 transition-colors block"
                    >
                      {language === "bn" ? link.name : link.nameEn}
                    </Link>
                  </motion.div>
                ))}

                <div className="pt-8 border-t border-white/30 space-y-6">
                  <button className="flex items-center space-x-4 text-xl">
                    <Phone size={28} />
                    <span>হেল্পলাইন: ০১৯০০-০০০০০০</span>
                  </button>
                  <button className="flex items-center space-x-4 text-xl">
                    <Search size={28} />
                    <span>প্রোডাক্ট খুঁজুন</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Spacer */}
      <div className="h-20" />
    </>
  );
}