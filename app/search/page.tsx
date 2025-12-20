"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { productApi } from "@/lib/api";
import ProductCard from "@/components/ui/ProductCard";
import { Product } from "@/types";
import { Search, Filter, X, SlidersHorizontal } from "lucide-react";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get("q") || "";

  const [searchTerm, setSearchTerm] = useState(query);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    category: "",
    minPrice: "",
    maxPrice: "",
    inStock: false,
  });

  useEffect(() => {
    setSearchTerm(query);
    if (query) {
      performSearch(query);
    }
  }, [query]);

  const performSearch = async (term: string) => {
    if (!term.trim()) return;

    setLoading(true);
    setError(null);

    try {
      // Update URL
      const params = new URLSearchParams();
      params.set("q", term);
      router.replace(`/search?${params.toString()}`, { scroll: false });

      // Perform search
      const searchResults = await productApi.getAll();
      const filtered = searchResults.filter(product =>
        product.name.toLowerCase().includes(term.toLowerCase()) ||
        product.nameBn?.toLowerCase().includes(term.toLowerCase()) ||
        product.description.toLowerCase().includes(term.toLowerCase()) ||
        product.category.toLowerCase().includes(term.toLowerCase())
      );

      setProducts(filtered);
    } catch (err) {
      console.error(err);
      setError("সার্চ করতে সমস্যা হয়েছে।");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(searchTerm);
  };

  const clearSearch = () => {
    setSearchTerm("");
    setProducts([]);
    setError(null);
    router.replace("/search", { scroll: false });
  };

  const filteredProducts = products.filter(product => {
    if (filters.category && product.category !== filters.category) return false;
    if (filters.minPrice && product.price < parseInt(filters.minPrice)) return false;
    if (filters.maxPrice && product.price > parseInt(filters.maxPrice)) return false;
    if (filters.inStock && !product.inStock) return false;
    return true;
  });

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
            প্রোডাক্ট খুঁজুন
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            আপনার পছন্দের প্রোডাক্ট খুঁজে বের করুন
          </p>
        </motion.div>

        {/* Search Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSearch}
          className="max-w-2xl mx-auto mb-8"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="প্রোডাক্টের নাম, ক্যাটেগরি বা বর্ণনা লিখুন..."
              className="w-full pl-12 pr-32 py-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-gray-300 dark:border-gray-700 rounded-3xl focus:outline-none focus:ring-4 focus:ring-purple-500/30 focus:border-purple-500 transition-all text-lg"
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-2">
              {searchTerm && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X size={20} />
                </button>
              )}
              <button
                type="button"
                onClick={() => setShowFilters(!showFilters)}
                className="p-2 text-gray-400 hover:text-purple-600 transition-colors"
              >
                <SlidersHorizontal size={20} />
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-2xl hover:shadow-lg transition-all disabled:opacity-50"
              >
                খুঁজুন
              </button>
            </div>
          </div>
        </motion.form>

        {/* Filters Panel */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="max-w-2xl mx-auto mb-8 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-3xl p-6 border border-gray-300 dark:border-gray-700"
          >
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
              <Filter size={20} />
              ফিল্টার
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  ক্যাটেগরি
                </label>
                <select
                  value={filters.category}
                  onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-4 py-3 bg-white/60 dark:bg-gray-800/60 backdrop-blur-md border border-gray-300 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-500/30 focus:border-purple-500 transition-all"
                >
                  <option value="">সব ক্যাটেগরি</option>
                  <option value="electronics">ইলেকট্রনিক্স</option>
                  <option value="fashion">ফ্যাশন</option>
                  <option value="beauty">বিউটি</option>
                  <option value="home">হোম & লাইফস্টাইল</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  স্টক স্ট্যাটাস
                </label>
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={filters.inStock}
                    onChange={(e) => setFilters(prev => ({ ...prev, inStock: e.target.checked }))}
                    className="w-5 h-5 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500"
                  />
                  <span className="text-gray-700 dark:text-gray-300">শুধুমাত্র স্টকে আছে</span>
                </label>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  সর্বনিম্ন দাম
                </label>
                <input
                  type="number"
                  value={filters.minPrice}
                  onChange={(e) => setFilters(prev => ({ ...prev, minPrice: e.target.value }))}
                  placeholder="৳০"
                  className="w-full px-4 py-3 bg-white/60 dark:bg-gray-800/60 backdrop-blur-md border border-gray-300 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-500/30 focus:border-purple-500 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  সর্বোচ্চ দাম
                </label>
                <input
                  type="number"
                  value={filters.maxPrice}
                  onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: e.target.value }))}
                  placeholder="সীমাহীন"
                  className="w-full px-4 py-3 bg-white/60 dark:bg-gray-800/60 backdrop-blur-md border border-gray-300 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-500/30 focus:border-purple-500 transition-all"
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">খুঁজছি...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <X className="w-8 h-8 text-red-600" />
            </div>
            <p className="text-red-600 dark:text-red-400 text-xl font-bold mb-4">{error}</p>
            <button
              onClick={() => performSearch(searchTerm)}
              className="px-6 py-3 bg-purple-600 text-white font-bold rounded-2xl hover:bg-purple-700 transition-colors"
            >
              আবার চেষ্টা করুন
            </button>
          </div>
        )}

        {/* Results */}
        {!loading && !error && searchTerm && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                "{searchTerm}" এর জন্য ফলাফল
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {filteredProducts.length} টি প্রোডাক্ট পাওয়া গেছে
              </p>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-24 bg-white/70 dark:bg-gray-900/50 rounded-3xl shadow-lg">
                <Search className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <p className="text-2xl font-bold text-gray-700 dark:text-gray-200 mb-2">
                  কোনো প্রোডাক্ট পাওয়া যায়নি
                </p>
                <p className="text-gray-500 mb-6">আপনার সার্চ টার্ম পরিবর্তন করে দেখুন।</p>
                <div className="flex flex-wrap justify-center gap-3">
                  <Link
                    href="/products"
                    className="px-6 py-3 bg-purple-600 text-white font-bold rounded-2xl hover:bg-purple-700 transition-colors"
                  >
                    সব প্রোডাক্ট দেখুন
                  </Link>
                  <Link
                    href="/categories"
                    className="px-6 py-3 border-2 border-purple-600 text-purple-600 dark:text-purple-400 font-bold rounded-2xl hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors"
                  >
                    ক্যাটেগরি দেখুন
                  </Link>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product, index) => (
                  <ProductCard key={product._id || index} product={product} index={index} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Popular Searches */}
        {!searchTerm && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center"
          >
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
              জনপ্রিয় সার্চ
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                "স্মার্টফোন", "ল্যাপটপ", "টি-শার্ট", "জুতা", "মেকআপ", "হেডফোন",
                "ব্যাগ", "ওয়াচ", "ক্যামেরা", "বই", "খেলনা", "গৃহস্থালী"
              ].map((term, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSearchTerm(term);
                    performSearch(term);
                  }}
                  className="px-4 py-2 bg-white/60 dark:bg-gray-900/60 backdrop-blur-md border border-gray-300 dark:border-gray-700 rounded-2xl hover:bg-purple-100 dark:hover:bg-purple-900/30 hover:border-purple-500 transition-all text-gray-700 dark:text-gray-300"
                >
                  {term}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}