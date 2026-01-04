// app/products/page.tsx

"use client";

import { useEffect, useState, useCallback, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { productApi } from "@/lib/api";
import ProductCard from "@/components/ui/ProductCard";
import { Filter, X, Search, ChevronRight } from "lucide-react";

const quickFilters = [
  { id: "all", label: "সব" },
  { id: "flash", label: "ফ্ল্যাশ সেল" },
  { id: "new", label: "নতুন" },
  { id: "bestseller", label: "বেস্ট সেলার" },
];

function ProductListingPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState<number | "">("");
  const [maxPrice, setMaxPrice] = useState<number | "">("");
  const [inStock, setInStock] = useState<boolean | undefined>(undefined);
  const [activeQuick, setActiveQuick] = useState("all");
  const [showSidebar, setShowSidebar] = useState(false);

  // Init from URL
  useEffect(() => {
    setSearchTerm(searchParams.get("search") || "");
    setMinPrice(searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : "");
    setMaxPrice(searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : "");
    setInStock(searchParams.get("inStock") === "true" ? true : undefined);
    setPage(searchParams.get("page") ? Number(searchParams.get("page")) : 1);
  }, [searchParams]);

  // Update URL
  const updateURL = useCallback((newParams: Record<string, any>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(newParams).forEach(([key, value]) => {
      if (value === "" || value === undefined || value === null) {
        params.delete(key);
      } else {
        params.set(key, String(value));
      }
    });
    router.push(`/products?${params.toString()}`, { scroll: false });
  }, [searchParams, router]);

  // Fetch products
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params: any = {
        page,
        limit: 20,
      };
      if (searchTerm) params.search = searchTerm;
      if (minPrice) params.minPrice = minPrice;
      if (maxPrice) params.maxPrice = maxPrice;
      if (inStock !== undefined) params.inStock = inStock;
      if (activeQuick === "flash") params.isFlashSale = true;

      const res = await productApi.getAllWithMeta(params);
      setProducts(res.products || []);
      setTotalCount(res.pagination?.total || 0);
      setHasMore((res.pagination?.page || 1) < (res.pagination?.pages || 1));
    } catch (err) {
      setError("প্রোডাক্ট লোড করতে সমস্যা হয়েছে");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [page, searchTerm, minPrice, maxPrice, inStock, activeQuick]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleQuickFilter = (id: string) => {
    setActiveQuick(id);
    setPage(1);
  };

  const handleClear = () => {
    setSearchTerm("");
    setMinPrice("");
    setMaxPrice("");
    setInStock(undefined);
    setActiveQuick("all");
    updateURL({});
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-20 h-20 border-8 border-purple-200 rounded-full border-t-purple-600"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-gray-950 pt-20">
      <div className="max-w-7xl mx-auto px-4 pb-20">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
            সব প্রোডাক্ট
          </h1>
          <p className="text-lg text-gray-600 mt-3">{totalCount} টি পাওয়া গেছে</p>
        </div>

        {/* Quick Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {quickFilters.map((f) => (
            <button
              key={f.id}
              onClick={() => handleQuickFilter(f.id)}
              className={`px-6 py-3 rounded-full font-bold transition-all ${
                activeQuick === f.id
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                  : "bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className={`${showSidebar ? "fixed inset-0 z-50 bg-white dark:bg-gray-950" : "hidden lg:block"} lg:relative`}>
            <div className="lg:sticky lg:top-24 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl shadow-2xl p-6">
              <div className="flex items-center justify-between mb-6 lg:mb-8">
                <h3 className="text-2xl font-black flex items-center gap-3">
                  <Filter size={28} />
                  ফিল্টার
                </h3>
                <button onClick={() => setShowSidebar(false)} className="lg:hidden">
                  <X size={28} />
                </button>
              </div>

              {/* Search */}
              <div className="relative mb-6">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                <input
                  type="text"
                  placeholder="খুঁজুন..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onBlur={() => updateURL({ search: searchTerm })}
                  className="w-full pl-12 pr-4 py-4 bg-white dark:bg-gray-800 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-500/30"
                />
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="font-bold mb-4">মূল্য পরিসর</h4>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    placeholder="মিন"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value ? Number(e.target.value) : "")}
                    onBlur={() => updateURL({ minPrice: minPrice || undefined })}
                    className="w-full px-4 py-3 bg-white dark:bg-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/30"
                  />
                  <span className="text-gray-500">-</span>
                  <input
                    type="number"
                    placeholder="ম্যাক্স"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value ? Number(e.target.value) : "")}
                    onBlur={() => updateURL({ maxPrice: maxPrice || undefined })}
                    className="w-full px-4 py-3 bg-white dark:bg-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/30"
                  />
                </div>
              </div>

              {/* Stock */}
              <label className="flex items-center gap-3 cursor-pointer mb-8">
                <input
                  type="checkbox"
                  checked={inStock === true}
                  onChange={(e) => updateURL({ inStock: e.target.checked })}
                  className="w-6 h-6 rounded accent-purple-600"
                />
                <span className="font-medium text-lg">শুধু স্টকে থাকা</span>
              </label>

              {/* Clear */}
              <button
                onClick={handleClear}
                className="w-full py-4 bg-gradient-to-r from-red-500 to-pink-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all"
              >
                সব ক্লিয়ার করুন
              </button>
            </div>
          </aside>

          {/* Products */}
          <div className="lg:col-span-3">
            {error && (
              <div className="text-center py-12 bg-red-50 dark:bg-red-900/20 rounded-3xl mb-8">
                <p className="text-red-600 text-xl font-bold">{error}</p>
              </div>
            )}

            {products.length === 0 && !loading ? (
              <div className="text-center py-24 bg-white/70 dark:bg-gray-900/50 rounded-3xl">
                <p className="text-3xl font-black text-gray-700 dark:text-gray-200 mb-4">
                  কোনো প্রোডাক্ট পাওয়া যায়নি
                </p>
                <button onClick={handleClear} className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-2xl">
                  ফিল্টার ক্লিয়ার করুন
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((p, i) => (
                  <ProductCard key={p._id} product={p} index={i} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {hasMore && (
              <div className="flex justify-center mt-12">
                <button
                  onClick={() => {
                    setPage(page + 1);
                    updateURL({ page: page + 1 });
                  }}
                  className="px-10 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all"
                >
                  আরও লোড করুন
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Filter Toggle */}
        <button
          onClick={() => setShowSidebar(true)}
          className="fixed bottom-6 right-6 z-40 lg:hidden p-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full shadow-2xl"
        >
          <Filter size={28} />
        </button>
      </div>
    </div>
  );
}

export default function ProductListingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-20 h-20 border-8 border-purple-200 rounded-full border-t-purple-600"
        />
      </div>
    }>
      <ProductListingPageContent />
    </Suspense>
  );
}