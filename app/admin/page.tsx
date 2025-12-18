
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import useAuthStore from "@/stores/authStore";
import {
  ShoppingCart,
  Users,
  Package,
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  BarChart3,
  Eye,
} from "lucide-react";

interface DashboardStats {
  totalOrders: number;
  totalUsers: number;
  totalProducts: number;
  totalRevenue: number;
  pendingOrders: number;
  recentOrders: any[];
  recentUsers: any[];
}

const AdminDashboard = () => {
  const { userInfo, logout } = useAuthStore();
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats>({
    totalOrders: 0,
    totalUsers: 0,
    totalProducts: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    recentOrders: [],
    recentUsers: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is admin
    if (userInfo && !userInfo.isAdmin) {
      router.push("/");
      return;
    }

    // Fetch dashboard data
    const fetchDashboardData = async () => {
      try {
        // Mock data - in a real app, these would come from API calls
        setStats({
          totalOrders: 124,
          totalUsers: 89,
          totalProducts: 45,
          totalRevenue: 245680,
          pendingOrders: 8,
          recentOrders: [
            { _id: "ORD001", user: { name: "জন ডো" }, total: 1200, status: "delivered" },
            { _id: "ORD002", user: { name: "জেন স্মিথ" }, total: 850, status: "processing" },
            { _id: "ORD003", user: { name: "রবিন উইলিয়ামস" }, total: 2100, status: "shipped" },
          ],
          recentUsers: [
            { _id: "USR001", name: "জন ডো", email: "john@example.com", isActive: true },
            { _id: "USR002", name: "জেন স্মিথ", email: "jane@example.com", isActive: true },
            { _id: "USR003", name: "রবিন উইলিয়ামস", email: "robin@example.com", isActive: false },
          ],
        });
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [userInfo, router]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("bn-BD", {
      style: "currency",
      currency: "BDT",
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("bn-BD", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return <CheckCircle className="text-green-600" size={20} />;
      case "cancelled":
        return <XCircle className="text-red-600" size={20} />;
      case "shipped":
        return <Package className="text-purple-600" size={20} />;
      case "processing":
        return <Clock className="text-blue-600" size={20} />;
      default:
        return <Clock className="text-yellow-600" size={20} />;
    }
  };

  const getStatusText = (status: string) => {
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "text-green-600 bg-green-100 dark:bg-green-900/30";
      case "cancelled":
        return "text-red-600 bg-red-100 dark:bg-red-900/30";
      case "shipped":
        return "text-purple-600 bg-purple-100 dark:bg-purple-900/30";
      case "processing":
        return "text-blue-600 bg-blue-100 dark:bg-blue-900/30";
      default:
        return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-8 border-purple-200 dark:border-purple-800 border-t-purple-600 dark:border-t-pink-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
            ড্যাশবোর্ড
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            ShopKoro অ্যাডমিন প্যানেল
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
            {userInfo?.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="text-sm font-medium text-gray-800 dark:text-white">
              {userInfo?.name}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              অ্যাডমিন
            </p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">মোট অর্ডার</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white mt-1">
                {stats.totalOrders}
              </p>
            </div>
            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <ShoppingCart className="text-purple-600 dark:text-purple-400" size={24} />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">মোট ব্যবহারকারী</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white mt-1">
                {stats.totalUsers}
              </p>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <Users className="text-green-600 dark:text-green-400" size={24} />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">মোট পণ্য</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white mt-1">
                {stats.totalProducts}
              </p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <Package className="text-blue-600 dark:text-blue-400" size={24} />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">মোট রাজস্ব</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white mt-1">
                {formatCurrency(stats.totalRevenue)}
              </p>
            </div>
            <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
              <DollarSign className="text-yellow-600 dark:text-yellow-400" size={24} />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Recent Orders & Users */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700"
        >
          <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white">
              সাম্প্রতিক অর্ডার
            </h3>
            <Link
              href="/admin/orders"
              className="text-sm text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300 font-medium"
            >
              সব দেখুন
            </Link>
          </div>
          <div className="p-6">
            {stats.recentOrders.length > 0 ? (
              <div className="space-y-4">
                {stats.recentOrders.map((order, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-800 dark:text-white">
                        {order._id}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {order.user.name}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}
                      >
                        {getStatusIcon(order.status)}
                        <span className="ml-1">{getStatusText(order.status)}</span>
                      </span>
                      <span className="text-sm font-medium text-gray-800 dark:text-white">
                        {formatCurrency(order.total)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                কোনো অর্ডার নেই
              </p>
            )}
          </div>
        </motion.div>

        {/* Recent Users */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700"
        >
          <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white">
              সাম্প্রতিক ব্যবহারকারী
            </h3>
            <Link
              href="/admin/users"
              className="text-sm text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300 font-medium"
            >
              সব দেখুন
            </Link>
          </div>
          <div className="p-6">
            {stats.recentUsers.length > 0 ? (
              <div className="space-y-4">
                {stats.recentUsers.map((user, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-800 dark:text-white">
                        {user.name}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {user.email}
                      </p>
                    </div>
                    <div>
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${user.isActive
                          ? "text-green-600 bg-green-100 dark:bg-green-900/30"
                          : "text-red-600 bg-red-100 dark:bg-red-900/30"
                        }`}
                      >
                        {user.isActive ? "সক্রিয়" : "নিষ্ক্রিয়"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                কোনো ব্যবহারকারী নেই
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
