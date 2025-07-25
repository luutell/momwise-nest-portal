import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import Index from "./pages/Index";
import MobileApp from "./pages/MobileApp";
import AdminPanel from "./pages/AdminPanel";
import CategoryPosts from "./pages/CategoryPosts";
import PostDetail from "./pages/PostDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <Toaster />
        <Sonner />
        <LanguageSwitcher />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/app" element={<MobileApp />} />
            <Route path="/app/biblioteca" element={<MobileApp />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/app/ritmo-leve" element={<CategoryPosts />} />
            <Route path="/app/entendendo-o-bebe" element={<CategoryPosts />} />
            <Route path="/app/primeiras-mordidas" element={<CategoryPosts />} />
            <Route path="/app/no-seu-tempo" element={<CategoryPosts />} />
            <Route path="/app/juntas-no-comeco" element={<CategoryPosts />} />
            <Route path="/app/mae-inteira" element={<CategoryPosts />} />
            <Route path="/app/entre-maes-categoria" element={<CategoryPosts />} />
            <Route path="/app/higiene-natural" element={<CategoryPosts />} />
            <Route path="/app/post/:id" element={<PostDetail />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
