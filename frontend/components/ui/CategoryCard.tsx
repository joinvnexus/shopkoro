//app/components/ui/CategoryCard.tsx
"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { Category } from "@/types";

interface CategoryCardProps {
  category: Category;
  icon: LucideIcon;
  index?: number;
}

const CategoryCard = ({
  category,
  icon: Icon,
  index = 0,
}: CategoryCardProps) => {
  return (
    <Link href={`/products?category=${category.slug}`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.06, duration: 0.6, ease: "easeOut" }}
        whileHover={{ y: -12, scale: 1.06 }}
        whileTap={{ scale: 0.98 }}
        className="group relative bg-white dark:bg-gray-900 rounded-3xl p-8 text-center cursor-pointer overflow-hidden shadow-lg hover:shadow-2xl border border-gray-100 dark:border-gray-800 transition-all duration-500"
      >
        {/* Glassy Background Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Icon Container */}
        <motion.div
          whileHover={{ rotate: 360, scale: 1.15 }}
          transition={{ duration: 0.7 }}
          className="relative z-10 mb-6 mx-auto w-20 h-20 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 rounded-2xl flex items-center justify-center shadow-xl group-hover:shadow-2xl group-hover:from-primary/30 group-hover:via-secondary/30 group-hover:to-accent/30 transition-all duration-500 backdrop-blur-sm border border-white/30"
        >
          <Icon
            size={40}
            className="text-primary group-hover:text-primary-dark dark:text-primary-light transition-colors duration-300"
          />
          {/* Subtle Shine */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/30 to-transparent opacity-0 group-hover:opacity-40 transition-opacity duration-700" />
        </motion.div>

        {/* Category Name */}
        <h3 className="font-bold text-xl text-gray-800 dark:text-white group-hover:text-primary dark:group-hover:text-primary-light transition-colors duration-300">
          {category.nameBn || category.name}
        </h3>

        {/* Product Count */}
        {category.productCount !== undefined && (
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-2 group-hover:text-primary/80 transition-colors">
            {category.productCount.toLocaleString("bn-BD")} টি প্রোডাক্ট
          </p>
        )}

        {/* Hover Border Glow Effect */}
        <div className="absolute inset-0 rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 blur-xl" />
        </div>
      </motion.div>
    </Link>
  );
};

export default CategoryCard;
