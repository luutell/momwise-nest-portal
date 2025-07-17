import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen relative">
      {/* Global watercolor background */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{ backgroundImage: `url(/src/assets/watercolor-hero-bg.jpg)` }}
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
