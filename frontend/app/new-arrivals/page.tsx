// app/offers/new-arrivals/page.tsx

"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { productApi } from "@/lib/api";
import ProductCard from "@/components/ui/ProductCard";
import LoadingScreen from "@/components/ui/LoadingScreen";
import { Sparkles, Gift, Rocket, AlertCircle } from "lucide-react";

export default function NewArrivalsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const items = await productApi.getNewArrivals();
        setProducts(items || []);
      } catch (err) {
        setError("নতুন আগমন লোড করতে সমস্যা হয়েছে");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-950 dark:via-purple-950/40 pt-20 px-4 pb-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-4 mb-6">
            <div className="relative">
              <Sparkles className="w-16 h-16 text-purple-600 animate-pulse" />
              <Rocket className="w-10 h-10 text-pink-500 absolute -top-2 -right-2 animate-bounce" />
            </div>
            <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              নতুন আগমন
            </h1>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-xl font-medium">
            <div className="flex items-center gap-3 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl px-6 py-3 rounded-full shadow-lg">
              <Gift className="text-purple-600" size={28} />
              <span className="text-purple-600 font-bold">সদ্য এসেছে!</span>
            </div>
            <p className="text-gray-700 dark:text-gray-300">
              {products.length} টি একদম নতুন প্রোডাক্ট
            </p>
          </div>
        </motion.div>

        {/* Loading */}
        {loading && (
          <LoadingScreen variant="plain" label="নতুন প্রোডাক্ট লোড হচ্ছে..." className="py-32" />
        )}

        {/* Error */}
        {error && !loading && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-24 bg-red-50 dark:bg-red-900/20 rounded-3xl shadow-lg mb-12"
          >
            <AlertCircle className="w-24 h-24 text-red-600 mx-auto mb-6" />
            <p className="text-3xl font-black text-red-600 dark:text-red-400 mb-4">
              ওহ নো!
            </p>
            <p className="text-xl text-gray-700 dark:text-gray-300 mb-8">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-12 py-5 bg-gradient-to-r from-red-600 to-pink-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all"
            >
              আবার চেষ্টা করুন
            </button>
          </motion.div>
        )}

        {/* Empty State */}
        {!loading && products.length === 0 && !error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-32 bg-white/70 dark:bg-gray-900/50 rounded-3xl shadow-lg"
          >
            <Sparkles className="w-32 h-32 text-gray-400 mx-auto mb-8 opacity-50" />
            <h3 className="text-4xl font-black text-gray-700 dark:text-gray-200 mb-6">
              এখনো কোনো নতুন প্রোডাক্ট আসেনি
            </h3>
            <p className="text-2xl text-gray-500 dark:text-gray-400 mb-10">
              শীঘ্রই নতুন কালেকশন আসছে!
            </p>
            <a
              href="/"
              className="inline-block px-12 py-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all"
            >
              শপিং চালিয়ে যান
            </a>
          </motion.div>
        )}

        {/* Products Grid */}
        {!loading && products.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            <AnimatePresence mode="wait">
              {products.map((product, i) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 60 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 60 }}
                  transition={{ delay: i * 0.05, duration: 0.6 }}
                >
                  <ProductCard product={product} index={i} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Excitement Banner */}
        {!loading && products.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-16 text-center bg-gradient-to-r from-purple-600/10 to-pink-600/10 dark:from-purple-900/20 dark:to-pink-900/20 rounded-3xl p-8 shadow-xl"
          >
            <p className="text-xl md:text-2xl font-bold text-purple-700 dark:text-purple-300">
              নতুনত্বের আনন্দ নিন — এখনই অর্ডার করুন!
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}