import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { ChevronRight, ChevronLeft, User, Baby, Heart, Brain, Calendar, Loader2 } from 'lucide-react';
import { useProfile, ProfileData } from '@/hooks/useProfile';
import watercolorBg from '@/assets/watercolor-hero-bg.jpg';

interface ProfileSetupProps {
  onComplete: () => void;
  onSkip?: () => void;
}


const setupSteps = [
  {
    id: 1,
    icon: User,
    title: 'Sobre você',
    description: 'Vamos nos conhecer melhor'
  },
  {
    id: 2,
    icon: Baby,
    title: 'Sobre seu bebê',
    description: 'Conte sobre seu pequeno'
  },
  {
    id: 3,
    icon: Heart,
    title: 'Seus interesses',
    description: 'O que mais faz sentido agora'
  },
  {
    id: 4,
    icon: Brain,
    title: 'Seu estilo',
    description: 'Como você prefere aprender'
  }
];

const babyAvatars = [
  { id: 'apple', name: '🍎 Maçã', emoji: '🍎' },
  { id: 'flower', name: '🌸 Flor', emoji: '🌸' },
  { id: 'seed', name: '🌱 Semente', emoji: '🌱' },
  { id: 'orange', name: '🍊 Laranja', emoji: '🍊' },
  { id: 'cherry', name: '🍒 Cereja', emoji: '🍒' },
  { id: 'sunflower', name: '🌻 Girassol', emoji: '🌻' }
];

const interests = [
  'Amamentação e alimentação',
  'Puerpério emocional',
  'Desenvolvimento do bebê',
  'Sono e rotina',
  'Trabalho e maternidade',
  'Autocuidado e identidade',
  'Relações e rede de apoio',
  'Parto e gestação'
];

const contentTypes = [
  'Leituras e artigos',
  'Vídeos rápidos',
  'Escutar áudios',
  'Trocar com outras mães',
  'Acompanhamento com especialistas'
];

