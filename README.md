# ShopKoro - বাংলাদেশের সবচেয়ে বড় অনলাইন শপিং

একটি মডার্ন, ফুল-স্ট্যাক ই-কমার্স ল্যান্ডিং পেজ বাংলাদেশের মার্কেটের জন্য।

## 🚀 Tech Stack

### Frontend
- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion** (Animations)
- **Swiper.js** (Carousels)
- **Lucide React** (Icons)

### Backend
- **Node.js**
- **Express**
- **MongoDB**
- **Mongoose**
- **JWT** (Authentication)
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
ACCESS_TOKEN_SECRET=your-access-secret
REFRESH_TOKEN_SECRET=your-refresh-secret
ACCESS_TOKEN_EXPIRES_IN=15m
REFRESH_TOKEN_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:3000
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

### Backend API Routes

#### Products
- `GET /api/products` - Get all products
- `GET /api/products/featured` - Get featured products
- `GET /api/products/flash-sale` - Get flash sale products
- `GET /api/products/trending` - Get trending products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

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
