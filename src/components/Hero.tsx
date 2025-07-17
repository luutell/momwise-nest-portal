import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ArrowRight, Heart } from 'lucide-react';
import watercolorBg from '@/assets/watercolor-hero-bg.jpg';

const Hero = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle email submission
    console.log('Email submitted:', email);
    setEmail('');
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Watercolor background - barely touching manifesto */}
      <div 
        className="absolute top-0 left-0 right-0 h-3/5 bg-cover bg-center bg-no-repeat opacity-30"
        style={{ backgroundImage: `url(${watercolorBg})` }}
      />
      
      {/* Gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-transparent to-background/40" />
      
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
        <p className="font-mono-space text-lg md:text-xl text-sage-dark mb-8 tracking-wide -mt-6">
          where maternal wisdom transcends
        </p>
        
        {/* Manifesto */}
        <div className="max-w-2xl mx-auto mb-12">
          <p className="text-lg md:text-xl text-foreground/80 leading-relaxed font-light">
            MomWise combines the wisdom of generations with modern expertise, creating 
            a nurturing and non-judgmental space where every mother's journey is honored with warmth and understanding.
          </p>
        </div>
        
        {/* Email Signup */}
        <div className="max-w-md mx-auto mb-8">
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
            <Input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input-organic flex-1 text-center sm:text-left"
            />
            <Button type="submit" className="btn-organic group">
              Join Waitlist
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </form>
          <p className="text-sm text-muted-foreground mt-3">
            Be the first to know when MomWise launches
          </p>
        </div>
        
        {/* Trust Badge */}
        <div className="flex items-center justify-center gap-2 text-sage">
          <Heart className="h-5 w-5 fill-current" />
          <span className="text-sm font-medium">Trusted by mothers worldwide</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;