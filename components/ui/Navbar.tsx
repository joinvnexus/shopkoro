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
  Phone,
  LogOut,
  Settings,
  Package,
} from "lucide-react";
import Link from "next/link";
import useAuthStore from "@/stores/authStore";
import useCartStore from "@/stores/cartStore";
import useWishlistStore from "@/stores/wishlistStore";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false); // To check if running on client side

  const { userInfo, logout } = useAuthStore();
  const { items } = useCartStore();
  const { getWishlistCount } = useWishlistStore();
  const wishlistCount = getWishlistCount();
  const router = useRouter();

  useEffect(() => {
    setIsClient(true); // Set to true when component mounts on client side
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "হোম", href: "/" },
    { name: "প্রোডাক্ট", href: "/products" },
    { name: "ক্যাটেগরি", href: "/categories" },
    { name: "অফার", href: "/offers" },
    { name: "যোগাযোগ", href: "/contact" },
  ];

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    setIsOpen(false);
    router.push("/");
  };

  return (
    <>
      {/* Background Glow */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 via-pink-600/5 to-orange-600/5 blur-3xl" />
      </div>

      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-lg py-2 border-b border-gray-200/30 dark:border-gray-800"
            : "bg-white/90 dark:bg-gray-900/90 backdrop-blur-md py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="group relative z-10">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-3xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent"
              >
                ShopKoro
              </motion.div>
              <motion.div
                className="absolute -inset-3 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                layoutId="logoGlow"
              />
            </Link>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center space-x-10">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative text-lg font-medium text-gray-700 dark:text-gray-200 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 transition-all duration-300 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-gradient-to-r after:from-purple-600 after:to-pink-600 after:transition-all after:duration-300 hover:after:w-full"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Right Icons + Auth */}
            <div className="flex items-center space-x-4">
              {/* Search */}
              <Link href="/search">
                <motion.button
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  className="hidden md:block p-3 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 hover:shadow-lg hover:shadow-purple-500/20 transition-all"
                  aria-label="Search products"
                >
                  <Search
                    size={20}
                    className="text-gray-700 dark:text-gray-300"
                  />
                </motion.button>
              </Link>

              {/* Wishlist */}
              <Link href="/wishlist">
                <motion.div className="relative hidden md:block">
                  <motion.button
                    whileHover={{ scale: 1.15 }}
                    className="p-3 rounded-full bg-gradient-to-br from-pink-100 to-rose-100 dark:from-pink-900/30 dark:to-rose-900/30 hover:shadow-lg hover:shadow-pink-500/20 transition-all"
                    aria-label="Wishlist"
                  >
                    <Heart
                      size={20}
                      className="text-pink-600 dark:text-pink-400"
                    />
                  </motion.button>
                  {isClient && (
                    <span className="absolute -top-1 -right-1 bg-gradient-to-br from-pink-600 to-rose-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg">
                      {wishlistCount}
                    </span>
                  )}
                </motion.div>
              </Link>

              {/* Cart */}
              <motion.div className="relative">
                <Link href="/cart">
                  <motion.button
                    whileHover={{ scale: 1.15 }}
                    className="p-3 rounded-full bg-gradient-to-br from-orange-100 to-pink-100 dark:from-orange-900/30 dark:to-pink-900/30 hover:shadow-lg hover:shadow-orange-500/20 transition-all"
                    aria-label="Cart"
                  >
                    <ShoppingCart
                      size={22}
                      className="text-orange-600 dark:text-orange-400"
                    />
                  </motion.button>
                </Link>
                {isClient && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-br from-orange-600 to-pink-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-xl">
                    {items.reduce((s, it) => s + it.quantity, 0)}
                  </span>
                )}
              </motion.div>

              {/* User Auth */}
              {isClient && userInfo ? (
                <div className="relative">
                  {/* User Icon */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    // className="hidden md:block p-2 text-dark hover:text-primary transition-colors"
                    className="flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-2xl hover:from-purple-600/20 hover:to-pink-600/20 transition-all"
                    aria-label="Account"
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  >
                    <User size={20} />
                    {/* <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 p-0.5">
                      <div className="w-full h-full rounded-full bg-white dark:bg-gray-900 flex items-center justify-center font-bold text-transparent bg-clip-text bg-gradient-to-br from-purple-600 to-pink-600">
                        {userInfo.name.charAt(0).toUpperCase()}
                      </div>
                    </div> */}
                    <span className="hidden lg:block font-medium text-gray-800 dark:text-white">
                      {userInfo.name.split(" ")[0]}
                    </span>
                  </motion.button>

                  <AnimatePresence>
                    {isUserMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute right-0 top-16 w-56 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700"
                      >
                        <Link
                          href="/profile"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-3 px-5 py-4 hover:bg-purple-50 dark:hover:bg-purple-900/30 transition-all"
                        >
                          <User size={18} />
                          <span>প্রোফাইল</span>
                        </Link>
                        <Link
                          href="/orders"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-3 px-5 py-4 hover:bg-purple-50 dark:hover:bg-purple-900/30 transition-all"
                        >
                          <Package size={18} />
                          <span>অর্ডার</span>
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-5 py-4 hover:bg-red-50 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 transition-all text-left"
                        >
                          <LogOut size={18} />
                          <span>লগআউট</span>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className=" hidden md:flex items-center gap-3">
                  <Link
                    href="/login"
                    className="px-6 py-3 text-gray-700 dark:text-gray-300 font-medium rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                  >
                    লগইন
                  </Link>
                  <Link
                    href="/register"
                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-2xl hover:from-purple-700 hover:to-pink-700 shadow-lg transition-all"
                  >
                    রেজিস্টার
                  </Link>
                </div>
              )}

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-3 rounded-xl bg-gray-100 dark:bg-gray-800"
              >
                {isOpen ? <X size={26} /> : <Menu size={26} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden mt-6 pb-6 border-t border-gray-200 dark:border-gray-700"
              >
                <div className="space-y-6 pt-6">
                  {navLinks.map((link, i) => (
                    <motion.div
                      key={link.href}
                      initial={{ x: -30, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: i * 0.08 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className="block text-xl font-medium text-gray-800 dark:text-white hover:text-purple-600 dark:hover:text-pink-400 transition-colors py-2"
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  ))}

                  {/* Mobile Auth */}
                  {isClient && !userInfo && (
                    <div className="space-y-4 pt-4">
                      <Link
                        href="/login"
                        onClick={() => setIsOpen(false)}
                        className="block w-full text-center py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl"
                      >
                        লগইন করুন
                      </Link>
                      <Link
                        href="/register"
                        onClick={() => setIsOpen(false)}
                        className="block w-full text-center py-4 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white font-bold rounded-xl"
                      >
                        রেজিস্টার করুন
                      </Link>
                    </div>
                  )}

                  {isClient && userInfo && (
                    <div className="space-y-4 pt-6 border-t border-gray-300">
                      <div className="flex items-center gap-4 bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 p-0.5">
                          <div className="w-full h-full rounded-full bg-white dark:bg-gray-900 flex items-center justify-center font-bold text-xl">
                            {userInfo.name.charAt(0).toUpperCase()}
                          </div>
                        </div>
                        <div>
                          <p className="font-bold text-lg">{userInfo.name}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {userInfo.email}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="w-full py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl"
                      >
                        লগআউট করুন
                      </button>
                    </div>
                  )}

                  <div className="pt-6 border-t border-gray-200 dark:border-gray-700 space-y-4">
                    <button className="w-full flex items-center justify-center gap-3 py-3 text-gray-700 dark:text-gray-300">
                      <Search size={22} />
                      <span>প্রোডাক্ট খুঁজুন</span>
                    </button>
                    <button className="w-full flex items-center justify-center gap-3 py-3 text-gray-700 dark:text-gray-300">
                      <Phone size={22} />
                      <span>যোগাযোগ: 01900-000000</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* Spacer */}
      <div
        className={`h-16 md:h-20 ${
          isScrolled ? "md:h-16" : "md:h-20"
        } transition-all duration-500`}
      />
    </>
  );
};

export default Navbar;
