import mongoose, { Schema, Document, Model } from "mongoose";

/**
 * Product Interface
 */
export interface IProduct extends Document {
  name: string;
  nameBn?: string;
  description: string;
  descriptionBn?: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image: string;
  images?: string[];
  category: string;
  categoryBn?: string;
  inStock: boolean;
  stock?: number;
  rating?: number;
  reviews?: number;
  isFeatured?: boolean;
  isFlashSale?: boolean;
  isTrending?: boolean;
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Product Schema
 */
const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      maxlength: [200, "Product name cannot exceed 200 characters"],
    },
    nameBn: {
      type: String,
      trim: true,
      maxlength: [200, "Bengali product name cannot exceed 200 characters"],
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
      trim: true,
    },
    descriptionBn: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
      min: [0, "Price cannot be negative"],
    },
    originalPrice: {
      type: Number,
      min: [0, "Original price cannot be negative"],
    },
    discount: {
      type: Number,
      min: [0, "Discount cannot be negative"],
      max: [100, "Discount cannot exceed 100%"],
    },
    image: {
      type: String,
      required: [true, "Product image is required"],
    },
    images: {
      type: [String],
      default: [],
    },
    category: {
      type: String,
      required: [true, "Product category is required"],
      trim: true,
    },
    categoryBn: {
      type: String,
      trim: true,
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    stock: {
      type: Number,
      min: [0, "Stock cannot be negative"],
    },
    rating: {
      type: Number,
      min: [0, "Rating cannot be less than 0"],
      max: [5, "Rating cannot exceed 5"],
      default: 0,
    },
    reviews: {
      type: Number,
      min: [0, "Reviews count cannot be negative"],
      default: 0,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isFlashSale: {
      type: Boolean,
      default: false,
    },
    isTrending: {
      type: Boolean,
      default: false,
    },
    tags: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

// Indexes for better query performance
productSchema.index({ category: 1 });
productSchema.index({ isFeatured: 1 });
productSchema.index({ isFlashSale: 1 });
productSchema.index({ isTrending: 1 });
productSchema.index({ name: "text", description: "text" }); // Text search index

/**
 * Product Model
 */
const Product: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>("Product", productSchema);

export default Product;

