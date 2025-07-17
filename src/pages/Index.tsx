import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';
import watercolorBg from '@/assets/watercolor-hero-bg.jpg';

const Index = () => {
  return (
    <div className="min-h-screen relative">
      {/* Global watercolor background */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{ 
          backgroundImage: `url(${watercolorBg})`,
          backgroundColor: '#f5f5f0' // Fallback color
        }}
      />
      
      {/* Content with translucent backgrounds */}
      <div className="relative z-10">
        <Hero />
        <Features />
        <Testimonials />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
