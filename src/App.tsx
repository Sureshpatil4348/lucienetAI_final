import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Index from "./pages/Index";
import TechnologyPage from "./pages/TechnologyPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import NotFound from "./pages/NotFound";
import SidebarNavigation from "./components/SidebarNavigation";
import { useState, useEffect } from "react";
import AIAnalysisPage from './pages/ai-analysis';

const queryClient = new QueryClient();

// AnimatedRoutes component to handle route transitions
const AnimatedRoutes = () => {
  const location = useLocation();
  const [showSidebar, setShowSidebar] = useState(false);
  
  // Only show sidebar on certain pages
  useEffect(() => {
    // Determine which pages should have sidebar
    const sidebarPages = ['/trading', '/analysis', '/portfolio', '/wallet', '/settings', '/help'];
    
    // Check if current path should have sidebar
    const shouldShowSidebar = sidebarPages.some(page => 
      location.pathname === page || location.pathname.startsWith(`${page}/`)
    );
    
    setShowSidebar(shouldShowSidebar);
  }, [location]);
  
  return (
    <>
      {showSidebar && <SidebarNavigation className="z-40" />}
      
      <main className={showSidebar ? "ml-[280px] transition-all duration-300" : ""}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Index />} />
            <Route path="/technology" element={<TechnologyPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/ai-analysis" element={<AIAnalysisPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </main>
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
