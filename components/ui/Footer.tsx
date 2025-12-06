"use client";

import { motion } from "framer-motion";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Truck,
  Shield,
  HeadphonesIcon,
} from "lucide-react";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    shop: [
      { name: "সব প্রোডাক্ট", href: "/products" },
      { name: "নতুন অর্ডার", href: "/new-arrivals" },
      { name: "বেস্ট সেলার", href: "/best-sellers" },
      { name: "ফ্ল্যাশ সেল", href: "/flash-sale" },
    ],
    categories: [
      { name: "ইলেকট্রনিক্স", href: "/category/electronics" },
      { name: "ফ্যাশন", href: "/category/fashion" },
      { name: "বিউটি", href: "/category/beauty" },
      { name: "হোম & লাইফস্টাইল", href: "/category/home" },
    ],
    support: [
      { name: "যোগাযোগ করুন", href: "/contact" },
      { name: "FAQ", href: "/faq" },
      { name: "রিটার্ন পলিসি", href: "/return-policy" },
      { name: "শিপিং", href: "/shipping" },
    ],
    about: [
      { name: "আমাদের সম্পর্কে", href: "/about" },
      { name: "ক্যারিয়ার", href: "/careers" },
      { name: "ব্লগ", href: "/blog" },
      { name: "প্রাইভেসি পলিসি", href: "/privacy" },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Youtube, href: "#", label: "Youtube" },
  ];

  return (
    <footer className="bg-dark text-white mt-20">
      {/* Top Section - Features */}
      <div className="border-b border-gray-700">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                icon: Truck,
                title: "ফ্রি ডেলিভারি",
                desc: "৫০০+ টাকার অর্ডারে",
              },
              {
                icon: CreditCard,
                title: "ক্যাশ অন ডেলিভারি",
                desc: "সব জায়গায়",
              },
              {
                icon: Shield,
                title: "৭ দিন রিটার্ন",
                desc: "নিশ্চিন্ত কেনাকাটা",
              },
              {
                icon: HeadphonesIcon,
                title: "২৪/৭ সাপোর্ট",
                desc: "আমরা আছি আপনার পাশে",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center space-x-3"
              >
                <div className="bg-primary/20 p-3 rounded-lg">
                  <feature.icon className="text-primary" size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-sm">{feature.title}</h4>
                  <p className="text-xs text-gray-400">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
                ShopKoro
              </h3>
              <p className="text-gray-400 mb-6 text-sm">
                বাংলাদেশের সবচেয়ে বিশ্বস্ত ই-কমার্স প্ল্যাটফর্ম। ইলেকট্রনিক্স,
                ফ্যাশন, বিউটি - সবকিছু এক জায়গায়।
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2 text-gray-400">
                  <Phone size={16} />
                  <span>+880 19XX-XXXXXX</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-400">
                  <Mail size={16} />
                  <span>support@shopkoro.com</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-400">
                  <MapPin size={16} />
                  <span>ঢাকা, বাংলাদেশ</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Shop Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="font-semibold mb-4">শপিং</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              {footerLinks.shop.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Categories Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="font-semibold mb-4">ক্যাটেগরি</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              {footerLinks.categories.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Support & About */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="font-semibold mb-4">সাপোর্ট</h4>
            <ul className="space-y-2 text-sm text-gray-400 mb-6">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <h4 className="font-semibold mb-4">আমাদের সম্পর্কে</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              {footerLinks.about.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Social Media & Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-gray-800 p-3 rounded-full hover:bg-primary transition-colors"
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </div>
            <p className="text-gray-400 text-sm text-center">
              © {currentYear} ShopKoro. সব অধিকার সংরক্ষিত।
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

