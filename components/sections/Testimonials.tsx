"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
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
    <section className="py-16 bg-gradient-to-b from-gray-light to-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
            গ্রাহকদের মতামত
          </h2>
          <p className="text-gray-dark max-w-2xl mx-auto">
            আমাদের গ্রাহকরা যা বলছেন
          </p>
        </motion.div>

        {/* Testimonials Slider */}
        {testimonials.length > 0 ? (
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            className="testimonials-swiper"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={testimonial._id || index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="bg-white rounded-xl shadow-lg hover:shadow-2xl p-6 h-full border border-gray-light hover:border-primary/30 transition-all duration-300"
                >
                  <Quote className="text-primary mb-4" size={32} />
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={
                          i < testimonial.rating
                            ? "fill-accent text-accent"
                            : "text-gray-medium"
                        }
                      />
                    ))}
                  </div>
                  <p className="text-gray-dark mb-6 text-sm leading-relaxed">
                    {testimonial.commentBn || testimonial.comment}
                  </p>
                  <div className="flex items-center space-x-3">
                    {testimonial.image ? (
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center border-2 border-primary/50">
                        <span className="text-primary font-bold">
                          {testimonial.name.charAt(0)}
                        </span>
                      </div>
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center border-2 border-primary/50">
                        <span className="text-primary font-bold">
                          {testimonial.name.charAt(0)}
                        </span>
                      </div>
                    )}
                    <div>
                      <h4 className="font-semibold text-dark">
                        {testimonial.nameBn || testimonial.name}
                      </h4>
                      {testimonial.location && (
                        <p className="text-xs text-gray-dark">
                          {testimonial.location}
                        </p>
                      )}
                    </div>
                    {testimonial.verified && (
                      <span className="ml-auto bg-gradient-to-r from-primary/20 to-secondary/20 text-primary text-xs px-3 py-1 rounded-full font-semibold border border-primary/30">
                        Verified
                      </span>
                    )}
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-dark">কোন টেস্টিমোনিয়াল নেই</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;

