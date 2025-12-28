"use client";

import { motion } from "framer-motion";
import { Star, Quote, Sparkles, CheckCircle2 } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Testimonial } from "@/types";

interface TestimonialsProps {
  testimonials: Testimonial[];
}

const Testimonials = ({ testimonials }: TestimonialsProps) => {
  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-purple-50/50 via-pink-50/30 to-white dark:from-gray-950 dark:via-purple-950/40 dark:to-gray-900">
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-br from-purple-400/30 via-pink-400/30 to-orange-400/30 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="container mx-auto px-4">
        {/* Premium Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 text-white px-8 py-4 rounded-full text-lg font-black shadow-2xl mb-6"
          >
            <Sparkles className="w-6 h-6" />
            <span>লক্ষাধিক সন্তুষ্ট ক্রেতা</span>
            <Sparkles className="w-6 h-6" />
          </motion.div>

          <h2 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent mb-4">
            গ্রাহকদের ভালোবাসা
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            প্রতিদিন হাজারো মানুষ আমাদের বিশ্বাস করছে
          </p>
        </motion.div>

        {/* Ultra Premium Swiper */}
        {testimonials.length > 0 ? (
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={32}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            pagination={{ clickable: true, dynamicBullets: true }}
            loop={true}
            className="testimonials-swiper pb-12"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={testimonial._id || index}>
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -12, scale: 1.04 }}
                  className="group relative bg-white/80 dark:bg-gray-900/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl hover:shadow-2xl border border-white/20 dark:border-gray-800 transition-all duration-500 h-full"
                >
                  {/* Quote Icon with Glow */}
                  <motion.div
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 6, repeat: Infinity }}
                    className="absolute -top-6 -left-6 opacity-20"
                  >
                    <Quote size={120} className="text-primary" />
                  </motion.div>

                  {/* Rating Stars */}
                  <div className="flex items-center gap-1 mb-5">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <Star
                          size={22}
                          className={
                            i < testimonial.rating
                              ? "fill-yellow-500 text-yellow-500 drop-shadow-glow"
                              : "text-gray-300 dark:text-gray-700"
                          }
                        />
                      </motion.div>
                    ))}
                    <span className="ml-3 text-sm font-bold text-gray-600">
                      {testimonial.rating}.0
                    </span>
                  </div>

                  {/* Comment */}
                  <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-8 italic">
                    &quot;{testimonial.commentBn || testimonial.comment}&quot;
                  </p>

                  {/* User Info */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 p-0.5">
                          <div className="w-full h-full rounded-full bg-white dark:bg-gray-900 flex items-center justify-center text-2xl font-black text-transparent bg-clip-text bg-gradient-to-br from-purple-600 to-orange-600">
                            {testimonial.name.charAt(0).toUpperCase()}
                          </div>
                        </div>
                        {testimonial.verified && (
                          <CheckCircle2 className="absolute -bottom-1 -right-1 w-6 h-6 text-white bg-green-500 rounded-full" />
                        )}
                      </div>

                      <div>
                        <h4 className="font-bold text-lg text-gray-800 dark:text-white">
                          {testimonial.nameBn || testimonial.name}
                        </h4>
                        {testimonial.location && (
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {testimonial.location}
                          </p>
                        )}
                      </div>
                    </div>

                    {testimonial.verified && (
                      <span className="bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg flex items-center gap-1">
                        <CheckCircle2 size={14} />
                        Verified Buyer
                      </span>
                    )}
                  </div>

                  {/* Hover Glow */}
                  <div className="absolute inset-0 rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="absolute inset-0 rounded-3xl blur-xl bg-gradient-to-br from-purple-600/20 via-pink-600/20 to-orange-600/20" />
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="text-center py-20">
            <Quote className="w-20 h-20 text-gray-300 mx-auto mb-6" />
            <p className="text-2xl text-gray-500">কোন টেস্টিমোনিয়াল নেই এখনো</p>
          </div>
        )}
      </div>

      {/* Custom Swiper Pagination Style (optional) */}
      <style jsx global>{`
        .testimonials-swiper .swiper-pagination-bullet {
          background: rgba(139, 92, 246, 0.3);
          opacity: 1;
        }
        .testimonials-swiper .swiper-pagination-bullet-active {
          background: linear-gradient(to right, #a855f7, #ec4899);
          box-shadow: 0 0 15px rgba(236, 72, 153, 0.6);
        }
      `}</style>
    </section>
  );
};

export default Testimonials;