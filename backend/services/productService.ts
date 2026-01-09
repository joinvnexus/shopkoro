// backend/services/productService.ts

import Product, { IProduct } from '../models/Product';
import Category from '../models/Category';

export class ProductService {
  static parseFilters(query: any) {
    const {
      category,
      minPrice,
      maxPrice,
      inStock,
      search,
      sort = 'createdAt',
      order = 'desc',
      limit = 20,
      page = 1,
    } = query;

    const filterQuery: Record<string, any> = {};
    const sortOptions: Record<string, 1 | -1> = {};

    if (category) filterQuery.category = category;

    if (minPrice || maxPrice) {
      filterQuery.price = {};
      if (minPrice) filterQuery.price.$gte = Number(minPrice);
      if (maxPrice) filterQuery.price.$lte = Number(maxPrice);
    }

    if (inStock !== undefined) {
      filterQuery.inStock = inStock === "true";
    }

    if (search) {
      filterQuery.$text = { $search: search as string };
    }

    // Sorting
    const validSortFields = ['price', 'rating', 'name', 'createdAt', 'discount'];
    const sortField = validSortFields.includes(sort as string) ? sort as string : 'createdAt';
    const sortOrder = (order === 'asc') ? 1 : -1;
    sortOptions[sortField] = sortOrder;

    const pagination = {
      limit: Math.min(Number(limit) || 20, 100),
      page: Math.max(Number(page) || 1, 1),
    };

    return { query: filterQuery, sortOptions, pagination };
  }

  static async getProducts(query: any) {
    const { query: filterQuery, sortOptions, pagination } = this.parseFilters(query);

    // Validate category exists if provided - if not, return empty results
    if (filterQuery.category) {
      const categoryExists = await Category.findOne({ slug: filterQuery.category });
      if (!categoryExists) {
        return {
          products: [],
          pagination: {
            page: pagination.page,
            limit: pagination.limit,
            total: 0,
            pages: 0,
          },
        };
      }
    }

    const skip = (pagination.page - 1) * pagination.limit;

    const [products, total] = await Promise.all([
      Product.find(filterQuery).sort(sortOptions).limit(pagination.limit).skip(skip),
      Product.countDocuments(filterQuery),
    ]);

    return {
      products,
      pagination: {
        page: pagination.page,
        limit: pagination.limit,
        total,
        pages: Math.ceil(total / pagination.limit),
      },
    };
  }

  static async getFeaturedProducts() {
    return Product.find({ isFeatured: true })
      .sort({ rating: -1, createdAt: -1 })
      .limit(20);
  }

  static async getOfferProducts() {
    return Product.find({ discount: { $gt: 0 }, inStock: true })
      .sort({ discount: -1, createdAt: -1 })
      .limit(20);
  }

  static async getFlashSaleProducts() {
    return Product.find({ isFlashSale: true, inStock: true })
      .sort({ discount: -1, createdAt: -1 })
      .limit(20);
  }

  static async getTrendingProducts() {
    return Product.find({ isTrending: true, inStock: true })
      .sort({ rating: -1, reviews: -1 })
      .limit(20);
  }

  static async getProductById(id: string) {
    return Product.findById(id);
  }

  static async getProductReviews(id: string) {
    const product = await Product.findById(id);
    return product?.reviewsList || [];
  }

  static async submitProductReview(id: string, userId: string, userName: string, rating: number, comment: string) {
    const product = await Product.findById(id);
    if (!product) return null;

    const reviewsList = (product.reviewsList || []) as any[];
    const existingIndex = reviewsList.findIndex(
      (r) => String(r.user) === String(userId)
    );

    if (existingIndex >= 0) {
      reviewsList[existingIndex].rating = rating;
      reviewsList[existingIndex].comment = comment;
      reviewsList[existingIndex].name = userName;
      reviewsList[existingIndex].updatedAt = new Date();
    } else {
      reviewsList.push({
        user: userId,
        name: userName,
        rating,
        comment,
      });
    }

    product.reviewsList = reviewsList as any;
    product.reviews = reviewsList.length;
    product.rating =
      reviewsList.reduce((sum, r) => sum + (Number(r.rating) || 0), 0) /
      Math.max(reviewsList.length, 1);

    return product.save();
  }

  static async createProduct(productData: Partial<IProduct>) {
    return Product.create(productData);
  }

  static async updateProduct(id: string, productData: Partial<IProduct>) {
    return Product.findByIdAndUpdate(id, productData, {
      new: true,
      runValidators: true,
    });
  }

  static async deleteProduct(id: string) {
    return Product.findByIdAndDelete(id);
  }
}