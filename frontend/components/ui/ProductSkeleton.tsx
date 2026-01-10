"use client";

import React from "react";

interface ProductSkeletonProps {
  viewMode?: "grid" | "list";
}

export default function ProductSkeleton({ viewMode = "grid" }: ProductSkeletonProps) {
  if (viewMode === "list") {
    return (
      <div className="flex items-center gap-6 p-6 bg-white dark:bg-gray-900 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-800">
        <div className="w-32 h-32 bg-gray-200 dark:bg-gray-800 rounded-xl animate-pulse flex-shrink-0" />
        <div className="flex-1 space-y-3">
          <div className="h-5 bg-gray-200 dark:bg-gray-800 rounded-lg w-3/4 animate-pulse" />
          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded-lg w-1/2 animate-pulse" />
          <div className="flex items-center gap-3 mt-2">
            <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded-lg w-20 animate-pulse" />
            <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded-lg w-12 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  // Grid view skeleton
  return (
    <div className="bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-800 p-4">
      <div className="aspect-square bg-gray-200 dark:bg-gray-800 rounded-xl animate-pulse overflow-hidden" />
      <div className="mt-4 space-y-2">
        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded-lg w-3/4 animate-pulse" />
        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded-lg w-1/2 animate-pulse" />
        <div className="mt-3 flex items-center gap-3">
          <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded-lg w-full animate-pulse" />
        </div>
      </div>
    </div>
  );
}
