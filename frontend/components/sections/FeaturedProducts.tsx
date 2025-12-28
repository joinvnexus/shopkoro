"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import ProductCard from "@/components/ui/ProductCard";
import { Product } from "@/types";

interface FeaturedProductsProps {
  products: Product[];
}

const FeaturedProducts = ({ products }: FeaturedProductsProps) => {
  const featuredProducts = products.filter((p) => p.isFeatured).slice(0, 10);

  return (
    <section className="py-16 bg-gray-light">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary/30 to-secondary/20 px-5 py-2.5 rounded-full mb-4 border-2 border-primary/50 shadow-lg"
          >
            <Star className="text-primary fill-primary" size={20} />
            <span className="font-bold text-dark">ফিচার্ড</span>
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
            জনপ্রিয় প্রোডাক্ট
          </h2>
          <p className="text-gray-dark max-w-2xl mx-auto">
            আমাদের গ্রাহকদের সবচেয়ে পছন্দের প্রোডাক্টগুলো
          </p>
        </motion.div>

        {/* Products Carousel */}
        {featuredProducts.length > 0 ? (
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 3,
              },
              1024: {
                slidesPerView: 4,
              },
            }}
            navigation
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            className="featured-products-swiper"
          >
            {featuredProducts.map((product, index) => (
              <SwiperSlide key={product._id || index}>
                <ProductCard product={product} index={index} />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-dark">কোন ফিচার্ড প্রোডাক্ট নেই</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;

