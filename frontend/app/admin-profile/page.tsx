"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import LoadingScreen from "@/components/ui/LoadingScreen";
import { User, Mail, Shield, Calendar, Clock, Home, Package, ShoppingCart, Users } from "lucide-react";
import Link from "next/link";
import { adminApi } from "@/lib/api";
import useAuthStore from "@/stores/authStore";
import { useRouter } from "next/navigation";

interface AdminProfile {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  createdAt?: string; // placeholder
}

const AdminProfilePage = () => {
  const { userInfo, logout, grantDashboardAccess } = useAuthStore();
  const router = useRouter();
  const [admin, setAdmin] = useState<AdminProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminProfile = async () => {
      try {
        const adminData = await adminApi.getProfile();
        setAdmin(adminData);
      } catch (err: any) {
        console.error("Failed to fetch admin profile:", err);
        // Fallback to userInfo if API fails
        setAdmin({
          _id: userInfo!._id,
          name: userInfo!.name,
          email: userInfo!.email,
          isAdmin: userInfo!.isAdmin,
          createdAt: new Date().toISOString(), // placeholder
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAdminProfile();
  }, [userInfo]);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const handleGoToDashboard = () => {
    grantDashboardAccess();
    router.push("/admin");
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("bn-BD", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const quickActions = [
    {
      title: "ড্যাশবোর্ড",
      description: "অ্যাডমিন ড্যাশবোর্ড দেখুন",
      icon: Home,
      onClick: handleGoToDashboard,
      href: undefined,
      color: "from-blue-500 to-cyan-600",
    },
    {
      title: "পণ্য ম্যানেজ করুন",
      description: "পণ্য যোগ, এডিট এবং ডিলিট করুন",
      icon: Package,
      onClick: undefined,
      href: "/admin/products",
      color: "from-green-500 to-emerald-600",
    },
    {
      title: "অর্ডার দেখুন",
      description: "অর্ডার ম্যানেজ এবং ট্র্যাক করুন",
      icon: ShoppingCart,
      onClick: undefined,
      href: "/admin/orders",
      color: "from-purple-500 to-indigo-600",
    },
    {
      title: "ইউজার ম্যানেজমেন্ট",
      description: "ইউজার একাউন্টস ম্যানেজ করুন",
      icon: Users,
      onClick: undefined,
      href: "/admin/users",
      color: "from-orange-500 to-red-600",
    },
  ];

  if (loading) {
    return <LoadingScreen label="লোড হচ্ছে..." variant="gradient" />;
  }

  if (!admin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 dark:text-gray-400">প্রোফাইল লোড করতে সমস্যা হয়েছে</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* Profile Card */}
          <motion.div whileHover={{ scale: 1.02 }} className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700 text-center">
              <div className="relative mx-auto w-24 h-24 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-full p-1 mb-6">
                <div className="w-full h-full rounded-full bg-white dark:bg-gray-900 flex items-center justify-center text-3xl font-black text-transparent bg-clip-text bg-gradient-to-br from-purple-600 to-orange-600">
                  {admin.name.charAt(0).toUpperCase()}
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                {admin.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {admin.email}
              </p>

              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full font-medium shadow-lg mb-6">
                <Shield size={16} />
                <span>অ্যাডমিন</span>
              </div>

              <button
                onClick={handleLogout}
                className="w-full py-3 bg-red-500 hover:bg-red-600 text-white font-medium rounded-xl shadow-lg transition-colors"
              >
                লগআউট করুন
              </button>
            </div>
          </motion.div>

          {/* Info and Actions */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700"
            >
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">বেসিক ইনফো</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-600 dark:text-gray-400">নাম:</span>
                  <span className="font-medium text-gray-800 dark:text-white">{admin.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-600 dark:text-gray-400">ইমেইল:</span>
                  <span className="font-medium text-gray-800 dark:text-white">{admin.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-600 dark:text-gray-400">রোল:</span>
                  <span className="font-medium text-gray-800 dark:text-white">অ্যাডমিন</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-600 dark:text-gray-400">জয়েনড:</span>
                  <span className="font-medium text-gray-800 dark:text-white">{formatDate(admin.createdAt || "")}</span>
                </div>
              </div>
            </motion.div>

            {/* Security Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700"
            >
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">সিকিউরিটি ইনফো</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-600 dark:text-gray-400">লাস্ট লগিন:</span>
                  <span className="font-medium text-gray-800 dark:text-white">{new Date().toLocaleDateString("bn-BD")}</span>
                </div>
                {/* Add more security info as needed */}
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700"
            >
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">কুইক অ্যাকশন</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quickActions.map((action, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {action.onClick ? (
                      <button
                        onClick={action.onClick}
                        className={`block w-full p-4 bg-gradient-to-r ${action.color} text-white rounded-xl shadow-lg hover:shadow-xl transition-all text-left`}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <action.icon size={24} />
                          <h4 className="font-bold">{action.title}</h4>
                        </div>
                        <p className="text-sm opacity-90">{action.description}</p>
                      </button>
                    ) : (
                      <Link
                        href={action.href!}
                        className={`block p-4 bg-gradient-to-r ${action.color} text-white rounded-xl shadow-lg hover:shadow-xl transition-all`}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <action.icon size={24} />
                          <h4 className="font-bold">{action.title}</h4>
                        </div>
                        <p className="text-sm opacity-90">{action.description}</p>
                      </Link>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminProfilePage;