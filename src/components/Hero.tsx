import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ArrowRight, Heart, Smartphone } from 'lucide-react';
import { Link } from 'react-router-dom';
import watercolorBg from '@/assets/watercolor-hero-bg.jpg';
import { useLanguage } from '@/contexts/LanguageContext';

const Hero = () => {
  const [email, setEmail] = useState('');
  const { language, t } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle email submission
    console.log('Email submitted:', email);
    setEmail('');
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-transparent">
      {/* Watercolor background - full coverage */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-70"
        style={{ backgroundImage: `url(${watercolorBg})` }}
      />
      
      {/* Very subtle gradient overlay for text readability only */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-transparent" />
      
      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6 animate-fade-in-up">
        {/* Logo/Brand Name */}
        <div className="mb-8">
          {/* MomWise Logo */}
          <div className="mx-auto w-32 h-32 -mb-2 relative">
            <img 
              src="/lovable-uploads/ccbd5038-df1a-4632-9976-d2b053a544c9.png" 
              alt="MomWise Logo" 
              className="w-full h-full object-contain opacity-90"
            />
          </div>
          
          <h1 className="font-playfair text-7xl md:text-8xl font-semibold mb-4">
            <span className="text-terracotta">mom</span><span className="text-foreground">wise</span>
          </h1>
        </div>
        
        {/* Subtitle */}
        <p className="font-mono-space text-lg md:text-xl text-sage-dark mb-16 tracking-wide -mt-6">
          {t('hero.subtitle')}
        </p>
        
        {/* Manifesto */}
        <div className="max-w-2xl mx-auto mb-12">
          <p className="text-lg md:text-xl text-foreground/80 leading-relaxed font-light">
            {t('hero.manifesto')}
          </p>
        </div>
        
        {/* Email Signup */}
        <div className="max-w-md mx-auto mb-8">
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
            <Input
              type="email"
              placeholder={t('hero.email.placeholder')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input-organic flex-1 text-center sm:text-left"
            />
            <Button type="submit" className="btn-organic group">
              {t('hero.join.waitlist')}
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </form>
          <p className="text-sm text-muted-foreground mt-3">
            {t('hero.email.description')}
          </p>
        </div>
        
        {/* Mobile App Preview */}
        <div className="mb-8">
          <Button 
            variant="outline" 
            className="btn-organic-outline group"
            onClick={() => {
              // Reset onboarding to ensure it shows when coming from site
              localStorage.removeItem('onboarding_completed');
              // Determine target language from current path or context and persist for reliability
              const isEnglishTarget = window.location.pathname.startsWith('/en') || language === 'en';
              try { localStorage.setItem('preferred_language', isEnglishTarget ? 'en' : 'pt'); } catch {}
              // Navigate to app using the resolved language and enable preview mode
              const target = isEnglishTarget ? '/en/app' : '/app';
              const query = '?preview=1';
              window.location.href = `${target}${query}`;
            }}
          >
            <Smartphone className="mr-2 h-4 w-4" />
            {t('hero.preview.app')}
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
        
        {/* Trust Badge */}
        <div className="flex items-center justify-center gap-2 text-sage">
          <Heart className="h-5 w-5 fill-current" />
          <span className="text-sm font-medium">{t('hero.trust.badge')}</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;