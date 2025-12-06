"use client";

import { motion } from "framer-motion";
import { Zap, Timer, Flame, ArrowRight } from "lucide-react";
import ProductCard from "@/components/ui/ProductCard";
import { Product } from "@/types";
import Link from "next/link";

interface FlashSaleProps {
  products: Product[];
}

const FlashSale = ({ products }: FlashSaleProps) => {
  const flashSaleProducts = products
    .filter((p) => p.isFlashSale)
    .slice(0, 8);

  // Countdown for live countdown
  const saleEndTime = new Date();
  saleEndTime.setHours(saleEndTime.getHours() + 5);
  saleEndTime.setMinutes(saleEndTime.getMinutes() + 30);

  const formatTime = (date: Date) => {
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-b from-red-50 via-orange-50 to-pink-50 dark:from-gray-950 dark:via-red-950/30 dark:to-pink-950/20">
      {/* Animated Fire Background */}
      <div className="absolute inset-0 -z-10 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-red-600/40 via-orange-500/40 to-pink-600/40 blur-3xl animate-pulse" />
      </div>

      <div className="container mx-auto px-4">
        {/* Epic Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          {/* Pulsing Badge */}
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-red-600 to-orange-600 text-white px-8 py-4 rounded-full text-lg font-black shadow-2xl mb-6 relative overflow-hidden"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Flame className="w-8 h-8" />
            </motion.div>
            <span className="tracking-wider">মেগা ফ্ল্যাশ সেল চলছে!</span>
            <motion.div
              animate={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Flame className="w-8 h-8" />
            </motion.div>

            {/* Glowing Ring */}
            <motion.div
              animate={{ scale: [1, 1.4, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 rounded-full border-4 border-white/40"
            />
          </motion.div>

          <h2 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-red-600 via-orange-600 to-pink-600 bg-clip-text text-transparent mb-4">
            আজকের সবচেয়ে গরম ডিল!
          </h2>

          {/* Live Countdown */}
          <div className="flex items-center justify-center gap-6 mt-8">
            <div className="flex items-center gap-3 bg-black/80 text-white px-6 py-4 rounded- rounded-2xl shadow-2xl">
              <Timer className="w-7 h-7 text-red-500 animate-pulse" />
              <span className="text-2xl font-bold">শেষ হবে: {formatTime(saleEndTime)} এ</span>
            </div>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-3xl font-black text-red-600"
            >
              হারিয়ে যাবে!
            </motion.div>
          </div>
        </motion.div>

        {/* Products Grid – With Stagger Animation */}
        {flashSaleProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {flashSaleProducts.map((product, index) => (
              <motion.div
                key={product._id || index}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <ProductCard product={product} index={index} />
                {/* Fire Badge on Top Right */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute top-2 right-2 z-10"
                >
                  <div className="bg-gradient-to-br from-red-600 to-orange-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
                    <Flame className="w-4 h-4" />
                    <span>-{product.discount}%</span>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center py-20"
          >
            <Flame className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <p className="text-2xl text-gray-500">কোন ফ্ল্যাশ সেল চলছে না এখন</p>
          </motion.div>
        )}

        {/* CTA Button – Super Urgent */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center mt-16"
        >
          <Link href="/flash-sale">
            <motion.button
              whileHover={{ scale: 1.1, rotate: [0, -2, 2, 0] }}
              whileTap={{ scale: 0.95 }}
              className="group relative inline-flex items-center gap-4 bg-gradient-to-r from-red-600 to-orange-600 text-white text-xl font-black px-12 py-6 rounded-2xl shadow-2xl overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-4">
                <Zap className="w-8 h-8 group-hover:animate-ping" />
                সব ফ্ল্যাশ সেল দেখুন
                <ArrowRight className="w-8 h-8 group-hover:translate-x-3 transition-transform" />
              </span>

              {/* Shine Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.8 }}
              />
            </motion.button>
          </Link>

          <p className="text-red-600 font-bold text-lg mt-6 animate-pulse">
            মাত্র ৫ ঘণ্টা ৩০ মিনিট বাকি — দেরি করবেন না!
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default FlashSale;