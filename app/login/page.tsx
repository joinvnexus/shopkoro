'use client';

import { useState } from 'react';
import { motion } from "framer-motion";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import useAuthStore from '@/stores/authStore';
import { authApi } from '@/lib/api';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const login = useAuthStore((state) => state.login);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError("ইমেইল ও পাসওয়ার্ড দিন");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const userInfo = await authApi.login({ email, password });
      login(userInfo);
      // Redirect to admin dashboard if user is admin, otherwise to home page
      router.push(userInfo.isAdmin ? '/admin' : '/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'লগইন করতে সমস্যা হয়েছে');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-gray-950 dark:via-purple-950/40 dark:to-pink-950/30 py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
        className="max-w-md w-full bg-white/80 dark:bg-gray-900/90 backdrop-blur-2xl rounded-3xl shadow-2xl p-10 border border-white/30 dark:border-gray-800 overflow-hidden relative"
      >
        {/* Background Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-pink-600/10 to-orange-600/10 rounded-3xl" />

        <div className="relative z-10">
          {/* Header */}
          <div className="text-center mb-10">
            <motion.h1
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="text-4xl md:text-5xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent"
            >
              স্বাগতম আবার
            </motion.h1>
            <p className="mt-3 text-gray-600 dark:text-gray-400 text-lg">
              আপনার অ্যাকাউন্টে লগইন করুন
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-2xl"
            >
              <p className="text-red-700 dark:text-red-400 text-center font-medium">
                {error}
              </p>
            </motion.div>
          )}

          {/* Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email */}
            <motion.div whileHover={{ scale: 1.02 }}>
              <label htmlFor="email" className="sr-only">ইমেইল</label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-6 py-5 bg-white/60 dark:bg-gray-800/60 backdrop-blur-md border border-gray-300 dark:border-gray-700 rounded-2xl placeholder-gray-500 text-gray-900 dark:text-white focus:outline-none focus:ring-4 focus:ring-purple-500/30 focus:border-purple-500 transition-all duration-300 text-lg"
                placeholder="আপনার ইমেইল"
              />
            </motion.div>

            {/* Password */}
            <motion.div whileHover={{ scale: 1.02 }}>
              <label htmlFor="password" className="sr-only">পাসওয়ার্ড</label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-6 py-5 bg-white/60 dark:bg-gray-800/60 backdrop-blur-md border border-gray-300 dark:border-gray-700 rounded-2xl placeholder-gray-500 text-gray-900 dark:text-white focus:outline-none focus:ring-4 focus:ring-pink-500/30 focus:border-pink-500 transition-all duration-300 text-lg"
                placeholder="আপনার পাসওয়ার্ড"
              />
            </motion.div>

            {/* Register Link */}
            <div className="text-center">
              <Link
                href="/register"
                className="text-purple-600 dark:text-pink-400 font-semibold hover:underline transition-all"
              >
                অ্যাকাউন্ট নেই? এখনই রেজিস্টার করুন
              </Link>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.04 }}
              whileTap={{ scale: loading ? 1 : 0.96 }}
              className="w-full py-5 px-8 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 text-white font-bold text-xl rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-purple-500/30 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-500 relative overflow-hidden group"
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                {loading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full"
                    />
                    লগইন হচ্ছে...
                  </>
                ) : (
                  "লগইন করুন"
                )}
              </span>

              {/* Shine Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.8 }}
              />
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;