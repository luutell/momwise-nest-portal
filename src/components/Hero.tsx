import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ArrowRight, Heart, CheckCircle } from 'lucide-react';
import watercolorBg from '@/assets/watercolor-hero-bg.jpg';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

const Hero = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { t } = useLanguage();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { data, error } = await supabase
        .from('waitlist_emails')
        .insert([{ email }]);

      if (error) throw error;

      setEmail('');
      setIsSubmitted(true);
      toast({
        title: "Email cadastrado com sucesso!",
        description: "Você será notificado quando o MomWise estiver disponível.",
      });

      // Reset success state after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error: any) {
      console.error('Error saving email:', error);
      toast({
        title: "Erro ao cadastrar email",
        description: error.message.includes('duplicate') 
          ? "Este email já está em nossa lista de espera."
          : "Tente novamente em alguns momentos.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Translucent gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/15 via-white/5 to-white/20" />
      
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
            <Button 
              type="submit" 
              className="btn-organic group" 
              disabled={isSubmitting || isSubmitted}
            >
              {isSubmitting ? 'Cadastrando...' : 
               isSubmitted ? (
                 <>
                   <CheckCircle className="mr-2 h-4 w-4" />
                   Cadastrado!
                 </>
               ) : (
                 <>
                   {t('hero.join.waitlist')}
                   <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                 </>
               )}
            </Button>
          </form>
          <p className="text-sm text-muted-foreground mt-3">
            {t('hero.email.description')}
          </p>
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