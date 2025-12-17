"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import useAuthStore from "@/stores/authStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { userApi, orderApi } from "@/lib/api";
import { User, Mail, Shield, LogOut, Settings } from "lucide-react";
import { ShoppingCart, Heart, Eye, Package, Clock, Calendar, CreditCard } from "lucide-react";
import { useSearchParams } from "next/navigation";
interface UserProfile {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

const ProfilePage = () => {
  const { userInfo, logout } = useAuthStore();
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order");
  const [user, setUser] = useState<UserProfile | null>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("orders");

  useEffect(() => {
    if (!userInfo) {
      router.push("/login");
      return;
    }

    const fetchUserData = async () => {
      try {
        // Fetch user profile
        const userData = await userApi.getProfile();
        setUser(userData);
        
        // Fetch user orders
        const ordersData = await orderApi.getUserOrders();
        setOrders(ordersData.orders || []);
        
        // If orderId is provided in URL, fetch that order
        if (orderId) {
          setActiveTab("orders");
          try {
            const orderData = await orderApi.getOrderById(orderId);
            setSelectedOrder(orderData.order);
          } catch (err: any) {
            setError(
              err.response?.data?.message || "অর্ডার লোড করতে সমস্যা হয়েছে"
            );
          }
        }
      } catch (err: any) {
        setError(
          err.response?.data?.message || "ডেটা লোড করতে সমস্যা হয়েছে"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userInfo, router, orderId]);

  const handleLogout = () => {
    logout();
    router.push("/");
  };
  
  // Helper functions
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("bn-BD", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("bn-BD", {
      style: "currency",
      currency: "BDT",
      minimumFractionDigits: 0,
    }).format(price);
  };
  
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
  
  const getOrderStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "text-green-600";
      case "processing":
        return "text-blue-600";
      case "shipped":
        return "text-purple-600";
      case "cancelled":
        return "text-red-600";
      default:
        return "text-yellow-600";
    }
  };

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-gray-950 dark:via-purple-950/40">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-8 border-purple-200 dark:border-purple-800 border-t-purple-600 dark:border-t-pink-500 rounded-full"
        />
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-pink-50 dark:from-gray-950">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-3xl shadow-2xl p-10 text-center border border-red-200 dark:border-red-800"
        >
          <div className="w-20 h-20 bg-red-100 dark:bg-red-900/50 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">Warning</span>
          </div>
          <p className="text-red-600 dark:text-red-400 text-xl font-bold">
            {error}
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-gray-950 dark:via-purple-950/40 dark:to-pink-950/30 py-12 px-4">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* Profile Card */}
          <motion.div whileHover={{ scale: 1.02 }} className="lg:col-span-1">
            <div className="bg-white/80 dark:bg-gray-900/90 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 border border-white/30 dark:border-gray-800 text-center">
              <div className="relative mx-auto w-32 h-32 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-full p-1 mb-6">
                <div className="w-full h-full rounded-full bg-white dark:bg-gray-900 flex items-center justify-center text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-purple-600 to-orange-600">
                  {user?.name.charAt(0).toUpperCase()}
                </div>
              </div>

              <h2 className="text-3xl font-black text-gray-800 dark:text-white mb-2">
                {user?.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {user?.email}
              </p>

              {user?.isAdmin && (
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-full font-bold shadow-lg mb-6">
                  <Shield size={20} />
                  <span>অ্যাডমিন</span>
                </div>
              )}

              <div className="space-y-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all"
                >
                  <Settings size={20} className="inline mr-2" />
                  প্রোফাইল সেটিংস
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
                  className="w-full py-4 bg-gradient-to-r from-red-500 to-pink-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all"
                >
                  <LogOut size={20} className="inline mr-2" />
                  লগআউট করুন
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Info Cards */}
          <div className="lg:col-span-2 space-y-6">
            {/* Welcome Card */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 rounded-3xl p-1"
            >
              <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 text-center">
                <h3 className="text-4xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent mb-3">
                  স্বাগতম, {user?.name.split(" ")[0]}!
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                  আপনার অর্ডার, উইশলিস্ট ও সেটিংস এখানে পাবেন
                </p>
              </div>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                {
                  label: "মোট অর্ডার",
                  value: parseInt("47"),
                  icon: ShoppingCart,
                  color: "from-blue-500 to-cyan-600",
                },
                {
                  label: "উইশলিস্ট",
                  value: "২৩",
                  icon: Heart,
                  color: "from-pink-500 to-rose-600",
                },
                {
                  label: "রিভিউ",
                  value: "১.২ক",
                  icon: Eye,
                  color: "from-purple-500 to-indigo-600",
                },
                {
                  label: "সেভ করেছেন",
                  value: "৳৮,৪৫০",
                  icon: "Savings",
                  color: "from-green-500 to-emerald-600",
                },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  whileHover={{ scale: 1.08, rotate: 2 }}
                  className="bg-white/80 dark:bg-gray-900/90 backdrop-blur-xl rounded-3xl p-6 text-center shadow-xl border border-white/20"
                >
                  <div
                    className={`w-14 h-14 mx-auto mb-4 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center shadow-lg`}
                  >
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-3xl font-black text-gray-800 dark:text-white">
                    {stat.value}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Tabs */}
            <div className="bg-white/80 dark:bg-gray-900/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 mb-6 overflow-hidden">
              <div className="flex border-b border-gray-200 dark:border-gray-700">
                {[
                  { id: "orders", label: "অর্ডার হিস্ট্রি", icon: Package },
                  { id: "wishlist", label: "উইশলিস্ট", icon: Heart },
                  { id: "address", label: "ঠিকানা", icon: User },
                  { id: "payment", label: "পেমেন্ট মেথড", icon: CreditCard },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 py-4 px-4 font-medium transition-all flex items-center justify-center gap-2 ${
                      activeTab === tab.id
                        ? "text-purple-600 border-b-2 border-purple-600 bg-purple-50 dark:bg-purple-900/20"
                        : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white"
                    }`}
                  >
                    <tab.icon size={18} />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>
              
              {/* Tab Content */}
              <div className="p-6">
                {activeTab === "orders" && (
                  <div className="space-y-4">
                    {selectedOrder ? (
                      // Selected Order Details
                      <div className="space-y-4">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-xl font-bold text-gray-800 dark:text-white">অর্ডার #{selectedOrder._id}</h3>
                          <button
                            onClick={() => setSelectedOrder(null)}
                            className="text-purple-600 hover:text-purple-800 font-medium"
                          >
                            ← সব অর্ডার দেখুন
                          </button>
                        </div>
                        
                        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 space-y-3">
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">অর্ডার তারিখ</span>
                            <span className="font-medium">{formatDate(selectedOrder.createdAt)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">পেমেন্ট মেথড</span>
                            <span className="font-medium">{selectedOrder.paymentMethod === "sslcommerz" ? "এসএসএল কমার্জ" : "স্ট্রাইপ"}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">অর্ডার স্ট্যাটাস</span>
                            <span className={`font-medium ${getOrderStatusColor(selectedOrder.orderStatus)}`}>
                              {getOrderStatusText(selectedOrder.orderStatus)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">পেমেন্ট স্ট্যাটাস</span>
                            <span className={`font-medium ${
                              selectedOrder.paymentStatus === "paid" ? "text-green-600" : 
                              selectedOrder.paymentStatus === "pending" ? "text-yellow-600" : 
                              "text-red-600"
                            }`}>
                              {selectedOrder.paymentStatus === "paid" ? "পেমেন্ট সম্পন্ন" : 
                               selectedOrder.paymentStatus === "pending" ? "পেমেন্ট পেন্ডিং" : 
                               "পেমেন্ট ব্যর্থ"}
                            </span>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <h4 className="font-medium text-gray-800 dark:text-white">অর্ডারকৃত পণ্য</h4>
                          {selectedOrder.items.map((item: any, index: number) => (
                            <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                              {item.image && (
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-16 h-16 object-cover rounded-lg"
                                />
                              )}
                              <div className="flex-1">
                                <h5 className="font-medium text-gray-800 dark:text-white">{item.name}</h5>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  {formatPrice(item.price)} × {item.quantity}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="font-medium text-gray-800 dark:text-white">
                                  {formatPrice(item.price * item.quantity)}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        <div className="border-t border-gray-200 dark:border-gray-700 pt-3 space-y-2">
                          <div className="flex justify-between text-gray-600 dark:text-gray-400">
                            <span>সাবটোটাল</span>
                            <span>{formatPrice(selectedOrder.subtotal)}</span>
                          </div>
                          <div className="flex justify-between text-gray-600 dark:text-gray-400">
                            <span>ডেলিভারি চার্জ</span>
                            <span>{formatPrice(selectedOrder.shipping)}</span>
                          </div>
                          <div className="flex justify-between text-lg font-bold text-gray-800 dark:text-white pt-2 border-t border-gray-200 dark:border-gray-700">
                            <span>মোট</span>
                            <span>{formatPrice(selectedOrder.total)}</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      // Order List
                      <>
                        {orders.length === 0 ? (
                          <div className="text-center py-12">
                            <Package className="mx-auto text-gray-400 mb-4" size={48} />
                            <p className="text-gray-600 dark:text-gray-400">আপনার কোনো অর্ডার নেই</p>
                            <Link
                              href="/products"
                              className="inline-block mt-4 px-6 py-3 bg-purple-600 text-white font-medium rounded-xl hover:bg-purple-700 transition-colors"
                            >
                              শপিং করুন
                            </Link>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            {orders.map((order: any) => (
                              <div
                                key={order._id}
                                className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800/70 transition-colors cursor-pointer"
                                onClick={() => setSelectedOrder(order)}
                              >
                                <div className="flex justify-between items-start mb-2">
                                  <div>
                                    <h4 className="font-medium text-gray-800 dark:text-white">অর্ডার #{order._id}</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">{formatDate(order.createdAt)}</p>
                                  </div>
                                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getOrderStatusColor(order.orderStatus)} bg-opacity-10`}>
                                    {getOrderStatusText(order.orderStatus)}
                                  </span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {order.items.length} {order.items.length === 1 ? "পণ্য" : "টি পণ্য"}
                                  </p>
                                  <p className="font-medium text-gray-800 dark:text-white">{formatPrice(order.total)}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                )}
                
                {activeTab === "wishlist" && (
                  <div className="text-center py-12">
                    <Heart className="mx-auto text-gray-400 mb-4" size={48} />
                    <p className="text-gray-600 dark:text-gray-400">আপনার উইশলিস্ট খালি</p>
                    <Link
                      href="/products"
                      className="inline-block mt-4 px-6 py-3 bg-purple-600 text-white font-medium rounded-xl hover:bg-purple-700 transition-colors"
                    >
                      পণ্য দেখুন
                    </Link>
                  </div>
                )}
                
                {activeTab === "address" && (
                  <div className="text-center py-12">
                    <User className="mx-auto text-gray-400 mb-4" size={48} />
                    <p className="text-gray-600 dark:text-gray-400 mb-4">আপনার কোনো সেভ করা ঠিকানা নেই</p>
                    <button className="px-6 py-3 bg-purple-600 text-white font-medium rounded-xl hover:bg-purple-700 transition-colors">
                      ঠিকানা যোগ করুন
                    </button>
                  </div>
                )}
                
                {activeTab === "payment" && (
                  <div className="text-center py-12">
                    <CreditCard className="mx-auto text-gray-400 mb-4" size={48} />
                    <p className="text-gray-600 dark:text-gray-400 mb-4">আপনার কোনো সেভ করা পেমেন্ট মেথড নেই</p>
                    <button className="px-6 py-3 bg-purple-600 text-white font-medium rounded-xl hover:bg-purple-700 transition-colors">
                      পেমেন্ট মেথড যোগ করুন
                    </button>
                  </div>
                )}


                
                {activeTab === "payment" && (
                  <div className="text-center py-12">
                    <CreditCard className="mx-auto text-gray-400 mb-4" size={48} />
                    <p className="text-gray-600 dark:text-gray-400 mb-4">আপনার কোনো সেভ করা পেমেন্ট মেথড নেই</p>
                    <button className="px-6 py-3 bg-purple-600 text-white font-medium rounded-xl hover:bg-purple-700 transition-colors">
                      পেমেন্ট মেথড যোগ করুন
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfilePage;
