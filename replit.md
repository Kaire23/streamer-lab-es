# Overview

This is a React-based web application focused on streaming equipment setups for Spanish-speaking content creators. The application serves as a content hub that showcases detailed guides about popular streamers' equipment, including their microphones, cameras, lighting, and other hardware. It's built as a Single Page Application (SPA) with SEO optimization in mind, featuring static content about streaming setups with affiliate marketing integration.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing with routes for home (`/`), post pages (`/post/:slug`), and setup pages (`/setup/:slug`)
- **Styling**: Tailwind CSS with shadcn/ui component library for consistent design system
- **State Management**: TanStack Query for server state and React hooks for local state
- **Build Tool**: Vite with custom configuration for development and production builds

## Backend Architecture
- **Server**: Express.js with TypeScript
- **API Structure**: RESTful API with `/api` prefix for all endpoints
- **Development Mode**: Vite middleware integration for hot reloading and development server
- **Production**: Static file serving with Express for the built React application

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