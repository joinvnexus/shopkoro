//frontend/app/categories/page.tsx
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { categoryApi } from "@/lib/api";
import { Category } from "@/types";
import LoadingScreen from "@/components/ui/LoadingScreen";
import {
  Smartphone,
  Laptop,
  Shirt,
  Watch,
  Heart,
  Home,
  Camera,
  Gamepad2,
  Headphones,
  ShoppingBag,
  Baby,
  Dumbbell,
  Sparkles,
  Grid,
  List,
  Search,
  Filter,
} from "lucide-react";

const iconMap: Record<string, any> = {
  smartphone: Smartphone,
  laptop: Laptop,
  shirt: Shirt,
  watch: Watch,
  heart: Heart,
  home: Home,
  camera: Camera,
  gamepad2: Gamepad2,
  headphones: Headphones,
  shopping_bag: ShoppingBag,
  baby: Baby,
  dumbbell: Dumbbell,
  sparkles: Sparkles,
};

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await categoryApi.getAll();
        setCategories(data || []);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("ক্যাটেগরি লোড করতে সমস্যা হয়েছে।");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.nameBn?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <LoadingScreen variant="gradient" />;
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
            ক্যাটেগরি সমূহ
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            আপনার পছন্দের প্রোডাক্ট খুঁজে নিন
          </p>
        </motion.div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          <div className="relative flex-1 max-w-md">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="ক্যাটেগরি খুঁজুন..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-gray-300 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-500/30 focus:border-purple-500 transition-all"
            />
          </div>

          <div className="flex items-center gap-4">
            <div className="flex bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-2xl p-1 border border-gray-300 dark:border-gray-700">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-3 rounded-xl transition-all ${
                  viewMode === "grid"
                    ? "bg-purple-600 text-white shadow-lg"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                <Grid size={20} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-3 rounded-xl transition-all ${
                  viewMode === "list"
                    ? "bg-purple-600 text-white shadow-lg"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                <List size={20} />
              </button>
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-10 rounded-xl bg-red-50 text-red-700 border border-red-200 px-6 py-4 text-center">
            {error}
          </div>
        )}

        {/* Categories Grid/List */}
        {filteredCategories.length === 0 ? (
          <div className="text-center py-24 bg-white/70 dark:bg-gray-900/50 rounded-3xl shadow-lg">
            <Filter className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <p className="text-2xl font-bold text-gray-700 dark:text-gray-200">
              কোনো ক্যাটেগরি পাওয়া যায়নি
            </p>
            <p className="text-gray-500 mt-2">
              আপনার সার্চ টার্ম পরিবর্তন করে দেখুন।
            </p>
          </div>
        ) : (
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                : "space-y-4"
            }
          >
            {filteredCategories.map((category, index) => (
              <motion.div
                key={category._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={`/products?category=${category.slug}`}>
                  <div
                    className={`bg-white/80 dark:bg-gray-900/90 backdrop-blur-xl rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/30 dark:border-gray-800 overflow-hidden group ${
                      viewMode === "list"
                        ? "flex items-center gap-6 p-6"
                        : "p-6 text-center"
                    }`}
                  >
                    {/* Category Icon/Image */}
                    <div
                      className={`${
                        viewMode === "list"
                          ? "w-16 h-16 flex-shrink-0"
                          : "w-20 h-20 mx-auto mb-4"
                      } bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                    >
                      {category.icon && iconMap[category.icon] ? (
                        (() => {
                          const Icon = iconMap[category.icon];
                          return <Icon size={32} className="text-purple-600" />;
                        })()
                      ) : (
                        <Sparkles size={32} className="text-purple-600" />
                      )}
                    </div>

                    {/* Category Info */}
                    <div className={viewMode === "list" ? "flex-1" : ""}>
                      <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-pink-500 transition-colors">
                        {category.nameBn || category.name}
                      </h3>
                      {category.productCount !== undefined && (
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {category.productCount} টি প্রোডাক্ট
                        </p>
                      )}
                    </div>

                    {/* Hover Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        {/* Stats Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-6 bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl rounded-2xl px-8 py-4 border border-white/30 dark:border-gray-800">
            <div className="text-center">
              <p className="text-2xl font-black text-purple-600">
                {categories.length}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                মোট ক্যাটেগরি
              </p>
            </div>
            <div className="w-px h-12 bg-gray-300 dark:bg-gray-700"></div>
            <div className="text-center">
              <p className="text-2xl font-black text-pink-600">
                {categories.reduce(
                  (sum, cat) => sum + (cat.productCount || 0),
                  0
                )}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                মোট প্রোডাক্ট
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
