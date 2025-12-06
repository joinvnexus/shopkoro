"use client";

import { motion } from "framer-motion";
import { Heart, ShoppingCart, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const discountPercentage = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : product.discount || 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="bg-white rounded-xl shadow-md hover:shadow-2xl overflow-hidden group cursor-pointer border border-gray-light hover:border-primary/30 transition-all duration-300"
    >
      <Link href={`/products/${product._id || product.name}`}>
        <div className="relative aspect-square overflow-hidden bg-gray-light">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />
          {discountPercentage > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-2 left-2 bg-gradient-to-r from-primary to-primary-dark text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg pulse-glow"
            >
              -{discountPercentage}%
            </motion.div>
          )}
          {product.isFlashSale && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-2 right-2 bg-gradient-to-r from-accent to-accent-dark text-dark px-3 py-1.5 rounded-full text-xs font-bold shadow-lg pulse-glow"
            >
              Flash Sale
            </motion.div>
          )}
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
            <motion.button
              whileHover={{ scale: 1.15, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              className="bg-white p-2.5 rounded-full shadow-xl hover:bg-gradient-to-br hover:from-primary hover:to-primary-dark hover:text-white transition-all duration-300 border-2 border-transparent hover:border-primary/50"
              aria-label="Add to wishlist"
            >
              <Heart size={18} className="group-hover:fill-white transition-all" />
            </motion.button>
          </div>
        </div>
      </Link>

      <div className="p-4">
        <Link href={`/products/${product._id || product.name}`}>
          <h3 className="font-semibold text-dark mb-2 line-clamp-2 hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        {product.rating && (
          <div className="flex items-center space-x-1 mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={
                    i < Math.floor(product.rating || 0)
                      ? "fill-accent text-accent"
                      : "text-gray-medium"
                  }
                />
              ))}
            </div>
            <span className="text-xs text-gray-dark">
              ({product.reviews || 0})
            </span>
          </div>
        )}

        {/* Price */}
        <div className="flex items-center space-x-2 mb-3">
          <span className="text-lg font-bold text-primary">
            ৳{product.price.toLocaleString("bn-BD")}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-sm text-gray-dark line-through">
              ৳{product.originalPrice.toLocaleString("bn-BD")}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <motion.button
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.97 }}
          className="w-full bg-gradient-to-r from-primary via-primary-light to-primary text-white py-3 rounded-lg font-semibold hover:from-primary-dark hover:via-primary hover:to-primary-light transition-all duration-300 flex items-center justify-center space-x-2 shadow-md hover:shadow-lg hover:shadow-primary/50"
        >
          <ShoppingCart size={18} className="group-hover:animate-bounce" />
          <span>কার্টে যোগ করুন</span>
        </motion.button>

        {/* Stock Status */}
        {!product.inStock && (
          <p className="text-xs text-red-500 mt-2 text-center">
            স্টক আউট
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default ProductCard;

