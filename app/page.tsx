"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import Hero from "@/components/sections/Hero";
import FlashSale from "@/components/sections/FlashSale";
import CategoryGrid from "@/components/sections/CategoryGrid";
import FeaturedProducts from "@/components/sections/FeaturedProducts";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import TrendingProducts from "@/components/sections/TrendingProducts";
import Testimonials from "@/components/sections/Testimonials";
import Newsletter from "@/components/sections/Newsletter";
import { Product, Testimonial } from "@/types";
import { productApi, testimonialApi } from "@/lib/api";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all products
        const allProducts = await productApi.getAll();
        setProducts(allProducts);

        // Fetch testimonials
        const allTestimonials = await testimonialApi.getAll();
        setTestimonials(allTestimonials);
      } catch (error) {
        console.error("Error fetching data:", error);
        // If API fails, use dummy data (will be set up in step 7)
        setProducts([]);
        setTestimonials([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-dark">লোড হচ্ছে...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-16">
        <Hero />
        <FlashSale products={products} />
        <CategoryGrid />
        <FeaturedProducts products={products} />
        <WhyChooseUs />
        <TrendingProducts products={products} />
        <Testimonials testimonials={testimonials} />
        <Newsletter />
      </div>
      <Footer />
    </main>
  );
}
