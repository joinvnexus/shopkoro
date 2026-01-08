//app/components/sections/CategoryGrid.tsx
"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
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
} from "lucide-react";
import CategoryCard from "@/components/ui/CategoryCard";
import { Category } from "@/types";
import { categoryApi } from "@/lib/api";
import Link from "next/link";

const iconMap: Record<string, any> = {
  smartphone: Smartphone,
  laptop: Laptop,
  shirt: Shirt,
  watch: Watch,
  heart: Heart,
  home: Home,
  camera: Camera,
  gamepad: Gamepad2,
  headphones: Headphones,
  "shopping-bag": ShoppingBag,
  baby: Baby,
  dumbbell: Dumbbell,
};

const CategoryGrid = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fetchedCategories = await categoryApi.getAll();
        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        // Fallback to empty array
        setCategories([]);
      }
    };

    fetchCategories();
  }, []);

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50/50 to-white dark:from-gray-950 dark:to-gray-900">
      <div className="container mx-auto px-4">
        {/* Epic Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 text-white px-8 py-4 rounded-full text-lg font-black shadow-2xl mb-6"
          >
            <Sparkles className="w-6 h-6" />
            <span>এক্সপ্লোর করুন আমাদের ক্যাটেগরি</span>
            <Sparkles className="w-6 h-6" />
          </motion.div>

          <h2 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
            সবকিছু এক জায়গায়
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mt-4">
            {categories.length > 0 ? `${categories.length}+ ক্যাটেগরি • লক্ষাধিক প্রোডাক্ট` : "ক্যাটেগরি লোড হচ্ছে..."}
          </p>
        </motion.div>

        {/* Ultra Premium Grid */}
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 max-w-7xl mx-auto">
          {categories.map((category, index) => {
            const IconComponent = iconMap[category.icon] || ShoppingBag;
            return (
              <CategoryCard
                key={category.slug}
                category={category}
                icon={IconComponent}
                index={index}
              />
            );
          })}
        </div>

        {/* Optional CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16"
        >
          <p className="text-lg text-gray-600 dark:text-gray-400">
            আরও ক্যাটেগরি দেখতে চান?{" "}
            <Link
              href="/categories"
              className="text-primary font-bold hover:underline"
            >
              সব দেখুন →
            </Link>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CategoryGrid;