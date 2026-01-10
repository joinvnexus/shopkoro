// app/offers/flash-sale/page.tsx

"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { productApi } from "@/lib/api";
import ProductCard from "@/components/ui/ProductCard";
import LoadingScreen from "@/components/ui/LoadingScreen";
import { Flame, Clock, Zap, AlertCircle } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { bn } from "date-fns/locale";

export default function FlashSalePage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState<string>("");

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await productApi.getFlashSale();
        setProducts(res || []);

        // Dummy countdown (তোমার API-তে endTime থাকলে সেটা ব্যবহার করো)
        const endTime = new Date(Date.now() + 24 * 60 * 60 * 1000); // ২৪ ঘণ্টা পর
        const timer = setInterval(() => {
          const distance = formatDistanceToNow(endTime, { addSuffix: true, locale: bn });
          setTimeLeft(distance);
        }, 1000);

        return () => clearInterval(timer);
      } catch (err) {
        setError("ফ্ল্যাশ সেল লোড করতে সমস্যা হয়েছে");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-pink-50 dark:from-gray-950 dark:via-red-950/40 pt-20 px-4 pb-20">
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
              <Flame className="w-16 h-16 text-red-600 animate-pulse" />
              <Zap className="w-8 h-8 text-yellow-400 absolute -top-2 -right-2 animate-bounce" />
            </div>
            <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-red-600 via-orange-600 to-pink-600 bg-clip-text text-transparent">
              ফ্ল্যাশ সেল
            </h1>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-xl font-medium">
            <div className="flex items-center gap-3 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl px-6 py-3 rounded-full shadow-lg">
              <Clock className="text-red-600" size={28} />
              <span className="text-red-600 font-bold">সময় বাকি: {timeLeft || "লোড হচ্ছে..."}</span>
            </div>
            <p className="text-gray-700 dark:text-gray-300">
              {products.length} টি লিমিটেড অফার
            </p>
          </div>
        </motion.div>

        {/* Loading */}
        {loading && (
          <LoadingScreen variant="plain" label="ফ্ল্যাশ সেল লোড হচ্ছে..." className="py-32" />
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
            <Flame className="w-32 h-32 text-gray-400 mx-auto mb-8 opacity-50" />
            <h3 className="text-4xl font-black text-gray-700 dark:text-gray-200 mb-6">
              এখন কোনো ফ্ল্যাশ সেল চলছে না
            </h3>
            <p className="text-2xl text-gray-500 dark:text-gray-400 mb-10">
              শীঘ্রই নতুন অফার আসছে!
            </p>
            <a
              href="/"
              className="inline-block px-12 py-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all"
            >
              শপিং চালিয়ে যান
            </a>
          </motion.div>
        )}

        {/* Products */}
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

        {/* Urgency Banner */}
        {!loading && products.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-16 text-center bg-gradient-to-r from-red-600/10 to-pink-600/10 dark:from-red-900/20 dark:to-pink-900/20 rounded-3xl p-8 shadow-xl"
          >
            <p className="text-xl md:text-2xl font-bold text-red-700 dark:text-red-300">
              স্টক লিমিটেড! দ্রুত অর্ডার করুন — অফার শেষ হয়ে যেতে পারে যেকোনো সময়
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
