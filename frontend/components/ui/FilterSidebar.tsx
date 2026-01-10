"use client";

import { Filter, X, Search } from "lucide-react";
import React from "react";

interface FilterSidebarProps {
  searchTerm: string;
  setSearchTerm: (s: string) => void;
  selectedCategory: string;
  setSelectedCategory: (c: string) => void;
  minPrice: number | "";
  setMinPrice: (n: number | "") => void;
  maxPrice: number | "";
  setMaxPrice: (n: number | "") => void;
  inStock: boolean | undefined;
  setInStock: (b: boolean | undefined) => void;
  categories: any[];
  onClear: () => void;
  onClose?: () => void;
  updateURL: (newParams: Record<string, any>) => void;
}

export default function FilterSidebar({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  inStock,
  setInStock,
  categories,
  onClear,
  onClose,
  updateURL,
}: FilterSidebarProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-2xl font-black flex items-center gap-3">
          <Filter size={28} />
          ফিল্টার
        </h3>
        {onClose && (
          <button onClick={onClose} className="lg:hidden">
            <X size={28} />
          </button>
        )}
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={22} />
        <input
          type="text"
          placeholder="খুঁজুন..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && updateURL({ search: searchTerm })}
          className="w-full pl-12 pr-4 py-4 bg-white dark:bg-gray-800 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-500/30 transition"
        />
      </div>

      {/* Category */}
      <div className="mb-6">
        <h4 className="font-bold mb-4">ক্যাটেগরি</h4>
        <div className="space-y-2">
          <button
            key="all-categories"
            onClick={() => {
              setSelectedCategory("");
              updateURL({ category: "" });
            }}
            className={`w-full text-left px-4 py-3 rounded-xl transition-all ${
              selectedCategory === "" ? "bg-purple-100 dark:bg-purple-900/30 font-bold" : "hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            সব ক্যাটেগরি
          </button>
          {categories.map((cat) => (
            <button
              key={cat._id}
              onClick={() => {
                setSelectedCategory(cat.slug);
                updateURL({ category: cat.slug });
              }}
              className={`w-full text-left px-4 py-3 rounded-xl transition-all ${
                selectedCategory === cat.slug ? "bg-purple-100 dark:bg-purple-900/30 font-bold" : "hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              {cat.nameBn || cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <h4 className="font-bold mb-4">মূল্য পরিসর</h4>
        <div className="flex items-center gap-3">
          <input
            type="number"
            placeholder="মিন"
            value={minPrice as any}
            onChange={(e) => setMinPrice(e.target.value ? Number(e.target.value) : "")}
            onBlur={() => updateURL({ minPrice: minPrice || undefined })}
            className="w-full px-4 py-3 bg-white dark:bg-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/30"
          />
          <span className="text-gray-500">-</span>
          <input
            type="number"
            placeholder="ম্যাক্স"
            value={maxPrice as any}
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
          onChange={(e) => {
            setInStock(e.target.checked ? true : undefined);
            updateURL({ inStock: e.target.checked });
          }}
          className="w-6 h-6 rounded accent-purple-600"
        />
        <span className="font-medium text-lg">শুধু স্টকে থাকা</span>
      </label>

      {/* Clear */}
      <button
        onClick={onClear}
        className="w-full py-4 bg-gradient-to-r from-red-500 to-pink-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all"
      >
        সব ক্লিয়ার করুন
      </button>
    </div>
  );
}
