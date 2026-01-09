"use client";

import { useState } from 'react';
import { motion } from "framer-motion";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import useAuthStore from '@/stores/authStore';
import { authApi } from '@/lib/api';
import { Eye, EyeOff } from 'lucide-react';
const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const login = useAuthStore((state) => state.login);
  const router = useRouter();

  const validateForm = () => {
    if (!name.trim() || name.length < 3) {
      return "Name must be at least 3 characters long";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email)) {
      return "Please enter a valid email address";
    }
    if (!password || password.length < 8) {
      return "Password must be at least 8 characters long";
    }
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      return "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character";
    }
    if (password !== confirmPassword) {
      return "Passwords don't match";
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const userInfo = await authApi.register({ name, email, password });
      login(userInfo);
      router.push('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-gray-950 dark:via-purple-950/40 dark:to-pink-950/30 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-md w-full space-y-8 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl shadow-2xl p-10 border border-white/20 dark:border-gray-800"
      >
        <div>
          <h2 className="mt-6 text-center text-4xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
            নতুন অ্যাকাউন্ট তৈরি করুন
          </h2>
          {error && (
            <motion.p
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-4 text-center text-sm text-red-600 bg-red-50 dark:bg-red-900/30 py-3 rounded-xl font-medium"
            >
              {error}
            </motion.p>
          )}
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <motion.div whileHover={{ scale: 1.02 }} className="relative">
              <label htmlFor="name" className="sr-only">নাম</label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                className="appearance-none relative block w-full px-5 py-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-gray-300 dark:border-gray-700 rounded-2xl placeholder-gray-500 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 shadow-sm hover:shadow-md"
                placeholder="আপনার নাম লিখুন"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} className="relative">
              <label htmlFor="email-address" className="sr-only">ইমেইল</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none relative block w-full px-5 py-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-gray-300 dark:border-gray-700 rounded-2xl placeholder-gray-500 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 shadow-sm hover:shadow-md"
                placeholder="আপনার ইমেইল লিখুন"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} className="relative">
              <label htmlFor="password" className="sr-only">পাসওয়ার্ড</label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  className="appearance-none relative block w-full px-5 py-4 pr-12 bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-gray-300 dark:border-gray-700 rounded-2xl placeholder-gray-500 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 shadow-sm hover:shadow-md"
                  placeholder="পাসওয়ার্ড লিখুন (কমপক্ষে ৮ অক্ষর)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 focus:outline-none"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} className="relative">
              <label htmlFor="confirm-password" className="sr-only">পাসওয়ার্ড নিশ্চিত করুন</label>
              <div className="relative">
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  className="appearance-none relative block w-full px-5 py-4 pr-12 bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-gray-300 dark:border-gray-700 rounded-2xl placeholder-gray-500 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 shadow-sm hover:shadow-md"
                  placeholder="পাসওয়ার্ড নিশ্চিত করুন"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 focus:outline-none"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </motion.div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link href="/login" className="font-medium text-purple-600 hover:text-purple-500 dark:text-pink-400 dark:hover:text-pink-300 transition-colors">
                ইতিমধ্যে অ্যাকাউন্ট আছে? লগইন করুন
              </Link>
            </div>
          </div>

          <div>
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="group relative w-full flex justify-center py-4 px-6 border border-transparent text-lg font-bold rounded-2xl text-white bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 hover:from-purple-700 hover:via-pink-700 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 disabled:bg-gradient-to-r disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {loading ? (
                <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
                  রেজিস্টার হচ্ছে...
                </motion.span>
              ) : (
                'রেজিস্টার করুন'
              )}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default RegisterPage;