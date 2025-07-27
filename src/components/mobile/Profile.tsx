import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Settings, Baby, Heart, Calendar, BookOpen, Bell, Globe, UserX, Edit, CheckSquare } from 'lucide-react';
import { useProfile } from '@/hooks/useProfile';
import { useState, useEffect } from 'react';

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

  useEffect(() => {
    // First try to get from Supabase
    if (supabaseProfile) {
      setProfileData(supabaseProfile);
      return;
    }

    // Fallback to localStorage
    const savedProfile = localStorage.getItem('profile_data') || localStorage.getItem('onboarding_data');
    if (savedProfile) {
      try {
        const parsed = JSON.parse(savedProfile);
        setProfileData(parsed);
      } catch (error) {
        console.error('Error parsing profile data:', error);
      }
    }
  }, [supabaseProfile]);

  // Calculate baby's age based on actual birth date
  const calculateBabyAge = () => {
    if (!profileData?.baby_birth_date) return "Não informado";
    
    const birthDate = new Date(profileData.baby_birth_date);
    const today = new Date();
    const diffTime = today.getTime() - birthDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 30) {
      return `${diffDays} dias`;
    } else if (diffDays < 365) {
      const months = Math.floor(diffDays / 30);
      const days = diffDays % 30;
      return `${months} meses e ${days} dias`;
    } else {
      const years = Math.floor(diffDays / 365);
      const months = Math.floor((diffDays % 365) / 30);
      return `${years} anos e ${months} meses`;
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
              <p className="text-muted-foreground text-sm">Seu bebê tem {calculateBabyAge()}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-sm">🍼 Fase: Transição do 4º trimestre</span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm">💚 Você está no 12º capítulo da sua jornada</span>
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
            🧸 Sobre o bebê
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-3">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Nome do bebê</p>
              <p className="text-foreground">{profileData?.baby_name || 'Não informado'}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Data de nascimento</p>
              <p className="text-foreground">{profileData?.baby_birth_date ? new Date(profileData.baby_birth_date).toLocaleDateString('pt-BR') : 'Não informado'}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Peso estimado</p>
              <p className="text-foreground">4.2 kg (baseado na curva de crescimento)</p>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-2">Marco atual:</p>
              <div className="space-y-1">
                <p className="text-sm flex items-center gap-2">→ "Explorando os sons"</p>
                <p className="text-sm flex items-center gap-2">→ "Começando a pegar objetos com as mãos"</p>
              </div>
            </div>
            
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-2">Próximo marco esperado:</p>
              <p className="text-sm flex items-center gap-2 text-primary">→ "Pode começar a rolar de barriga para cima para barriga para baixo em breve!"</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* About You */}
      <Card className="border-none shadow-gentle">
        <CardHeader>
          <CardTitle className="font-playfair text-lg flex items-center gap-2">
            🤱 Sobre você
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Estado emocional recente</p>
            <p className="text-foreground">(resumo do Mood Tracker da semana)</p>
          </div>
          
          <div>
            <p className="text-sm font-medium text-muted-foreground">Desafios que você mencionou</p>
            <p className="text-foreground">(puxado do Weekly Check-in)</p>
          </div>

          <div>
            <p className="text-sm font-medium text-muted-foreground mb-3">Conteúdos sugeridos:</p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <CheckSquare className="w-4 h-4 text-sage" />
                <span className="text-sm">Um artigo sobre regressão de sono</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckSquare className="w-4 h-4 text-sage" />
                <span className="text-sm">Uma meditação guiada de 3 minutos</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckSquare className="w-4 h-4 text-sage" />
                <span className="text-sm">Dica prática: como estimular o tempo de barriga</span>
              </div>
            </div>
          </div>
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