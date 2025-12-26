"use client";

import { motion } from "framer-motion";

type LoadingVariant = "gradient" | "plain";

type LoadingScreenProps = {
  label?: string;
  variant?: LoadingVariant;
  className?: string;
  spinnerClassName?: string;
};

export default function LoadingScreen({
  label = "লোড হচ্ছে...",
  variant = "gradient",
  className = "",
  spinnerClassName = "",
}: LoadingScreenProps) {
  const base =
    variant === "gradient"
      ? "min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-gray-950"
      : "min-h-screen flex items-center justify-center";

  return (
    <div className={`${base} ${className}`.trim()}>
      <div className="text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className={`w-20 h-20 border-8 border-purple-200 dark:border-purple-800 rounded-full border-t-purple-600 dark:border-t-pink-500 ${spinnerClassName}`.trim()}
        />
        {label ? (
          <p className="mt-4 text-gray-700 dark:text-gray-300">{label}</p>
        ) : null}
      </div>
    </div>
  );
}

type LoadingInlineProps = {
  label?: string;
  className?: string;
};

export function LoadingInline({
  label = "লোড হচ্ছে...",
  className = "",
}: LoadingInlineProps) {
  return (
    <div className={`text-center py-12 ${className}`.trim()}>
      <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4" />
      {label ? (
        <p className="text-gray-600 dark:text-gray-400">{label}</p>
      ) : null}
    </div>
  );
}
