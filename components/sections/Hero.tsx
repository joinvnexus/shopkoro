"use client";

import { motion } from "framer-motion";
import { ShoppingBag, Zap, ArrowRight, Sparkles } from "lucide-react";
import CountdownTimer from "@/components/ui/CountdownTimer";
import Link from "next/link";

const Hero = () => {
  const flashSaleEndDate = new Date();
  flashSaleEndDate.setHours(flashSaleEndDate.getHours() + 23);
  flashSaleEndDate.setMinutes(flashSaleEndDate.getMinutes() + 59);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-gray-950 dark:via-purple-950/40 dark:to-pink-950/30">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-purple-400/30 to-pink-400/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -150, 0],
            y: [0, 100, 0],
            scale: [1, 1.4, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-orange-400/40 to-pink-500/40 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 py-24 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            {/* Flash Sale Badge with Pulse */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-red-500 to-pink-600 text-white px-6 py-3 rounded-full text-sm font-bold shadow-2xl mb-8 relative overflow-hidden group"
            >
              <motion.div
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 bg-white/20"
              />
              <Zap className="w-5 h-5" />
              <span>ফ্ল্যাশ সেল চলছে – ৮০% পর্যন্ত ছাড়!</span>
              <Sparkles className="w-5 h-5" />
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight"
            >
              বাংলাদেশের{" "}
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent animate-gradient">
                সবচেয়ে বড়
              </span>
              <br />
              <span className="text-gray-800 dark:text-white">অনলাইন শপ</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-gray-600 dark:text-gray-300 mt-6 mb-10 max-w-2xl mx-auto lg:mx-0"
            >
              লাখো প্রোডাক্ট, ফ্রি ডেলিভারি, ক্যাশ অন ডেলিভারি, ৭ দিনের রিটার্ন —
              সবকিছু এক জায়গায়!
            </motion.p>

            {/* Countdown Timer – Premium Style */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mb-10"
            >
              <p className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
                ফ্ল্যাশ সেল শেষ হবে:
              </p>
              <CountdownTimer targetDate={flashSaleEndDate} />
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start"
            >
              <Link href="/products">
                <motion.button
                  whileHover={{ scale: 1.05, y: -4 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative px-10 py-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-xl rounded-2xl shadow-2xl overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    শপিং শুরু করুন
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.4 }}
                  />
                </motion.button>
              </Link>

              <Link href="/flash-sale">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-5 border-4 border-purple-600 text-purple-600 dark:text-purple-400 font-bold text-xl rounded-2xl hover:bg-purple-600 hover:text-white transition-all duration-300 shadow-xl"
                >
                  ফ্ল্যাশ সেল দেখুন
                </motion.button>
              </Link>
            </motion.div>
          </div>

          {/* Right Side – Floating 3D Cards */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative h-[500px] lg:h-[600px]"
          >
            {/* Card 1 */}
            <motion.div
              animate={{ y: [0, -30, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-10 left-10 w-64 h-80 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl shadow-2xl rotate-12 overflow-hidden"
            >
              <div className="p-8 text-white">
                <ShoppingBag className="w-16 h-16 mb-4" />
                <h3 className="text-3xl font-bold">৳৯৯৯</h3>
                <p className="text-sm opacity-90">T-Shirt</p>
              </div>
            </motion.div>

            {/* Card 2 */}
            <motion.div
              animate={{ y: [0, -40, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute top-32 right-0 w-72 h-96 bg-gradient-to-br from-orange-500 to-pink-600 rounded-3xl shadow-2xl -rotate-6 overflow-hidden"
            >
              <div className="p-10 text-white">
                <div className="bg-white/20 backdrop-blur-md rounded-2xl w-32 h-32 mx-auto mb-6" />
                <h3 className="text-4xl font-bold">৳৪,৯৯৯</h3>
                <p className="text-lg">Wireless Earbuds</p>
              </div>
            </motion.div>

            {/* Card 3 */}
            <motion.div
              animate={{ y: [0, -25, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-10 left-20 w-60 h-72 bg-white dark:bg-gray-900 rounded-3xl shadow-2xl rotate-3 border border-purple-200 dark:border-purple-800"
            >
              <div className="p-6 text-center">
                <Sparkles className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                <h4 className="text-2xl font-bold text-gray-800 dark:text-white">১০০% অরিজিনাল</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">গ্যারান্টি সহ</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Add this in your globals.css for gradient animation */}
      <style jsx global>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 6s ease infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;