"use client";

import { motion } from "framer-motion";
import {
  Truck,
  CreditCard,
  RotateCcw,
  HeadphonesIcon,
  Sparkles,
} from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "ফ্রি ডেলিভারি",
    description: "৫০০+ টাকার অর্ডারে সম্পূর্ণ ফ্রি ডেলিভারি",
    color: "from-emerald-500 to-teal-600",
  },
  {
    icon: CreditCard,
    title: "ক্যাশ অন ডেলিভারি",
    description: "সব জায়গায় ক্যাশ অন ডেলিভারি সুবিধা",
    color: "from-blue-500 to-cyan-600",
  },
  {
    icon: RotateCcw,
    title: "৭ দিন রিটার্ন",
    description: "যেকোনো সমস্যায় ৭ দিনের মধ্যে রিটার্ন",
    color: "from-purple-500 to-pink-600",
  },
  {
    icon: HeadphonesIcon,
    title: "২৪/৭ সাপোর্ট",
    description: "আমাদের সাপোর্ট টিম সবসময় আপনার পাশে",
    color: "from-orange-500 to-red-600",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50/50 to-white dark:from-gray-950 dark:to-gray-900 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 text-white px-8 py-4 rounded-full text-lg font-black shadow-2xl mb-6"
          >
            <Sparkles className="w-6 h-6" />
            <span>কেন আমাদের বেছে নিবেন?</span>
            <Sparkles className="w-6 h-6" />
          </motion.div>

          <h2 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
            ShopKoro মানেই ভরসা
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mt-4">
            আমরা শুধু বিক্রি করি না — আমরা আপনার ভরসা দেই
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.7 }}
              whileHover={{ y: -16, scale: 1.05 }}
              className="group relative bg-white dark:bg-gray-900 rounded-3xl p-8 text-center overflow-hidden shadow-xl hover:shadow-2xl border border-gray-100 dark:border-gray-800 transition-all duration-500"
            >
              {/* Gradient Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl"
                style={{ backgroundImage: `linear-gradient(to bottom right, ${feature.color.split(' ')[1]}, ${feature.color.split(' ')[3]})` }}
              />

              {/* Icon with Glass Effect */}
              <motion.div
                whileHover={{ rotate: 360, scale: 1.2 }}
                transition={{ duration: 0.7 }}
                className={`relative z-10 mx-auto w-20 h-20 mb-6 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center shadow-2xl backdrop-blur-md border border-white/20`}
              >
                <feature.icon className="text-white" size={38} />
                {/* Shine Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/40 to-transparent opacity-50" />
              </motion.div>

              {/* Title */}
              <h3 className="text-2xl font-black text-gray-800 dark:text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-current group-hover:to-current transition-all duration-500"
                style={{ backgroundImage: `linear-gradient(to right, ${feature.color.split(' ')[1]}, ${feature.color.split(' ')[3]})` }}
              >
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                {feature.description}
              </p>

              {/* Hover Glow Border */}
              <div className="absolute inset-0 rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div className="absolute inset-0 rounded-3xl blur-xl"
                  style={{ backgroundImage: `linear-gradient(to bottom right, ${feature.color.split(' ')[1]}40, ${feature.color.split(' ')[3]}40)` }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;