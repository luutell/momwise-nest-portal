import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';

const Index = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const isEnglish = location.pathname.startsWith('/en');

    // Check if user is already authenticated and redirect to app preserving language
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        navigate(isEnglish ? '/en/app' : '/app');
      }
    });

    // Listen for auth changes (when user clicks email link)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        // Ensure we redirect to app immediately after sign in, preserving language
        navigate(isEnglish ? '/en/app' : '/app');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, location.pathname]);
  

  return (
    <div className="min-h-screen bg-transparent">
      <Hero />
      <Features />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Index;
