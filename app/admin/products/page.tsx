"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Filter,
  Grid,
  List,
  Eye,
  Star,
  Package,
} from "lucide-react";
import { productApi } from "@/lib/api";
import { Product } from "@/types";

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // productApi.getAll() already returns Product[]
        const data = await productApi.getAll();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter(
    (product) =>
      product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-8 border-purple-200 dark:border-purple-800 border-t-purple-600 dark:border-t-pink-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
            পণ্য সমূহ
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            আপনার স্টোরের সমস্ত পণ্য পরিচালনা করুন
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors">
          <Plus size={18} />
          <span>নতুন পণ্য</span>
        </button>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="পণ্য অনুসন্ধান করুন..."
            className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <button className="p-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg">
            <Filter size={20} />
          </button>

          <div className="flex border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 ${
                viewMode === "grid"
                  ? "bg-purple-100 dark:bg-purple-900/30 text-purple-600"
                  : "bg-white dark:bg-gray-800 text-gray-600"
              }`}
            >
              <Grid size={20} />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 ${
                viewMode === "list"
                  ? "bg-purple-100 dark:bg-purple-900/30 text-purple-600"
                  : "bg-white dark:bg-gray-800 text-gray-600"
              }`}
            >
              <List size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Products Grid/List */}
      {filteredProducts.length > 0 ? (
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              : "space-y-4"
          }
        >
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product._id ?? index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className={`bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 ${
                viewMode === "list" ? "flex" : ""
              }`}
            >
              {/* Image */}
              <div
                className={`${
                  viewMode === "list" ? "w-32" : "w-full"
                } h-48 bg-gray-200 dark:bg-gray-700`}
              >
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    ছবি নেই
                  </div>
                )}
              </div>

              {/* Details */}
              <div className="p-4 flex-1">
                <div className="flex justify-between mb-2">
                  <h3 className="font-bold">{product.name}</h3>
                  <span>৳{product.price}</span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <Star className="text-yellow-400 fill-current" size={16} />
                  {(product.rating ?? 0).toFixed(1)}
                  <span>({product.reviews ?? 0})</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Package className="mx-auto mb-4" size={32} />
          <p>কোনো পণ্য পাওয়া যায়নি</p>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
