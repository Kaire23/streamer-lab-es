# Overview

This is a Next.js SSR (Server-Side Rendered) web application focused on streaming equipment setups for Spanish-speaking content creators. The application serves as a content hub that showcases detailed guides about popular streamers' equipment, including their microphones, cameras, lighting, and other hardware. Built with Next.js for optimal SEO and performance, featuring server-side rendered content about streaming setups with affiliate marketing integration.

## Recent Updates

### August 8, 2025 - Deployment Fixes
- **DEPLOYMENT ISSUES RESOLVED**: Fixed all deployment configuration problems
  - Fixed TypeScript errors in posts.ts (changed `link` to `affiliateLink` properties)
  - Fixed Next.js config warnings (removed deprecated `swcMinify` option) 
  - Fixed SEO meta tag compatibility in _app.tsx (`content-language` → `language`)
  - Updated server files to handle both development and production modes
  - Next.js builds successfully and ready for deployment
  - Production server tested and working (HTTP 200 response)

### August 8, 2025 - Vite Build Deployment Fix
- **DEPLOYMENT BUILD ISSUE FIXED**: Resolved Vite build conflict with Next.js deployment
  - Created index.html in root directory to satisfy Vite deployment requirements
  - Updated build.sh to create dist directory structure for compatibility
  - Enhanced start.sh with proper environment variable handling
  - Added fallback index.html in public directory for additional compatibility
  - Next.js build process maintained while satisfying deployment expectations
  - All deployment requirements now met for successful autoscale deployment

### January 10, 2025
- **MAJOR ARCHITECTURE CHANGE**: Migrated from Vite + Express + SSG to Next.js SSR
  - Removed all static site generation (prerender.js, generate-static.js)
  - Implemented Next.js pages with server-side rendering
  - All SEO metadata now handled through Next.js and next-seo
  - Removed Vite, Express server, and wouter routing
- **Complete SEO Implementation with Next.js**: 
  - Server-side rendered pages for perfect SEO
  - Dynamic meta tags through next-seo
  - Structured data (JSON-LD) on all pages
  - Proper canonical URLs with trailing slashes
  - OpenGraph and Twitter Cards
- **Performance**: Using Next.js built-in optimizations
  - Automatic code splitting
  - Image optimization with next/image
  - Server-side rendering for instant content
- **Image Updates**: All streamer images served from public/images
- **Development Environment**: Next.js dev server on port 5000

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: Next.js 14 with React 18 and TypeScript
- **Routing**: Next.js file-based routing with pages for home (`/`), and setup pages (`/setup/[slug]`)
- **Styling**: Tailwind CSS with CSS Modules for component-specific styles
- **SEO**: next-seo for meta tags management and server-side rendering for optimal search engine visibility
- **Build Tool**: Next.js built-in webpack configuration with SWC for fast compilation

## Backend Architecture
- **Server**: Next.js built-in Node.js server with SSR capabilities
- **Rendering**: Server-side rendering (SSR) with getServerSideProps for dynamic content
- **Development Mode**: Next.js dev server with hot module replacement
- **Production**: Next.js production server with optimized SSR and caching

## Data Storage
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Database**: Configured for PostgreSQL with Neon Database serverless driver
- **Schema**: Basic user management with username/password authentication
- **Storage Interface**: Abstracted storage layer with in-memory implementation for development

## Content Management
- **Content Structure**: Static data stored in TypeScript files with type definitions for posts, setup categories, and equipment items
- **SEO Strategy**: React Helmet Async for meta tags, structured data (JSON-LD), and OpenGraph tags
- **Affiliate Integration**: Amazon affiliate links with centralized URL generation

## Key Design Patterns
- **Component Architecture**: Modular UI components with consistent design tokens
- **Type Safety**: Full TypeScript implementation with strict type checking
- **Responsive Design**: Mobile-first approach with Tailwind CSS breakpoints
- **SEO Optimization**: Server-side rendering considerations with proper meta tags and structured data

## Performance Considerations
- **Code Splitting**: Vite's automatic code splitting for optimized bundle sizes
- **Asset Optimization**: Image optimization and lazy loading strategies
- **Analytics Integration**: Google Analytics 4 with route change tracking

# External Dependencies

## UI and Styling
- **shadcn/ui**: Comprehensive React component library built on Radix UI primitives
- **Tailwind CSS**: Utility-first CSS framework for responsive design
- **Radix UI**: Headless UI components for accessibility and keyboard navigation
- **Lucide React**: Icon library for consistent iconography

## Database and ORM
- **Drizzle ORM**: Type-safe SQL toolkit and ORM for PostgreSQL
- **Neon Database**: Serverless PostgreSQL database provider
- **Drizzle Kit**: Database migration and schema management tools

## Development and Build Tools
- **Vite**: Modern build tool with hot module replacement and optimized builds
- **TypeScript**: Static type checking and enhanced developer experience
- **ESBuild**: Fast JavaScript bundler for production builds

## Analytics and SEO
- **Google Analytics**: Web analytics for tracking user behavior and site performance
- **React Helmet Async**: Document head management for SEO meta tags
- **Structured Data**: JSON-LD implementation for rich search results

## Content and Routing
- **Wouter**: Lightweight client-side routing library
- **TanStack Query**: Server state management and caching
- **Date-fns**: Date manipulation and formatting utilities

## Affiliate Marketing
- **Amazon Associates**: Affiliate link integration for equipment recommendations
- **Centralized URL Management**: Custom utility functions for affiliate link generation