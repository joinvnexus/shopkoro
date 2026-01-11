"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  Download,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  CheckCircle,
  XCircle,
  Eye,
  Edit,
  Trash2,
  Shield,
  Crown,
} from "lucide-react";
import { userApi } from "@/lib/api";
import LoadingScreen from "@/components/ui/LoadingScreen";
import useAuthStore from "@/stores/authStore";

interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  area: string;
  postalCode: string;
  isAdmin: boolean;
  isActive: boolean;
  createdAt: string;
  lastLogin: string;
  ordersCount: number;
  totalSpent: number;
}

const UsersPage = () => {
  const { userInfo } = useAuthStore();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await userApi.getAllUsers();
        setUsers(data.users || []);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole = selectedRole === "all" ||
      (selectedRole === "admin" && user.isAdmin) ||
      (selectedRole === "customer" && !user.isAdmin);

    const matchesStatus = selectedStatus === "all" ||
      (selectedStatus === "active" && user.isActive) ||
      (selectedStatus === "inactive" && !user.isActive);

    const notCurrentAdmin = user._id !== userInfo?._id;

    return matchesSearch && matchesRole && matchesStatus && notCurrentAdmin;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("bn-BD", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return <LoadingScreen variant="plain" label="লোড হচ্ছে..." />;
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
            ব্যবহারকারী
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            সমস্ত ব্যবহারকারী পরিচালনা করুন
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
          <Download size={18} />
          <span>রিপোর্ট ডাউনলোড</span>
        </button>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="ব্যবহারকারী অনুসন্ধান করুন..."
            className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <select
              className="appearance-none pl-3 pr-10 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
            >
              <option value="all">সকল রোল</option>
              <option value="customer">গ্রাহক</option>
              <option value="admin">অ্যাডমিন</option>
            </select>
            <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          </div>
          <div className="relative">
            <select
              className="appearance-none pl-3 pr-10 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="all">সকল স্ট্যাটাস</option>
              <option value="active">সক্রিয়</option>
              <option value="inactive">নিষ্ক্রিয়</option>
            </select>
            <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          </div>
          <button className="p-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
            <Filter size={20} />
          </button>
        </div>
      </div>

      {/* Users List */}
      {filteredUsers.length > 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    ব্যবহারকারী
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    যোগাযোগ
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    ঠিকানা
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    রোল
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    স্ট্যাটাস
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    অর্ডার
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    মোট খরচ
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    অ্যাকশন
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredUsers.map((user, index) => (
                  <motion.tr
                    key={user._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                            {user.name.charAt(0).toUpperCase()}
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {user.name}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <div className="flex items-center text-sm text-gray-900 dark:text-white">
                          <Phone size={14} className="mr-2 text-gray-400" />
                          {user.phone}
                        </div>
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
                          <Calendar size={14} className="mr-2 text-gray-400" />
                          {formatDate(user.lastLogin)}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <div className="flex items-start text-sm text-gray-900 dark:text-white">
                          <MapPin size={14} className="mr-2 text-gray-400 mt-0.5" />
                          <div>
                            {user.address}
                            <div className="text-gray-500 dark:text-gray-400">
                              {user.city}, {user.area}
                            </div>
                            <div className="text-gray-500 dark:text-gray-400">
                              {user.postalCode}
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.isAdmin 
                          ? "text-purple-700 bg-purple-100 dark:bg-purple-900/30 dark:text-purple-300" 
                          : "text-green-700 bg-green-100 dark:bg-green-900/30 dark:text-green-300"
                      }`}>
                        <div className="flex items-center gap-1">
                          {user.isAdmin ? <Shield size={14} /> : <User size={14} />}
                          {user.isAdmin ? "অ্যাডমিন" : "গ্রাহক"}
                        </div>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.isActive 
                          ? "text-green-700 bg-green-100 dark:bg-green-900/30 dark:text-green-300" 
                          : "text-red-700 bg-red-100 dark:bg-red-900/30 dark:text-red-300"
                      }`}>
                        <div className="flex items-center gap-1">
                          {user.isActive ? 
                            <CheckCircle size={14} /> : 
                            <XCircle size={14} />
                          }
                          {user.isActive ? "সক্রিয়" : "নিষ্ক্রিয়"}
                        </div>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {user.ordersCount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      ৳{user.totalSpent.toLocaleString("bn-BD")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-purple-600 hover:text-purple-900 dark:text-purple-400 dark:hover:text-purple-300 mr-3">
                        <Eye size={18} />
                      </button>
                      <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 mr-3">
                        <Edit size={18} />
                      </button>
                      <button className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-12 text-center border border-gray-200 dark:border-gray-700">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="text-gray-400" size={24} />
          </div>
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
            কোনো ব্যবহারকারী পাওয়া যায়নি
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {searchTerm ? "আপনার অনুসন্ধানের ফলাফল খুঁজে পাওয়া যায়নি" : "আপনার সিস্টেমে কোনো ব্যবহারকারী নেই"}
          </p>
        </div>
      )}
    </div>
  );
};

export default UsersPage;
