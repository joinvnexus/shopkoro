// app/products/[id]/page.tsx

"use client";

import { use, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { productApi } from "@/lib/api";
import useCartStore from "@/stores/cartStore";
import useAuthStore from "@/stores/authStore";
import { Product, ProductReview } from "@/types";
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
  const { id } = use(params);
  const router = useRouter();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImg, setSelectedImg] = useState(0);
  const [adding, setAdding] = useState(false);
  const [wished, setWished] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [reviews, setReviews] = useState<ProductReview[]>([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewComment, setReviewComment] = useState("");
  const [submittingReview, setSubmittingReview] = useState(false);

  const { addItem } = useCartStore();
  const { userInfo } = useAuthStore();

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      try {
        const data = await productApi.getById(id);

        if (!isMounted) return;
        if (!data) {
          setError("প্রোডাক্ট পাওয়া যায়নি।");
          return;
        }
        setProduct(data);
        setError(null);

        setReviewsLoading(true);
        const list = await productApi.getReviews(id);
        if (!isMounted) return;
        setReviews(list);
        const mine = userInfo?._id
          ? list.find((r) => String(r.user) === String(userInfo._id))
          : undefined;
        setReviewRating(mine?.rating ?? 0);
        setReviewComment(mine?.comment ?? "");
      } catch (err) {
        console.error(err);
        if (!isMounted) return;
        setError("প্রোডাক্ট লোড করতে সমস্যা হয়েছে।");
      } finally {
        if (!isMounted) return;
        setReviewsLoading(false);
        setLoading(false);
      }
    };
    load();
    return () => {
      isMounted = false;
    };
  }, [id, userInfo?._id]);

  const handleSubmitReview = async () => {
    if (!userInfo) {
      router.push(`/login?redirect=/products/${id}`);
      return;
    }

    const rating = Number(reviewRating);
    const comment = String(reviewComment || "").trim();

    if (!Number.isFinite(rating) || rating < 1 || rating > 5) {
      toast.error("রেটিং ১ থেকে ৫ এর মধ্যে দিন");
      return;
    }
    if (!comment) {
      toast.error("কমেন্ট লিখুন");
      return;
    }
    if (comment.length > 1000) {
      toast.error("কমেন্ট ১০০০ অক্ষরের মধ্যে লিখুন");
      return;
    }

    setSubmittingReview(true);
    try {
      const updated = await productApi.upsertReview(id, { rating, comment });
      if (!updated) {
        toast.error("রিভিউ সাবমিট করা যায়নি");
        return;
      }
      setProduct(updated);
      setReviews(updated.reviewsList || []);
      toast.success("রিভিউ সেভ হয়েছে!");
    } catch (err: any) {
      console.error(err);
      toast.error(err?.response?.data?.message || "রিভিউ সাবমিট করা যায়নি");
    } finally {
      setSubmittingReview(false);
    }
  };

  const handleAddToCart = () => {
    if (!product) return;
    setAdding(true);
    addItem({
      productId: product._id || product.name,
      name: product.name,
      price: product.price ?? 0,
      image: product.images?.[0] || product.image,
      quantity,
    });
    toast.success("কার্টে যোগ হয়েছে!");
    setTimeout(() => setAdding(false), 1200);
  };

  const handleShare = (type: string) => {
    const url = window.location.href;
    if (!product) return;
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

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-gradient-to-br from-purple-50 to-pink-50 px-6">
        <p className="text-2xl font-bold text-gray-800">প্রোডাক্ট পাওয়া যায়নি</p>
        <div className="flex gap-3">
          <button
            onClick={() => router.push("/products")}
            className="px-5 py-3 rounded-xl bg-purple-600 text-white font-semibold shadow"
          >
            সব প্রোডাক্ট দেখুন
          </button>
          <button
            onClick={() => router.refresh()}
            className="px-5 py-3 rounded-xl bg-white text-purple-700 border border-purple-200 font-semibold shadow-sm"
          >
            আবার চেষ্টা করুন
          </button>
        </div>
        {error && <p className="text-sm text-gray-600">{error}</p>}
      </div>
    );
  }

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

            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images!.map((img: string, i: number) => (
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
                {product.originalPrice && product.originalPrice > product.price && (
                  <div>
                    <span className="text-2xl text-gray-500 line-through">
                      ৳{product.originalPrice!.toLocaleString("bn-BD")}
                    </span>
                    <span className="ml-3 text-xl font-bold text-green-600">
                      -{Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)}%
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
        <div className="mt-16">
          <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/30 dark:border-gray-800 p-6 md:p-10">
            <div className="flex items-center justify-between gap-6 flex-wrap mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-black text-gray-800 dark:text-white">
                  রিভিউ
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                  মোট {product.reviews || 0} টি রিভিউ
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={
                        i < Math.floor(product.rating || 0)
                          ? "fill-yellow-500 text-yellow-500"
                          : "text-gray-300"
                      }
                    />
                  ))}
                </div>
                <span className="font-bold text-gray-700 dark:text-gray-300">
                  {(product.rating || 0).toFixed(1)}
                </span>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-10">
              <div className="space-y-5">
                {reviewsLoading ? (
                  <div className="text-gray-600 dark:text-gray-400">লোড হচ্ছে...</div>
                ) : reviews.length === 0 ? (
                  <div className="text-gray-600 dark:text-gray-400">
                    এখনো কোনো রিভিউ নেই।
                  </div>
                ) : (
                  reviews
                    .slice()
                    .sort(
                      (a, b) =>
                        new Date(b.createdAt || 0).getTime() -
                        new Date(a.createdAt || 0).getTime()
                    )
                    .map((r, idx) => (
                      <div
                        key={`${r.user}-${idx}`}
                        className="bg-white/70 dark:bg-gray-800/70 rounded-2xl border border-gray-200 dark:border-gray-700 p-5"
                      >
                        <div className="flex items-center justify-between gap-4">
                          <div>
                            <p className="font-bold text-gray-800 dark:text-white">
                              {r.name}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              {r.createdAt
                                ? new Date(r.createdAt).toLocaleDateString("bn-BD")
                                : ""}
                            </p>
                          </div>
                          <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={16}
                                className={
                                  i < Math.floor(r.rating || 0)
                                    ? "fill-yellow-500 text-yellow-500"
                                    : "text-gray-300"
                                }
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 mt-4 whitespace-pre-line">
                          {r.comment}
                        </p>
                      </div>
                    ))
                )}
              </div>

              <div className="bg-gradient-to-br from-purple-50/80 via-pink-50/80 to-orange-50/80 dark:from-gray-900 dark:via-purple-950/40 dark:to-pink-950/30 rounded-3xl border border-gray-200 dark:border-gray-800 p-6 md:p-8">
                <h3 className="text-xl font-black text-gray-800 dark:text-white mb-4">
                  আপনার রিভিউ লিখুন
                </h3>

                {!userInfo ? (
                  <button
                    onClick={() => router.push(`/login?redirect=/products/${id}`)}
                    className="w-full py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 text-white font-bold rounded-2xl shadow-xl"
                  >
                    লগইন করে রিভিউ দিন
                  </button>
                ) : (
                  <div className="space-y-5">
                    <div>
                      <p className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                        রেটিং
                      </p>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((v) => (
                          <button
                            key={v}
                            type="button"
                            onClick={() => setReviewRating(v)}
                            className="p-2 rounded-xl bg-white/80 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700"
                            aria-label={`Rate ${v}`}
                          >
                            <Star
                              size={22}
                              className={
                                v <= reviewRating
                                  ? "fill-yellow-500 text-yellow-500"
                                  : "text-gray-300"
                              }
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                        কমেন্ট
                      </p>
                      <textarea
                        value={reviewComment}
                        onChange={(e) => setReviewComment(e.target.value)}
                        rows={5}
                        className="w-full px-4 py-4 bg-white/80 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-500/30"
                        placeholder="আপনার অভিজ্ঞতা লিখুন..."
                      />
                      <div className="text-right text-xs text-gray-500 mt-2">
                        {reviewComment.length}/1000
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleSubmitReview}
                      disabled={submittingReview}
                      className="w-full py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 text-white font-bold rounded-2xl shadow-xl disabled:opacity-70"
                    >
                      {submittingReview ? "সেভ হচ্ছে..." : "রিভিউ সাবমিট করুন"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}