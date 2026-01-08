//./app/page.tsx
"use client";

import { useEffect, useState } from "react";
// import Navbar from "@/components/ui/Navbar";
// import Footer from "@/components/ui/Footer";
import Hero from "@/components/sections/Hero";
import FlashSale from "@/components/sections/FlashSale";
import CategoryGrid from "@/components/sections/CategoryGrid";
import FeaturedProducts from "@/components/sections/FeaturedProducts";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import TrendingProducts from "@/components/sections/TrendingProducts";
import Testimonials from "@/components/sections/Testimonials";
import Newsletter from "@/components/sections/Newsletter";
import LoadingScreen from "@/components/ui/LoadingScreen";
import { Product, Testimonial } from "@/types";
import { productApi, testimonialApi } from "@/lib/api";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const [allProducts, allTestimonials] = await Promise.all([
          productApi.getAll(),
          testimonialApi.getAll(),
        ]);

        if (!isMounted) return;
        setProducts(allProducts);
        setTestimonials(allTestimonials);
        setError(null);
      } catch (error) {
        console.error("Error fetching data:", error);
        if (!isMounted) return;
        setError("ডেটা লোড করতে সমস্যা হয়েছে। পরে আবার চেষ্টা করুন।");
        setProducts([]);
        setTestimonials([]);
      } finally {
        if (!isMounted) return;
        setLoading(false);
      }
    };

    fetchData();
    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return <LoadingScreen variant="plain" />;
  }

  return (
    <main className="min-h-screen">
      {/* <Navbar /> */}
      <div className="pt-0">
        {error && (
          <div className="max-w-5xl mx-auto mb-6 rounded-xl bg-red-50 text-red-700 border border-red-200 px-6 py-4">
            {error}
          </div>
        )}
        <Hero />
        <FlashSale products={products} />
        <CategoryGrid />
        <FeaturedProducts products={products} />
        <WhyChooseUs />
        <TrendingProducts products={products} />
        <Testimonials testimonials={testimonials} />
        <Newsletter />
      </div>
      {/* <Footer /> */}
    </main>
  );
}
