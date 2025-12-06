"use client";

import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import ProductCard from "@/components/ui/ProductCard";
import { Product } from "@/types";

interface FlashSaleProps {
  products: Product[];
}

const FlashSale = ({ products }: FlashSaleProps) => {
  const flashSaleProducts = products.filter((p) => p.isFlashSale).slice(0, 8);

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-light">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center space-x-2 bg-accent/20 px-4 py-2 rounded-full mb-4">
            <Zap className="text-accent" size={20} />
            <span className="font-bold text-dark">ফ্ল্যাশ সেল</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
            আজকের বিশেষ অফার
          </h2>
          <p className="text-gray-dark max-w-2xl mx-auto">
            সীমিত সময়ের জন্য বিশেষ ডিসকাউন্ট। দেরি করবেন না!
          </p>
        </motion.div>

        {/* Products Grid */}
        {flashSaleProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {flashSaleProducts.map((product, index) => (
              <ProductCard key={product._id || index} product={product} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-dark">কোন ফ্ল্যাশ সেল প্রোডাক্ট নেই</p>
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
            href="/flash-sale"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors"
          >
            সব ফ্ল্যাশ সেল দেখুন
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default FlashSale;

