
import { Heart, Instagram, Facebook, Twitter } from 'lucide-react';
import watercolorBg from '@/assets/watercolor-hero-bg.jpg';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <>
      <footer className="py-16 px-6 relative overflow-hidden">
        {/* Watercolor background - 15% more translucent, positioned higher */}
        <div 
          className="absolute inset-0 bg-cover bg-no-repeat z-0 opacity-55"
          style={{ 
            backgroundImage: `url(${watercolorBg})`,
            backgroundPosition: 'center 20%',
            backgroundSize: 'cover'
          }}
        />
        
        {/* Dark overlay for footer contrast */}
        <div className="absolute inset-0 bg-emerald-900/40 backdrop-blur-sm z-5" />
        
        {/* Gradient overlay for smooth transition from previous section */}
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-background/60 z-5" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          {/* Logo - clean without watercolor overlay */}
          <div className="mb-8">
            <div className="mx-auto w-24 h-24 -mb-2 relative">
              <img 
                src="/lovable-uploads/ccbd5038-df1a-4632-9976-d2b053a544c9.png" 
                alt="MomWise Logo" 
                className="w-full h-full object-contain brightness-0 invert opacity-90"
              />
            </div>
            <h3 className="font-playfair text-5xl font-semibold mb-2">
              <span className="text-background">mom</span><span className="text-sage-light">wise</span>
            </h3>
            <p className="font-mono-space text-sage-light tracking-wide text-sm">
              {t('footer.subtitle')}
            </p>
          </div>
          
          {/* Message */}
          <div className="mb-8 max-w-2xl mx-auto">
            <p className="text-background/80 leading-relaxed">
              {t('footer.message')}
            </p>
          </div>
          
          {/* Coming Soon */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 bg-sage/20 text-sage-light px-6 py-3 rounded-full">
              <Heart className="h-4 w-4 fill-current" />
              <span className="font-medium">{t('footer.coming.soon')}</span>
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
              {t('footer.copyright')}
            </p>
          </div>
        </div>
        </footer>
    </>
  );
};

export default Footer;
