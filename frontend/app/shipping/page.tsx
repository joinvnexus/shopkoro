"use client";

import { motion } from "framer-motion";
import { Truck, MapPin, Clock, Package, CheckCircle, DollarSign, Globe } from "lucide-react";

export default function ShippingPage() {
  const shippingZones = [
    {
      zone: "ঢাকা মহানগরী",
      delivery: "১-২ কার্যদিবস",
      cost: "ফ্রি (৫০০৳+ অর্ডারে)",
      areas: ["ঢাকা সিটি", "গাজীপুর", "নারায়ণগঞ্জ", "সাভার"]
    },
    {
      zone: "ঢাকা বিভাগ",
      delivery: "২-৩ কার্যদিবস",
      cost: "৬০৳",
      areas: ["মানিকগঞ্জ", "মুন্সীগঞ্জ", "নরসিংদী", "টাঙ্গাইল"]
    },
    {
      zone: "চট্টগ্রাম বিভাগ",
      delivery: "৩-৫ কার্যদিবস",
      cost: "১২০৳",
      areas: ["চট্টগ্রাম", "কক্সবাজার", "কুমিল্লা", "ফেনী"]
    },
    {
      zone: "খুলনা/বরিশাল বিভাগ",
      delivery: "৪-৬ কার্যদিবস",
      cost: "১০০৳",
      areas: ["খুলনা", "বরিশাল", "যশোর", "বাগেরহাট"]
    },
    {
      zone: "রাজশাহী/রংপুর বিভাগ",
      delivery: "৪-৭ কার্যদিবস",
      cost: "১৫০৳",
      areas: ["রাজশাহী", "রংপুর", "দিনাজপুর", "বগুড়া"]
    },
    {
      zone: "সিলেট/ময়মনসিংহ বিভাগ",
      delivery: "৫-৮ কার্যদিবস",
      cost: "১৮০৳",
      areas: ["সিলেট", "ময়মনসিংহ", "নেত্রকোনা", "হবিগঞ্জ"]
    }
  ];

  const shippingFeatures = [
    {
      icon: Truck,
      title: "ফাস্ট ডেলিভারি",
      description: "আধুনিক লজিস্টিক সিস্টেম ব্যবহার করে দ্রুত ডেলিভারি"
    },
    {
      icon: Package,
      title: "নিরাপদ প্যাকেজিং",
      description: "প্রোডাক্টের নিরাপত্তার জন্য বিশেষ প্যাকেজিং"
    },
    {
      icon: MapPin,
      title: "ট্র্যাকিং সুবিধা",
      description: "রিয়েল-টাইম ট্র্যাকিং করে আপনার অর্ডার ফলো করুন"
    },
    {
      icon: Clock,
      title: "২৪/৭ সাপোর্ট",
      description: "যেকোনো সময় আমাদের সাথে যোগাযোগ করুন"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-gray-950 pt-20 px-4 pb-20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Truck className="w-16 h-16 mx-auto text-purple-600 mb-4" />
          <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent mb-4">
            শিপিং এবং ডেলিভারি
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            আপনার প্রোডাক্ট দ্রুত এবং নিরাপদে পৌঁছে দিতে আমরা প্রতিশ্রুতিবদ্ধ
          </p>
        </motion.div>

        {/* Shipping Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {shippingFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white/80 dark:bg-gray-900/90 backdrop-blur-xl rounded-3xl shadow-xl border border-white/30 dark:border-gray-800 p-6 text-center"
            >
              <feature.icon className="w-12 h-12 mx-auto text-purple-600 mb-4" />
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Free Shipping Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 rounded-3xl p-8 text-white text-center mb-12"
        >
          <DollarSign className="w-12 h-12 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">
            ৫০০ টাকার বেশি অর্ডারে ফ্রি শিপিং!
          </h2>
          <p className="text-lg opacity-90">
            আপনার প্রিয় প্রোডাক্ট কিনুন এবং ডেলিভারি চার্জ থেকে মুক্ত থাকুন
          </p>
        </motion.div>

        {/* Shipping Zones */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white/80 dark:bg-gray-900/90 backdrop-blur-xl rounded-3xl shadow-xl border border-white/30 dark:border-gray-800 p-8 mb-12"
        >
          <div className="flex items-center gap-4 mb-8">
            <Globe className="w-8 h-8 text-purple-600" />
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              শিপিং জোন এবং ডেলিভারি চার্জ
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-4 px-4 font-semibold text-gray-800 dark:text-white">জোন</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-800 dark:text-white">ডেলিভারি সময়</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-800 dark:text-white">খরচ</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-800 dark:text-white">এলাকা</th>
                </tr>
              </thead>
              <tbody>
                {shippingZones.map((zone, index) => (
                  <tr key={index} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="py-4 px-4 font-medium text-gray-800 dark:text-white">
                      {zone.zone}
                    </td>
                    <td className="py-4 px-4 text-gray-600 dark:text-gray-400">
                      {zone.delivery}
                    </td>
                    <td className="py-4 px-4 text-gray-600 dark:text-gray-400">
                      {zone.cost}
                    </td>
                    <td className="py-4 px-4 text-gray-600 dark:text-gray-400">
                      {zone.areas.join(", ")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Delivery Process */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white/80 dark:bg-gray-900/90 backdrop-blur-xl rounded-3xl shadow-xl border border-white/30 dark:border-gray-800 p-8 mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-8 text-center">
            ডেলিভারি প্রসেস
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full flex items-center justify-center text-white mx-auto mb-4">
                <span className="text-2xl font-bold">১</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                অর্ডার কনফার্মেশন
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                অর্ডার প্লেস করার পর আমরা আপনাকে কনফার্মেশন মেসেজ পাঠাব
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white mx-auto mb-4">
                <span className="text-2xl font-bold">২</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                প্রসেসিং এবং প্যাকেজিং
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                আপনার প্রোডাক্ট কোয়ালিটি চেক করে বিশেষভাবে প্যাকেজ করা হয়
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white mx-auto mb-4">
                <span className="text-2xl font-bold">৩</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                ডেলিভারি
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                আমাদের কুরিয়ার পার্টনার আপনার ঠিকানায় প্রোডাক্ট পৌঁছে দেয়
              </p>
            </div>
          </div>
        </motion.div>

        {/* Important Notes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-3xl p-8 border border-blue-200 dark:border-blue-800"
        >
          <h3 className="text-xl font-bold text-blue-800 dark:text-blue-400 mb-4">
            গুরুত্বপূর্ণ তথ্য
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">
                ডেলিভারি শর্তাবলী
              </h4>
              <ul className="space-y-1 text-sm text-blue-600 dark:text-blue-400">
                <li>• সঠিক ঠিকানা প্রদান করুন</li>
                <li>• মোবাইল নম্বর সচল রাখুন</li>
                <li>• আইডি কার্ডের কপি রেডি রাখুন</li>
                <li>• ক্যাশ অন ডেলিভারির জন্য নগদ রাখুন</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">
                বিশেষ নোট
              </h4>
              <ul className="space-y-1 text-sm text-blue-600 dark:text-blue-400">
                <li>• ছুটির দিনে ডেলিভারি বন্ধ থাকে</li>
                <li>• প্রাকৃতিক দুর্যোগে দেরি হতে পারে</li>
                <li>• রিসিডিউয়াল এরিয়ায় অতিরিক্ত চার্জ</li>
                <li>• বড় প্রোডাক্টের জন্য বিশেষ ব্যবস্থা</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center"
        >
          <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 rounded-3xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              শিপিং সংক্রান্ত সাহায্য প্রয়োজন?
            </h3>
            <p className="text-lg mb-6 opacity-90">
              আমাদের সাথে যোগাযোগ করে বিস্তারিত তথ্য নিন
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="px-8 py-3 bg-white text-purple-600 font-bold rounded-2xl hover:bg-gray-100 transition-colors"
              >
                যোগাযোগ করুন
              </a>
              <a
                href="tel:+8801234567890"
                className="px-8 py-3 border-2 border-white text-white font-bold rounded-2xl hover:bg-white/10 transition-colors"
              >
                কল করুন: +880 1234-567890
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}