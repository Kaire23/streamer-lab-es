import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Router, Route, useLocation } from "wouter";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "@/components/ThemeProvider";
import { useEffect, Suspense, lazy } from "react";
import Layout from "@/components/layout/Layout";
import NotFound from "./pages/NotFound";
import { initializePdfForms } from "@/lib/pdfSubscription";

// Lazy load pages for code splitting and better performance
const Index = lazy(() => import("./pages/Index"));
const PostPage = lazy(() => import("./pages/PostPage"));
const LagPredictor = lazy(() => import("./pages/LagPredictor"));

const Article = lazy(() => import("./pages/Article"));
const Unsubscribed = lazy(() => import("./pages/Unsubscribed"));

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
    
    // Initialize PDF forms after route change (content has been updated)
    setTimeout(() => {
      initializePdfForms();
    }, 100);
  }, [location]);
  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="setups-streamers-theme">
      <HelmetProvider>
        <Toaster />
          <Router>
            <RouteChangeTracker />
            <Layout>
              <Suspense fallback={
                <div className="flex items-center justify-center min-h-[50vh]">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand"></div>
                </div>
              }>
                <Route path="/" component={Index} />
                <Route path="/setup/:slug" component={PostPage} />
                <Route path="/herramientas/predictor-lag-ia" component={LagPredictor} />

                <Route path="/article/:slug" component={Article} />
                <Route path="/unsubscribed" component={Unsubscribed} />
                <Route path="/:rest*" component={NotFound} />
              </Suspense>
            </Layout>
          </Router>
      </HelmetProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
