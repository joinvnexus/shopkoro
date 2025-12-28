"use client";

import { motion } from "framer-motion";
import { TrendingUp, Flame, Zap } from "lucide-react";
import ProductCard from "@/components/ui/ProductCard";
import { Product } from "@/types";

interface TrendingProductsProps {
  products: Product[];
}

const TrendingProducts = ({ products }: TrendingProductsProps) => {
  const trendingProducts = products.filter((p) => p.isTrending).slice(0, 8);

  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-b from-orange-50/50 via-pink-50/30 to-white dark:from-gray-950 dark:via-orange-950/20 dark:to-gray-900">
      {/* Animated Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-br from-orange-400/30 via-pink-500/30 to-purple-600/30 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="container mx-auto px-4">
        {/* Epic Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          {/* Pulsing Badge */}
          <motion.div
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-500 to-pink-600 text-white px-8 py-4 py-4 rounded-full text-lg font-black shadow-2xl mb-6 relative overflow-hidden"
          >
            <motion.div animate={{ rotate: [0, 15, -15, 0] }} transition={{ duration: 2, repeat: Infinity }}>
              <Flame className="w-7 h-7" />
            </motion.div>
            <span className="tracking-wider">এখন সবচেয়ে হট!</span>
            <Zap className="w-6 h-6 animate-ping" />
            <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full" />
          </motion.div>

          <h2 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-orange-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
            ট্রেন্ডিং প্রোডাক্ট
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mt-4 font-medium">
            লক্ষাধিক ক্রেতা এখন এগুলো কিনছে — আপনিও মিস করবেন না!
          </p>
        </motion.div>

        {/* Products Grid */}
        {trendingProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {trendingProducts.map((product, index) => (
              <motion.div
                key={product._id || index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                {/* Trending Badge on Top */}
                <div className="relative">
                  <ProductCard product={product} index={index} />
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute -top-3 left-1/2 -translate-x-1/2 z-10"
                  >
                    <span className="bg-gradient-to-r from-orange-500 to-pink-600 text-white text-xs font-black px-4 py-1.5 rounded-full shadow-lg flex items-center gap-1">
                      <TrendingUp size={14} />
                      ট্রেন্ডিং
                    </span>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center py-20"
          >
            <Flame className="w-20 h-20 text-gray-300 mx-auto mb-6" />
            <p className="text-2xl text-gray-500">কোন ট্রেন্ডিং প্রোডাক্ট নেই এখন</p>
          </motion.div>
        )}

        {/* Premium CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center mt-16"
        >
          <motion.a
            href="/trending"
            whileHover={{ scale: 1.08, rotate: [0, -2, 2, 0] }}
            whileTap={{ scale: 0.95 }}
            className="group relative inline-flex items-center gap-4 bg-gradient-to-r from-orange-600 to-pink-600 text-white text-xl font-black px-12 py-6 rounded-2xl shadow-2xl overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-4">
              <Zap className="w-8 h-8 group-hover:animate-ping" />
              সব ট্রেন্ডিং প্রোডাক্ট দেখুন
              <TrendingUp className="w-8 h-8 group-hover:translate-x-3 transition-transform" />
            </span>
            {/* Shine Effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.8 }}
            />
          </motion.a>

          <p className="text-orange-600 dark:text-orange-400 font-bold text-lg mt-4 mt-6 animate-pulse">
            প্রতি ঘণ্টায় আপডেট হচ্ছে — এখনই দেখুন!
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default TrendingProducts;