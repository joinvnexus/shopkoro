// app/offers/best-sellers/page.tsx  

"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { productApi } from "@/lib/api";
import ProductCard from "@/components/ui/ProductCard";
import LoadingScreen from "@/components/ui/LoadingScreen";
import { Zap, Sparkles, Loader2 } from "lucide-react";
import Link from 'next/link';


export default function BestSellersPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const items = await productApi.getBestSellers();
        setProducts(items || []);
      } catch (err) {
        setError("বেস্ট সেলার লোড করতে সমস্যা হয়েছে");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-gray-950 dark:via-purple-950/40 pt-20 px-4 pb-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <Zap size={40} className="text-yellow-500" />
            <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
              বেস্ট সেলার
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            গ্রাহকদের সবচেয়ে পছন্দের প্রোডাক্ট • {products.length} টি আইটেম
          </p>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <LoadingScreen variant="plain" label="সেরা প্রোডাক্ট লোড হচ্ছে..." className="py-24" />
        )}

        {/* Error State */}
        {error && !loading && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-24 bg-red-50 dark:bg-red-900/20 rounded-3xl shadow-lg"
          >
            <p className="text-3xl font-black text-red-600 dark:text-red-400 mb-4">
              ওহ নো!
            </p>
            <p className="text-xl text-gray-700 dark:text-gray-300 mb-8">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-10 py-5 bg-gradient-to-r from-red-600 to-pink-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all"
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
            className="text-center py-24 bg-white/70 dark:bg-gray-900/50 rounded-3xl shadow-lg"
          >
            <div className="text-8xl mb-6">😔</div>
            <h3 className="text-3xl font-black text-gray-700 dark:text-gray-200 mb-4">
              এখনো কোনো বেস্ট সেলার নেই
            </h3>
            <p className="text-xl text-gray-500 dark:text-gray-400 mb-8">
              শীঘ্রই নতুন প্রোডাক্ট আসছে!
            </p>
            <Link
              href="/"
              className="inline-block px-10 py-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all"
            >
              শপিং চালিয়ে যান
            </Link>
          </motion.div>
        )}

        {/* Products Grid */}
        {!loading && products.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            <AnimatePresence mode="wait">
              {products.map((product, i) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 50 }}
                  transition={{ delay: i * 0.05, duration: 0.5 }}
                >
                  <ProductCard product={product} index={i} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Footer Note */}
        <div className="text-center mt-16 text-gray-500 dark:text-gray-400 text-sm">
          * বেস্ট সেলার প্রোডাক্টগুলো গ্রাহকদের ক্রয়ের ভিত্তিতে স্বয়ংক্রিয়ভাবে আপডেট হয়
        </div>
      </div>
    </div>
  );
}