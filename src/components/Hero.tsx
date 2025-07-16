import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ArrowRight, Heart } from 'lucide-react';
import heroBackground from '@/assets/hero-background.jpg';

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
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-90"
        style={{ backgroundImage: `url(${heroBackground})` }}
      />
      
      {/* Organic floating elements */}
      <div className="absolute top-20 left-10 w-32 h-32 organic-blob animate-float opacity-30" />
      <div className="absolute bottom-20 right-10 w-24 h-24 spiral-element animate-float opacity-40" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/3 right-1/4 w-16 h-16 organic-blob animate-float opacity-20" style={{ animationDelay: '4s' }} />
      
      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6 animate-fade-in-up">
        {/* Logo/Brand Name */}
        <div className="mb-8">
          {/* Spiral Symbol */}
          <div className="mx-auto w-20 h-20 mb-6 relative">
            <div className="absolute inset-0 spiral-element opacity-80" />
            <div className="absolute inset-2 spiral-element opacity-60" />
            <div className="absolute inset-4 spiral-element opacity-40" />
          </div>
          
          <h1 className="font-playfair text-7xl md:text-8xl font-semibold text-foreground mb-4">
            MomWise
          </h1>
        </div>
        
        {/* Subtitle */}
        <p className="font-mono-space text-xl md:text-2xl text-sage-dark mb-8 tracking-wide">
          Where maternal wisdom transcends
        </p>
        
        {/* Manifesto */}
        <div className="max-w-2xl mx-auto mb-12">
          <p className="text-lg md:text-xl text-foreground/80 leading-relaxed font-light">
            A sacred space for mothers seeking gentle guidance, ancestral wisdom, and modern expertise. 
            Where intuition meets knowledge, and every mother's journey is honored with warmth and understanding.
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