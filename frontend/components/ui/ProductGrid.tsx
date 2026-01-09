// components/ui/ProductGrid.tsx
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "./ProductCard";
import { Product } from "@/types";

interface ProductGridProps {
  products: Product[];
  viewMode?: "grid" | "list";
}

export default function ProductGrid({ products, viewMode = "grid" }: ProductGridProps) {
  const gridLayout =
    viewMode === "list"
      ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
      : "grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5";

  return (
    <motion.div layout className={`grid gap-6 ${gridLayout}`}>
      <AnimatePresence>
        {products.map((product, i) => (
          <motion.div
            key={product._id || product.name || i}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ delay: i * 0.05 }}
          >
            <ProductCard product={product} index={i} />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}