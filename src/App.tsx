import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { useEffect } from "react";
import Layout from "@/components/layout/Layout";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PostPage from "./pages/PostPage";

const queryClient = new QueryClient();

const GA_MEASUREMENT_ID = "G-VBXNX2FEBM";

const RouteChangeTracker = () => {
  const location = useLocation();
  useEffect(() => {
    (window as any).gtag?.('config', GA_MEASUREMENT_ID, {
      page_path: location.pathname + location.search + location.hash,
    });
  }, [location]);
  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <HelmetProvider>
        <Toaster />
        <Sonner />
          <BrowserRouter>
            <RouteChangeTracker />
            <Layout>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/post/:slug" element={<PostPage />} />
              <Route path="/setup/:slug" element={<PostPage />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </HelmetProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
