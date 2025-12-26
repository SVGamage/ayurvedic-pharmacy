# Ayurvedic Pharmacy

A modern, full-stack e-commerce platform for Ayurvedic products and services built with Next.js 15, TypeScript, and MongoDB. The application features a comprehensive admin dashboard, product management system, and WhatsApp-based ordering for a seamless customer experience.

## Features

### Customer-Facing Features
- **Product Catalog**: Browse and search Ayurvedic products with advanced filtering by category, subcategory, and company
- **Service Listings**: Explore Ayurvedic services with detailed information about duration, pricing, and features
- **WhatsApp Integration**: Direct ordering and booking through WhatsApp Business
- **Product Variants**: Multiple pricing options and variants from different suppliers
- **Responsive Design**: Mobile-first design with smooth animations and modern UI
- **Reviews & Ratings**: Customer testimonials and product ratings
- **Search & Filter**: Advanced search with real-time filtering capabilities

### Admin Features
- **Dashboard**: Overview statistics for products, services, companies, and ratings
- **Product Management**: Full CRUD operations for products with image uploads
- **Service Management**: Create and manage Ayurvedic services
- **Company Management**: Manage suppliers and their product catalogs
- **Category Management**: Hierarchical organization with categories and subcategories
- **Image Uploads**: Cloudinary integration for cloud-based image storage
- **Bulk Import**: CSV-based product import tool with validation

### Authentication & Security
- **Better Auth Integration**: Secure email/password authentication
- **Protected Routes**: Admin panel protected with middleware
- **Session Management**: Secure cookie-based sessions
- **Type Safety**: Full TypeScript coverage for enhanced security

## Tech Stack

### Frontend
- **Next.js 15.4.8** - React framework with App Router and Turbopack
- **React 19.1.1** - UI library
- **TypeScript 5** - Type safety
- **Tailwind CSS 4** - Utility-first styling
- **Radix UI** - Accessible component library
- **React Hook Form** - Form management
- **Zod** - Schema validation
- **Recharts** - Data visualization
- **Lucide React** - Icon library

### Backend
- **MongoDB** - NoSQL database
- **Prisma 6.14.0** - Type-safe ORM
- **Better Auth 1.3.7** - Authentication system
- **Cloudinary 2.7.0** - Media management

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** 18.x or higher
- **npm**, **yarn**, **pnpm**, or **bun** package manager
- **MongoDB** database (local or MongoDB Atlas)
- **Cloudinary** account for image uploads

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/ayurvedic-pharmacy.git
   cd ayurvedic-pharmacy
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory with the following variables:
   ```env
   # Database
   DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/dbname"

   # Application
   NEXT_PUBLIC_APP_URL="http://localhost:3000"

   # Authentication
   BETTER_AUTH_SECRET="your-secret-key-here"
   BETTER_AUTH_URL="http://localhost:3000"

   # Cloudinary
   CLOUDINARY_CLOUD_NAME="your-cloud-name"
   CLOUDINARY_API_KEY="your-api-key"
   CLOUDINARY_API_SECRET="your-api-secret"

   # CSV Import (Optional)
   CSV_FILE_PATH="./scripts/siddhushadha_products.csv"
   COMPANY_ID="your-company-id"
   COMPANY_NAME="Your Company Name"
   DEFAULT_CATEGORY_ID="your-default-category-id"
   ```

4. **Set up the database**
   ```bash
   # Generate Prisma client
   npx prisma generate

   # Push schema to database
   npx prisma db push

   # (Optional) Open Prisma Studio to view/edit data
   npx prisma studio
   ```

## Running the Application

### Development Mode
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Production Build
```bash
# Build the application
npm run build

# Start production server
npm start
```

### Importing Product Data
Import products from CSV files using the included script:

```bash
npm run import:products
```

This will read the CSV file specified in your `.env` file and import products with their variants.

## Project Structure

