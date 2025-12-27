# ShopKoro - Project Structure

## Frontend (Next.js 14)
```
shopkoro/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with navbar and footer
│   ├── page.tsx           # Landing page with hero, categories, products
│   ├── globals.css        # Global styles with Tailwind CSS
│   ├── favicon.ico        # App favicon
│   ├── admin/             # Admin dashboard
│   │   ├── layout.tsx     # Admin layout with sidebar navigation
│   │   ├── page.tsx       # Admin dashboard with analytics
│   │   ├── products/      # Product management
│   │   │   └── page.tsx   # Product CRUD operations
│   │   ├── orders/        # Order management
│   │   │   └── page.tsx   # Order tracking and management
│   │   ├── users/         # User management
│   │   │   └── page.tsx   # User administration
│   │   ├── categories/    # Category management
│   │   │   └── page.tsx   # Category CRUD operations
│   │   └── delivery/      # Delivery management
│   │       └── page.tsx   # Delivery settings and tracking
│   ├── checkout/          # Checkout system
│   │   └── page.tsx       # Checkout page with payment integration
│   ├── order-success/     # Order confirmation
│   │   └── page.tsx       # Order success page with tracking
│   ├── login/             # Authentication
│   │   └── page.tsx       # Login page
│   ├── register/          # User registration
│   │   └── page.tsx       # Registration page
│   ├── profile/           # User profile
│   │   └── page.tsx       # Profile management with order history
│   ├── products/          # Product pages
│   │   ├── page.tsx       # Products listing with filters
│   │   └── [id]/          # Dynamic product details
│   │       └── page.tsx   # Individual product page with reviews
│   └── cart/              # Shopping cart
│       └── page.tsx       # Cart page with quantity management
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
│       ├── TestimonialSlider.tsx
│       ├── SearchBar.tsx        # Product search component
│       ├── WishlistButton.tsx   # Add/remove from wishlist
│       ├── ReviewCard.tsx       # Product review display
│       ├── OrderCard.tsx        # Order history card
│       ├── AdminSidebar.tsx     # Admin navigation sidebar
│       ├── AdminHeader.tsx      # Admin header with user info
│       ├── DataTable.tsx        # Reusable data table for admin
│       ├── Modal.tsx            # Reusable modal component
│       ├── LoadingSpinner.tsx   # Loading indicator
│       ├── ErrorMessage.tsx     # Error display component
│       ├── Pagination.tsx       # Pagination component
│       ├── Breadcrumb.tsx       # Navigation breadcrumb
│       └── Toast.tsx            # Notification toast
├── lib/                    # Utilities
│   └── api.ts             # API client
├── stores/                 # Zustand state management
│   ├── authStore.ts       # Authentication state
│   ├── cartStore.ts       # Shopping cart state
│   └── wishlistStore.ts   # User wishlist state
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
