"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  ShoppingCart,
  DollarSign,
  Package,
  Eye,
  Calendar,
  Download,
  Filter
} from "lucide-react";
import LoadingScreen from "@/components/ui/LoadingScreen";

interface ReportData {
  totalRevenue: number;
  totalOrders: number;
  totalUsers: number;
  totalProducts: number;
  monthlyRevenue: number[];
  monthlyOrders: number[];
  topProducts: Array<{
    name: string;
    sales: number;
    revenue: number;
  }>;
  recentOrders: Array<{
    id: string;
    customer: string;
    amount: number;
    status: string;
    date: string;
  }>;
}

export default function AdminReportsPage() {
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState("30d");

  useEffect(() => {
    // Simulate API call
    const fetchReports = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1500));

      const mockData: ReportData = {
        totalRevenue: 2456800,
        totalOrders: 1247,
        totalUsers: 892,
        totalProducts: 156,
        monthlyRevenue: [185000, 210000, 195000, 225000, 240000, 265000, 280000, 295000, 310000, 325000, 340000, 245680],
        monthlyOrders: [85, 92, 88, 105, 118, 132, 145, 152, 168, 175, 182, 124],
        topProducts: [
          { name: "iPhone 15 Pro", sales: 45, revenue: 225000 },
          { name: "Samsung Galaxy S24", sales: 38, revenue: 190000 },
          { name: "MacBook Air M3", sales: 28, revenue: 280000 },
          { name: "Dell XPS 13", sales: 22, revenue: 165000 },
          { name: "iPad Pro", sales: 19, revenue: 152000 }
        ],
        recentOrders: [
          { id: "ORD001", customer: "রহিম আহমেদ", amount: 25000, status: "delivered", date: "2024-01-15" },
          { id: "ORD002", customer: "সোনিয়া আক্তার", amount: 15000, status: "processing", date: "2024-01-15" },
          { id: "ORD003", customer: "করিম রহমান", amount: 35000, status: "shipped", date: "2024-01-14" },
          { id: "ORD004", customer: "ফাতেমা বেগম", amount: 12000, status: "pending", date: "2024-01-14" },
          { id: "ORD005", customer: "জাহিদ হাসান", amount: 45000, status: "delivered", date: "2024-01-13" }
        ]
      };

      setReportData(mockData);
      setLoading(false);
    };

    fetchReports();
  }, [dateRange]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("bn-BD", {
      style: "currency",
      currency: "BDT",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered": return "text-green-600 bg-green-100 dark:bg-green-900/30";
      case "processing": return "text-blue-600 bg-blue-100 dark:bg-blue-900/30";
      case "shipped": return "text-purple-600 bg-purple-100 dark:bg-purple-900/30";
      case "pending": return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30";
      default: return "text-gray-600 bg-gray-100 dark:bg-gray-900/30";
    }
  };

  if (loading) {
    return <LoadingScreen variant="plain" label="লোড হচ্ছে..." />;
  }

  if (!reportData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600 dark:text-gray-400">রিপোর্ট লোড করতে সমস্যা হয়েছে</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">রিপোর্ট এবং অ্যানালিটিক্স</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">ব্যবসায়িক পারফরম্যান্স এবং ট্রেন্ডস</p>
        </div>
        <div className="flex items-center gap-4">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="7d">গত ৭ দিন</option>
            <option value="30d">গত ৩০ দিন</option>
            <option value="90d">গত ৩ মাস</option>
            <option value="1y">গত ১ বছর</option>
          </select>
          <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2">
            <Download size={16} />
            এক্সপোর্ট
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">মোট রেভেন্যু</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white mt-1">
                {formatCurrency(reportData.totalRevenue)}
              </p>
              <div className="flex items-center mt-2">
                <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                <span className="text-sm text-green-600">+12.5%</span>
              </div>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <DollarSign className="text-green-600 dark:text-green-400" size={24} />
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
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">মোট অর্ডার</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white mt-1">
                {reportData.totalOrders.toLocaleString("bn-BD")}
              </p>
              <div className="flex items-center mt-2">
                <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                <span className="text-sm text-green-600">+8.2%</span>
              </div>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <ShoppingCart className="text-blue-600 dark:text-blue-400" size={24} />
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
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">মোট ব্যবহারকারী</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white mt-1">
                {reportData.totalUsers.toLocaleString("bn-BD")}
              </p>
              <div className="flex items-center mt-2">
                <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                <span className="text-sm text-green-600">+15.3%</span>
              </div>
            </div>
            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <Users className="text-purple-600 dark:text-purple-400" size={24} />
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
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">মোট প্রোডাক্ট</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white mt-1">
                {reportData.totalProducts.toLocaleString("bn-BD")}
              </p>
              <div className="flex items-center mt-2">
                <TrendingDown className="w-4 h-4 text-red-600 mr-1" />
                <span className="text-sm text-red-600">-2.1%</span>
              </div>
            </div>
            <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
              <Package className="text-orange-600 dark:text-orange-400" size={24} />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">মাসিক রেভেন্যু</h3>
            <BarChart3 className="text-purple-600" size={20} />
          </div>
          <div className="h-64 flex items-end justify-between gap-2">
            {reportData.monthlyRevenue.map((revenue, index) => {
              const height = (revenue / Math.max(...reportData.monthlyRevenue)) * 100;
              const monthNames = ["জানু", "ফেব্রু", "মার্চ", "এপ্রিল", "মে", "জুন", "জুলাই", "আগস্ট", "সেপ্টে", "অক্টো", "নভে", "ডিসে"];
              return (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div
                    className="w-full bg-gradient-to-t from-purple-600 to-pink-600 rounded-t mb-2 transition-all hover:from-purple-700 hover:to-pink-700"
                    style={{ height: `${height}%`, minHeight: "20px" }}
                  ></div>
                  <span className="text-xs text-gray-600 dark:text-gray-400 transform -rotate-45">
                    {monthNames[index]}
                  </span>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Orders Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">মাসিক অর্ডার</h3>
            <ShoppingCart className="text-blue-600" size={20} />
          </div>
          <div className="h-64 flex items-end justify-between gap-2">
            {reportData.monthlyOrders.map((orders, index) => {
              const height = (orders / Math.max(...reportData.monthlyOrders)) * 100;
              const monthNames = ["জানু", "ফেব্রু", "মার্চ", "এপ্রিল", "মে", "জুন", "জুলাই", "আগস্ট", "সেপ্টে", "অক্টো", "নভে", "ডিসে"];
              return (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div
                    className="w-full bg-gradient-to-t from-blue-600 to-cyan-600 rounded-t mb-2 transition-all hover:from-blue-700 hover:to-cyan-700"
                    style={{ height: `${height}%`, minHeight: "20px" }}
                  ></div>
                  <span className="text-xs text-gray-600 dark:text-gray-400 transform -rotate-45">
                    {monthNames[index]}
                  </span>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700"
        >
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">টপ প্রোডাক্ট</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {reportData.topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 dark:text-white">{product.name}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{product.sales} টি বিক্রি</p>
                    </div>
                  </div>
                  <p className="font-semibold text-gray-800 dark:text-white">
                    {formatCurrency(product.revenue)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Recent Orders */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700"
        >
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">সাম্প্রতিক অর্ডার</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {reportData.recentOrders.map((order, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-800 dark:text-white">{order.id}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{order.customer}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-800 dark:text-white">
                      {formatCurrency(order.amount)}
                    </p>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                      {order.status === "delivered" ? "ডেলিভারড" :
                       order.status === "processing" ? "প্রসেসিং" :
                       order.status === "shipped" ? "শিপড" :
                       order.status === "pending" ? "পেন্ডিং" : order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}