# ShopKoro - Project Structure

## Frontend (Next.js 14)
```
shopkoro/
├── frontend/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx         # Root layout with navbar and footer
│   │   ├── page.tsx           # Landing page with hero, categories, products
│   │   ├── globals.css        # Global styles with Tailwind CSS
│   │   ├── favicon.ico        # App favicon
│   │   ├── admin/             # Admin dashboard
│   │   │   ├── layout.tsx     # Admin layout with sidebar navigation
│   │   │   ├── page.tsx       # Admin dashboard with analytics
│   │   │   ├── products/      # Product management
│   │   │   │   └── page.tsx   # Product CRUD operations
│   │   │   ├── orders/        # Order management
│   │   │   │   └── page.tsx   # Order tracking and management
│   │   │   ├── users/         # User management
│   │   │   │   └── page.tsx   # User administration
│   │   │   ├── categories/    # Category management
│   │   │   │   └── page.tsx   # Category CRUD operations
│   │   │   ├── delivery/      # Delivery management
│   │   │   │   └── page.tsx   # Delivery settings and tracking
│   │   │   ├── reports/       # Reports management
│   │   │   │   └── page.tsx   # Reports and analytics
│   │   │   └── settings/      # Settings management
│   │   │       └── page.tsx   # Application settings
│   │   ├── checkout/          # Checkout system
│   │   │   └── page.tsx       # Checkout page with payment integration
│   │   ├── order-success/     # Order confirmation
│   │   │   └── page.tsx       # Order success page with tracking
│   │   ├── login/             # Authentication
│   │   │   └── page.tsx       # Login page
│   │   ├── register/          # User registration
│   │   │   └── page.tsx       # Registration page
│   │   ├── profile/           # User profile
│   │   │   └── page.tsx       # Profile management with order history
│   │   ├── products/          # Product pages
│   │   │   ├── page.tsx       # Products listing with filters
│   │   │   └── [id]/          # Dynamic product details
│   │   │       └── page.tsx   # Individual product page with reviews
│   │   ├── categories/        # Category pages
│   │   │   └── page.tsx       # Category listing
│   │   ├── cart/              # Shopping cart
│   │   │   └── page.tsx       # Cart page with quantity management
│   │   ├── wishlist/          # User wishlist
│   │   │   └── page.tsx       # Wishlist page
│   │   ├── search/            # Search results
│   │   │   └── page.tsx       # Search page
│   │   ├── contact/           # Contact page
│   │   │   └── page.tsx       # Contact form
│   │   ├── faq/               # FAQ page
│   │   │   └── page.tsx       # Frequently asked questions
│   │   ├── offers/            # Offers page
│   │   │   └── page.tsx       # Offers listing with discounts
│   │   ├── shipping/          # Shipping information
│   │   │   └── page.tsx       # Shipping policies
│   │   └── return-policy/     # Return policy
│   │       └── page.tsx       # Return policy details
│   ├── components/
│   │   ├── sections/          # Page sections
│   │   │   ├── Hero.tsx
│   │   │   ├── FlashSale.tsx
│   │   │   ├── CategoryGrid.tsx
│   │   │   ├── FeaturedProducts.tsx
│   │   │   ├── WhyChooseUs.tsx
│   │   │   ├── TrendingProducts.tsx
│   │   │   ├── Testimonials.tsx
│   │   │   └── Newsletter.tsx
│   │   └── ui/                # Reusable components
│   │       ├── Navbar.tsx
│   │       ├── Footer.tsx
│   │       ├── ProductCard.tsx
│   │       ├── CategoryCard.tsx
│   │       ├── CountdownTimer.tsx
│   │       ├── ProductGrid.tsx
│   │       ├── SortFilter.tsx
│       ├── ViewToggle.tsx
│       └── LoadingScreen.tsx
│   ├── lib/                    # Utilities
│   │   └── api.ts             # API client
│   ├── stores/                 # Zustand state management
│   │   ├── authStore.ts       # Authentication state
│   │   ├── cartStore.ts       # Shopping cart state
│   │   └── wishlistStore.ts   # User wishlist state
│   ├── types/                  # TypeScript types
│   │   └── index.ts
│   ├── public/                 # Static assets
│   │   ├── file.svg
│   │   ├── globe.svg
│   │   ├── next.svg
│   │   ├── vercel.svg
│   │   └── window.svg
│   ├── __tests__/              # Test files
│   │   ├── README.md
│   │   ├── lib/
│   │   │   └── api.test.ts
│   │   └── stores/
│   │       ├── authStore.test.ts
│   │       ├── cartStore.test.ts
│   │       └── wishlistStore.test.ts
│   ├── .next/                  # Next.js build output
│   ├── eslint.config.mjs
│   ├── jest.config.js
│   ├── jest.setup.js
│   ├── next.config.ts
│   ├── package.json
│   ├── package-lock.json
│   ├── postcss.config.mjs
│   ├── tailwind.config.ts
│   └── tsconfig.json
```

## Backend (Node.js + Express)
```
├── backend/
│   ├── server.ts               # Main server file
│   ├── package.json
│   ├── package-lock.json
│   ├── tsconfig.json
│   ├── jest.config.js
│   ├── config/                 # Database configuration
│   │   └── database.ts
│   ├── controllers/            # Route controllers
│   │   ├── authController.ts
│   │   ├── cartController.ts
│   │   ├── orderController.ts
│   │   ├── paymentController.ts
│   │   ├── productController.ts
│   │   └── userController.ts
│   ├── middleware/             # Express middleware
│   │   ├── authMiddleware.ts
│   │   ├── errorMiddleware.ts
│   │   └── validationMiddleware.ts
│   ├── models/                 # Mongoose models
│   │   ├── Cart.ts
│   │   ├── Category.ts
│   │   ├── Order.ts
│   │   ├── Product.ts
│   │   ├── Testimonial.ts
│   │   └── User.ts
│   ├── routes/                 # API routes
│   │   ├── authRoutes.ts
│   │   ├── cartRoutes.ts
│   │   ├── categoryRoutes.ts
│   │   ├── orderRoutes.ts
│   │   ├── paymentRoutes.ts
│   │   ├── productRoutes.ts
│   │   ├── testimonialRoutes.ts
│   │   └── userRoutes.ts
│   ├── scripts/                # Database scripts
│   │   ├── seedAdmin.ts
│   │   └── seedData.ts
│   ├── tests/                  # Test suite
│   │   ├── README.md
│   │   ├── setup.ts
│   │   ├── test-sequencer.js
│   │   ├── types.d.ts
│   │   ├── integration/
│   │   │   ├── auth.test.ts
│   │   │   ├── cart.test.ts
│   │   │   ├── product.test.ts
│   │   │   ├── setup.ts
│   │   │   ├── test-setup.ts
│   │   │   └── user.test.ts
│   │   ├── models/
│   │   │   ├── Product.test.ts
│   │   │   └── User.test.ts
│   │   └── utils/
│   │       └── tokens.test.ts
│   └── utils/                  # Utilities
│       └── tokens.ts           # JWT token utilities
```

## Tech Stack
- Frontend: Next.js 14 (App Router) + TypeScript + Tailwind CSS
- Backend: Node.js + Express + MongoDB + Mongoose
- State Management: Zustand
- Payment: SSLCommerz + Stripe
- Animations: Framer Motion
- Icons: Lucide React
- Carousel: Swiper.js
