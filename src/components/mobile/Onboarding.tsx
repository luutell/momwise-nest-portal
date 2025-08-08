import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronRight, Sparkles, MessageCircle, Calendar, Users, Baby } from 'lucide-react';
import { useProfile } from '@/hooks/useProfile';
import watercolorBg from '@/assets/watercolor-hero-bg.jpg';
import { useLanguage } from '@/contexts/LanguageContext';

const getOnboardingSteps = (language: 'en' | 'pt') => [
  {
    id: 1,
    icon: Sparkles,
    title: language === 'en' ? 'Welcome to MomWise.' : 'Bem-vinda ao MomWise.',
    subtitle: language === 'en' ? 'Here, motherhood is lived with lightness, information and real support.' : 'Aqui, maternidade é vivida com leveza, informação e apoio real.',
    buttonText: language === 'en' ? 'Start' : 'Começar',
    gradient: 'from-primary/20 to-sage/20'
  },
  {
    id: 2,
    icon: MessageCircle,
    title: language === 'en' ? '💬 Ask experts your questions.' : '💬 Tire dúvidas com especialistas.',
    subtitle: language === 'en' ? 'Video consultations, practical content and emotional support—whenever you need.' : 'Consultas em vídeo, conteúdos práticos e apoio emocional, sempre que você precisar.',
    buttonText: language === 'en' ? 'Tell me more' : 'Quero saber mais',
    gradient: 'from-sage/20 to-terracotta/20'
  },
  {
    id: 3,
    icon: Calendar,
    title: language === 'en' ? '🗓 New guidance every week.' : '🗓 Atualizações toda semana.',
    subtitle: language === 'en' ? "Receive practical guidance each week, with tips about your baby's development and topics like sleep, crying, feeding and more." : 'Receba orientações práticas, a cada semana, com dicas sobre o desenvolvimento do seu bebê e temas como sono, choro, alimentação e mais.',
    buttonText: language === 'en' ? 'Keep me updated' : 'Me mantenha atualizada',
    gradient: 'from-terracotta/20 to-secondary/20'
  },
  {
    id: 4,
    icon: Users,
    title: language === 'en' ? "🤱🏽 You're not alone." : '🤱🏽 Você não está sozinha.',
    subtitle: language === 'en' ? 'Talk to other mothers, share experiences, and join collective decisions.' : 'Converse com outras mães, troque vivências e participe de decisões coletivas.',
    buttonText: language === 'en' ? 'I want to join' : 'Quero participar',
    gradient: 'from-secondary/20 to-primary/20'
  },
  {
    id: 5,
    icon: Baby,
    title: language === 'en' ? "👶 Shall we personalize your journey?" : '👶 Vamos personalizar sua jornada?',
    subtitle: language === 'en' ? 'Tell us about you and your baby to tailor the content to your phase.' : 'Conte mais sobre você e seu bebê para adaptar o conteúdo à sua fase.',
    buttonText: language === 'en' ? 'Start personalization' : 'Começar personalização',
    gradient: 'from-primary/20 to-sage/20'
  }
];

interface OnboardingProps {
  onComplete: () => void;
  onSkip?: () => void;
  onStartPersonalization?: () => void;
}

const Onboarding = ({ onComplete, onSkip, onStartPersonalization }: OnboardingProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const { completeOnboarding } = useProfile();
  const { language } = useLanguage();
  const steps = getOnboardingSteps(language);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Last step - start personalization instead of completing
      if (onStartPersonalization) {
        onStartPersonalization();
      } else {
        onComplete();
      }
    }
  };

  const handleSkip = async () => {
    try {
      // Mark onboarding as completed locally
      localStorage.setItem('onboarding_completed', 'true');
      localStorage.setItem('profile_data', JSON.stringify({
        name: language === 'en' ? 'User' : 'Usuário',
        onboarding_completed: true
      }));
      
      // Call onSkip if provided, otherwise onComplete
      if (onSkip) {
        onSkip();
      } else {
        onComplete();
      }
    } catch (error) {
      console.error('Error skipping onboarding:', error);
      if (onSkip) {
        onSkip();
      } else {
        onComplete();
      }
    }
  };

  const currentStepData = steps[currentStep];

  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center p-6 overflow-hidden bg-gradient-to-br from-background via-primary/5 to-sage/10">
      
      {/* Content */}
      <div className="relative z-10 w-full max-w-md space-y-8">
        {/* Progress indicators */}
        <div className="flex justify-center space-x-2">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`h-2 w-8 rounded-full transition-all duration-300 ${
                index <= currentStep ? 'bg-primary' : 'bg-muted/50'
              }`}
            />
          ))}
        </div>

        {/* Main content card */}
        <Card className="border-0 shadow-2xl backdrop-blur-sm relative overflow-hidden">
          {/* Watercolor background inside card */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
            style={{ backgroundImage: `url(${watercolorBg})` }}
          />
          {/* Gradient overlay for readability */}
          <div className={`absolute inset-0 bg-gradient-to-br ${currentStepData.gradient}`} />
          
          <CardContent className="relative z-10 p-8 text-center">
            {/* Icon */}
             <div className="flex justify-center mb-4">
                {currentStep === 0 ? (
                  <div className="w-16 h-16 rounded-full bg-white/50 flex items-center justify-center">
                    <img 
                      src="/lovable-uploads/eea7514a-fcb9-43ad-ad9b-2acbd4ee31ea.png" 
                      alt="MomWise Nest Spiral" 
                      className="w-14 h-14 object-contain" 
                    />
                  </div>
                ) : (
                  <div className="w-16 h-16 rounded-full bg-white/50 flex items-center justify-center">
                    <currentStepData.icon className="w-8 h-8 text-primary" />
                  </div>
                )}
             </div>

            {/* Title */}
            <h1 className="text-2xl font-semibold text-foreground leading-relaxed mb-4">
              {currentStepData.title}
            </h1>

            {/* Subtitle */}
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              {currentStepData.subtitle}
            </p>

            {/* Button */}
            <Button 
              onClick={handleNext}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-3 rounded-lg transition-all duration-200"
              size="lg"
            >
              {currentStepData.buttonText}
              <ChevronRight className="ml-2 w-4 h-4" />
            </Button>
          </CardContent>
        </Card>

        {/* Skip option */}
        <div className="text-center space-y-2">
          <button
            onClick={handleSkip}
            className="text-foreground bg-white/80 hover:bg-white/90 transition-all duration-200 text-sm px-4 py-2 rounded-lg font-medium shadow-md"
          >
            {language === 'en' ? 'Skip intro' : 'Pular apresentação'}
          </button>
          {onSkip && (
            <div>
              <button
                onClick={handleSkip}
                className="text-foreground bg-terracotta/20 hover:bg-terracotta/30 transition-all duration-200 text-sm px-4 py-2 rounded-lg font-medium"
              >
                {language === 'en' ? 'Skip full personalization' : 'Pular personalização completa'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Onboarding;