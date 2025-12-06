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

const CategoryCard = ({ category, icon: Icon, index = 0 }: CategoryCardProps) => {
  return (
    <Link href={`/category/${category.slug}`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.05 }}
        whileHover={{ scale: 1.08, y: -8 }}
        whileTap={{ scale: 0.95 }}
        className="bg-white rounded-xl shadow-md hover:shadow-2xl p-6 text-center cursor-pointer group border border-gray-light hover:border-primary/30 transition-all duration-300"
      >
        <div className="flex justify-center mb-4">
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 p-4 rounded-full group-hover:from-primary/30 group-hover:via-secondary/30 group-hover:to-accent/30 transition-all duration-300 shadow-lg group-hover:shadow-xl"
          >
            <Icon
              size={32}
              className="text-primary group-hover:text-primary-dark transition-all duration-300"
            />
          </motion.div>
        </div>
        <h3 className="font-semibold text-dark mb-1 group-hover:text-primary transition-colors">
          {category.nameBn || category.name}
        </h3>
        {category.productCount !== undefined && (
          <p className="text-xs text-gray-dark">
            {category.productCount} প্রোডাক্ট
          </p>
        )}
      </motion.div>
    </Link>
  );
};

export default CategoryCard;

