import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import spiralLogo from '/lovable-uploads/c0c3ac5d-4ca0-4dc0-adbc-c73c918e741c.png';

interface AuthWrapperProps {
  children: React.ReactNode;
}

const AuthWrapper = ({ children }: AuthWrapperProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [isSigningIn, setIsSigningIn] = useState(false);
  const { toast } = useToast();
  const { language, t } = useLanguage();
  
  // Debug: log do idioma atual
  console.log('🔍 AuthWrapper - Current language:', language);
  console.log('🔍 AuthWrapper - Current URL:', window.location.pathname);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: language === 'en' ? "Email required" : "Email obrigatório",
        description: language === 'en' ? "Please enter your email." : "Por favor, insira seu email.",
        variant: "destructive",
      });
      return;
    }

    setIsSigningIn(true);

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}${language === 'en' ? '/en' : ''}/app`,
        },
      });

      if (error) throw error;

      toast({
        title: language === 'en' ? "Link sent!" : "Link enviado!",
        description: language === 'en' ? "Check your email to access MomWise." : "Verifique seu email para acessar o MomWise.",
      });
    } catch (error: any) {
      toast({
        title: language === 'en' ? "Login error" : "Erro no login",
        description: error.message || (language === 'en' ? "Could not send access link." : "Não foi possível enviar o link de acesso."),
        variant: "destructive",
      });
    } finally {
      setIsSigningIn(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-primary/5 to-sage/10">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
          <span className="text-foreground">{language === 'en' ? 'Loading...' : 'Carregando...'}</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center p-6 relative"
        style={{
          backgroundImage: `url('/src/assets/watercolor-hero-bg.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Overlay for better readability */}
        <div className="absolute inset-0 bg-background/80"></div>
        
         <Card className="w-full max-w-md relative z-10">
           <CardHeader className="text-center">
             <div className="flex flex-col items-center space-y-4 mb-4">
                <img 
                  src={spiralLogo} 
                  alt="MomWise Spiral Logo" 
                  className="h-16 w-16 object-contain"
                />
                <CardTitle className="text-2xl font-playfair">
                  {language === 'en' ? 'Welcome to MomWise' : 'Bem-vinda ao MomWise'}
                </CardTitle>
              </div>
              <p className="text-muted-foreground">
                {language === 'en' ? 'Access your account to continue your maternal journey' : 'Acesse sua conta para continuar sua jornada maternal'}
              </p>
           </CardHeader>
          <CardContent>
            <form onSubmit={handleSignIn} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">{language === 'en' ? 'Email' : 'Email'}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={language === 'en' ? 'your@email.com' : 'seu@email.com'}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isSigningIn}
              >
                {isSigningIn ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {language === 'en' ? 'Sending...' : 'Enviando...'}
                  </>
                ) : (
                  <>
                    <Mail className="mr-2 h-4 w-4" />
                    {language === 'en' ? 'Send access link' : 'Enviar link de acesso'}
                  </>
                )}
              </Button>
            </form>
            <p className="text-xs text-muted-foreground mt-4 text-center">
              {language === 'en' ? 'You will receive a secure link by email to access your account.' : 'Você receberá um link seguro por email para acessar sua conta.'}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthWrapper;