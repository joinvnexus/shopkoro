"use client";

// app/products/page.tsx

export const dynamic = 'force-dynamic';

import { useEffect, useState, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { productApi, categoryApi } from "@/lib/api";
import ProductCard from "@/components/ui/ProductCard";
import ViewToggle from "@/components/ui/ViewToggle";
import { Filter, X, Search, ChevronLeft, ChevronRight } from "lucide-react";
import FilterSidebar from "@/components/ui/FilterSidebar";
import ProductSkeleton from "@/components/ui/ProductSkeleton";

function ProductListingPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);

  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState<number | "">("");
  const [maxPrice, setMaxPrice] = useState<number | "">("");
  const [inStock, setInStock] = useState<boolean | undefined>(undefined);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCategoryName, setSelectedCategoryName] = useState("");
  const [showSidebar, setShowSidebar] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Initialize from URL
  useEffect(() => {
    const params = Object.fromEntries(searchParams.entries());
    setSearchTerm(params.search || "");
    setMinPrice(params.minPrice ? Number(params.minPrice) : "");
    setMaxPrice(params.maxPrice ? Number(params.maxPrice) : "");
    setInStock(params.inStock === "true" ? true : params.inStock === "false" ? false : undefined);
    setSelectedCategory(params.category || "");
    setPage(params.page ? Number(params.page) : 1);
  }, [searchParams]);

  // Update selected category name
  useEffect(() => {
    if (selectedCategory && categories.length > 0) {
      const cat = categories.find(c => c.slug === selectedCategory);
      setSelectedCategoryName(cat ? (cat.nameBn || cat.name) : "");
    } else {
      setSelectedCategoryName("");
    }
  }, [selectedCategory, categories]);

  // Update URL
  const updateURL = useCallback((newParams: Record<string, any>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(newParams).forEach(([key, value]) => {
      // Preserve category parameter even if it's empty string
      if (key === "category") {
        params.set(key, String(value));
        return;
      }
      
      if (value === "" || value === undefined || value === null || value === false) {
        params.delete(key);
      } else {
        params.set(key, String(value));
      }
    });
    if (!newParams.page) params.set("page", "1");
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
      if (selectedCategory) params.category = selectedCategory;

      const res = await productApi.getAllWithMeta(params);
      setProducts(res.products || []);
      setTotalCount(res.pagination?.total || 0);
      setTotalPages(res.pagination?.pages || 1);
    } catch (err) {
      setError("প্রোডাক্ট লোড করতে সমস্যা হয়েছে");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [page, searchTerm, minPrice, maxPrice, inStock, selectedCategory]);

  // Load categories
  useEffect(() => {
    const load = async () => {
      try {
        const data = await categoryApi.getAll();
        setCategories(data || []);
      } catch (err) {
        console.error(err);
      }
    };
    load();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleClear = () => {
    setSearchTerm("");
    setMinPrice("");
    setMaxPrice("");
    setInStock(undefined);
    setSelectedCategory("");
    setPage(1);
    
    // Create a clean URL with only category if it exists
    const params = new URLSearchParams();
    if (selectedCategory) {
      params.set("category", selectedCategory);
    }
    router.push(`/products${params.toString() ? `?${params.toString()}` : ""}`, { scroll: false });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-gray-950 pt-20">
      <div className="max-w-7xl mx-auto px-4 pb-20">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
            {selectedCategoryName || "সব প্রোডাক্ট"}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mt-3">
            {totalCount} টি পাওয়া গেছে
          </p>
          <div className="flex justify-center mt-6">
            <ViewToggle viewMode={viewMode} setViewMode={setViewMode} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className={`${showSidebar ? "fixed inset-0 z-50 bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl" : "hidden lg:block"} lg:relative lg:col-span-1`}>
            <div className="lg:sticky lg:top-24 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl shadow-2xl p-6 h-full">
              <FilterSidebar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                minPrice={minPrice}
                setMinPrice={setMinPrice}
                maxPrice={maxPrice}
                setMaxPrice={setMaxPrice}
                inStock={inStock}
                setInStock={setInStock}
                categories={categories}
                onClear={handleClear}
                onClose={() => setShowSidebar(false)}
                updateURL={updateURL}
              />
            </div> 
          </aside>

          {/* Products */}
          <div className="lg:col-span-3">
            {error && (
              <div className="text-center py-12 bg-red-50 dark:bg-red-900/20 rounded-3xl mb-8">
                <p className="text-red-600 dark:text-red-400 text-xl font-bold">{error}</p>
              </div>
            )}

            {loading ? (
              <div className={viewMode === "grid" ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" : "space-y-4"}>
                {Array.from({ length: 8 }).map((_, i) => (
                  <ProductSkeleton key={i} viewMode={viewMode} />
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-24 bg-white/70 dark:bg-gray-900/50 rounded-3xl shadow-lg">
                <p className="text-3xl font-black text-gray-700 dark:text-gray-200 mb-4">
                  কোনো প্রোডাক্ট পাওয়া যায়নি
                </p>
                <button onClick={handleClear} className="px-10 py-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition">
                  ফিল্টার ক্লিয়ার করুন
                </button>
              </div>
            ) : (
              <div className={viewMode === "grid" ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" : "space-y-4"}>
                {products.map((p, i) => (
                  <ProductCard key={p._id} product={p} index={i} viewMode={viewMode} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-3 mt-16">
                <button
                  onClick={() => updateURL({ page: Math.max(1, page - 1) })}
                  disabled={page === 1}
                  className="p-3 bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-lg disabled:opacity-50 transition"
                >
                  <ChevronLeft size={24} />
                </button>

                <div className="flex gap-2">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const pageNum = i + 1;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => updateURL({ page: pageNum })}
                        className={`px-5 py-3 rounded-2xl font-bold transition-all ${
                          pageNum === page
                            ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                            : "bg-white/80 dark:bg-gray-800/80 hover:bg-purple-100 dark:hover:bg-purple-900/30"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  {totalPages > 5 && (
                    <span className="px-4 py-3 text-gray-600">...</span>
                  )}
                </div>

                <button
                  onClick={() => updateURL({ page: Math.min(totalPages, page + 1) })}
                  disabled={page === totalPages}
                  className="p-3 bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-lg disabled:opacity-50 transition"
                >
                  <ChevronRight size={24} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Filter Toggle */}
        <button
          onClick={() => setShowSidebar(true)}
          className="fixed bottom-8 right-6 z-40 lg:hidden p-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full shadow-2xl hover:shadow-purple-600/50 transition-all"
        >
          <Filter size={28} />
        </button>
      </div>
    </div>
  );
}

import { Suspense } from 'react';

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-gray-950 flex items-center justify-center"><div className="text-2xl font-bold">লোড হচ্ছে...</div></div>}>
      <ProductListingPage />
    </Suspense>
  );
}