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
        whileHover={{ scale: 1.05, y: -5 }}
        whileTap={{ scale: 0.95 }}
        className="bg-white rounded-lg shadow-md p-6 text-center cursor-pointer group"
      >
        <div className="flex justify-center mb-4">
          <div className="bg-gradient-to-br from-primary/10 to-secondary/10 p-4 rounded-full group-hover:from-primary/20 group-hover:to-secondary/20 transition-all">
            <Icon
              size={32}
              className="text-primary group-hover:text-primary-dark transition-colors"
            />
          </div>
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

