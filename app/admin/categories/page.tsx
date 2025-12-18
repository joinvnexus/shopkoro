"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Tag,
  Grid,
  List,
  Folder,
  FolderOpen,
  MoreHorizontal,
} from "lucide-react";

interface Category {
  _id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  parentId: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  productsCount: number;
}

const CategoriesPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // Mock data for now
        const mockCategories: Category[] = [
          {
            _id: "1",
            name: "পুরুষদের পোশাক",
            slug: "mens-clothing",
            description: "পুরুষদের জন্য সকল ধরণের পোশাক",
            image: "/images/categories/mens.jpg",
            parentId: null,
            isActive: true,
            createdAt: "2023-01-15",
            updatedAt: "2023-06-20",
            productsCount: 45,
          },
          {
            _id: "2",
            name: "টি-শার্ট",
            slug: "t-shirts",
            description: "পুরুষদের টি-শার্ট",
            image: "/images/categories/tshirts.jpg",
            parentId: "1",
            isActive: true,
            createdAt: "2023-02-10",
            updatedAt: "2023-07-01",
            productsCount: 12,
          },
          {
            _id: "3",
            name: "শার্ট",
            slug: "shirts",
            description: "পুরুষদের শার্ট",
            image: "/images/categories/shirts.jpg",
            parentId: "1",
            isActive: true,
            createdAt: "2023-02-15",
            updatedAt: "2023-07-05",
            productsCount: 8,
          },
          {
            _id: "4",
            name: "মহিলাদের পোশাক",
            slug: "womens-clothing",
            description: "মহিলাদের জন্য সকল ধরণের পোশাক",
            image: "/images/categories/womens.jpg",
            parentId: null,
            isActive: true,
            createdAt: "2023-01-20",
            updatedAt: "2023-06-25",
            productsCount: 62,
          },
          {
            _id: "5",
            name: "শাড়ি",
            slug: "sarees",
            description: "মহিলাদের শাড়ি",
            image: "/images/categories/sarees.jpg",
            parentId: "4",
            isActive: true,
            createdAt: "2023-02-20",
            updatedAt: "2023-07-10",
            productsCount: 25,
          },
        ];
        setCategories(mockCategories);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleExpand = (categoryId: string) => {
    if (expandedCategories.includes(categoryId)) {
      setExpandedCategories(expandedCategories.filter(id => id !== categoryId));
    } else {
      setExpandedCategories([...expandedCategories, categoryId]);
    }
  };

  const getChildCategories = (parentId: string) => {
    return filteredCategories.filter(category => category.parentId === parentId);
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
            ক্যাটাগরি সমূহ
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            আপনার স্টোরের সমস্ত ক্যাটাগরি পরিচালনা করুন
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors">
          <Plus size={18} />
          <span>নতুন ক্যাটাগরি</span>
        </button>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="ক্যাটাগরি অনুসন্ধান করুন..."
            className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <div className="flex border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 ${viewMode === "grid" ? "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400" : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400"}`}
            >
              <Grid size={20} />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 ${viewMode === "list" ? "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400" : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400"}`}
            >
              <List size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Categories Grid/List */}
      {filteredCategories.length > 0 ? (
        <div
          className={
            viewMode === "grid"
              ? "space-y-4"
              : "bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700"
          }
        >
          {/* Root Categories */}
          {filteredCategories
            .filter(category => category.parentId === null)
            .map((category, index) => (
              <motion.div
                key={category._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={`bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 ${
                  viewMode === "grid" ? "p-6" : "flex items-center"
                }`}
              >
                <div className="flex items-center gap-4">
                  {viewMode === "grid" ? (
                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                      <Folder className="text-purple-600 dark:text-purple-400" size={24} />
                    </div>
                  ) : (
                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center ml-6">
                      <Folder className="text-purple-600 dark:text-purple-400" size={24} />
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-gray-800 dark:text-white">
                        {category.name}
                      </h3>
                      <div className="flex gap-2">
                        <button className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                          <MoreHorizontal size={18} />
                        </button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {category.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-gray-500">
                        {category.productsCount} পণ্য
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        category.isActive 
                          ? "text-green-600 bg-green-100 dark:bg-green-900/30" 
                          : "text-red-600 bg-red-100 dark:bg-red-900/30"
                      }`}>
                        {category.isActive ? "সক্রিয়" : "নিষ্ক্রিয়"}
                      </span>
                    </div>
                  </div>
                  {viewMode === "grid" && (
                    <div className="flex gap-2">
                      <button className="px-3 py-2 bg-purple-100 dark:bg-purple-900/30 hover:bg-purple-200 dark:hover:bg-purple-900/50 rounded-lg text-purple-700 dark:text-purple-300 transition-colors">
                        <Edit size={16} />
                      </button>
                      <button className="px-3 py-2 bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-900/50 rounded-lg text-red-700 dark:text-red-300 transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}

          {/* Child Categories */}
          {filteredCategories
            .filter(category => category.parentId !== null)
            .map((category, index) => {
              const parentCategory = categories.find(c => c._id === category.parentId);
              const isExpanded = expandedCategories.includes(parentCategory?._id || "");

              return (
                <div key={category._id}>
                  {/* Parent Category Toggle */}
                  {parentCategory && (
                    <div 
                      className="flex items-center gap-2 py-2 cursor-pointer text-purple-600 dark:text-purple-400"
                      onClick={() => toggleExpand(parentCategory._id)}
                    >
                      {isExpanded ? <FolderOpen size={18} /> : <Folder size={18} />}
                      <span className="font-medium">{parentCategory.name}</span>
                    </div>
                  )}

                  {/* Child Categories */}
                  {parentCategory && isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      transition={{ duration: 0.3 }}
                      className={`ml-8 border-l-2 border-purple-200 dark:border-purple-700 ${
                        viewMode === "grid" ? "space-y-4" : ""
                      }`}
                    >
                      {getChildCategories(parentCategory._id).map((childCategory, childIndex) => (
                        <motion.div
                          key={childCategory._id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: childIndex * 0.05 }}
                          className={`bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 ${
                            viewMode === "grid" ? "" : "flex items-center"
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            {viewMode === "grid" ? (
                              <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                                <Tag className="text-purple-600 dark:text-purple-400" size={20} />
                              </div>
                            ) : (
                              <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center ml-6">
                                <Tag className="text-purple-600 dark:text-purple-400" size={20} />
                              </div>
                            )}
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <h3 className="font-bold text-gray-800 dark:text-white">
                                  {childCategory.name}
                                </h3>
                                <div className="flex gap-2">
                                  <button className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                                    <MoreHorizontal size={18} />
                                  </button>
                                </div>
                              </div>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                {childCategory.description}
                              </p>
                              <div className="flex items-center gap-4 text-sm">
                                <span className="text-gray-500">
                                  {childCategory.productsCount} পণ্য
                                </span>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  childCategory.isActive 
                                    ? "text-green-600 bg-green-100 dark:bg-green-900/30" 
                                    : "text-red-600 bg-red-100 dark:bg-red-900/30"
                                }`}>
                                  {childCategory.isActive ? "সক্রিয়" : "নিষ্ক্রিয়"}
                                </span>
                              </div>
                            </div>
                            {viewMode === "grid" && (
                              <div className="flex gap-2">
                                <button className="px-3 py-2 bg-purple-100 dark:bg-purple-900/30 hover:bg-purple-200 dark:hover:bg-purple-900/50 rounded-lg text-purple-700 dark:text-purple-300 transition-colors">
                                  <Edit size={16} />
                                </button>
                                <button className="px-3 py-2 bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-900/50 rounded-lg text-red-700 dark:text-red-300 transition-colors">
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </div>
              );
            })}
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-12 text-center border border-gray-200 dark:border-gray-700">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <Folder className="text-gray-400" size={24} />
          </div>
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
            কোনো ক্যাটাগরি পাওয়া যায়নি
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {searchTerm ? "আপনার অনুসন্ধানের ফলাফল খুঁজে পাওয়া যায়নি" : "আপনার স্টোরে কোনো ক্যাটাগরি নেই"}
          </p>
          <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors">
            <Plus size={18} className="inline-block mr-2" />
            নতুন ক্যাটাগরি যোগ করুন
          </button>
        </div>
      )}
    </div>
  );
};

export default CategoriesPage;
