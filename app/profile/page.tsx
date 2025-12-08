"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import useAuthStore from "@/stores/authStore";
import { useRouter } from "next/navigation";
import { userApi } from "@/lib/api";
import { User, Mail, Shield, LogOut, Settings } from "lucide-react";
import { ShoppingCart, Heart, Eye } from "lucide-react";
interface UserProfile {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

const ProfilePage = () => {
  const { userInfo, logout } = useAuthStore();
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userInfo) {
      router.push("/login");
      return;
    }

    const fetchUserProfile = async () => {
      try {
        const data = await userApi.getProfile();
        setUser(data);
      } catch (err: any) {
        setError(
          err.response?.data?.message || "প্রোফাইল লোড করতে সমস্যা হয়েছে"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [userInfo, router]);

  const handleLogout = () => {
    logout();
    router.push("/");
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

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-white/80 dark:bg-gray-900/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20"
            >
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                দ্রুত অ্যাকশন
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {["অর্ডার হিস্ট্রি", "উইশলিস্ট", "ঠিকানা", "পেমেন্ট মেথড"].map(
                  (item, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ x: 10 }}
                      className="text-left py-4 px-6 bg-gray-50 dark:bg-gray-800/50 rounded-2xl hover:bg-purple-50 dark:hover:bg-purple-900/30 transition-all group"
                    >
                      <span className="font-semibold text-gray-800 dark:text-white group-hover:text-purple-600 dark:group-hover:text-pink-400">
                        {item}
                      </span>
                    </motion.button>
                  )
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfilePage;
