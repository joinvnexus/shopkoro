"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    setLoading(false);
    setSubmitted(true);
    setFormData({ name: "", email: "", subject: "", message: "" });

    setTimeout(() => setSubmitted(false), 5000);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "ফোন",
      details: ["+880 1234-567890", "+880 1234-567891"],
      color: "from-green-500 to-emerald-600",
    },
    {
      icon: Mail,
      title: "ইমেইল",
      details: ["support@shopkoro.com", "info@shopkoro.com"],
      color: "from-blue-500 to-cyan-600",
    },
    {
      icon: MapPin,
      title: "ঠিকানা",
      details: ["ঢাকা, বাংলাদেশ", "মিরপুর, ঢাকা-1216"],
      color: "from-purple-500 to-pink-600",
    },
    {
      icon: Clock,
      title: "কর্মঘণ্টা",
      details: ["সকাল ৯টা - রাত ৯টা", "৭ দিন সপ্তাহে"],
      color: "from-orange-500 to-red-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-gray-950 pt-20 px-4 pb-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent mb-4">
            যোগাযোগ করুন
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            আপনার যেকোনো প্রশ্ন বা সাহায্যের জন্য আমাদের সাথে যোগাযোগ করুন
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/80 dark:bg-gray-900/90 backdrop-blur-xl rounded-3xl shadow-xl border border-white/30 dark:border-gray-800 p-8"
          >
            <h2 className="text-3xl font-black text-gray-800 dark:text-white mb-8">
              মেসেজ পাঠান
            </h2>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                  মেসেজ পাঠানো হয়েছে!
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  ধন্যবাদ। আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      নাম *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/60 dark:bg-gray-800/60 backdrop-blur-md border border-gray-300 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-500/30 focus:border-purple-500 transition-all"
                      placeholder="আপনার নাম"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      ইমেইল *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/60 dark:bg-gray-800/60 backdrop-blur-md border border-gray-300 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-500/30 focus:border-purple-500 transition-all"
                      placeholder="আপনার ইমেইল"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    বিষয় *
                  </label>
                  <select
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/60 dark:bg-gray-800/60 backdrop-blur-md border border-gray-300 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-500/30 focus:border-purple-500 transition-all"
                  >
                    <option value="">বিষয় নির্বাচন করুন</option>
                    <option value="order">অর্ডার সংক্রান্ত</option>
                    <option value="product">প্রোডাক্ট সংক্রান্ত</option>
                    <option value="delivery">ডেলিভারি সংক্রান্ত</option>
                    <option value="return">রিটার্ন সংক্রান্ত</option>
                    <option value="complaint">অভিযোগ</option>
                    <option value="other">অন্যান্য</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    মেসেজ *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/60 dark:bg-gray-800/60 backdrop-blur-md border border-gray-300 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-500/30 focus:border-purple-500 transition-all resize-none"
                    placeholder="আপনার মেসেজ লিখুন..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-purple-500/30 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300 relative overflow-hidden group"
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    {loading ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full"
                        />
                        পাঠানো হচ্ছে...
                      </>
                    ) : (
                      <>
                        <Send size={20} />
                        মেসেজ পাঠান
                      </>
                    )}
                  </span>

                  {/* Shine Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.8 }}
                  />
                </button>
              </form>
            )}
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="bg-white/80 dark:bg-gray-900/90 backdrop-blur-xl rounded-3xl shadow-xl border border-white/30 dark:border-gray-800 p-6"
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 bg-gradient-to-br ${info.color} rounded-2xl text-white`}>
                    <info.icon size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                      {info.title}
                    </h3>
                    {info.details.map((detail, i) => (
                      <p key={i} className="text-gray-600 dark:text-gray-400">
                        {detail}
                      </p>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Map Placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="bg-white/80 dark:bg-gray-900/90 backdrop-blur-xl rounded-3xl shadow-xl border border-white/30 dark:border-gray-800 p-6"
            >
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                আমাদের অবস্থান
              </h3>
              <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500 dark:text-gray-400">
                    ম্যাপ এখানে দেখানো হবে
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="mt-16 bg-white/80 dark:bg-gray-900/90 backdrop-blur-xl rounded-3xl shadow-xl border border-white/30 dark:border-gray-800 p-8"
        >
          <h2 className="text-3xl font-black text-gray-800 dark:text-white mb-8 text-center">
            সচরাচর জিজ্ঞাসা
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                question: "আমার অর্ডার কখন ডেলিভারি হবে?",
                answer: "আমরা সাধারণত ৩-৫ কার্যদিবসের মধ্যে ডেলিভারি সম্পন্ন করি।"
              },
              {
                question: "প্রোডাক্ট রিটার্ন করা যাবে?",
                answer: "হ্যাঁ, ৭ দিনের মধ্যে অরিজিনাল কন্ডিশনে রিটার্ন করা যাবে।"
              },
              {
                question: "পেমেন্ট কীভাবে করব?",
                answer: "SSLCommerz বা Stripe এর মাধ্যমে অনলাইন পেমেন্ট করতে পারেন।"
              },
              {
                question: "কাস্টমার সাপোর্ট কখন পাওয়া যায়?",
                answer: "সকাল ৯টা থেকে রাত ৯টা পর্যন্ত আমাদের সাথে যোগাযোগ করতে পারেন।"
              },
            ].map((faq, index) => (
              <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-b-0">
                <h4 className="font-semibold text-gray-800 dark:text-white mb-2">
                  {faq.question}
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}