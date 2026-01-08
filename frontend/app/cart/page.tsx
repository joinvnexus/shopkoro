"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useCartStore from "@/stores/cartStore";
import Image from "next/image";
import Link from "next/link";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";

/**
 * CartPage component displays the shopping cart with items, controls, and order summary
 * It handles displaying empty cart state, cart items with quantity controls, and checkout options
 */
/**
 * CartPage component that displays the shopping cart items and summary
 * Features responsive design, animations, and cart management functionality
 */
export default function CartPage() {
  // Destructure cart-related functions and state from the cart store
  const {
    items,
    syncFromServer,
    updateQuantity,
    removeItem,
    clearCart,
    getTotalPrice,
  } = useCartStore();

  // Sync cart data with server on component mount
  useEffect(() => {
    syncFromServer();
  }, [syncFromServer]);

  const total = getTotalPrice();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-gray-950 dark:via-purple-950/40 pt-16 sm:pt-20 md:pt-24 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto text-center py-12 sm:py-16 md:py-20"
        >
          <ShoppingBag className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 mx-auto text-gray-300 dark:text-gray-700 mb-6 sm:mb-8" />
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-800 dark:text-white mb-3 sm:mb-4 px-4">
            আপনার কার্ট খালি
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 sm:mb-10 px-4">
            এখনো কোনো প্রোডাক্ট যোগ করেননি
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-4 sm:py-5 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 text-white font-bold text-base sm:text-lg rounded-xl sm:rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-purple-500/30 transition-all"
          >
            শপিং শুরু করুন
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-gray-950 dark:via-purple-950/40 pt-16 sm:pt-20 md:pt-24 px-3 sm:px-4 pb-32 lg:pb-20">
      <div className="max-w-5xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl sm:text-4xl md:text-5xl font-black text-center mb-8 sm:mb-10 md:mb-12 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent px-4"
        >
          আপনার কার্ট
        </motion.h1>

        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            <AnimatePresence>
              {items.map((item, index) => (
                <motion.div
                  key={item.productId}
                  layout
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/80 dark:bg-gray-900/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-xl border border-white/30 dark:border-gray-800 overflow-hidden"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 p-4 sm:p-6">
                    {/* Product Image */}
                    <div className="relative w-full sm:w-24 md:w-28 h-24 sm:h-24 md:h-28 rounded-xl sm:rounded-2xl overflow-hidden shadow-lg flex-shrink-0">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.name ?? "Default alt text"}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-purple-200 to-pink-200 dark:from-purple-800 dark:to-pink-800 flex items-center justify-center">
                          <ShoppingBag
                            size={32}
                            className="text-white/70 sm:w-10 sm:h-10"
                          />
                        </div>
                      )}
                    </div>

                    {/* Product Info & Controls Container */}
                    <div className="flex-1 w-full sm:w-auto flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                      {/* Product Info */}
                      <div className="flex-1">
                        <h3 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white mb-1 sm:mb-2">
                          {item.name}
                        </h3>
                        <p className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                          ৳{item.price?.toLocaleString("bn-BD")}
                        </p>
                      </div>

                      {/* Quantity Controls & Remove - Mobile/Tablet Layout */}
                      <div className="flex items-center justify-between sm:justify-start gap-3 sm:gap-4">
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2 sm:gap-3">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() =>
                              updateQuantity(item.productId, item.quantity - 1)
                            }
                            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-purple-100 dark:hover:bg-purple-900/50 flex items-center justify-center transition-all"
                          >
                            <Minus size={18} className="sm:w-5 sm:h-5" />
                          </motion.button>

                          <motion.span
                            layout
                            className="w-12 sm:w-16 text-center text-xl sm:text-2xl font-bold text-gray-800 dark:text-white"
                          >
                            {item.quantity}
                          </motion.span>

                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() =>
                              updateQuantity(item.productId, item.quantity + 1)
                            }
                            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all"
                          >
                            <Plus size={18} className="sm:w-5 sm:h-5" />
                          </motion.button>
                        </div>

                        {/* Remove */}
                        <motion.button
                          whileHover={{ scale: 1.1, rotate: 90 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => removeItem(item.productId)}
                          className="p-3 sm:p-4 rounded-full bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-900/50 text-red-600 dark:text-red-400 transition-all"
                        >
                          <Trash2 size={20} className="sm:w-5.5 sm:h-5.5" />
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Summary Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-1"
          >
            <div className="bg-white/80 dark:bg-gray-900/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl border border-white/30 dark:border-gray-800 p-6 sm:p-8 lg:sticky lg:top-28">
              <h2 className="text-xl sm:text-2xl font-black text-gray-800 dark:text-white mb-6 sm:mb-8">
                অর্ডার সারাংশ
              </h2>

              <div className="space-y-4 sm:space-y-6">
                <div className="flex justify-between text-base sm:text-lg">
                  <span className="text-gray-600 dark:text-gray-400">
                    সাবটোটাল
                  </span>
                  <span className="font-bold text-gray-800 dark:text-white">
                    ৳{total.toLocaleString("bn-BD")}
                  </span>
                </div>

                <div className="flex justify-between text-base sm:text-lg">
                  <span className="text-gray-600 dark:text-gray-400">
                    ডেলিভারি চার্জ
                  </span>
                  <span className="font-bold text-green-600">ফ্রি</span>
                </div>

                <div className="pt-4 sm:pt-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between text-xl sm:text-2xl font-black">
                    <span className="text-gray-800 dark:text-white">মোট</span>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600">
                      ৳{total.toLocaleString("bn-BD")}
                    </span>
                  </div>
                </div>

                <div className="space-y-3 sm:space-y-4 pt-4 sm:pt-6">
                  <Link
                    href="/checkout"
                    className="block w-full text-center py-4 sm:py-5 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 text-white font-bold text-lg sm:text-xl rounded-xl sm:rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-purple-500/40 transition-all"
                  >
                    চেকআউট করুন
                  </Link>

                  <button
                    onClick={clearCart}
                    className="w-full py-3 sm:py-4 border-2 border-red-600 text-red-600 dark:text-red-400 font-bold rounded-xl sm:rounded-2xl hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
                  >
                    কার্ট খালি করুন
                  </button>
                </div>

                <div className="pt-4 sm:pt-6 text-center">
                  <Link
                    href="/products"
                    className="text-purple-600 dark:text-pink-400 font-medium hover:underline text-sm sm:text-base"
                  >
                    ← শপিং চালিয়ে যান
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Mobile Fixed Bottom Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-t border-gray-200 dark:border-gray-800 p-4 shadow-2xl z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <div className="flex-shrink-0">
            <p className="text-sm text-gray-600 dark:text-gray-400">মোট</p>
            <p className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
              ৳{total.toLocaleString("bn-BD")}
            </p>
          </div>
          <Link
            href="/checkout"
            className="px-8 sm:px-10 py-3.5 sm:py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-base sm:text-lg rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all"
          >
            চেকআউট
          </Link>
        </div>
      </div>
    </div>
  );
}
