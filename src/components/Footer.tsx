import { Heart, Instagram, Facebook, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-16 px-6 bg-emerald-900 text-background">
      <div className="max-w-4xl mx-auto text-center">
        {/* Logo */}
        <div className="mb-8">
          <h3 className="font-playfair text-3xl font-semibold mb-2">momwise</h3>
          <p className="font-mono-space text-sage-light tracking-wide">
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
  );
};

export default Footer;