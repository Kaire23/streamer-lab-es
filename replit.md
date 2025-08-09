# replit.md

## Overview

This is a full-stack web application for a Spanish streaming equipment guide website called "Setups de Streamers". The application provides detailed guides about popular streamers' equipment setups, including hardware specifications, affiliate product links, and technical recommendations. It's built as a content-focused site with SEO optimization for the Spanish-speaking streaming community.

**Migration Status**: Successfully migrated from Lovable to Replit on January 8, 2025. All functionality working, comprehensive SEO optimization implemented with server-side rendering, streamer images updated with optimized alt tags and structured data, canonical URL issues resolved with proper 301 redirects, and sitemap.xml updated with correct canonical URLs.

**Performance Optimizations**: Implemented comprehensive performance optimizations including critical CSS inlining (above-the-fold styles only), asynchronous non-critical CSS loading to eliminate render blocking, deferred JavaScript loading, comprehensive resource hints (preconnect, dns-prefetch, preload), LCP optimizations with hero image preloading and fetchpriority attributes, and FOUC prevention with loading states for improved Core Web Vitals and SEO performance (January 9, 2025).

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **Routing**: Wouter for client-side routing with support for dynamic post URLs (`/setup/:slug`) - migrated from React Router
- **State Management**: TanStack Query for server state management and caching
- **UI Framework**: shadcn/ui components built on Radix UI primitives with custom theme provider
- **Styling**: Tailwind CSS with CSS custom properties for theming
- **SEO**: React Helmet Async for comprehensive meta tag management with enhanced Open Graph, Twitter Cards, and structured JSON-LD data
- **Theme System**: Custom theme provider replacing next-themes for Replit compatibility

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Development**: Vite middleware integration for hot module replacement
- **Database ORM**: Drizzle ORM configured for PostgreSQL
- **Session Storage**: connect-pg-simple for PostgreSQL session storage
- **Storage Interface**: Abstract storage layer with in-memory implementation for development
- **SEO Redirects**: 301 redirects from legacy `/post/` URLs to canonical `/setup/` URLs
- **Server-Side SEO**: Custom route handlers for dynamic meta tag injection per page

### Data Storage Solutions
- **Primary Database**: PostgreSQL via Neon serverless
- **ORM**: Drizzle with type-safe schema definitions
- **Migrations**: Drizzle Kit for database schema management
- **Session Storage**: PostgreSQL-backed session storage

### Content Management
- **Static Data**: Hardcoded post data in TypeScript with streamer information
- **Image Assets**: High-quality streamer setup images with optimized WebP/AVIF formats and comprehensive alt text
- **Affiliate Links**: Amazon España affiliate integration with configurable tag
- **SEO Images**: Optimized cover images for Ibai, ElXokas, IlloJuan, Coscu, and TheGrefg with detailed descriptions

### SEO and Performance
- **Meta Management**: Comprehensive SEO tags with enhanced Open Graph, Twitter Cards, and meta descriptions
- **Structured Data**: JSON-LD schema markup for articles, website info, and image optimization
- **Analytics**: Google Analytics 4 integration with comprehensive tracking (direct HTML implementation + React route tracking)
- **Performance**: Server-side rendering setup with optimized image loading and Core Web Vitals
- **Image SEO**: Enhanced alt text with streaming equipment keywords and detailed sitemap image metadata

### Design System
- **Component Library**: Comprehensive shadcn/ui component set
- **Theme System**: CSS custom properties with dark/light mode support
- **Layout**: Responsive grid layouts with mobile-first approach
- **Accessibility**: ARIA labels and semantic HTML structure

## External Dependencies

### Database and Infrastructure
- **Neon Database**: Serverless PostgreSQL hosting
- **Drizzle ORM**: Database toolkit and ORM for TypeScript

### UI and Styling
- **Radix UI**: Unstyled, accessible UI primitives
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library

### Development Tools
- **Vite**: Build tool and development server
- **TypeScript**: Type safety and development experience
- **ESBuild**: Fast JavaScript bundler for production builds

### Analytics and Monetization
- **Google Analytics**: Web analytics (GA_MEASUREMENT_ID: G-VBXNX2FEBM)
- **Amazon Associates**: Affiliate marketing integration for España marketplace

### Content and SEO
- **React Helmet Async**: Document head management
- **Structured Data**: Schema.org markup for search engines

### Session Management
- **Express Session**: Session middleware for Express
- **connect-pg-simple**: PostgreSQL session store

The application follows a content-first approach optimized for Spanish SEO, with a focus on streaming equipment guides and affiliate monetization through Amazon España.