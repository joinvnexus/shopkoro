"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import useWishlistStore from "@/stores/wishlistStore";
import { Heart, ShoppingCart, Trash2, HeartHandshake } from "lucide-react";
import { useRouter } from "next/navigation";

export default function WishlistPage() {
  const router = useRouter();
  const { items, removeItem, clearWishlist, addItem } = useWishlistStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-gray-950 pt-20 px-4 pb-20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-24"
          >
            <Heart className="w-24 h-24 mx-auto text-gray-300 dark:text-gray-700 mb-6" />
            <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent mb-4">
              আপনার উইশলিস্ট খালি
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              পছন্দের প্রোডাক্টগুলো এখানে যোগ করে রাখুন এবং পরে কিনতে পারবেন
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/products"
                className="px-8 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-purple-500/30 transition-all"
              >
                প্রোডাক্ট দেখুন
              </Link>
              <Link
                href="/categories"
                className="px-8 py-4 border-2 border-purple-600 text-purple-600 dark:text-purple-400 font-bold text-lg rounded-2xl hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all"
              >
                ক্যাটেগরি ব্রাউজ করুন
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-gray-950 pt-20 px-4 pb-20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <Heart className="w-12 h-12 text-pink-500" />
            <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
              আপনার উইশলিস্ট
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            {items.length} টি প্রোডাক্ট সেভ করা আছে
          </p>
        </motion.div>

        {/* Clear All Button */}
        <div className="flex justify-end mb-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={clearWishlist}
            className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-2xl shadow-lg transition-all"
          >
            <Trash2 size={20} className="inline mr-2" />
            সব মুছে ফেলুন
          </motion.button>
        </div>

        {/* Wishlist Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((item, index) => (
            <motion.div
              key={item.productId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/80 dark:bg-gray-900/90 backdrop-blur-xl rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/30 dark:border-gray-800 overflow-hidden group"
            >
              {/* Product Image */}
              <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-purple-200 to-pink-200 dark:from-purple-800 dark:to-pink-800 flex items-center justify-center">
                    <HeartHandshake size={48} className="text-white/70" />
                  </div>
                )}

                {/* Remove Button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => removeItem(item.productId)}
                  className="absolute top-4 right-4 p-3 bg-red-500/90 hover:bg-red-600 text-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300"
                  aria-label="Remove from wishlist"
                >
                  <Trash2 size={16} />
                </motion.button>
              </div>

              {/* Product Info */}
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="font-bold text-lg text-gray-800 dark:text-white mb-2 line-clamp-2">
                    {item.name}
                  </h3>
                  <p className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                    ৳{item.price.toLocaleString("bn-BD")}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Link
                    href={`/products/${item.productId}`}
                    className="flex-1 text-center py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-2xl hover:shadow-lg hover:shadow-purple-500/30 transition-all"
                  >
                    বিস্তারিত দেখুন
                  </Link>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      // Add to cart logic would go here
                      // For now, just show a toast or something
                      alert("কার্টে যোগ করা হয়েছে!");
                    }}
                    className="px-4 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all"
                  >
                    <ShoppingCart size={20} />
                  </motion.button>
                </div>

                {/* Added Date */}
                <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                  যোগ করা হয়েছে: {new Date(item.addedAt).toLocaleDateString("bn-BD")}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl rounded-3xl p-8 border border-white/30 dark:border-gray-800">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              আরও প্রোডাক্ট দেখুন
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              আপনার উইশলিস্টে আরও প্রোডাক্ট যোগ করুন
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/products"
                className="px-8 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-purple-500/30 transition-all"
              >
                সব প্রোডাক্ট দেখুন
              </Link>
              <Link
                href="/categories"
                className="px-8 py-4 border-2 border-purple-600 text-purple-600 dark:text-purple-400 font-bold text-lg rounded-2xl hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all"
              >
                ক্যাটেগরি অনুসারে ব্রাউজ করুন
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}