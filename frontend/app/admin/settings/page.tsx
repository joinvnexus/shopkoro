"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Settings,
  Save,
  Mail,
  CreditCard,
  Truck,
  Shield,
  Bell,
  Globe,
  Lock,
  User,
  Store,
  Palette
} from "lucide-react";

interface SettingSection {
  id: string;
  title: string;
  icon: any;
  description: string;
  fields: SettingField[];
}

interface SettingField {
  id: string;
  label: string;
  type: "text" | "email" | "password" | "number" | "select" | "textarea" | "toggle";
  value: any;
  options?: { value: string; label: string }[];
  placeholder?: string;
}

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    // General Settings
    siteName: "ShopKoro",
    siteDescription: "বাংলাদেশের সবচেয়ে বড় অনলাইন শপ",
    contactEmail: "support@shopkoro.com",
    contactPhone: "+880 1234-567890",

    // Payment Settings
    stripeEnabled: true,
    sslcommerzEnabled: true,
    stripePublishableKey: "",
    sslcommerzStoreId: "",

    // Shipping Settings
    freeShippingThreshold: 500,
    defaultShippingCost: 60,
    expressShippingEnabled: true,

    // Security Settings
    twoFactorEnabled: false,
    sessionTimeout: 30,
    passwordMinLength: 8,

    // Notification Settings
    emailNotifications: true,
    smsNotifications: true,
    orderNotifications: true,
    userRegistrationNotifications: true,

    // Store Settings
    currency: "BDT",
    timezone: "Asia/Dhaka",
    language: "bn",
    maintenanceMode: false
  });

  const [activeTab, setActiveTab] = useState("general");
  const [saving, setSaving] = useState(false);

  const settingSections: SettingSection[] = [
    {
      id: "general",
      title: "সাধারণ সেটিংস",
      icon: Settings,
      description: "ওয়েবসাইটের মৌলিক তথ্য এবং কনফিগারেশন",
      fields: [
        { id: "siteName", label: "সাইটের নাম", type: "text", value: settings.siteName },
        { id: "siteDescription", label: "সাইটের বিবরণ", type: "textarea", value: settings.siteDescription },
        { id: "contactEmail", label: "যোগাযোগের ইমেইল", type: "email", value: settings.contactEmail },
        { id: "contactPhone", label: "যোগাযোগের ফোন", type: "text", value: settings.contactPhone }
      ]
    },
    {
      id: "payment",
      title: "পেমেন্ট সেটিংস",
      icon: CreditCard,
      description: "পেমেন্ট গেটওয়ে এবং লেনদেন কনফিগারেশন",
      fields: [
        { id: "stripeEnabled", label: "Stripe পেমেন্ট", type: "toggle", value: settings.stripeEnabled },
        { id: "sslcommerzEnabled", label: "SSLCommerz পেমেন্ট", type: "toggle", value: settings.sslcommerzEnabled },
        { id: "stripePublishableKey", label: "Stripe Publishable Key", type: "password", value: settings.stripePublishableKey },
        { id: "sslcommerzStoreId", label: "SSLCommerz Store ID", type: "text", value: settings.sslcommerzStoreId }
      ]
    },
    {
      id: "shipping",
      title: "শিপিং সেটিংস",
      icon: Truck,
      description: "ডেলিভারি এবং শিপিং খরচ কনফিগারেশন",
      fields: [
        { id: "freeShippingThreshold", label: "ফ্রি শিপিং থ্রেশহোল্ড (৳)", type: "number", value: settings.freeShippingThreshold },
        { id: "defaultShippingCost", label: "ডিফল্ট শিপিং খরচ (৳)", type: "number", value: settings.defaultShippingCost },
        { id: "expressShippingEnabled", label: "এক্সপ্রেস শিপিং", type: "toggle", value: settings.expressShippingEnabled }
      ]
    },
    {
      id: "security",
      title: "নিরাপত্তা সেটিংস",
      icon: Shield,
      description: "অ্যাকাউন্ট নিরাপত্তা এবং প্রমাণীকরণ",
      fields: [
        { id: "twoFactorEnabled", label: "টু-ফ্যাক্টর অথেনটিকেশন", type: "toggle", value: settings.twoFactorEnabled },
        { id: "sessionTimeout", label: "সেশন টাইমআউট (মিনিট)", type: "number", value: settings.sessionTimeout },
        { id: "passwordMinLength", label: "পাসওয়ার্ডের মিনিমাম লেন্থ", type: "number", value: settings.passwordMinLength }
      ]
    },
    {
      id: "notifications",
      title: "নোটিফিকেশন সেটিংস",
      icon: Bell,
      description: "ইমেইল এবং SMS নোটিফিকেশন কনফিগারেশন",
      fields: [
        { id: "emailNotifications", label: "ইমেইল নোটিফিকেশন", type: "toggle", value: settings.emailNotifications },
        { id: "smsNotifications", label: "SMS নোটিফিকেশন", type: "toggle", value: settings.smsNotifications },
        { id: "orderNotifications", label: "অর্ডার নোটিফিকেশন", type: "toggle", value: settings.orderNotifications },
        { id: "userRegistrationNotifications", label: "ব্যবহারকারী রেজিস্ট্রেশন নোটিফিকেশন", type: "toggle", value: settings.userRegistrationNotifications }
      ]
    },
    {
      id: "store",
      title: "স্টোর সেটিংস",
      icon: Store,
      description: "স্টোরের সাধারণ কনফিগারেশন",
      fields: [
        {
          id: "currency",
          label: "কারেন্সি",
          type: "select",
          value: settings.currency,
          options: [
            { value: "BDT", label: "বাংলাদেশী টাকা (BDT)" },
            { value: "USD", label: "US Dollar (USD)" },
            { value: "EUR", label: "Euro (EUR)" }
          ]
        },
        {
          id: "timezone",
          label: "টাইমজোন",
          type: "select",
          value: settings.timezone,
          options: [
            { value: "Asia/Dhaka", label: "Asia/Dhaka (GMT+6)" },
            { value: "Asia/Kolkata", label: "Asia/Kolkata (GMT+5:30)" },
            { value: "UTC", label: "UTC" }
          ]
        },
        {
          id: "language",
          label: "ডিফল্ট ভাষা",
          type: "select",
          value: settings.language,
          options: [
            { value: "bn", label: "বাংলা" },
            { value: "en", label: "English" }
          ]
        },
        { id: "maintenanceMode", label: "মেইনটেন্যান্স মোড", type: "toggle", value: settings.maintenanceMode }
      ]
    }
  ];

  const handleSettingChange = (fieldId: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [fieldId]: value
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setSaving(false);
    // Show success message
    alert("সেটিংস সেভ করা হয়েছে!");
  };

  const renderField = (field: SettingField) => {
    switch (field.type) {
      case "text":
      case "email":
      case "password":
      case "number":
        return (
          <input
            type={field.type}
            value={field.value}
            onChange={(e) => handleSettingChange(field.id, e.target.value)}
            className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            placeholder={field.placeholder}
          />
        );

      case "textarea":
        return (
          <textarea
            value={field.value}
            onChange={(e) => handleSettingChange(field.id, e.target.value)}
            rows={3}
            className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
            placeholder={field.placeholder}
          />
        );

      case "select":
        return (
          <select
            value={field.value}
            onChange={(e) => handleSettingChange(field.id, e.target.value)}
            className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
          >
            {field.options?.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case "toggle":
        return (
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={field.value}
              onChange={(e) => handleSettingChange(field.id, e.target.checked)}
              className="sr-only"
            />
            <div className={`relative inline-block w-12 h-6 rounded-full transition-colors ${
              field.value ? "bg-purple-600" : "bg-gray-300 dark:bg-gray-600"
            }`}>
              <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                field.value ? "translate-x-6" : "translate-x-0"
              }`}></div>
            </div>
            <span className="ml-3 text-gray-700 dark:text-gray-300">
              {field.value ? "চালু" : "বন্ধ"}
            </span>
          </label>
        );

      default:
        return null;
    }
  };

  const activeSection = settingSections.find(section => section.id === activeTab);

 return (
  <div className="space-y-6">
    {/* Header */}
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          সেটিংস
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          সিস্টেম কনফিগারেশন এবং প্রেফারেন্স
        </p>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Sidebar */}
      <div className="lg:col-span-1">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-4">
          <nav className="space-y-2">
            {settingSections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveTab(section.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeTab === section.id
                    ? "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                <section.icon size={20} />
                <span className="font-medium">{section.title}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="lg:col-span-3">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-6"
        >
          {activeSection && (
            <>
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <activeSection.icon className="text-purple-600" size={24} />
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                    {activeSection.title}
                  </h2>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  {activeSection.description}
                </p>
              </div>

              <div className="space-y-6">
                {activeSection.fields.map((field) => (
                  <div key={field.id}>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {field.label}
                    </label>
                    {renderField(field)}
                  </div>
                ))}
              </div>
            </>
          )}
        </motion.div>
      </div>
    </div>
  </div>
);
};