import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { ChevronRight, ChevronLeft, User, Baby, Heart, Brain, Calendar } from 'lucide-react';
import watercolorBg from '@/assets/watercolor-hero-bg.jpg';

interface ProfileSetupProps {
  onComplete: () => void;
}

interface ProfileData {
  // Etapa 1
  name: string;
  birthDate: string;
  firstExperience: string;
  joinGroups: string;
  
  // Etapa 2
  babyName: string;
  babyBirthDate: string;
  babyAvatar: string;
  babyPhase: string;
  
  // Etapa 3
  interests: string[];
  
  // Etapa 4
  contentPreference: string[];
  specialistAccess: string;
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

const ProfileSetup = ({ onComplete }: ProfileSetupProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [profileData, setProfileData] = useState<ProfileData>({
    name: '',
    birthDate: '',
    firstExperience: '',
    joinGroups: '',
    babyName: '',
    babyBirthDate: '',
    babyAvatar: '',
    babyPhase: '',
    interests: [],
    contentPreference: [],
    specialistAccess: ''
  });

  const updateProfileData = (field: keyof ProfileData, value: any) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < setupSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Salvar dados do perfil aqui
      onComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleInterestChange = (interest: string, checked: boolean) => {
    if (checked && profileData.interests.length < 2) {
      updateProfileData('interests', [...profileData.interests, interest]);
    } else if (!checked) {
      updateProfileData('interests', profileData.interests.filter(i => i !== interest));
    }
  };

  const handleContentPreferenceChange = (content: string, checked: boolean) => {
    if (checked) {
      updateProfileData('contentPreference', [...profileData.contentPreference, content]);
    } else {
      updateProfileData('contentPreference', profileData.contentPreference.filter(c => c !== content));
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
                value={profileData.birthDate}
                onChange={(e) => updateProfileData('birthDate', e.target.value)}
              />
            </div>

            <div className="space-y-3">
              <Label>Essa é sua primeira experiência materna?</Label>
              <RadioGroup
                value={profileData.firstExperience}
                onValueChange={(value) => updateProfileData('firstExperience', value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sim" id="first-yes" />
                  <Label htmlFor="first-yes">Sim</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="nao" id="first-no" />
                  <Label htmlFor="first-no">Não</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="gestando" id="first-pregnant" />
                  <Label htmlFor="first-pregnant">Estou gestando agora</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-3">
              <Label>Você gostaria de participar de grupos com mães com filhos da mesma idade?</Label>
              <RadioGroup
                value={profileData.joinGroups}
                onValueChange={(value) => updateProfileData('joinGroups', value)}
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
                value={profileData.babyName}
                onChange={(e) => updateProfileData('babyName', e.target.value)}
                placeholder="Nome do bebê"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="babyBirthDate">Data de nascimento (ou DPP)?</Label>
              <Input
                id="babyBirthDate"
                type="date"
                value={profileData.babyBirthDate}
                onChange={(e) => updateProfileData('babyBirthDate', e.target.value)}
              />
            </div>

            <div className="space-y-3">
              <Label>Escolha um avatar para representar seu bebê</Label>
              <div className="grid grid-cols-3 gap-3">
                {babyAvatars.map((avatar) => (
                  <button
                    key={avatar.id}
                    onClick={() => updateProfileData('babyAvatar', avatar.id)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      profileData.babyAvatar === avatar.id
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

            <div className="space-y-3">
              <Label>Seu bebê está em qual fase?</Label>
              <RadioGroup
                value={profileData.babyPhase}
                onValueChange={(value) => updateProfileData('babyPhase', value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="barriga" id="phase-pregnant" />
                  <Label htmlFor="phase-pregnant">Ainda na barriga</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="0-3meses" id="phase-0-3" />
                  <Label htmlFor="phase-0-3">Primeiros 3 meses</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="4-12meses" id="phase-4-12" />
                  <Label htmlFor="phase-4-12">Entre 4 e 12 meses</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="1ano+" id="phase-1year" />
                  <Label htmlFor="phase-1year">Já passou de 1 ano</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        );

      case 2: // Seus interesses
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h3 className="text-lg font-medium">Escolha até 2 áreas que mais fazem sentido para você neste momento:</h3>
              <p className="text-sm text-muted-foreground">
                {profileData.interests.length}/2 selecionadas
              </p>
            </div>

            <div className="space-y-3">
              {interests.map((interest) => (
                <div key={interest} className="flex items-center space-x-2">
                  <Checkbox
                    id={`interest-${interest}`}
                    checked={profileData.interests.includes(interest)}
                    onCheckedChange={(checked) => handleInterestChange(interest, checked as boolean)}
                    disabled={!profileData.interests.includes(interest) && profileData.interests.length >= 2}
                  />
                  <Label 
                    htmlFor={`interest-${interest}`}
                    className={`flex-1 ${!profileData.interests.includes(interest) && profileData.interests.length >= 2 ? 'text-muted-foreground' : ''}`}
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
                      checked={profileData.contentPreference.includes(content)}
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
                value={profileData.specialistAccess}
                onValueChange={(value) => updateProfileData('specialistAccess', value)}
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
        return profileData.name.trim() !== '' && profileData.firstExperience !== '';
      case 1:
        return profileData.babyName.trim() !== '' && profileData.babyPhase !== '';
      case 2:
        return profileData.interests.length > 0;
      case 3:
        return profileData.contentPreference.length > 0 && profileData.specialistAccess !== '';
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
                disabled={!canProceed()}
              >
                {currentStep === setupSteps.length - 1 ? 'Finalizar' : 'Continuar'}
                <ChevronRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Step indicator */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Etapa {currentStep + 1} de {setupSteps.length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetup;