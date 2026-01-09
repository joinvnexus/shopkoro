"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  MapPin,
  Truck,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  Settings,
  Plus,
  Edit,
  Trash2,
  Calendar,
  Phone,
} from "lucide-react";
import { orderApi } from "@/lib/api";
import LoadingScreen from "@/components/ui/LoadingScreen";

interface DeliveryPerson {
  _id: string;
  name: string;
  phone: string;
  email: string;
  vehicle: string;
  licenseNumber: string;
  isActive: boolean;
  ordersDelivered: number;
  rating: number;
  lastDeliveryDate: string;
}

interface DeliveryArea {
  _id: string;
  name: string;
  description: string;
  deliveryCharge: number;
  estimatedDays: number;
  isActive: boolean;
  deliveryPersons: string[];
}

interface DeliveryStatus {
  _id: string;
  orderId: string;
  deliveryPerson: {
    name: string;
    phone: string;
  };
  status: "pending" | "assigned" | "in-transit" | "delivered" | "failed";
  pickupTime: string;
  estimatedDelivery: string;
  actualDelivery: string;
  location: {
    latitude: number;
    longitude: number;
    address: string;
  };
}

const DeliveryPage = () => {
  const [deliveryPersons, setDeliveryPersons] = useState<DeliveryPerson[]>([]);
  const [deliveryAreas, setDeliveryAreas] = useState<DeliveryArea[]>([]);
  const [deliveryStatuses, setDeliveryStatuses] = useState<DeliveryStatus[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"persons" | "areas" | "status">("persons");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Mock data for now
        const mockDeliveryPersons: DeliveryPerson[] = [
          {
            _id: "1",
            name: "রহিম খান",
            phone: "01712345678",
            email: "rahim@example.com",
            vehicle: "Motorcycle",
            licenseNumber: "DHKA-12345",
            isActive: true,
            ordersDelivered: 245,
            rating: 4.7,
            lastDeliveryDate: "2023-07-15",
          },
          {
            _id: "2",
            name: "করিম উদ্দিন",
            phone: "01723456789",
            email: "karim@example.com",
            vehicle: "Van",
            licenseNumber: "DHKA-67890",
            isActive: true,
            ordersDelivered: 189,
            rating: 4.5,
            lastDeliveryDate: "2023-07-16",
          },
          {
            _id: "3",
            name: "আবুল কালাম",
            phone: "01734567890",
            email: "abul@example.com",
            vehicle: "Motorcycle",
            licenseNumber: "DHKA-24680",
            isActive: false,
            ordersDelivered: 156,
            rating: 4.3,
            lastDeliveryDate: "2023-07-10",
          },
        ];

        const mockDeliveryAreas: DeliveryArea[] = [
          {
            _id: "1",
            name: "ঢাকা উত্তর",
            description: "ঢাকা উত্তাল এলাকার ডেলিভারি",
            deliveryCharge: 60,
            estimatedDays: 2,
            isActive: true,
            deliveryPersons: ["1", "2"],
          },
          {
            _id: "2",
            name: "ঢাকা দক্ষিণ",
            description: "ঢাকা দক্ষিণ এলাকার ডেলিভারি",
            deliveryCharge: 60,
            estimatedDays: 2,
            isActive: true,
            deliveryPersons: ["1", "2"],
          },
          {
            _id: "3",
            name: "গাজীপুর",
            description: "গাজীপুর এলাকার ডেলিভারি",
            deliveryCharge: 100,
            estimatedDays: 3,
            isActive: true,
            deliveryPersons: ["1", "3"],
          },
        ];

        const mockDeliveryStatuses: DeliveryStatus[] = [
          {
            _id: "1",
            orderId: "ORD-12345",
            deliveryPerson: {
              name: "রহিম খান",
              phone: "01712345678",
            },
            status: "in-transit",
            pickupTime: "2023-07-17T10:30:00Z",
            estimatedDelivery: "2023-07-17T15:00:00Z",
            actualDelivery: "",
            location: {
              latitude: 23.8103,
              longitude: 90.4125,
              address: "মতিঝিল, ঢাকা",
            },
          },
          {
            _id: "2",
            orderId: "ORD-12346",
            deliveryPerson: {
              name: "করিম উদ্দিন",
              phone: "01723456789",
            },
            status: "delivered",
            pickupTime: "2023-07-16T09:15:00Z",
            estimatedDelivery: "2023-07-16T14:00:00Z",
            actualDelivery: "2023-07-16T13:45:00Z",
            location: {
              latitude: 23.7774,
              longitude: 90.3995,
              address: "বাড্ডা, ঢাকা",
            },
          },
          {
            _id: "3",
            orderId: "ORD-12347",
            deliveryPerson: {
              name: "রহিম খান",
              phone: "01712345678",
            },
            status: "pending",
            pickupTime: "",
            estimatedDelivery: "2023-07-18T12:00:00Z",
            actualDelivery: "",
            location: {
              latitude: 0,
              longitude: 0,
              address: "",
            },
          },
        ];

        setDeliveryPersons(mockDeliveryPersons);
        setDeliveryAreas(mockDeliveryAreas);
        setDeliveryStatuses(mockDeliveryStatuses);
      } catch (error) {
        console.error("Failed to fetch delivery data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredDeliveryPersons = deliveryPersons.filter((person) =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    person.phone.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredDeliveryAreas = deliveryAreas.filter((area) =>
    area.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    area.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredDeliveryStatuses = deliveryStatuses.filter((status) => {
    const matchesSearch = 
      status.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      status.deliveryPerson.name.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = selectedStatus === "all" || status.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "পেন্ডিং";
      case "assigned":
        return "অ্যাসাইনড";
      case "in-transit":
        return "ট্রানজিটে";
      case "delivered":
        return "ডেলিভারড";
      case "failed":
        return "ব্যর্থ";
      default:
        return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "text-green-600 bg-green-100 dark:bg-green-900/30";
      case "in-transit":
        return "text-blue-600 bg-blue-100 dark:bg-blue-900/30";
      case "assigned":
        return "text-purple-600 bg-purple-100 dark:bg-purple-900/30";
      case "pending":
        return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30";
      case "failed":
        return "text-red-600 bg-red-100 dark:bg-red-900/30";
      default:
        return "text-gray-600 bg-gray-100 dark:bg-gray-900/30";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="text-yellow-600" size={16} />;
      case "assigned":
        return <CheckCircle className="text-purple-600" size={16} />;
      case "in-transit":
        return <Truck className="text-blue-600" size={16} />;
      case "delivered":
        return <CheckCircle className="text-green-600" size={16} />;
      case "failed":
        return <XCircle className="text-red-600" size={16} />;
      default:
        return <Clock className="text-gray-600" size={16} />;
    }
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
            ডেলিভারি ম্যানেজমেন্ট
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            ডেলিভারি পার্সন, এলাকা এবং স্ট্যাটাস পরিচালনা করুন
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
          <Settings size={18} />
          <span>ডেলিভারি সেটিংস</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          {[
            { id: "persons", label: "ডেলিভারি পার্সন", icon: Truck },
            { id: "areas", label: "ডেলিভারি এলাকা", icon: MapPin },
            { id: "status", label: "ডেলিভারি স্ট্যাটাস", icon: Clock },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
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
          {activeTab === "persons" && (
            <div className="space-y-4">
              {/* Controls */}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="ডেলিভারি পার্সন অনুসন্ধান করুন..."
                    className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors">
                  <Plus size={18} />
                  <span>নতুন ডেলিভারি পার্সন</span>
                </button>
              </div>

              {/* Delivery Persons Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDeliveryPersons.map((person, index) => (
                  <motion.div
                    key={person._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700"
                  >
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                            {person.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-800 dark:text-white">
                              {person.name}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {person.vehicle}
                            </p>
                          </div>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          person.isActive 
                            ? "text-green-600 bg-green-100 dark:bg-green-900/30" 
                            : "text-red-600 bg-red-100 dark:bg-red-900/30"
                        }`}>
                          {person.isActive ? "সক্রিয়" : "নিষ্ক্রিয়"}
                        </span>
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                          <Phone size={14} className="mr-2" />
                          {person.phone}
                        </div>
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                          <span className="mr-2">📝</span>
                          {person.licenseNumber}
                        </div>
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                          <span className="mr-2">⭐</span>
                          {person.rating.toFixed(1)} ({person.ordersDelivered} ডেলিভারি)
                        </div>
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                          <Calendar size={14} className="mr-2" />
                          {new Date(person.lastDeliveryDate).toLocaleDateString("bn-BD")}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-purple-100 dark:bg-purple-900/30 hover:bg-purple-200 dark:hover:bg-purple-900/50 rounded-lg text-purple-700 dark:text-purple-300 transition-colors">
                          <Edit size={16} />
                          <span>সম্পাদনা</span>
                        </button>
                        <button className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-900/50 rounded-lg text-red-700 dark:text-red-300 transition-colors">
                          <Trash2 size={16} />
                          <span>মুছুন</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "areas" && (
            <div className="space-y-4">
              {/* Controls */}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="ডেলিভারি এলাকা অনুসন্ধান করুন..."
                    className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors">
                  <Plus size={18} />
                  <span>নতুন ডেলিভারি এলাকা</span>
                </button>
              </div>

              {/* Delivery Areas Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredDeliveryAreas.map((area, index) => (
                  <motion.div
                    key={area._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700"
                  >
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="font-bold text-gray-800 dark:text-white">
                            {area.name}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            {area.description}
                          </p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          area.isActive 
                            ? "text-green-600 bg-green-100 dark:bg-green-900/30" 
                            : "text-red-600 bg-red-100 dark:bg-red-900/30"
                        }`}>
                          {area.isActive ? "সক্রিয়" : "নিষ্ক্রিয়"}
                        </span>
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">ডেলিভারি চার্জ</span>
                          <span className="font-medium text-gray-800 dark:text-white">
                            ৳{area.deliveryCharge}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">অনুমানিত সময়</span>
                          <span className="font-medium text-gray-800 dark:text-white">
                            {area.estimatedDays} দিন
                          </span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                          <Truck size={14} className="mr-2" />
                          {area.deliveryPersons.length} ডেলিভারি পার্সন
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-purple-100 dark:bg-purple-900/30 hover:bg-purple-200 dark:hover:bg-purple-900/50 rounded-lg text-purple-700 dark:text-purple-300 transition-colors">
                          <Edit size={16} />
                          <span>সম্পাদনা</span>
                        </button>
                        <button className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-900/50 rounded-lg text-red-700 dark:text-red-300 transition-colors">
                          <Trash2 size={16} />
                          <span>মুছুন</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "status" && (
            <div className="space-y-4">
              {/* Controls */}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="অর্ডার অনুসন্ধান করুন..."
                    className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="relative">
                  <select
                    className="appearance-none pl-3 pr-10 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                  >
                    <option value="all">সকল স্ট্যাটাস</option>
                    <option value="pending">পেন্ডিং</option>
                    <option value="assigned">অ্যাসাইনড</option>
                    <option value="in-transit">ট্রানজিটে</option>
                    <option value="delivered">ডেলিভারড</option>
                    <option value="failed">ব্যর্থ</option>
                  </select>
                  <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                </div>
              </div>

              {/* Delivery Status List */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          অর্ডার ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          ডেলিভারি পার্সন
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          স্ট্যাটাস
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          পিকআপ সময়
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          অনুমানিত ডেলিভারি
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          আসল ডেলিভারি
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          অবস্থান
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          অ্যাকশন
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      {filteredDeliveryStatuses.map((status, index) => (
                        <motion.tr
                          key={status._id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {status.orderId}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900 dark:text-white">
                              {status.deliveryPerson.name}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {status.deliveryPerson.phone}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(status.status)}`}>
                              <div className="flex items-center gap-1">
                                {getStatusIcon(status.status)}
                                {getStatusText(status.status)}
                              </div>
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {status.pickupTime ? new Date(status.pickupTime).toLocaleString("bn-BD") : "-"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {status.estimatedDelivery ? new Date(status.estimatedDelivery).toLocaleString("bn-BD") : "-"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {status.actualDelivery ? new Date(status.actualDelivery).toLocaleString("bn-BD") : "-"}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                            {status.location.address || "অজানা"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button className="text-purple-600 hover:text-purple-900 dark:text-purple-400 dark:hover:text-purple-300">
                              <Eye size={18} />
                            </button>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeliveryPage;
