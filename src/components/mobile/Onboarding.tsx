import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronRight, Sparkles, MessageCircle, Calendar, Users, Baby } from 'lucide-react';

const onboardingSteps = [
  {
    id: 1,
    icon: Sparkles,
    title: '✨ Bem-vinda ao MomWise.',
    subtitle: 'Aqui, maternidade é vivida com leveza, informação e apoio real.',
    buttonText: 'Começar',
    gradient: 'from-primary/20 to-sage/20'
  },
  {
    id: 2,
    icon: MessageCircle,
    title: '💬 Tire dúvidas com especialistas.',
    subtitle: 'Consultas em vídeo, conteúdos práticos e apoio emocional, sempre que você precisar.',
    buttonText: 'Quero saber mais',
    gradient: 'from-sage/20 to-terracotta/20'
  },
  {
    id: 3,
    icon: Calendar,
    title: '🗓 Atualizações toda semana.',
    subtitle: 'Receba orientações práticas, a cada semana, com dicas sobre o desenvolvimento do seu bebê e temas como sono, choro, alimentação e mais.',
    buttonText: 'Me mantenha atualizada',
    gradient: 'from-terracotta/20 to-secondary/20'
  },
  {
    id: 4,
    icon: Users,
    title: '🤱🏽 Você não está sozinha.',
    subtitle: 'Converse com outras mães, troque vivências e participe de decisões coletivas.',
    buttonText: 'Quero participar',
    gradient: 'from-secondary/20 to-primary/20'
  },
  {
    id: 5,
    icon: Baby,
    title: '👶 Vamos personalizar sua jornada?',
    subtitle: 'Conte mais sobre você e seu bebê para adaptar o conteúdo à sua fase.',
    buttonText: 'Começar personalização',
    gradient: 'from-primary/20 to-sage/20'
  }
];

interface OnboardingProps {
  onComplete: () => void;
}

const Onboarding = ({ onComplete }: OnboardingProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const currentStepData = onboardingSteps[currentStep];

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-6 bg-terracotta">
      <div className="w-full max-w-md space-y-8">
        {/* Progress indicators */}
        <div className="flex justify-center space-x-2">
          {onboardingSteps.map((_, index) => (
            <div
              key={index}
              className={`h-2 w-8 rounded-full transition-all duration-300 ${
                index <= currentStep ? 'bg-primary' : 'bg-muted'
              }`}
            />
          ))}
        </div>

        {/* Main content card */}
        <Card className={`border-0 shadow-lg bg-gradient-to-br ${currentStepData.gradient} backdrop-blur-sm`}>
          <CardContent className="p-8 text-center space-y-6">
            {/* Icon */}
            <div className="flex justify-center">
              <div className="w-16 h-16 rounded-full bg-white/50 flex items-center justify-center">
                <currentStepData.icon className="w-8 h-8 text-primary" />
              </div>
            </div>

            {/* Title */}
            <h1 className="text-2xl font-semibold text-foreground leading-relaxed">
              {currentStepData.title}
            </h1>

            {/* Subtitle */}
            <p className="text-muted-foreground text-lg leading-relaxed">
              {currentStepData.subtitle}
            </p>

            {/* Button */}
            <Button 
              onClick={handleNext}
              className="w-full mt-8 bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-3 rounded-lg transition-all duration-200"
              size="lg"
            >
              {currentStepData.buttonText}
              <ChevronRight className="ml-2 w-4 h-4" />
            </Button>
          </CardContent>
        </Card>

        {/* Skip option */}
        <div className="text-center">
          <button
            onClick={onComplete}
            className="text-muted-foreground hover:text-foreground transition-colors text-sm underline"
          >
            Pular apresentação
          </button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;