// app/products/[id]/page.tsx

"use client";

import { use } from "react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import toast from "react-hot-toast";
import { productApi } from "@/lib/api";
import useCartStore from "@/stores/cartStore";
import {
  ShoppingCart,
  Heart,
  Plus,
  Minus,
  Star,
  Share2,
  Truck,
  Shield,
  RotateCcw,
  Check,
  ChevronLeft,
  Copy,
  Facebook,
  Twitter,
} from "lucide-react";

// Reusable Trust Badges
const TrustBadges = () => (
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-10 border-t-2 border-gray-200 dark:border-gray-700">
    <motion.div whileHover={{ scale: 1.1 }} className="text-center">
      <Truck className="w-16 h-16 mx-auto text-green-600 mb-3" />
      <p className="font-bold text-lg">ফ্রি ডেলিভারি</p>
      <p className="text-sm text-gray-600">৫০০৳+ অর্ডারে</p>
    </motion.div>
    <motion.div whileHover={{ scale: 1.1 }} className="text-center">
      <RotateCcw className="w-16 h-16 mx-auto text-blue-600 mb-3" />
      <p className="font-bold text-lg">৭ দিন রিটার্ন</p>
      <p className="text-sm text-gray-600">সম্পূর্ণ ফ্রি</p>
    </motion.div>
    <motion.div whileHover={{ scale: 1.1 }} className="text-center">
      <Shield className="w-16 h-16 mx-auto text-purple-600 mb-3" />
      <p className="font-bold text-lg">১০০% অরিজিনাল</p>
      <p className="text-sm text-gray-600">গ্যারান্টি সহ</p>
    </motion.div>
  </div>
);

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params); // Next.js 15+ এর জন্য

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImg, setSelectedImg] = useState(0);
  const [adding, setAdding] = useState(false);
  const [wished, setWished] = useState(false);
  const [showShare, setShowShare] = useState(false);

  const { addItem } = useCartStore();

  useEffect(() => {
    const load = async () => {
      try {
        const data = await productApi.getById(id);
        if (!data) return notFound();
        setProduct(data);
      } catch (err) {
        toast.error("প্রোডাক্ট লোড করতে সমস্যা হয়েছে");
        notFound();
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    setAdding(true);
    addItem({
      productId: product._id,
      name: product.name,
      price: product.price,
      image: product.images?.[0] || product.image,
      quantity,
    });
    toast.success("কার্টে যোগ হয়েছে!");
    setTimeout(() => setAdding(false), 1200);
  };

  const handleShare = (type: string) => {
    const url = window.location.href;
    const text = `${product.name} - ShopKoro`;

    if (type === "copy") {
      navigator.clipboard.writeText(url);
      toast.success("লিংক কপি হয়েছে!");
    } else if (type === "fb") {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`);
    } else if (type === "twitter") {
      window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`);
    }
    setShowShare(false);
  };

  // Loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className="w-20 h-20 border-8 border-purple-200 rounded-full border-t-purple-600"
        />
      </div>
    );
  }

  if (!product) return notFound();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-gray-950 dark:via-purple-950/40 pt-20 px-4 pb-20">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <Link href="/products" className="inline-flex items-center gap-2 text-gray-600 hover:text-purple-600 mb-8 transition">
          <ChevronLeft size={20} />
          পিছনে যান
        </Link>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Image Gallery */}
          <div className="space-y-6">
            <motion.div
              layoutId={`img-${product._id}`}
              className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl bg-white/70 backdrop-blur-xl"
            >
              <Image
                src={product.images?.[selectedImg] || product.image}
                alt={product.name}
                fill
                priority
                className="object-cover"
              />
              {product.isFlashSale && (
                <div className="absolute top-4 left-4 bg-gradient-to-r from-orange-500 to-red-600 text-white px-4 py-2 rounded-full font-bold animate-pulse">
                  Flash Sale
                </div>
              )}
            </motion.div>

            {product.images?.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((img: string, i: number) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setSelectedImg(i)}
                    className={`relative aspect-square rounded-2xl overflow-hidden border-4 transition-all ${
                      selectedImg === i
                        ? "border-purple-600 shadow-2xl shadow-purple-500/40"
                        : "border-transparent hover:border-purple-300"
                    }`}
                  >
                    <Image src={img} alt="" fill className="object-cover" />
                  </motion.button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <motion.div initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-black text-gray-800 dark:text-white mb-4">
                {product.name}
              </h1>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={28}
                      className={i < Math.floor(product.rating || 0) ? "fill-yellow-500 text-yellow-500" : "text-gray-300"}
                    />
                  ))}
                </div>
                <span className="text-lg font-bold text-gray-600 dark:text-gray-400">
                  ({product.reviews || 0} reviews)
                </span>
              </div>

              <div className="flex items-end gap-5 mb-8">
                <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                  ৳{product.price.toLocaleString("bn-BD")}
                </span>
                {product.originalPrice > product.price && (
                  <div>
                    <span className="text-2xl text-gray-500 line-through">
                      ৳{product.originalPrice.toLocaleString("bn-BD")}
                    </span>
                    <span className="ml-3 text-xl font-bold text-green-600">
                      -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                    </span>
                  </div>
                )}
              </div>
            </div>

            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mt-6">
              {product.description || "এই প্রোডাক্টটি সেরা কোয়ালিটির।"}
            </p>

            {/* Quantity + Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-6 py-8">
              <div className="flex items-center bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl shadow-2xl p-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-14 h-14 rounded-full hover:bg-purple-100 dark:hover:bg-purple-900/50 flex-center transition"
                >
                  <Minus size={22} />
                </button>
                <span className="mx-10 text-3xl font-black w-16 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 text-white shadow-lg flex-center"
                >
                  <Plus size={22} />
                </button>
              </div>

              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={handleAddToCart}
                disabled={adding}
                className="flex-1 py-6 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 text-white font-bold text-xl rounded-2xl shadow-2xl flex-center gap-4 disabled:opacity-70 transition-all"
              >
                {adding ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full"
                    />
                    যোগ হচ্ছে...
                  </>
                ) : (
                  <>
                    <ShoppingCart size={30} />
                    কার্টে যোগ করুন
                  </>
                )}
              </motion.button>

              <div className="flex gap-3">
                <button
                  onClick={() => setWished(!wished)}
                  className="p-5 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl shadow-xl hover:shadow-2xl transition"
                >
                  <Heart size={28} className={wished ? "fill-red-600 text-red-600" : "text-gray-600"} />
                </button>

                <div className="relative">
                  <button
                    onClick={() => setShowShare(!showShare)}
                    className="p-5 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl shadow-xl hover:shadow-2xl transition"
                  >
                    <Share2 size={28} className="text-gray-700 dark:text-gray-300" />
                  </button>
                  <AnimatePresence>
                    {showShare && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute right-0 top-16 w-48 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-3 border border-gray-200 dark:border-gray-700"
                      >
                        <button onClick={() => handleShare("copy")} className="w-full text-left px-4 py-3 hover:bg-purple-100 dark:hover:bg-purple-900/30 flex items-center gap-3">
                          <Copy size={18} /> লিংক কপি
                        </button>
                        <button onClick={() => handleShare("fb")} className="w-full text-left px-4 py-3 hover:bg-purple-100 flex items-center gap-3">
                          <Facebook size={18} /> Facebook
                        </button>
                        <button onClick={() => handleShare("twitter")} className="w-full text-left px-4 py-3 hover:bg-purple-100 flex items-center gap-3">
                          <Twitter size={18} /> Twitter
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <TrustBadges />
          </motion.div>
        </div>

        {/* Reviews + Related + Recently Viewed */}
        {/* তোমার আগের ReviewsSection, Related Products, Recently Viewed কোড এখানে রাখো */}
      </div>
    </div>
  );
}