import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';
import watercolorBg from '@/assets/watercolor-hero-bg.jpg';

const Index = () => {
  return (
    <div className="min-h-screen relative">
      {/* Content */}
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
