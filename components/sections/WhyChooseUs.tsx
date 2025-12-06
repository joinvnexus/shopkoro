"use client";

import { motion } from "framer-motion";
import {
  Truck,
  CreditCard,
  RotateCcw,
  HeadphonesIcon,
} from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "ফ্রি ডেলিভারি",
    description: "৫০০+ টাকার অর্ডারে সম্পূর্ণ ফ্রি ডেলিভারি",
    color: "from-primary to-primary-dark",
  },
  {
    icon: CreditCard,
    title: "ক্যাশ অন ডেলিভারি",
    description: "সব জায়গায় ক্যাশ অন ডেলিভারি সুবিধা",
    color: "from-secondary to-secondary-dark",
  },
  {
    icon: RotateCcw,
    title: "৭ দিন রিটার্ন",
    description: "যেকোনো সমস্যায় ৭ দিনের মধ্যে রিটার্ন",
    color: "from-accent to-accent-dark",
  },
  {
    icon: HeadphonesIcon,
    title: "২৪/৭ সাপোর্ট",
    description: "আমাদের সাপোর্ট টিম সবসময় আপনার পাশে",
    color: "from-primary to-secondary",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
            কেন ShopKoro বেছে নিবেন?
          </h2>
          <p className="text-gray-dark max-w-2xl mx-auto">
            আমরা আপনাকে দিচ্ছি সবচেয়ে ভালো সেবা এবং সুবিধা
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-xl shadow-lg p-6 text-center group cursor-pointer"
            >
              <div className="flex justify-center mb-4">
                <div
                  className={`bg-gradient-to-br ${feature.color} p-4 rounded-full group-hover:scale-110 transition-transform`}
                >
                  <feature.icon className="text-white" size={32} />
                </div>
              </div>
              <h3 className="text-xl font-bold text-dark mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-dark text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;

