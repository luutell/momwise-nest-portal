import { Heart, Instagram, Facebook, Twitter } from 'lucide-react';
import watercolorBg from '@/assets/watercolor-hero-bg.jpg';

const Footer = () => {
  return (
    <>
      {/* Full watercolor from testimonials to just before subtitle */}
      <div className="relative">
        {/* Large watercolor section extending from testimonials */}
        <div className="h-[600px] relative overflow-hidden">
          <div 
            className="absolute top-0 left-0 right-0 h-full bg-cover bg-center bg-no-repeat opacity-30"
            style={{ backgroundImage: `url(${watercolorBg})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-transparent to-emerald-900/90"></div>
        </div>
        
        <footer className="py-16 px-6 bg-emerald-900 relative z-10 -mt-[200px]">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          {/* Logo - clean without watercolor overlay */}
          <div className="mb-8">
            <div className="mx-auto w-24 h-24 mb-4 relative">
              <img 
                src="/lovable-uploads/ccbd5038-df1a-4632-9976-d2b053a544c9.png" 
                alt="MomWise Logo" 
                className="w-full h-full object-contain brightness-0 invert opacity-90"
              />
            </div>
            <h3 className="font-playfair text-5xl font-semibold mb-2">
              <span className="text-background">mom</span><span className="text-sage-light">wise</span>
            </h3>
            <p className="font-mono-space text-sage-light tracking-wide text-lg">
              Where maternal wisdom transcends
            </p>
          </div>
          
          {/* Message */}
          <div className="mb-8 max-w-2xl mx-auto">
            <p className="text-background/80 leading-relaxed">
              We're crafting something beautiful for mothers everywhere. 
              A digital sanctuary where wisdom flows freely and every mother's journey is celebrated.
            </p>
          </div>
          
          {/* Coming Soon */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 bg-sage/20 text-sage-light px-6 py-3 rounded-full">
              <Heart className="h-4 w-4 fill-current" />
              <span className="font-medium">App launching soon</span>
            </div>
          </div>
          
          {/* Social Links */}
          <div className="flex justify-center gap-6 mb-8">
            <a 
              href="#" 
              className="w-10 h-10 bg-sage/20 rounded-full flex items-center justify-center hover:bg-sage/30 transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5 text-sage-light" />
            </a>
            <a 
              href="#" 
              className="w-10 h-10 bg-sage/20 rounded-full flex items-center justify-center hover:bg-sage/30 transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="h-5 w-5 text-sage-light" />
            </a>
            <a 
              href="#" 
              className="w-10 h-10 bg-sage/20 rounded-full flex items-center justify-center hover:bg-sage/30 transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="h-5 w-5 text-sage-light" />
            </a>
          </div>
          
          {/* Copyright */}
          <div className="border-t border-sage/20 pt-8">
            <p className="text-background/60 text-sm">
              © 2024 MomWise. Nurturing mothers with wisdom and love.
            </p>
          </div>
        </div>
        </footer>
      </div>
    </>
  );
};

export default Footer;