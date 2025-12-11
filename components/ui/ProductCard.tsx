"use client";

import { motion } from "framer-motion";
import { Heart, ShoppingCart, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";
import useCartStore from "@/stores/cartStore";

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard = ({ product,index = 0 }: ProductCardProps) => {
  const price = product.price ?? 0;
  const originalPrice = product.originalPrice ?? null;
  const productId = product._id || product.name || String(index);
  const fallbackImage =
    "data:image/svg+xml;utf8," +
    encodeURIComponent(
      `<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400'><rect width='100%' height='100%' fill='%23f4f4f5'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%239ca3af' font-family='Arial' font-size='28'>ShopKoro</text></svg>`
    );
  const imageSrc = product.image || product.images?.[0] || fallbackImage;
  const discountPercentage = product.originalPrice
    ? Math.round(
        ((product.originalPrice - price) / product.originalPrice) * 100
      )
    : product.discount || 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -10, scale: 1.03 }}
      className="group relative bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-800"
    >
      <Link href={`/products/${productId}`}>
        {/* Image Section */}
        <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
          <Image
            src={imageSrc}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />

          {/* Discount Badge */}
          {discountPercentage > 0 && (
            <div className="absolute top-4 left-4 z-10">
              <motion.span
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 500 }}
                className="bg-gradient-to-r from-rose-600 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-black font-bold shadow-xl flex items-center gap-1"
              >
                -{discountPercentage}%
              </motion.span>
            </div>
          )}

          {/* Flash Sale Badge */}
          {product.isFlashSale && (
            <div className="absolute top-4 right-4 z-10">
              <motion.span
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-4 py-2 rounded-full text-xs font-black shadow-xl flex items-center gap-1"
              >
                Flash
              </motion.span>
            </div>
          )}

          {/* Wishlist Button - appears on hover */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            className="absolute top-4 right-4 z-20 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md p-3 rounded-full shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 border border-white/30"
            aria-label="Add to wishlist"
          >
            <Heart
              size={20}
              className="text-gray-700 dark:text-gray-300 group-hover:fill-rose-500 group-hover:text-rose-500 transition-all"
            />
          </motion.button>

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
      </Link>

      {/* Content */}
      <div className="p-5 space-y-3">
        <Link href={`/products/${productId}`}>
          <h3 className="font-bold text-lg text-gray-800 dark:text-white line-clamp-2 group-hover:text-rose-600 dark:group-hover:text-pink-500 transition-colors duration-300">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        {product.rating && (
          <div className="flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={
                      i < Math.floor(product.rating || 0)
                        ? "fill-amber-500 text-amber-500"
                        : "text-gray-300 dark:text-gray-600"
                    }
                  />
                ))}
            </div>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              ({product.reviews || 0})
            </span>
          </div>
        )}

        {/* Price */}
        <div className="flex items-center gap-3">
          <span className="text-2xl font-black text-rose-600 dark:text-pink-500">
            ৳{price.toLocaleString("bn-BD")}
          </span>
          {originalPrice !== null && originalPrice > price && (
            <span className="text-sm text-gray-500 line-through">
              ৳{originalPrice.toLocaleString("bn-BD")}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <div className="flex gap-3 mt-4">
          <Link
            href={`/products/${productId}`}
            className="flex-1 text-center py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-2xl hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300"
          >
            বিস্তারিত দেখুন
          </Link>

          <motion.button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              const addItem = useCartStore.getState().addItem;
              addItem({
                productId,
                name: product.name,
                price,
                image: imageSrc,
                quantity: 1,
              });
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl flex items-center justify-center gap-2 transition-all"
          >
            <ShoppingCart size={20} />
          </motion.button>
        </div>
        {/* Low Stock Alert */}
        {product.stock !== undefined && product.stock < 10 && product.stock > 0 && (
          <p className="text-center text-xs font-bold text-orange-600 animate-pulse pt-1">
            মাত্র {product.stock} টি বাকি!
          </p>
        )}
        {!product.inStock && (
          <div className="text-center">
            <p className="text-red-600 font-bold bg-red-50 dark:bg-red-900/30 py-2 rounded-xl">
              স্টক আউট
            </p>
          </div>
        )}
      </div>

      {/* Subtle Glow on Hover */}
      <div className="pointer-events-none absolute -inset-1 rounded-3xl bg-gradient-to-r from-rose-600/20 to-pink-600/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10" />
    </motion.div>
  );
};

export default ProductCard;