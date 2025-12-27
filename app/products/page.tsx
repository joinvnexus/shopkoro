// app/products/page.tsx

"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { productApi } from "@/lib/api";
import ProductGrid from "@/components/ui/ProductGrid";
import SortFilter from "@/components/ui/SortFilter";
import ViewToggle from "@/components/ui/ViewToggle";
import LoadingScreen from "@/components/ui/LoadingScreen";
import { Product } from "@/types";

export default function ProductListingPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const sortedProducts = useMemo(() => {
    const copy = [...products];
    switch (sortBy) {
      case "price-low":
        return copy.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
      case "price-high":
        return copy.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
      case "newest":
        return copy.sort(
          (a, b) =>
            new Date(b.createdAt || 0).getTime() -
            new Date(a.createdAt || 0).getTime()
        );
      default:
        return copy.sort((a, b) => Number(b.isFeatured) - Number(a.isFeatured));
    }
  }, [products, sortBy]);

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      try {
        const data = await productApi.getAll();
        if (!isMounted) return;
        setProducts(data || []);
        setError(null);
      } catch (err) {
        console.error(err);
        if (!isMounted) return;
        setError("প্রোডাক্ট লোড করতে সমস্যা হয়েছে।");
      } finally {
        if (!isMounted) return;
        setLoading(false);
      }
    };
    load();
    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return <LoadingScreen variant="plain" />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-gray-950 pt-20 px-4 pb-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent mb-4">
            সব প্রোডাক্ট
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            {products.length} টি প্রোডাক্ট পাওয়া গেছে
          </p>
        </motion.div>

        {/* Toolbar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-4">
            <SortFilter sortBy={sortBy} setSortBy={setSortBy} />
            <ViewToggle viewMode={viewMode} setViewMode={setViewMode} />
          </div>
        </div>

        {error && (
          <div className="mb-10 rounded-xl bg-red-50 text-red-700 border border-red-200 px-6 py-4 text-center">
            {error}
          </div>
        )}

        {sortedProducts.length === 0 ? (
          <div className="text-center py-24 bg-white/70 dark:bg-gray-900/50 rounded-3xl shadow-lg">
            <p className="text-2xl font-bold text-gray-700 dark:text-gray-200">
              কোন প্রোডাক্ট পাওয়া যায়নি
            </p>
            <p className="text-gray-500 mt-2">দয়া করে পরে আবার চেষ্টা করুন।</p>
          </div>
        ) : (
          <ProductGrid products={sortedProducts} viewMode={viewMode} />
        )}
      </div>
    </div>
  );
}
