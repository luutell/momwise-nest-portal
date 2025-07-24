import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';
import { useIsMobile } from '@/hooks/use-mobile';

const Index = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  // Redirect mobile users directly to the app
  useEffect(() => {
    if (isMobile) {
      navigate('/app');
    }
  }, [isMobile, navigate]);

  // Don't render anything for mobile users (they'll be redirected)
  if (isMobile) {
    return null;
  }

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
