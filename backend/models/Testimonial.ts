import mongoose, { Schema, Document, Model } from "mongoose";

/**
 * Testimonial Interface
 */
export interface ITestimonial extends Document {
  name: string;
  nameBn?: string;
  image?: string;
  rating: number;
  comment: string;
  commentBn?: string;
  location?: string;
  verified?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Testimonial Schema
 */
const testimonialSchema = new Schema<ITestimonial>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    nameBn: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
    },
    rating: {
      type: Number,
      required: [true, "Rating is required"],
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating cannot exceed 5"],
    },
    comment: {
      type: String,
      required: [true, "Comment is required"],
      trim: true,
    },
    commentBn: {
      type: String,
      trim: true,
    },
    location: {
      type: String,
      trim: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Testimonial Model
 */
const Testimonial: Model<ITestimonial> =
  mongoose.models.Testimonial ||
  mongoose.model<ITestimonial>("Testimonial", testimonialSchema);

export default Testimonial;

