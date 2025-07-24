import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Settings, Baby, Heart, Calendar, BookOpen, Bell, Globe, UserX, Edit, CheckSquare } from 'lucide-react';

const Profile = () => {
  // Calculate baby's age (mock data for now)
  const calculateBabyAge = () => {
    return "3 meses e 21 dias";
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
              <h1 className="font-playfair text-2xl font-semibold text-foreground">Mama</h1>
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
              <p className="text-foreground">Miguel (da personalização)</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Data de nascimento</p>
              <p className="text-foreground">1 de julho de 2024 (da personalização)</p>
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