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
      whileHover={{ y: -5 }}
      className="bg-white rounded-lg shadow-md overflow-hidden group cursor-pointer"
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
            <div className="absolute top-2 left-2 bg-primary text-white px-2 py-1 rounded-md text-xs font-bold">
              -{discountPercentage}%
            </div>
          )}
          {product.isFlashSale && (
            <div className="absolute top-2 right-2 bg-accent text-dark px-2 py-1 rounded-md text-xs font-bold">
              Flash Sale
            </div>
          )}
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-white p-2 rounded-full shadow-lg hover:bg-primary hover:text-white transition-colors"
              aria-label="Add to wishlist"
            >
              <Heart size={18} />
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
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-primary text-white py-2 rounded-lg font-medium hover:bg-primary-dark transition-colors flex items-center justify-center space-x-2"
        >
          <ShoppingCart size={18} />
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

