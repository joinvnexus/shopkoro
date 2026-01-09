# ShopKoro - বাংলাদেশের সবচেয়ে বড় অনলাইন শপিং

একটি মডার্ন, ফুল-স্ট্যাক ই-কমার্স ল্যান্ডিং পেজ বাংলাদেশের মার্কেটের জন্য।

## 🚀 Tech Stack

### Frontend
- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Zustand** (State Management)
- **Framer Motion** (Animations)
- **Swiper.js** (Carousels)
- **Lucide React** (Icons)

### Backend
- **Node.js**
- **Express**
- **MongoDB**
- **Mongoose**
- **JWT** (Authentication)
- **SSLCommerz** (BD Payment Gateway)
- **Stripe** (International Payment Gateway)
- **TypeScript**

## 📁 Project Structure

```
shopkoro/
├── frontend/               # Next.js frontend application
│   ├── app/                # Next.js App Router
│   ├── components/         # Reusable components
│   ├── lib/                # Utilities
│   ├── stores/             # Zustand state management
│   ├── types/              # TypeScript types
│   └── public/             # Static assets
├── backend/                # Node.js/Express backend API
│   ├── config/             # Database configuration
│   ├── controllers/        # Route controllers
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes
│   ├── middleware/         # Express middleware
│   ├── utils/              # Utilities
│   └── scripts/            # Database scripts
├── .gitignore
├── PROJECT_STRUCTURE.md
├── README.md
└── .vscode/
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+
- MongoDB (Local or Atlas)
- npm or yarn

### Frontend Setup

1. Navigate to the project root:
```bash
cd shopkoro
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env.local` file (optional for now):
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

4. Run development server:
```bash
npm run dev
```

Frontend will run on `http://localhost:3000`

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/shopkoro
# Or use MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/shopkoro?retryWrites=true&w=majority
ACCESS_TOKEN_SECRET=your-access-token-secret
REFRESH_TOKEN_SECRET=your-refresh-token-secret
ACCESS_TOKEN_EXPIRES_IN=15m
REFRESH_TOKEN_EXPIRES_IN=7d
REFRESH_COOKIE_NAME=shopkoro_refresh
FRONTEND_URL=http://localhost:3000
BACKEND_URL=http://localhost:5000
ADMIN_EMAIL=admin@shopkoro.com
ADMIN_PASSWORD=ChangeMe123!

# Payment Gateway Keys (for production)
SSLCOMMERZ_STORE_ID=your_store_id
SSLCOMMERZ_STORE_PASSWORD=your_store_password
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
```

4. Seed the database with dummy data:
```bash
npm run seed
```

5. Run development server:
```bash
npm run dev
```

Backend will run on `http://localhost:5000`

## 📝 Features

### Landing Page Sections
1. ✅ Hero Section with Countdown Timer
2. ✅ Flash Sale Section (8 products)
3. ✅ Category Grid (12 categories)
4. ✅ Featured Products Carousel
5. ✅ Why Choose Us (4 feature cards)
6. ✅ Trending Products Grid
7. ✅ Testimonials Slider
8. ✅ Newsletter Signup
9. ✅ Offers Page (Discounted products)
10. ✅ Responsive Navbar
11. ✅ Footer

### E-commerce Features
11. ✅ **User Authentication** - Login/Register/Profile management
12. ✅ **Shopping Cart** - Add, update, remove items with Zustand state
13. ✅ **Product Catalog** - Browse products with filtering and search
14. ✅ **Wishlist** - Save and manage favorite products
15. ✅ **Offers & Discounts** - Special deals and discounted products
16. ✅ **Checkout System** - Complete order flow with shipping details
17. ✅ **Payment Integration** - SSLCommerz (BDT) + Stripe (USD)
18. ✅ **Order Management** - Order history and status tracking

### Backend API Routes

#### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/me` - Get current user info
- `POST /api/auth/logout` - User logout

#### Products
- `GET /api/products` - Get all products
- `GET /api/products/featured` - Get featured products
- `GET /api/products/flash-sale` - Get flash sale products
- `GET /api/products/trending` - Get trending products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

#### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get single category
- `POST /api/categories` - Create category (Admin)
- `PUT /api/categories/:id` - Update category (Admin)
- `DELETE /api/categories/:id` - Delete category (Admin)

#### Cart Management
- `GET /api/cart` - Get user's cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:itemId` - Update cart item
- `DELETE /api/cart/:itemId` - Remove item from cart
- `DELETE /api/cart` - Clear cart

#### Wishlist Management
- `GET /api/wishlist` - Get user's wishlist
- `POST /api/wishlist` - Add product to wishlist
- `DELETE /api/wishlist/:productId` - Remove product from wishlist

#### Orders & Checkout
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get user's orders
- `GET /api/orders/:id` - Get single order
- `PUT /api/orders/:id` - Update order status (Admin)

#### Payment Integration
- `POST /api/payment/sslcommerz/init` - Initialize SSLCommerz payment
- `POST /api/payment/sslcommerz/success` - Handle SSLCommerz success
- `POST /api/payment/sslcommerz/fail` - Handle SSLCommerz failure
- `POST /api/payment/sslcommerz/cancel` - Handle SSLCommerz cancellation
- `POST /api/payment/sslcommerz/ipn` - Handle SSLCommerz IPN
- `POST /api/payment/stripe/create-intent` - Create Stripe payment intent
- `POST /api/payment/stripe/webhook` - Handle Stripe webhooks

#### Testimonials
- `GET /api/testimonials` - Get all testimonials
- `GET /api/testimonials/:id` - Get single testimonial
- `POST /api/testimonials` - Create testimonial

## 🎨 Color Palette

- **Primary**: `#FF6B6B` (Coral Red)
- **Secondary**: `#4ECDC4` (Turquoise)
- **Accent**: `#FFD93D` (Yellow)
- **Dark**: `#2F3E46` (Dark Blue-Gray)

## 📱 Responsive Design

- Mobile-first approach
- Fully responsive on all devices
- Optimized for high conversion rates

## 🚀 Deployment

### Frontend (Vercel)
1. Push code to GitHub
2. Import project to Vercel
3. Add environment variables
4. Deploy!

### Backend (Render/Heroku/Railway)
1. Push code to GitHub
2. Create new service
3. Add environment variables
4. Deploy!

## 📄 License

ISC

## 👨‍💻 Author

ShopKoro Development Team

---

**Note**: Make sure MongoDB is running before starting the backend server. Use `npm run seed` to populate the database with sample data.
