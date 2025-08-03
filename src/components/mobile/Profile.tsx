import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Settings, Baby, Heart, Calendar, BookOpen, Bell, Globe, UserX, Edit, CheckSquare } from 'lucide-react';
import { useProfile } from '@/hooks/useProfile';
import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface ProfileData {
  name?: string;
  baby_name?: string;
  baby_birth_date?: string;
  birth_date?: string;
  baby_avatar?: string;
  interests?: string[];
  content_preference?: string[];
  first_maternity?: boolean;
  join_groups?: string;
  specialist_access?: string;
  previous_experience?: string;
  other_experience?: string;
}

const Profile = () => {
  const { profile: supabaseProfile } = useProfile();
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const { t } = useLanguage();

  useEffect(() => {
    console.log('🔍 useEffect Profile - supabaseProfile:', supabaseProfile);
    
    // First try to get from Supabase
    if (supabaseProfile) {
      console.log('✅ Using Supabase profile data in Profile');
      setProfileData(supabaseProfile);
      return;
    }

    // Fallback to localStorage
    const profileData = localStorage.getItem('profile_data');
    const onboardingData = localStorage.getItem('onboarding_data');
    
    console.log('🔍 Profile - localStorage profile_data:', profileData);
    console.log('🔍 Profile - localStorage onboarding_data:', onboardingData);
    
    const savedProfile = profileData || onboardingData;
    if (savedProfile) {
      try {
        const parsed = JSON.parse(savedProfile);
        console.log('✅ Using localStorage profile data in Profile:', parsed);
        setProfileData(parsed);
      } catch (error) {
        console.error('❌ Error parsing profile data in Profile:', error);
      }
    } else {
      console.log('❌ No profile data found in localStorage for Profile');
    }
  }, [supabaseProfile]);

  // Calculate baby's age based on actual birth date
  const calculateBabyAge = () => {
    if (!profileData?.baby_birth_date) {
      return t('language') === 'en' ? "Not informed" : "Não informado";
    }
    
    const birthDate = new Date(profileData.baby_birth_date);
    const today = new Date();
    const diffTime = today.getTime() - birthDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 30) {
      return t('language') === 'en' ? `${diffDays} days` : `${diffDays} dias`;
    } else if (diffDays < 365) {
      const months = Math.floor(diffDays / 30);
      const days = diffDays % 30;
      return t('language') === 'en' 
        ? `${months} months and ${days} days`
        : `${months} meses e ${days} dias`;
    } else {
      const years = Math.floor(diffDays / 365);
      const months = Math.floor((diffDays % 365) / 30);
      return t('language') === 'en' 
        ? `${years} years and ${months} months`
        : `${years} anos e ${months} meses`;
    }
  };

  return (
    <div className="p-4 space-y-6">
      {/* Profile Header */}
      <Card className="border-none shadow-gentle">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4 mb-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src="" />
              <AvatarFallback className="bg-primary/20 text-primary font-playfair text-lg">
                🌱
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h1 className="font-playfair text-2xl font-semibold text-foreground">{profileData?.name || 'Mama'}</h1>
              <p className="text-muted-foreground text-sm">
                {t('language') === 'en' ? `Your baby is ${calculateBabyAge()}` : `Seu bebê tem ${calculateBabyAge()}`}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-sm">
                  {t('language') === 'en' ? '🍼 Phase: 4th trimester transition' : '🍼 Fase: Transição do 4º trimestre'}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm">
                  {t('language') === 'en' ? '💚 You are in the 12th chapter of your journey' : '💚 Você está no 12º capítulo da sua jornada'}
                </span>
              </div>
            </div>
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* About the Baby */}
      <Card className="border-none shadow-gentle">
        <CardHeader>
          <CardTitle className="font-playfair text-lg flex items-center gap-2">
            {t('language') === 'en' ? '🧸 About the baby' : '🧸 Sobre o bebê'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-3">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                {t('language') === 'en' ? "Baby's name" : 'Nome do bebê'}
              </p>
              <p className="text-foreground">
                {profileData?.baby_name || (t('language') === 'en' ? 'Not informed' : 'Não informado')}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                {t('language') === 'en' ? 'Birth date' : 'Data de nascimento'}
              </p>
              <p className="text-foreground">
                {profileData?.baby_birth_date 
                  ? new Date(profileData.baby_birth_date).toLocaleDateString(t('language') === 'en' ? 'en-US' : 'pt-BR') 
                  : (t('language') === 'en' ? 'Not informed' : 'Não informado')}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                {t('language') === 'en' ? 'Current age' : 'Idade atual'}
              </p>
              <p className="text-foreground">{calculateBabyAge()}</p>
            </div>
            {profileData?.baby_avatar && (
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {t('language') === 'en' ? 'Chosen avatar' : 'Avatar escolhido'}
                </p>
                <p className="text-foreground">
                  {profileData.baby_avatar === 'apple' && (t('language') === 'en' ? '🍎 Apple' : '🍎 Maçã')}
                  {profileData.baby_avatar === 'flower' && (t('language') === 'en' ? '🌸 Flower' : '🌸 Flor')}
                  {profileData.baby_avatar === 'seed' && (t('language') === 'en' ? '🌱 Seed' : '🌱 Semente')}
                  {profileData.baby_avatar === 'orange' && (t('language') === 'en' ? '🍊 Orange' : '🍊 Laranja')}
                  {profileData.baby_avatar === 'cherry' && (t('language') === 'en' ? '🍒 Cherry' : '🍒 Cereja')}
                  {profileData.baby_avatar === 'sunflower' && (t('language') === 'en' ? '🌻 Sunflower' : '🌻 Girassol')}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* About You */}
      <Card className="border-none shadow-gentle">
        <CardHeader>
          <CardTitle className="font-playfair text-lg flex items-center gap-2">
            {t('language') === 'en' ? '🤱 About you' : '🤱 Sobre você'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              {t('language') === 'en' ? 'Name' : 'Nome'}
            </p>
            <p className="text-foreground">
              {profileData?.name || (t('language') === 'en' ? 'Not informed' : 'Não informado')}
            </p>
          </div>
          
          {profileData?.birth_date && (
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                {t('language') === 'en' ? 'Birth date' : 'Data de nascimento'}
              </p>
              <p className="text-foreground">
                {new Date(profileData.birth_date).toLocaleDateString(t('language') === 'en' ? 'en-US' : 'pt-BR')}
              </p>
            </div>
          )}

          <div>
            <p className="text-sm font-medium text-muted-foreground">
              {t('language') === 'en' ? 'First maternity' : 'Primeira maternidade'}
            </p>
            <p className="text-foreground">
              {profileData?.first_maternity === true 
                ? (t('language') === 'en' ? 'Yes' : 'Sim')
                : profileData?.first_maternity === false 
                ? (t('language') === 'en' ? 'No' : 'Não') 
                : (t('language') === 'en' ? 'Not informed' : 'Não informado')}
            </p>
          </div>

          {profileData?.previous_experience && (
            <div>
              <p className="text-sm font-medium text-muted-foreground">Experiência anterior</p>
              <p className="text-foreground">
                {profileData.previous_experience === 'perdi-gravidez' && 'Já perdi uma gravidez'}
                {profileData.previous_experience === 'dois-filhos' && 'Tenho 2 filhos'}
                {profileData.previous_experience === 'mais-dois-filhos' && 'Tenho mais de 2 filhos'}
                {profileData.previous_experience === 'outra' && profileData.other_experience}
              </p>
            </div>
          )}

          <div>
            <p className="text-sm font-medium text-muted-foreground">Participar de grupos</p>
            <p className="text-foreground">
              {profileData?.join_groups === 'sim' ? 'Sim, gostaria de participar' :
               profileData?.join_groups === 'nao' ? 'Não' :
               profileData?.join_groups === 'talvez' ? 'Talvez depois' : 'Não informado'}
            </p>
          </div>

          {profileData?.interests && profileData.interests.length > 0 && (
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-2">Seus interesses</p>
              <div className="flex flex-wrap gap-2">
                {profileData.interests.map((interest, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {interest}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {profileData?.content_preference && profileData.content_preference.length > 0 && (
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-2">Preferências de conteúdo</p>
              <div className="flex flex-wrap gap-2">
                {profileData.content_preference.map((preference, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {preference}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {profileData?.specialist_access && (
            <div>
              <p className="text-sm font-medium text-muted-foreground">Acesso a especialista</p>
              <p className="text-foreground">
                {profileData.specialist_access === 'essencial' && 'Sim, isso é essencial para mim'}
                {profileData.specialist_access === 'as-vezes' && 'Seria ótimo às vezes'}
                {profileData.specialist_access === 'so-conteudo' && 'Prefiro só os conteúdos por agora'}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <Separator />

      {/* Editable Options */}
      <Card className="border-none shadow-gentle">
        <CardHeader>
          <CardTitle className="font-playfair text-lg flex items-center gap-2">
            🔁 Opções Editáveis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="outline" className="w-full justify-start" size="lg">
            <Calendar className="w-4 h-4 mr-3" />
            📆 Editar data de nascimento do bebê
          </Button>
          
          <Button variant="outline" className="w-full justify-start" size="lg">
            <Baby className="w-4 h-4 mr-3" />
            🧑‍🍼 Trocar tipo de jornada
          </Button>
          
          <Button variant="outline" className="w-full justify-start" size="lg">
            <Bell className="w-4 h-4 mr-3" />
            🔔 Gerenciar notificações personalizadas
          </Button>
          
          <Button variant="outline" className="w-full justify-start" size="lg">
            <Globe className="w-4 h-4 mr-3" />
            🌍 Alterar idioma
          </Button>
          
          <Button variant="outline" className="w-full justify-start text-destructive hover:text-destructive" size="lg">
            <UserX className="w-4 h-4 mr-3" />
            👤 Sair da conta / excluir conta
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;