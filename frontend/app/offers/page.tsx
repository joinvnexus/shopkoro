"use client";

export const dynamic = 'force-dynamic';

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { productApi } from "@/lib/api";
import ProductCard from "@/components/ui/ProductCard";
import LoadingScreen from "@/components/ui/LoadingScreen";
import { Flame, Timer, Zap } from "lucide-react";

function OffersPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch offers - products with discount or flash sale
  useEffect(() => {
    const fetchOffers = async () => {
      setLoading(true);
      setError(null);
      try {
        // Use dedicated offers endpoint
        const offers = await productApi.getOffers();
        setProducts(offers || []);
      } catch (err) {
        setError("অফার প্রোডাক্ট লোড করতে সমস্যা হয়েছে");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-gray-950 pt-20">
      <div className="max-w-7xl mx-auto px-4 pb-20">
        {/* Header */}
        <div className="text-center mb-10">
          {/* Pulsing Badge */}
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-red-600 to-orange-600 text-white px-8 py-4 rounded-full text-lg font-black shadow-2xl mb-6 relative overflow-hidden"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Flame className="w-8 h-8" />
            </motion.div>
            <span className="tracking-wider">মেগা অফার!</span>
            <motion.div
              animate={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Zap className="w-8 h-8" />
            </motion.div>

            {/* Glowing Ring */}
            <motion.div
              animate={{ scale: [1, 1.4, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 rounded-full border-4 border-white/40"
            />
          </motion.div>

          <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
            সব অফার প্রোডাক্ট
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mt-3">
            {products.length} টি অফার পাওয়া গেছে
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <LoadingScreen variant="plain" label="অফার প্রোডাক্ট লোড হচ্ছে..." />
        )}

        {error && (
          <div className="text-center py-12 bg-red-50 dark:bg-red-900/20 rounded-3xl mb-8">
            <p className="text-red-600 dark:text-red-400 text-xl font-bold">{error}</p>
          </div>
        )}

        {products.length === 0 && !loading ? (
          <div className="text-center py-24 bg-white/70 dark:bg-gray-900/50 rounded-3xl shadow-lg">
            <Flame className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <p className="text-3xl font-black text-gray-700 dark:text-gray-200 mb-4">
              কোনো অফার নেই এখন
            </p>
            <p className="text-xl text-gray-500">শীগ্রই নতুন অফার আসছে!</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((p, i) => (
              <motion.div
                key={p._id}
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="relative"
              >
                <ProductCard product={p} index={i} />
                {/* Offer Badge */}
                {/* {(p.discount > 0 || p.isFlashSale) && (
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute top-2 right-2 z-10"
                  >
                    <div className="bg-gradient-to-br from-red-600 to-orange-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
                      <Flame className="w-4 h-4" />
                      <span>{p.discount > 0 ? `-${p.discount}%` : "ফ্ল্যাশ"}</span>
                    </div>
                  </motion.div>
                )} */}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

import { Suspense } from 'react';

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-gray-950 flex items-center justify-center"><div className="text-2xl font-bold">লোড হচ্ছে...</div></div>}>
      <OffersPage />
    </Suspense>
  );
}