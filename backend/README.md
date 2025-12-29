# ShopKoro Backend

This is the backend API for ShopKoro, an e-commerce platform. It's built with Node.js, Express, TypeScript, and MongoDB.

## Features

- User authentication and authorization
- Product management
- Shopping cart functionality
- Order processing
- Payment integration (Stripe and SSLCommerz)
- Testimonials management

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/shopkoro.git
   cd shopkoro/backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Update the values in `.env` with your actual configuration

4. Build the project:
   ```bash
   npm run build
   ```

5. Start the server:
   ```bash
   npm start
   ```

## Development

To run in development mode:

```bash
npm run dev
```

## Environment Variables

Refer to `.env.example` for a list of required environment variables.

## API Endpoints

- `/api/auth` - Authentication
- `/api/users` - User management
- `/api/products` - Product management
- `/api/cart` - Shopping cart
- `/api/orders` - Order management
- `/api/payment` - Payment processing
- `/api/testimonials` - Testimonials

## Deployment

### Render

1. Push your code to a Git repository
2. Connect your repository to Render
3. Configure environment variables in Render dashboard
4. Render will automatically detect the `render.yaml` configuration

## Scripts

- `npm run build` - Compile TypeScript to JavaScript
- `npm run start` - Start the production server
- `npm run dev` - Start the development server
- `npm run test` - Run tests
- `npm run seed` - Seed the database with sample data
- `npm run seed:admin` - Create an admin user

## License

ISC