```
ayurvedic-pharmacy/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── admin/             # Admin dashboard routes
│   │   ├── api/               # API endpoints
│   │   ├── products/          # Product catalog page
│   │   ├── services/          # Services page
│   │   ├── blog/              # Blog page
│   │   ├── contact/           # Contact page
│   │   ├── location/          # Location page
│   │   ├── reviews/           # Reviews page
│   │   ├── sign-in/           # Login page
│   │   ├── sign-up/           # Registration page
│   │   └── page.tsx           # Homepage
│   ├── components/            # React components
│   │   ├── admin/            # Admin-specific components
│   │   └── ui/               # Reusable UI components
│   ├── config/               # App configuration
│   │   ├── currency.ts       # Currency formatting
│   │   └── whatsapp.ts       # WhatsApp integration
│   ├── lib/                  # Utility functions
│   │   ├── auth.ts           # Authentication config
│   │   ├── cloudinary.ts     # Image upload utilities
│   │   └── prisma.ts         # Prisma client
│   ├── types/                # TypeScript type definitions
│   ├── hooks/                # Custom React hooks
│   ├── assets/               # Static assets
│   └── middleware.ts         # Route protection middleware
├── prisma/
│   ├── schema.prisma         # Database schema
│   └── client.ts             # Prisma client config
├── scripts/
│   ├── data_insert.ts        # CSV import script
│   └── *.csv                 # Product data files
├── public/                   # Public static files
├── .env                      # Environment variables
├── next.config.ts            # Next.js configuration
├── tailwind.config.ts        # Tailwind CSS configuration
├── tsconfig.json             # TypeScript configuration
└── package.json              # Dependencies and scripts
```

## Database Schema

The application uses the following main models:

- **User** - Authentication and user accounts
- **Session** - User session management
- **Category** - Product categories
- **SubCategory** - Product subcategories
- **Product** - General products
- **Service** - Ayurvedic services
- **Company** - Supplier/brand information
- **CompanyProduct** - Company-specific products
- **CompanyProductPrice** - Product variant pricing

## API Routes

### Authentication
- `POST /api/auth/sign-in` - User login
- `POST /api/auth/sign-up` - User registration
- `POST /api/auth/sign-out` - User logout

### Admin API
- `GET/POST /api/admin/products` - List/create products
- `PUT/DELETE /api/admin/products/[id]` - Update/delete product
- `GET/POST /api/admin/services` - List/create services
- `PUT/DELETE /api/admin/services/[id]` - Update/delete service
- `GET/POST /api/admin/categories` - List/create categories
- `PUT/DELETE /api/admin/categories/[id]` - Update/delete category
- `GET/POST /api/admin/subcategories` - List/create subcategories
- `PUT/DELETE /api/admin/subcategories/[id]` - Update/delete subcategory
- `GET/POST /api/admin/company` - List/create companies
- `PUT/DELETE /api/admin/company/[id]` - Update/delete company
- `POST /api/upload` - Upload images to Cloudinary

## WhatsApp Integration

The application uses WhatsApp Business for order processing:

1. Configure your WhatsApp number in `src/config/whatsapp.ts`
2. Customers can order products directly via WhatsApp
3. Pre-filled message templates for products and services
4. Floating WhatsApp button available on all pages

## Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run import:products` - Import products from CSV

## CSV Import Format

The product import script expects CSV files with the following columns:
- Product Code
- Product Name
- Category
- Subcategory
- Price
- Unit Size/Variant
- Description (optional)
- Image URL (optional)

Example CSV files are included in the `scripts/` directory.

## Configuration

### Currency
The application is configured for Sri Lankan Rupees (Rs.). To change:
- Edit `src/config/currency.ts`
- Update locale and currency code

### WhatsApp
Configure WhatsApp settings in `src/config/whatsapp.ts`:
- Phone number
- Message templates
- Display settings

### Cloudinary
Set up image upload configuration:
1. Create a Cloudinary account
2. Add credentials to `.env`
3. Configure upload presets if needed

## Development

### Code Style
- TypeScript for type safety
- ESLint for code quality
- Prettier for code formatting
- Component-based architecture

### Best Practices
- Use server components where possible
- Implement proper error handling
- Validate all inputs with Zod
- Use Prisma for database operations
- Follow Next.js App Router conventions

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Import project in Vercel
3. Configure environment variables
4. Deploy

### Other Platforms
The application can be deployed to any platform supporting Next.js:
- Railway
- Render
- DigitalOcean App Platform
- AWS Amplify
- Self-hosted with Docker

Ensure your platform supports:
- Node.js 18+
- Environment variables
- MongoDB connection

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions:
- Create an issue in the GitHub repository
- Contact via WhatsApp (configured in the app)

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [Radix UI](https://www.radix-ui.com/)
- Icons from [Lucide](https://lucide.dev/)
- Authentication by [Better Auth](https://better-auth.com/)
- Styling with [Tailwind CSS](https://tailwindcss.com/)
