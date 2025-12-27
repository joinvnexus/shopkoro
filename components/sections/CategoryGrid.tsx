"use client";

import { motion } from "framer-motion";
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
import Link from "next/link";

const categories: Category[] = [
  { name: "Smartphones", nameBn: "স্মার্টফোন", slug: "smartphones", icon: "smartphone", productCount: 1240 },
  { name: "Laptops", nameBn: "ল্যাপটপ", slug: "laptops", icon: "laptop", productCount: 890 },
  { name: "Fashion", nameBn: "ফ্যাশন", slug: "fashion", icon: "shirt", productCount: 5420 },
  { name: "Watches", nameBn: "ঘড়ি", slug: "watches", icon: "watch", productCount: 680 },
  { name: "Beauty", nameBn: "বিউটি", slug: "beauty", icon: "heart", productCount: 3210 },
  { name: "Home", nameBn: "হোম", slug: "home", icon: "home", productCount: 1890 },
  { name: "Camera", nameBn: "ক্যামেরা", slug: "camera", icon: "camera", productCount: 420 },
  { name: "Gaming", nameBn: "গেমিং", slug: "gaming", icon: "gamepad", productCount: 980 },
  { name: "Audio", nameBn: "অডিও", slug: "audio", icon: "headphones", productCount: 1560 },
  { name: "Accessories", nameBn: "অ্যাকসেসরিজ", slug: "accessories", icon: "shopping-bag", productCount: 2890 },
  { name: "Baby", nameBn: "বেবি", slug: "baby", icon: "baby", productCount: 1120 },
  { name: "Sports", nameBn: "স্পোর্টস", slug: "sports", icon: "dumbbell", productCount: 920 },
];

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
            ১২+ ক্যাটেগরি • লক্ষাধিক প্রোডাক্ট
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