"use client";

import { motion } from "framer-motion";
import { RotateCcw, Clock, Package, Shield, CheckCircle, XCircle, AlertTriangle } from "lucide-react";

export default function ReturnPolicyPage() {
  const returnSteps = [
    {
      step: 1,
      title: "যোগাযোগ করুন",
      description: "আমাদের হেল্পলাইন বা ইমেইলে যোগাযোগ করে রিটার্ন রিকোয়েস্ট করুন",
      icon: CheckCircle,
      color: "from-blue-500 to-cyan-600"
    },
    {
      step: 2,
      title: "প্যাকেজিং",
      description: "প্রোডাক্ট অরিজিনাল প্যাকেজিংয়ে ভালোভাবে মুড়িয়ে রাখুন",
      icon: Package,
      color: "from-purple-500 to-pink-600"
    },
    {
      step: 3,
      title: "পিকআপ",
      description: "আমাদের কুরিয়ার সার্ভিস আপনার ঠিকানা থেকে প্রোডাক্ট কালেক্ট করবে",
      icon: RotateCcw,
      color: "from-green-500 to-emerald-600"
    },
    {
      step: 4,
      title: "রিফান্ড",
      description: "প্রোডাক্ট পরীক্ষা করে রিফান্ড প্রসেস করা হবে",
      icon: Shield,
      color: "from-orange-500 to-red-600"
    }
  ];

  const eligibleConditions = [
    "প্রোডাক্ট অরিজিনাল কন্ডিশনে আছে",
    "সব ট্যাগ এবং লেবেল অক্ষত আছে",
    "বিল অথবা রিসিট আছে",
    "ডেলিভারির ৭ দিনের মধ্যে রিটার্ন রিকোয়েস্ট করা হয়েছে",
    "প্রোডাক্ট ড্যামেজ হয়নি বা ব্যবহার করা হয়নি"
  ];

  const nonEligibleItems = [
    "ইনারওয়্যার এবং পার্সোনাল কেয়ার প্রোডাক্ট",
    "ফুড এবং বেভারেজ আইটেম",
    "ডিজিটাল প্রোডাক্ট এবং সফটওয়্যার",
    "কাস্টমাইজড বা পার্সোনালাইজড প্রোডাক্ট",
    "ইলেকট্রনিক আইটেম যেগুলো সীল ভাঙা হয়েছে"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-gray-950 pt-20 px-4 pb-20">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <RotateCcw className="w-16 h-16 mx-auto text-purple-600 mb-4" />
          <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent mb-4">
            রিটার্ন এবং রিফান্ড পলিসি
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            আপনার সন্তুষ্টি আমাদের প্রধান লক্ষ্য
          </p>
        </motion.div>

        {/* Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/80 dark:bg-gray-900/90 backdrop-blur-xl rounded-3xl shadow-xl border border-white/30 dark:border-gray-800 p-8 mb-8"
        >
          <div className="flex items-center gap-4 mb-6">
            <Clock className="w-8 h-8 text-purple-600" />
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              রিটার্ন পলিসি ওভারভিউ
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl">
              <div className="text-4xl font-black text-green-600 mb-2">৭ দিন</div>
              <p className="text-gray-700 dark:text-gray-300">রিটার্নের সময়সীমা</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl">
              <div className="text-4xl font-black text-blue-600 mb-2">৩-৫ দিন</div>
              <p className="text-gray-700 dark:text-gray-300">রিফান্ড প্রসেসিং</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl">
              <div className="text-4xl font-black text-purple-600 mb-2">১০০%</div>
              <p className="text-gray-700 dark:text-gray-300">অরিজিনাল কন্ডিশন</p>
            </div>
          </div>
        </motion.div>

        {/* Return Process */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/80 dark:bg-gray-900/90 backdrop-blur-xl rounded-3xl shadow-xl border border-white/30 dark:border-gray-800 p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-8 text-center">
            রিটার্ন প্রসেস
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {returnSteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="text-center"
              >
                <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center text-white shadow-lg`}>
                  <step.icon size={32} />
                </div>
                <div className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                  {step.step}
                </div>
                <h3 className="font-semibold text-gray-800 dark:text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Eligible Conditions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white/80 dark:bg-gray-900/90 backdrop-blur-xl rounded-3xl shadow-xl border border-white/30 dark:border-gray-800 p-8 mb-8"
        >
          <div className="flex items-center gap-4 mb-6">
            <CheckCircle className="w-8 h-8 text-green-600" />
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              রিটার্নের জন্য যোগ্য শর্তাবলী
            </h2>
          </div>
          <div className="space-y-3">
            {eligibleConditions.map((condition, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <p className="text-gray-700 dark:text-gray-300">{condition}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Non-Eligible Items */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white/80 dark:bg-gray-900/90 backdrop-blur-xl rounded-3xl shadow-xl border border-white/30 dark:border-gray-800 p-8 mb-8"
        >
          <div className="flex items-center gap-4 mb-6">
            <XCircle className="w-8 h-8 text-red-600" />
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              রিটার্নের জন্য অযোগ্য আইটেম
            </h2>
          </div>
          <div className="space-y-3">
            {nonEligibleItems.map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <XCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                <p className="text-gray-700 dark:text-gray-300">{item}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Refund Process */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white/80 dark:bg-gray-900/90 backdrop-blur-xl rounded-3xl shadow-xl border border-white/30 dark:border-gray-800 p-8 mb-8"
        >
          <div className="flex items-center gap-4 mb-6">
            <Shield className="w-8 h-8 text-purple-600" />
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              রিফান্ড প্রসেস
            </h2>
          </div>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
              <h3 className="font-semibold text-blue-800 dark:text-blue-400 mb-2">
                অনলাইন পেমেন্ট (SSLCommerz/Stripe)
              </h3>
              <p className="text-blue-700 dark:text-blue-300 text-sm">
                রিটার্ন প্রোডাক্ট গ্রহণের পর ৩-৫ কার্যদিবসের মধ্যে আপনার ব্যাংক একাউন্টে রিফান্ড দেওয়া হবে।
              </p>
            </div>
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
              <h3 className="font-semibold text-green-800 dark:text-green-400 mb-2">
                ক্যাশ অন ডেলিভারি
              </h3>
              <p className="text-green-700 dark:text-green-300 text-sm">
                রিটার্ন প্রোডাক্ট গ্রহণের পর ৩-৫ কার্যদিবসের মধ্যে আপনার মোবাইল ব্যাংকিং একাউন্টে রিফান্ড দেওয়া হবে।
              </p>
            </div>
          </div>
        </motion.div>

        {/* Important Notes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-3xl p-8 border border-yellow-200 dark:border-yellow-800"
        >
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-8 h-8 text-yellow-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-bold text-yellow-800 dark:text-yellow-400 mb-3">
                গুরুত্বপূর্ণ নোট
              </h3>
              <ul className="space-y-2 text-yellow-700 dark:text-yellow-300">
                <li>• রিটার্ন প্রোডাক্টের শিপিং খরচ ক্রেতাকে বহন করতে হবে</li>
                <li>• ড্যামেজ হওয়া প্রোডাক্টের ক্ষেত্রে রিটার্ন গ্রহণ করা হবে না</li>
                <li>• প্রোডাক্ট এক্সচেঞ্জের জন্য আলাদা পলিসি প্রযোজ্য</li>
                <li>• যেকোনো সমস্যায় support@shopkoro.com এ যোগাযোগ করুন</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mt-12 text-center"
        >
          <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 rounded-3xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              রিটার্ন সংক্রান্ত সাহায্য প্রয়োজন?
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