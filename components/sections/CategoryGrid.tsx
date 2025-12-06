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
} from "lucide-react";
import CategoryCard from "@/components/ui/CategoryCard";
import { Category } from "@/types";

const categories: Category[] = [
  { name: "Smartphones", nameBn: "স্মার্টফোন", slug: "smartphones", icon: "smartphone" },
  { name: "Laptops", nameBn: "ল্যাপটপ", slug: "laptops", icon: "laptop" },
  { name: "Fashion", nameBn: "ফ্যাশন", slug: "fashion", icon: "shirt" },
  { name: "Watches", nameBn: "ঘড়ি", slug: "watches", icon: "watch" },
  { name: "Beauty", nameBn: "বিউটি", slug: "beauty", icon: "heart" },
  { name: "Home", nameBn: "হোম", slug: "home", icon: "home" },
  { name: "Camera", nameBn: "ক্যামেরা", slug: "camera", icon: "camera" },
  { name: "Gaming", nameBn: "গেমিং", slug: "gaming", icon: "gamepad" },
  { name: "Audio", nameBn: "অডিও", slug: "audio", icon: "headphones" },
  { name: "Accessories", nameBn: "অ্যাকসেসরিজ", slug: "accessories", icon: "shopping-bag" },
  { name: "Baby", nameBn: "বেবি", slug: "baby", icon: "baby" },
  { name: "Sports", nameBn: "স্পোর্টস", slug: "sports", icon: "dumbbell" },
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
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
            আমাদের ক্যাটেগরি
          </h2>
          <p className="text-gray-dark max-w-2xl mx-auto">
            আপনার প্রয়োজন অনুযায়ী ক্যাটেগরি বেছে নিন
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
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
      </div>
    </section>
  );
};

export default CategoryGrid;

