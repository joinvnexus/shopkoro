# ShopKoro - Project Structure

## Frontend (Next.js 14)
```
shopkoro/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Landing page
│   ├── globals.css        # Global styles
│   ├── checkout/          # Checkout system
│   │   └── page.tsx       # Checkout page with payment integration
│   ├── order-success/     # Order confirmation
│   │   └── page.tsx       # Order success page
│   ├── login/             # Authentication
│   │   └── page.tsx       # Login page
│   ├── register/          # User registration
│   │   └── page.tsx       # Registration page
│   ├── profile/           # User profile
│   │   └── page.tsx       # Profile management
│   ├── products/          # Product pages
│   │   ├── page.tsx       # Products listing
│   │   └── [id]/          # Dynamic product details
│   │       └── page.tsx   # Individual product page
│   └── cart/              # Shopping cart
│       └── page.tsx       # Cart page
├── components/
│   ├── sections/          # Page sections
│   │   ├── Hero.tsx
│   │   ├── FlashSale.tsx
│   │   ├── CategoryGrid.tsx
│   │   ├── FeaturedProducts.tsx
│   │   ├── WhyChooseUs.tsx
│   │   ├── TrendingProducts.tsx
│   │   ├── Testimonials.tsx
│   │   └── Newsletter.tsx
│   └── ui/                # Reusable components
│       ├── Navbar.tsx
│       ├── Footer.tsx
│       ├── ProductCard.tsx
│       ├── CategoryCard.tsx
│       ├── CountdownTimer.tsx
│       ├── ProductGrid.tsx
│       ├── SortFilter.tsx
│       ├── ViewToggle.tsx
│       └── TestimonialSlider.tsx
├── lib/                    # Utilities
│   └── api.ts             # API client
├── stores/                 # Zustand state management
│   ├── authStore.ts       # Authentication state
│   └── cartStore.ts       # Shopping cart state
├── types/                  # TypeScript types
│   └── index.ts
└── backend/                # Backend API
    ├── config/            # Database configuration
    ├── models/            # Mongoose models
    │   ├── User.ts
    │   ├── Product.ts
    │   ├── Cart.ts
    │   ├── Order.ts
    │   └── Testimonial.ts
    ├── routes/            # API routes
    │   ├── authRoutes.ts
    │   ├── productRoutes.ts
    │   ├── cartRoutes.ts
    │   ├── orderRoutes.ts
    │   ├── paymentRoutes.ts
    │   └── testimonialRoutes.ts
    ├── controllers/       # Route controllers
    │   ├── authController.ts
    │   ├── userController.ts
    │   ├── productController.ts
    │   ├── cartController.ts
    │   ├── orderController.ts
    │   └── paymentController.ts
    ├── middleware/        # Express middleware
    │   ├── authMiddleware.ts
    │   └── errorMiddleware.ts
    ├── utils/             # Utilities
    │   └── tokens.ts      # JWT token utilities
    └── scripts/           # Database scripts
        ├── seedAdmin.ts
        └── seedData.ts
```

## Tech Stack
- Frontend: Next.js 14 (App Router) + TypeScript + Tailwind CSS
- Backend: Node.js + Express + MongoDB + Mongoose
- State Management: Zustand
- Payment: SSLCommerz + Stripe
- Animations: Framer Motion
- Icons: Lucide React
- Carousel: Swiper.js
