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
├── app/                    # Next.js App Router
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── sections/           # Page sections
│   └── ui/                 # Reusable components
├── lib/                    # Utilities
├── types/                  # TypeScript types
└── backend/                # Backend API
    ├── config/
    ├── models/
    ├── routes/
    └── scripts/
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
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/shopkoro
# Or use MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/shopkoro?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:3000

# Payment Gateway Keys (for production)
SSLCOMMERZ_STORE_ID=your_store_id
SSLCOMMERZ_STORE_PASSWORD=your_store_password
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
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
9. ✅ Responsive Navbar
10. ✅ Footer

### E-commerce Features
11. ✅ **User Authentication** - Login/Register/Profile management
12. ✅ **Shopping Cart** - Add, update, remove items with Zustand state
13. ✅ **Product Catalog** - Browse products with filtering and search
14. ✅ **Checkout System** - Complete order flow with shipping details
15. ✅ **Payment Integration** - SSLCommerz (BDT) + Stripe (USD)
16. ✅ **Order Management** - Order history and status tracking

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

#### Cart Management
- `GET /api/cart` - Get user's cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:itemId` - Update cart item
- `DELETE /api/cart/:itemId` - Remove item from cart
- `DELETE /api/cart` - Clear cart

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

1. **Push code to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Import project to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will automatically detect Next.js

3. **Configure Build Settings**
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`

4. **Add Environment Variables** (if needed)
   - NEXT_PUBLIC_API_URL=https://your-backend-domain.onrender.com/api

5. **Deploy!**
   - Click "Deploy"
   - Wait for build to complete
   - Your frontend will be live at `https://your-project.vercel.app`

### Backend (Render)

1. **Push code to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Create new Web Service on Render**
   - Go to [render.com](https://render.com)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository

3. **Configure Build & Runtime Settings**
   - Root Directory: `backend`
   - Build Command: `npm run build`
   - Start Command: `npm start`
   - Runtime: Node (latest)

4. **Add Environment Variables**
   Copy all variables from `backend/.env.example` and add them in Render:
   ```
   PORT=5000
   NODE_ENV=production
   FRONTEND_URL=https://your-frontend-domain.vercel.app
   BACKEND_URL=https://your-backend-domain.onrender.com
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
   ACCESS_TOKEN_SECRET=your-access-secret-here
   REFRESH_TOKEN_SECRET=your-refresh-secret-here
   ACCESS_TOKEN_EXPIRES_IN=7d
   REFRESH_TOKEN_EXPIRES_IN=7d
   REFRESH_COOKIE_NAME=shopkoro_refresh
   ADMIN_EMAIL=admin@shopkoro.com
   ADMIN_PASSWORD=ChangeMe123!
   STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
   STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
   SSLCOMMERZ_STORE_ID=your_store_id_here
   SSLCOMMERZ_STORE_PASSWORD=your_store_password_here
   ```

5. **Deploy!**
   - Click "Create Web Service"
   - Wait for build to complete
   - Your backend will be live at `https://your-service-name.onrender.com`

### Important Notes

1. **Update URLs**: After deploying both frontend and backend, update the `FRONTEND_URL` and `BACKEND_URL` in both services' environment variables.

2. **MongoDB Atlas**: For production, use MongoDB Atlas instead of local MongoDB. Create a free account at [mongodb.com/atlas](https://www.mongodb.com/atlas).

3. **Payment Gateways**:
   - For SSLCommerz: Get credentials from [sslcommerz.com](https://sslcommerz.com)
   - For Stripe: Get API keys from [stripe.com](https://stripe.com)

4. **Security**: Never commit `.env` files to GitHub. Use `.env.example` as a template and add actual values in deployment platforms.

## 📄 License

ISC

## 👨‍💻 Author

ShopKoro Development Team

---

**Note**: Make sure MongoDB is running before starting the backend server. Use `npm run seed` to populate the database with sample data.
