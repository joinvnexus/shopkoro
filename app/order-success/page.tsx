"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Package, Truck, Clock } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { orderApi } from "@/lib/api";
import LoadingScreen from "@/components/ui/LoadingScreen";

interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface Order {
  _id: string;
  items: OrderItem[];
  shippingInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    division: string;
    postalCode?: string;
  };
  paymentMethod: "stripe" | "sslcommerz";
  paymentStatus: "pending" | "paid" | "failed" | "cancelled";
  orderStatus: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  subtotal: number;
  shipping: number;
  total: number;
  transactionId?: string;
  createdAt: string;
  updatedAt: string;
}

export default function OrderSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("id");
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Redirect to home if accessed directly without order ID
    if (!orderId) {
      router.push("/");
      return;
    }

    const fetchOrder = async () => {
      try {
        const response = await orderApi.getOrderById(orderId);
        setOrder(response.order);
        setError(null);
      } catch (err: any) {
        setError(err.response?.data?.message || "অর্ডার লোড করতে সমস্যা হয়েছে");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId, router]);

  // Loading state
  if (loading) {
    return (
      <LoadingScreen
        label="লোড হচ্ছে..."
        variant="plain"
        className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-950 dark:via-green-950/40 dark:to-emerald-950/30"
        spinnerClassName="border-green-200 dark:border-green-800 border-t-green-600 dark:border-t-emerald-500"
      />
    );
  }

  // Error state
  if (error || !order) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-pink-50 dark:from-gray-950">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-3xl shadow-2xl p-10 text-center border border-red-200 dark:border-red-800 max-w-md mx-auto"
        >
          <div className="w-20 h-20 bg-red-100 dark:bg-red-900/50 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">⚠️</span>
          </div>
          <p className="text-red-600 dark:text-red-400 text-xl font-bold mb-4">
            {error || "অর্ডার পাওয়া যায়নি"}
          </p>
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl hover:shadow-lg transition-all"
          >
            হোমপেজে ফিরে যান
          </Link>
        </motion.div>
      </div>
    );
  }

  // Format date in Bengali
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("bn-BD", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Format price in BDT
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("bn-BD", {
      style: "currency",
      currency: "BDT",
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Get payment status text in Bengali
  const getPaymentStatusText = (status: string) => {
    switch (status) {
      case "paid":
        return "পেমেন্ট সম্পন্ন";
      case "pending":
        return "পেমেন্ট পেন্ডিং";
      case "failed":
        return "পেমেন্ট ব্যর্থ";
      case "cancelled":
        return "পেমেন্ট বাতিল";
      default:
        return status;
    }
  };

  // Get order status text in Bengali
  const getOrderStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "পেন্ডিং";
      case "processing":
        return "প্রসেসিং";
      case "shipped":
        return "শিপড";
      case "delivered":
        return "ডেলিভারড";
      case "cancelled":
        return "বাতিল";
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-950 dark:via-green-950/40 dark:to-emerald-950/30 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Success Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
          >
            <CheckCircle size={48} className="text-white" />
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4">
            অর্ডার সফল!
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            আপনার অর্ডারটি সফলভাবে গৃহীত হয়েছে। আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।
          </p>
        </motion.div>

        {/* Order Details Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/80 dark:bg-gray-900/90 backdrop-blur-xl rounded-3xl shadow-xl border border-white/30 dark:border-gray-800 p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-3">
            <Package className="text-purple-600" size={24} />
            অর্ডার বিস্তারিত
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Order Info */}
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400">অর্ডার আইডি</span>
                <span className="font-semibold text-gray-800 dark:text-white">#{order._id}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400">অর্ডার তারিখ</span>
                <span className="font-semibold text-gray-800 dark:text-white">
                  {formatDate(order.createdAt)}
                </span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400">পেমেন্ট স্ট্যাটাস</span>
                <span className={`font-semibold ${
                  order.paymentStatus === "paid" ? "text-green-600" : 
                  order.paymentStatus === "pending" ? "text-yellow-600" : 
                  "text-red-600"
                }`}>
                  {getPaymentStatusText(order.paymentStatus)}
                </span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="text-gray-600 dark:text-gray-400">অর্ডার স্ট্যাটাস</span>
                <span className={`font-semibold ${
                  order.orderStatus === "delivered" ? "text-green-600" : 
                  order.orderStatus === "processing" ? "text-blue-600" : 
                  order.orderStatus === "shipped" ? "text-purple-600" : 
                  order.orderStatus === "cancelled" ? "text-red-600" : 
                  "text-yellow-600"
                }`}>
                  {getOrderStatusText(order.orderStatus)}
                </span>
              </div>
            </div>

            {/* Next Steps */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                পরবর্তী পদক্ষেপ
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                  <Clock className="text-blue-600 mt-1" size={20} />
                  <div>
                    <h4 className="font-medium text-blue-800 dark:text-blue-400">কনফার্মেশন</h4>
                    <p className="text-sm text-blue-600 dark:text-blue-500">
                      ২৪ ঘণ্টার মধ্যে ইমেইল/ফোন কনফার্মেশন পাবেন
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                  <Package className="text-purple-600 mt-1" size={20} />
                  <div>
                    <h4 className="font-medium text-purple-800 dark:text-purple-400">প্যাকেজিং</h4>
                    <p className="text-sm text-purple-600 dark:text-purple-500">
                      আপনার অর্ডার প্যাকেজিং করা হচ্ছে
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-orange-50 dark:bg-orange-900/20 rounded-xl">
                  <Truck className="text-orange-600 mt-1" size={20} />
                  <div>
                    <h4 className="font-medium text-orange-800 dark:text-orange-400">ডেলিভারি</h4>
                    <p className="text-sm text-orange-600 dark:text-orange-500">
                      ৩-৫ কার্যদিবসের মধ্যে ডেলিভারি
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Ordered Items */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white/80 dark:bg-gray-900/90 backdrop-blur-xl rounded-3xl shadow-xl border border-white/30 dark:border-gray-800 p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-3">
            <Package className="text-purple-600" size={24} />
            অর্ডারকৃত পণ্য
          </h2>

          <div className="space-y-4 mb-6">
            {order.items.map((item, index) => (
              <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                )}
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 dark:text-white">{item.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {formatPrice(item.price)} × {item.quantity}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-800 dark:text-white">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-2">
            <div className="flex justify-between text-gray-600 dark:text-gray-400">
              <span>সাবটোটাল</span>
              <span>{formatPrice(order.subtotal)}</span>
            </div>
            <div className="flex justify-between text-gray-600 dark:text-gray-400">
              <span>ডেলিভারি চার্জ</span>
              <span>{formatPrice(order.shipping)}</span>
            </div>
            <div className="flex justify-between text-lg font-bold text-gray-800 dark:text-white pt-2 border-t border-gray-200 dark:border-gray-700">
              <span>মোট</span>
              <span>{formatPrice(order.total)}</span>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/products"
            className="px-8 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-300 text-center"
          >
            আরও শপিং করুন
          </Link>
          <Link
            href={`/profile?order=${order._id}`}
            className="px-8 py-4 border-2 border-purple-600 text-purple-600 dark:text-purple-400 font-bold text-lg rounded-2xl hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all duration-300 text-center"
          >
            অর্ডার ট্র্যাক করুন
          </Link>
        </motion.div>

        {/* Support Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-12 p-6 bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl rounded-2xl border border-white/30 dark:border-gray-800"
        >
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
            সাহায্য প্রয়োজন?
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            যেকোনো প্রশ্নের জন্য আমাদের সাথে যোগাযোগ করুন
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm">
            <span className="text-gray-600 dark:text-gray-400">
              📧 support@shopkoro.com
            </span>
            <span className="text-gray-600 dark:text-gray-400">
              📱 +880 1234-567890
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}