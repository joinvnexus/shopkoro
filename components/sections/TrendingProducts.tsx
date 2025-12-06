"use client";

import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";
import ProductCard from "@/components/ui/ProductCard";
import { Product } from "@/types";

interface TrendingProductsProps {
  products: Product[];
}

const TrendingProducts = ({ products }: TrendingProductsProps) => {
  const trendingProducts = products.filter((p) => p.isTrending).slice(0, 8);

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
          <div className="inline-flex items-center space-x-2 bg-secondary/20 px-4 py-2 rounded-full mb-4">
            <TrendingUp className="text-secondary" size={20} />
            <span className="font-bold text-dark">ট্রেন্ডিং</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
            এখন ট্রেন্ডিং
          </h2>
          <p className="text-gray-dark max-w-2xl mx-auto">
            এখন সবাই যা কিনছে
          </p>
        </motion.div>

        {/* Products Grid */}
        {trendingProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {trendingProducts.map((product, index) => (
              <ProductCard key={product._id || index} product={product} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-dark">কোন ট্রেন্ডিং প্রোডাক্ট নেই</p>
          </div>
        )}

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <motion.a
            href="/trending"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block bg-secondary text-white px-8 py-3 rounded-lg font-semibold hover:bg-secondary-dark transition-colors"
          >
            সব ট্রেন্ডিং প্রোডাক্ট দেখুন
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default TrendingProducts;