const ProfileSetup = ({ onComplete, onSkip }: ProfileSetupProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { completeOnboarding } = useProfile();
  
  const [profileData, setProfileData] = useState<ProfileData>({
    name: '',
    birth_date: '',
    first_maternity: undefined,
    previous_experience: '',
    other_experience: '',
    join_groups: '',
    baby_name: '',
    baby_birth_date: '',
    baby_avatar: '',
    interests: [],
    content_preference: [],
    specialist_access: ''
  });

  const updateProfileData = (field: keyof ProfileData, value: any) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = async () => {
    if (currentStep < setupSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Finalizar onboarding - salvar no Supabase
      setIsSubmitting(true);
      try {
        // Import supabase client to ensure auth
        const { supabase } = await import('@/integrations/supabase/client');
        
        // Check if user is authenticated, if not sign in anonymously
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          await supabase.auth.signInAnonymously();
        }
        
        await completeOnboarding({
          ...profileData,
          birth_date: profileData.birth_date || undefined,
          baby_birth_date: profileData.baby_birth_date || undefined,
        });
        onComplete();
      } catch (error) {
        console.error('Error completing onboarding:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleInterestChange = (interest: string, checked: boolean) => {
    const currentInterests = profileData.interests || [];
    if (checked && currentInterests.length < 2) {
      updateProfileData('interests', [...currentInterests, interest]);
    } else if (!checked) {
      updateProfileData('interests', currentInterests.filter(i => i !== interest));
    }
  };

  const handleContentPreferenceChange = (content: string, checked: boolean) => {
    const currentPreferences = profileData.content_preference || [];
    if (checked) {
      updateProfileData('content_preference', [...currentPreferences, content]);
    } else {
      updateProfileData('content_preference', currentPreferences.filter(c => c !== content));
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: // Sobre você
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Qual seu nome (ou como prefere ser chamada)?</Label>
              <Input
                id="name"
                value={profileData.name}
                onChange={(e) => updateProfileData('name', e.target.value)}
                placeholder="Digite seu nome"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="birthDate">Qual sua data de nascimento? (opcional)</Label>
              <Input
                id="birthDate"
                type="date"
                value={profileData.birth_date}
                onChange={(e) => updateProfileData('birth_date', e.target.value)}
              />
            </div>

            <div className="space-y-3">
              <Label>Essa é a sua primeira maternidade?</Label>
              <RadioGroup
                value={profileData.first_maternity ? 'sim' : profileData.first_maternity === false ? 'nao' : ''}
                onValueChange={(value) => updateProfileData('first_maternity', value === 'sim')}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sim" id="first-yes" />
                  <Label htmlFor="first-yes">Sim</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="nao" id="first-no" />
                  <Label htmlFor="first-no">Não</Label>
                </div>
              </RadioGroup>
            </div>

            {profileData.first_maternity === false && (
              <div className="space-y-3">
                <Label>📝 Conte um pouco mais sobre sua experiência:</Label>
                <RadioGroup
                  value={profileData.previous_experience}
                  onValueChange={(value) => updateProfileData('previous_experience', value)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="perdi-gravidez" id="exp-loss" />
                    <Label htmlFor="exp-loss">Já perdi uma gravidez</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="dois-filhos" id="exp-two" />
                    <Label htmlFor="exp-two">Tenho 2 filhos</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="mais-dois-filhos" id="exp-more" />
                    <Label htmlFor="exp-more">Tenho mais de 2 filhos</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="outra" id="exp-other" />
                    <Label htmlFor="exp-other">Outra experiência (escreva abaixo)</Label>
                  </div>
                </RadioGroup>
                
                {profileData.previous_experience === 'outra' && (
                  <div className="space-y-2 mt-3">
                    <Input
                      value={profileData.other_experience}
                      onChange={(e) => updateProfileData('other_experience', e.target.value)}
                      placeholder="Descreva sua experiência..."
                      className="mt-2"
                    />
                  </div>
                )}
              </div>
            )}

            <div className="space-y-3">
              <Label>Você gostaria de participar de grupos com mães com filhos da mesma idade?</Label>
              <RadioGroup
                value={profileData.join_groups}
                onValueChange={(value) => updateProfileData('join_groups', value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sim" id="groups-yes" />
                  <Label htmlFor="groups-yes">Sim</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="nao" id="groups-no" />
                  <Label htmlFor="groups-no">Não</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="talvez" id="groups-maybe" />
                  <Label htmlFor="groups-maybe">Talvez depois</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        );

      case 1: // Sobre seu bebê
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="babyName">Nome do bebê / como você chama seu bebê?</Label>
              <Input
                id="babyName"
                value={profileData.baby_name}
                onChange={(e) => updateProfileData('baby_name', e.target.value)}
                placeholder="Nome do bebê"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="babyBirthDate">Data de nascimento (ou DPP)?</Label>
              <Input
                id="babyBirthDate"
                type="date"
                value={profileData.baby_birth_date}
                onChange={(e) => updateProfileData('baby_birth_date', e.target.value)}
              />
            </div>

            <div className="space-y-3">
              <Label>Escolha um avatar para representar seu bebê</Label>
              <div className="grid grid-cols-3 gap-3">
                {babyAvatars.map((avatar) => (
                  <button
                    key={avatar.id}
                    onClick={() => updateProfileData('baby_avatar', avatar.id)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      profileData.baby_avatar === avatar.id
                        ? 'border-primary bg-primary/10'
                        : 'border-muted hover:border-primary/50'
                    }`}
                  >
                    <div className="text-2xl mb-1">{avatar.emoji}</div>
                    <div className="text-xs">{avatar.name.split(' ')[1]}</div>
                  </button>
                ))}
              </div>
            </div>

          </div>
        );

      case 2: // Seus interesses
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h3 className="text-lg font-medium">Escolha até 2 áreas que mais fazem sentido para você neste momento:</h3>
              <p className="text-sm text-muted-foreground">
                {(profileData.interests?.length || 0)}/2 selecionadas
              </p>
            </div>

            <div className="space-y-3">
              {interests.map((interest) => (
                <div key={interest} className="flex items-center space-x-2">
                  <Checkbox
                    id={`interest-${interest}`}
                    checked={(profileData.interests || []).includes(interest)}
                    onCheckedChange={(checked) => handleInterestChange(interest, checked as boolean)}
                    disabled={!(profileData.interests || []).includes(interest) && (profileData.interests?.length || 0) >= 2}
                  />
                  <Label 
                    htmlFor={`interest-${interest}`}
                    className={`flex-1 ${!(profileData.interests || []).includes(interest) && (profileData.interests?.length || 0) >= 2 ? 'text-muted-foreground' : ''}`}
                  >
                    {interest}
                  </Label>
                </div>
              ))}
            </div>

            <p className="text-xs text-muted-foreground text-center">
              Essas escolhas podem ser ajustadas a qualquer momento no seu perfil.
            </p>
          </div>
        );

      case 3: // Seu estilo
        return (
          <div className="space-y-6">
            <div className="space-y-3">
              <Label>Como você prefere consumir conteúdo?</Label>
              <div className="space-y-3">
                {contentTypes.map((content) => (
                  <div key={content} className="flex items-center space-x-2">
                    <Checkbox
                      id={`content-${content}`}
                      checked={(profileData.content_preference || []).includes(content)}
                      onCheckedChange={(checked) => handleContentPreferenceChange(content, checked as boolean)}
                    />
                    <Label htmlFor={`content-${content}`} className="flex-1">
                      {content}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <Label>Você gostaria de ter acesso a um especialista para tirar dúvidas por vídeo chamada sempre que possível?</Label>
              <RadioGroup
                value={profileData.specialist_access}
                onValueChange={(value) => updateProfileData('specialist_access', value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="essencial" id="specialist-essential" />
                  <Label htmlFor="specialist-essential">Sim, isso é essencial pra mim</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="as-vezes" id="specialist-sometimes" />
                  <Label htmlFor="specialist-sometimes">Seria ótimo às vezes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="so-conteudo" id="specialist-content" />
                  <Label htmlFor="specialist-content">Prefiro só os conteúdos por agora</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return profileData.name.trim() !== '' && profileData.first_maternity !== undefined && 
               (profileData.first_maternity === true || 
                (profileData.first_maternity === false && profileData.previous_experience !== '' &&
                 (profileData.previous_experience !== 'outra' || profileData.other_experience?.trim() !== '')));
      case 1:
        return profileData.baby_name?.trim() !== '';
      case 2:
        return profileData.interests && profileData.interests.length > 0;
      case 3:
        return profileData.content_preference && profileData.content_preference.length > 0 && profileData.specialist_access !== '';
      default:
        return true;
    }
  };

  const currentStepData = setupSteps[currentStep];

  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center p-6 overflow-hidden bg-gradient-to-br from-background via-primary/5 to-sage/10">
      
      {/* Content */}
      <div className="relative z-10 w-full max-w-md space-y-8">
        {/* Progress indicators */}
        <div className="flex justify-center space-x-2">
          {setupSteps.map((_, index) => (
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
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-sage/10" />
          
          <CardHeader className="relative z-10 text-center pb-4">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 rounded-full bg-white/50 flex items-center justify-center">
                <currentStepData.icon className="w-6 h-6 text-primary" />
              </div>
            </div>
            <CardTitle className="text-xl font-semibold">
              {currentStepData.title}
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              {currentStepData.description}
            </p>
          </CardHeader>

          <CardContent className="relative z-10 px-6 pb-6">
            {renderStepContent()}

            {/* Navigation buttons */}
            <div className="flex gap-3 mt-8">
              {currentStep > 0 && (
                <Button
                  onClick={handleBack}
                  variant="outline"
                  className="flex-1"
                >
                  <ChevronLeft className="mr-2 w-4 h-4" />
                  Voltar
                </Button>
              )}
              
              <Button 
                onClick={handleNext}
                className="flex-1"
                disabled={!canProceed() || isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                    Salvando...
                  </>
                ) : (
                  <>
                    {currentStep === setupSteps.length - 1 ? 'Finalizar' : 'Continuar'}
                    <ChevronRight className="ml-2 w-4 h-4" />
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Step indicator */}
        <div className="text-center space-y-2">
          <p className="text-sm text-muted-foreground">
            Etapa {currentStep + 1} de {setupSteps.length}
          </p>
          {onSkip && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onSkip}
              className="text-muted-foreground hover:text-foreground"
            >
              Pular personalização
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileSetup;