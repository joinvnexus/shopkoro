"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle, Search, MessageCircle } from "lucide-react";

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [openFAQ, setOpenFAQ] = useState<string | null>(null);

  const faqs: FAQ[] = [
    {
      id: "1",
      category: "orders",
      question: "আমার অর্ডার কখন ডেলিভারি হবে?",
      answer: "আমরা সাধারণত ঢাকা মহানগরীতে ১-২ কার্যদিবস এবং অন্যান্য এলাকায় ৩-৫ কার্যদিবসের মধ্যে ডেলিভারি সম্পন্ন করি। অর্ডার কনফার্মেশনের পর আপনি SMS এবং ইমেইলের মাধ্যমে ট্র্যাকিং আপডেট পাবেন।"
    },
    {
      id: "2",
      category: "orders",
      question: "অর্ডার ক্যানসেল করতে চাই, কীভাবে করব?",
      answer: "অর্ডার কনফার্মেশনের ২ ঘণ্টার মধ্যে আমাদের হেল্পলাইনে কল করে বা support@shopkoro.com এ ইমেইল করে ক্যানসেল করতে পারেন। এর পর কোনো কারণে ক্যানসেল করলে ডেলিভারি চার্জ কাটা যেতে পারে।"
    },
    {
      id: "3",
      category: "payment",
      question: "কী কী পেমেন্ট মেথড আছে?",
      answer: "আমরা SSLCommerz এবং Stripe এর মাধ্যমে পেমেন্ট গ্রহণ করি। আপনি বিকাশ, নগদ, রকেট, ব্যাংক কার্ড, ক্রেডিট/ডেবিট কার্ড এবং অন্যান্য ডিজিটাল ওয়ালেট ব্যবহার করে পেমেন্ট করতে পারেন।"
    },
    {
      id: "4",
      category: "payment",
      question: "ক্যাশ অন ডেলিভারি আছে কি?",
      answer: "হ্যাঁ, আমরা ক্যাশ অন ডেলিভারি সার্ভিস প্রদান করি। তবে এই সার্ভিস শুধুমাত্র ঢাকা মহানগরী এবং নির্দিষ্ট এলাকায় উপলব্ধ।"
    },
    {
      id: "5",
      category: "returns",
      question: "প্রোডাক্ট রিটার্ন করা যাবে?",
      answer: "হ্যাঁ, আমরা ৭ দিনের রিটার্ন পলিসি প্রদান করি। প্রোডাক্ট অরিজিনাল কন্ডিশনে থাকলে এবং ট্যাগ/লেবেল অক্ষত থাকলে রিটার্ন গ্রহণ করা হয়। রিটার্নের জন্য আমাদের হেল্পলাইনে যোগাযোগ করুন।"
    },
    {
      id: "6",
      category: "returns",
      question: "রিটার্ন করলে কতদিনে রিফান্ড পাব?",
      answer: "রিটার্ন প্রোডাক্ট গ্রহণের পর ৩-৫ কার্যদিবসের মধ্যে রিফান্ড প্রসেস করা হয়। অনলাইন পেমেন্টের ক্ষেত্রে ব্যাংক একাউন্টে এবং ক্যাশ অন ডেলিভারির ক্ষেত্রে মোবাইল ব্যাংকিংয়ে রিফান্ড দেওয়া হয়।"
    },
    {
      id: "7",
      category: "shipping",
      question: "ফ্রি শিপিং কখন পাব?",
      answer: "৫০০ টাকার বেশি অর্ডারের ক্ষেত্রে আমরা ফ্রি শিপিং প্রদান করি। এছাড়া প্রিমিয়াম কাস্টমারদের জন্য বিশেষ শিপিং অফার থাকে।"
    },
    {
      id: "8",
      category: "shipping",
      question: "আমার এলাকায় ডেলিভারি হয় কি?",
      answer: "আমরা বাংলাদেশের সব জেলায় ডেলিভারি সার্ভিস প্রদান করি। তবে কিছু দুর্গম এলাকায় অতিরিক্ত ডেলিভারি চার্জ প্রযোজ্য হতে পারে।"
    },
    {
      id: "9",
      category: "account",
      question: "অ্যাকাউন্ট তৈরি করতে হবে কেন?",
      answer: "অ্যাকাউন্ট তৈরি করে আপনি অর্ডার ট্র্যাক করতে, উইশলিস্ট তৈরি করতে, এবং বিশেষ অফার পেতে পারেন। এছাড়া ভবিষ্যতে রিপিট অর্ডার করা সহজ হয়।"
    },
    {
      id: "10",
      category: "account",
      question: "পাসওয়ার্ড ভুলে গেছি, কী করব?",
      answer: "লগইন পেজে 'পাসওয়ার্ড ভুলে গেছেন?' লিংকে ক্লিক করে আপনার ইমেইল দিয়ে পাসওয়ার্ড রিসেট করতে পারেন। রিসেট লিংক আপনার ইমেইলে পাঠানো হবে।"
    },
    {
      id: "11",
      category: "products",
      question: "প্রোডাক্টের কোয়ালিটি কেমন?",
      answer: "আমরা শুধুমাত্র অরিজিনাল এবং কোয়ালিটি প্রোডাক্ট সাপ্লাই করি। প্রত্যেক প্রোডাক্ট আমাদের কোয়ালিটি কন্ট্রোল টিম দ্বারা পরীক্ষিত হয়।"
    },
    {
      id: "12",
      category: "products",
      question: "স্টক আউট প্রোডাক্ট কখন আসবে?",
      answer: "স্টক আউট প্রোডাক্টের জন্য আমাদের ওয়েবসাইটে 'নোটিফাই মি' বাটনে ক্লিক করে নোটিফিকেশন পেতে পারেন। সাধারণত ১-২ সপ্তাহের মধ্যে স্টক আপডেট হয়।"
    }
  ];

  const categories = [
    { id: "all", name: "সব প্রশ্ন", icon: HelpCircle },
    { id: "orders", name: "অর্ডার", icon: MessageCircle },
    { id: "payment", name: "পেমেন্ট", icon: MessageCircle },
    { id: "returns", name: "রিটার্ন", icon: MessageCircle },
    { id: "shipping", name: "শিপিং", icon: MessageCircle },
    { id: "account", name: "অ্যাকাউন্ট", icon: MessageCircle },
    { id: "products", name: "প্রোডাক্ট", icon: MessageCircle },
  ];

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFAQ = (id: string) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-gray-950 pt-20 px-4 pb-20">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <HelpCircle className="w-16 h-16 mx-auto text-purple-600 mb-4" />
          <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent mb-4">
            প্রায়শই জিজ্ঞাসিত প্রশ্ন
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            আপনার যেকোনো প্রশ্নের উত্তর খুঁজে নিন
          </p>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="প্রশ্ন খুঁজুন..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-gray-300 dark:border-gray-700 rounded-3xl focus:outline-none focus:ring-4 focus:ring-purple-500/30 focus:border-purple-500 transition-all text-lg"
            />
          </div>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-2xl font-medium transition-all ${
                  selectedCategory === category.id
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                    : "bg-white/60 dark:bg-gray-900/60 backdrop-blur-md text-gray-700 dark:text-gray-300 hover:bg-white/80 dark:hover:bg-gray-900/80"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </motion.div>

        {/* FAQ List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="space-y-4"
        >
          {filteredFAQs.length === 0 ? (
            <div className="text-center py-12 bg-white/70 dark:bg-gray-900/50 rounded-3xl">
              <HelpCircle className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <p className="text-xl font-bold text-gray-700 dark:text-gray-200">
                কোনো প্রশ্ন পাওয়া যায়নি
              </p>
              <p className="text-gray-500 mt-2">আপনার সার্চ টার্ম পরিবর্তন করে দেখুন।</p>
            </div>
          ) : (
            filteredFAQs.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.05 }}
                className="bg-white/80 dark:bg-gray-900/90 backdrop-blur-xl rounded-3xl shadow-lg border border-white/30 dark:border-gray-800 overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <span className="text-lg font-semibold text-gray-800 dark:text-white pr-4">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: openFAQ === faq.id ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-6 h-6 text-gray-500 flex-shrink-0" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {openFAQ === faq.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-gray-200 dark:border-gray-700"
                    >
                      <div className="px-8 py-6 text-gray-600 dark:text-gray-400 leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))
          )}
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 rounded-3xl p-8 text-white"
        >
          <h3 className="text-2xl font-bold mb-4">
            আরও সাহায্য প্রয়োজন?
          </h3>
          <p className="text-lg mb-6 opacity-90">
            আমাদের সাথে সরাসরি যোগাযোগ করুন
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
        </motion.div>
      </div>
    </div>
  );
}