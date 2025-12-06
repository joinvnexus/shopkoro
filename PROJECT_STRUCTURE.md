# ShopKoro - Project Structure

## Frontend (Next.js 14)
```
shopkoro/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Landing page
│   └── globals.css        # Global styles
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
│       └── TestimonialSlider.tsx
├── lib/                    # Utilities
│   └── api.ts             # API client
├── types/                  # TypeScript types
│   └── index.ts
└── backend/                # Backend API
    ├── models/
    ├── routes/
    ├── middleware/
    └── config/
```

## Tech Stack
- Frontend: Next.js 14 (App Router) + TypeScript + Tailwind CSS
- Backend: Node.js + Express + MongoDB + Mongoose
- Animations: Framer Motion
- Icons: Lucide React
- Carousel: Swiper.js

