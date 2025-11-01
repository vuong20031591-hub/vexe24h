# DatVe360 - Professional Bus Ticket Booking Platform

## Overview

DatVe360 is a professional bus ticket booking web application inspired by FutaBus.vn. The platform provides a user-friendly interface for searching and booking bus tickets with a focus on visual clarity and business-oriented design. Built as a frontend demo with mock data, it showcases modern web development practices with responsive design, smooth animations, and SEO-friendly layout.

The application features a comprehensive home page with hero search functionality, promotional carousels, popular routes display, statistics section, and news updates - all designed to create a polished, professional transportation booking experience.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- **React 18** with TypeScript for type-safe component development
- **Vite** as the build tool and development server for fast HMR and optimized production builds
- **Wouter** for lightweight client-side routing (single-page application)
- **React Query (@tanstack/react-query)** for server state management and data fetching

**UI Component System**
- **shadcn/ui** component library built on Radix UI primitives for accessible, unstyled components
- **Tailwind CSS** for utility-first styling with custom design tokens
- **Custom color palette** matching FUTA Bus brand (primary red #E31E25, accent green #10B981)
- **Class Variance Authority (CVA)** for component variant management
- Component path aliases configured via TypeScript paths (`@/components`, `@/lib`, `@/hooks`)

**Design Approach**
- Reference-based design inspired by FutaBus.vn
- Responsive-first approach with mobile breakpoints
- Consistent spacing system using Tailwind's 4/6/8/12/16/20/24 scale
- Inter/SF Pro typography with defined hierarchy (hero, section, card, body text)

**State Management Pattern**
- React Query for asynchronous data fetching and caching
- React hooks (useState, useEffect) for local component state
- Context API available via TooltipProvider wrapper
- No global state management needed for demo scope

**Animation Strategy**
- Embla Carousel with autoplay for promotional content
- CSS transitions and Tailwind animation utilities
- Scroll-triggered count-up animations using Intersection Observer
- Smooth page transitions and hover effects

### Backend Architecture

**Server Framework**
- **Express.js** with TypeScript for API endpoints
- Custom middleware for request/response logging
- Hot module replacement (HMR) support in development via Vite middleware

**Data Storage Pattern**
- **In-memory storage** implementation (`MemStorage` class) for demo purposes
- Interface-based design (`IStorage`) allowing easy swap to database implementation
- Seeded mock data for routes, promotions, and news
- UUID generation for entity identifiers

**API Design**
- RESTful endpoints pattern:
  - `GET /api/routes` - Fetch all bus routes
  - `GET /api/routes/:id` - Fetch single route
  - `POST /api/routes` - Create route
  - Similar patterns for `/api/promotions` and `/api/news`
- JSON request/response format
- Zod schema validation for incoming data
- Error handling with appropriate HTTP status codes

**Database Schema (Prepared)**
- Drizzle ORM configured for PostgreSQL via `@neondatabase/serverless`
- Schema definitions in `shared/schema.ts`:
  - **users**: id, username, password
  - **routes**: id, from, to, price, image
  - **promotions**: id, title, description, image
  - **news**: id, title, description, image, date
- Migration setup with drizzle-kit pointing to `/migrations` directory
- Currently using in-memory storage; database can be enabled by adding DATABASE_URL

**Rationale**: The in-memory approach allows rapid development and testing without database dependencies. The architecture is designed to easily transition to PostgreSQL by implementing the IStorage interface with Drizzle ORM queries.

### Page Structure

**7-Section Homepage Layout**
1. **Sticky Header** - Logo, navigation menu, hotline, CTA buttons
2. **Hero Section** - Full-viewport search form with background image overlay
3. **Promotional Carousel** - Autoplay carousel showcasing current offers
4. **Popular Routes** - Grid of featured bus routes with pricing
5. **Statistics Section** - Animated counters (passengers, offices, daily trips)
6. **News Section** - Latest updates and announcements
7. **Footer** - Company info, links, social media, contact details

Each section is implemented as a separate React component for modularity and reusability.

## External Dependencies

### Third-Party UI Libraries
- **Radix UI** - Comprehensive collection of accessible component primitives (@radix-ui/react-*)
- **shadcn/ui** - Pre-built components following Radix UI patterns with Tailwind styling
- **Embla Carousel** - Touch-enabled carousel with autoplay support
- **Lucide React** - Icon library for consistent iconography
- **React Icons** - Additional icons (SiTiktok, SiZalo for social media)

### Form & Validation
- **React Hook Form** - Form state management and validation
- **@hookform/resolvers** - Schema resolvers for validation libraries
- **Zod** - TypeScript-first schema validation
- **drizzle-zod** - Automatic Zod schema generation from Drizzle schemas

### Database & ORM
- **Drizzle ORM** - Type-safe SQL query builder for PostgreSQL
- **@neondatabase/serverless** - Serverless PostgreSQL driver (configured but not actively used)
- **connect-pg-simple** - PostgreSQL session store for Express

### Utility Libraries
- **date-fns** - Date manipulation and formatting with Vietnamese locale support
- **clsx & tailwind-merge** - Conditional className composition
- **nanoid** - Unique ID generation

### Development Tools
- **TypeScript** - Type safety across frontend and backend
- **Vite plugins**:
  - `@vitejs/plugin-react` - React Fast Refresh
  - `@replit/vite-plugin-runtime-error-modal` - Error overlay
  - `@replit/vite-plugin-cartographer` - Development banner (Replit-specific)
- **ESBuild** - Fast JavaScript bundler for production server code

### Fonts & Styling
- **Google Fonts** - Inter, DM Sans, Fira Code, Geist Mono via CDN
- **PostCSS & Autoprefixer** - CSS processing and browser compatibility

### Asset Management
- Custom Vite alias `@assets` pointing to `attached_assets` directory for images
- Hero background image: `generated_images/Hero_background_bus_highway_f1a8a3d9.png`