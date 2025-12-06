"use client";

import { motion } from "framer-motion";
import { ShoppingBag, ArrowRight } from "lucide-react";
import CountdownTimer from "@/components/ui/CountdownTimer";
import Link from "next/link";

const Hero = () => {
  // Flash sale ends in 24 hours
  const flashSaleEndDate = new Date();
  flashSaleEndDate.setHours(flashSaleEndDate.getHours() + 24);

  return (
    <section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center md:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block mb-4"
            >
              <span className="bg-primary text-white px-4 py-2 rounded-full text-sm font-bold flex items-center space-x-2 w-fit mx-auto md:mx-0">
                <ShoppingBag size={16} />
                <span>ফ্ল্যাশ সেল চলছে!</span>
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-dark mb-6 leading-tight"
            >
              বাংলাদেশের{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                সবচেয়ে বড়
              </span>{" "}
              অনলাইন শপিং
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-gray-dark mb-8 max-w-xl"
            >
              ইলেকট্রনিক্স, ফ্যাশন, বিউটি - সবকিছু এক জায়গায়। ফ্রি ডেলিভারি,
              ক্যাশ অন ডেলিভারি, এবং ৭ দিন রিটার্ন গ্যারান্টি সহ।
            </motion.p>

            {/* Countdown Timer */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mb-8"
            >
              <p className="text-sm font-semibold text-dark mb-3">
                ফ্ল্যাশ সেল শেষ হবে:
              </p>
              <CountdownTimer targetDate={flashSaleEndDate} />
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
            >
              <Link href="/products">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-primary text-white px-8 py-4 rounded-lg font-bold text-lg flex items-center space-x-2 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <span>শপিং শুরু করুন</span>
                  <ArrowRight size={20} />
                </motion.button>
              </Link>
              <Link href="/flash-sale">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-primary border-2 border-primary px-8 py-4 rounded-lg font-bold text-lg hover:bg-primary hover:text-white transition-colors"
                >
                  ফ্ল্যাশ সেল দেখুন
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Image/Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative w-full h-[400px] md:h-[500px]">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl transform rotate-6"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-accent/20 rounded-3xl transform -rotate-6"></div>
              <motion.div
                animate={{
                  y: [0, -20, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 bg-white rounded-3xl shadow-2xl flex items-center justify-center"
              >
                <div className="text-center p-8">
                  <ShoppingBag size={120} className="text-primary mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-dark mb-2">
                    ShopKoro
                  </h3>
                  <p className="text-gray-dark">
                    আপনার বিশ্বস্ত শপিং পার্টনার
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

