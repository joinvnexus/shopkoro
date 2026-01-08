import mongoose, { Schema, Document, Model } from "mongoose";

/**
 * Category Interface
 */
export interface ICategory extends Document {
  name: string;
  nameBn?: string;
  icon: string;
  slug: string;
  productCount?: number;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Category Schema
 */
const categorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      trim: true,
      maxlength: [100, "Category name cannot exceed 100 characters"],
    },
    nameBn: {
      type: String,
      trim: true,
      maxlength: [100, "Bengali category name cannot exceed 100 characters"],
    },
    icon: {
      type: String,
      required: [true, "Category icon is required"],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, "Category slug is required"],
      trim: true,
      unique: true,
      lowercase: true,
    },
    productCount: {
      type: Number,
      min: [0, "Product count cannot be negative"],
      default: 0,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

// Indexes for better query performance
categorySchema.index({ slug: 1 });
categorySchema.index({ name: "text", nameBn: "text" }); // Text search index

/**
 * Category Model
 */
const Category: Model<ICategory> =
  mongoose.models.Category || mongoose.model<ICategory>("Category", categorySchema);

export default Category;