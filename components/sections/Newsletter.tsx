"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send, Gift } from "lucide-react";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setEmail("");
      setTimeout(() => setIsSuccess(false), 3000);
    }, 1000);
  };

  return (
    <section className="py-16 bg-gradient-to-br from-primary/15 via-secondary/15 to-accent/15">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-accent/30 to-accent/20 px-5 py-2.5 rounded-full mb-4 border-2 border-accent/50 shadow-lg"
          >
            <Gift className="text-accent-dark" size={20} />
            <span className="font-bold text-dark">বিশেষ অফার</span>
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
            নিউজলেটার সাবস্ক্রাইব করুন
          </h2>
          <p className="text-gray-dark mb-8 text-lg">
            নিউজলেটার সাবস্ক্রাইব করুন এবং পাবেন{" "}
            <span className="font-bold text-primary">১০% ডিসকাউন্ট</span> আপনার
            প্রথম অর্ডারে!
          </p>

          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <Mail
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-dark"
                  size={20}
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="আপনার ইমেইল ঠিকানা"
                  required
                  className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-medium focus:border-primary focus:outline-none text-dark transition-all duration-300 focus:shadow-lg focus:shadow-primary/20"
                />
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.08, y: -2 }}
                whileTap={{ scale: 0.95 }}
                disabled={isSubmitting}
                className="bg-gradient-to-r from-primary via-primary-light to-primary text-white px-8 py-4 rounded-xl font-semibold hover:from-primary-dark hover:via-primary hover:to-primary-light transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 shadow-lg hover:shadow-xl hover:shadow-primary/50"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>সাবমিট হচ্ছে...</span>
                  </>
                ) : isSuccess ? (
                  <>
                    <span>✓ সাবস্ক্রাইব করা হয়েছে!</span>
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    <span>সাবস্ক্রাইব করুন</span>
                  </>
                )}
              </motion.button>
            </div>
          </form>

          <p className="text-sm text-gray-dark mt-4">
            আমরা আপনার ইমেইল শেয়ার করব না। আপনি যেকোনো সময় আনসাবস্ক্রাইব করতে
            পারবেন।
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;

