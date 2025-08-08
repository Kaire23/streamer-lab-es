import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Router, Route, useLocation } from "wouter";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "@/components/ThemeProvider";
import { useEffect } from "react";
import Layout from "@/components/layout/Layout";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PostPage from "./pages/PostPage";

const queryClient = new QueryClient();

const GA_MEASUREMENT_ID = "G-VBXNX2FEBM";

const RouteChangeTracker = () => {
  const [location] = useLocation();
  useEffect(() => {
    // Track page views with gtag (Google Analytics 4)
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('config', GA_MEASUREMENT_ID, {
        page_path: location,
        page_title: document.title,
        send_page_view: true
      });
      
      // Also track as a page_view event
      (window as any).gtag('event', 'page_view', {
        page_title: document.title,
        page_location: window.location.href,
        page_path: location
      });
    }
  }, [location]);
  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="setups-streamers-theme">
      <TooltipProvider>
        <HelmetProvider>
          <Toaster />
          <Sonner />
          <Router>
            <RouteChangeTracker />
            <Layout>
              <Route path="/" component={Index} />
              <Route path="/setup/:slug" component={PostPage} />
              <Route path="/:rest*" component={NotFound} />
            </Layout>
          </Router>
        </HelmetProvider>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
