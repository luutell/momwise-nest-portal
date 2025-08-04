import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useLanguage } from '@/contexts/LanguageContext';
import { useProfile } from '@/hooks/useProfile';
import { 
  Moon, 
  Sun, 
  Clock, 
  Calendar, 
  PenTool, 
  Play, 
  Pause,
  Video,
  MessageCircle,
  Users,
  Coffee,
  Heart,
  Sunrise
} from 'lucide-react';

export const Sono = () => {
  const { language } = useLanguage();
  const { profile } = useProfile();
  const [audioPlaying, setAudioPlaying] = useState<string | null>(null);

  const getCurrentTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'morning';
    if (hour < 18) return 'afternoon';
    return 'evening';
  };

  const getBabyAgeInMonths = () => {
    if (!profile?.baby_birth_date) return 5; // default for demo
    const birthDate = new Date(profile.baby_birth_date);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - birthDate.getTime());
    const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30));
    return Math.max(1, diffMonths);
  };

  const getPersonalizedMessage = () => {
    const timeOfDay = getCurrentTimeOfDay();
    const ageInMonths = getBabyAgeInMonths();
    const babyName = profile?.baby_name || 'Henri';
    const motherName = profile?.name || 'Luiza';

    const messages = {
      pt: {
        morning: {
          greeting: `Bom dia, ${motherName}!`,
          content: `${babyName} acordou há pouco? Bebês de ${ageInMonths} meses costumam ficar acordados cerca de ${ageInMonths < 4 ? '1h a 1h30' : '1h30 a 2h'} antes da primeira soneca.`,
          tip: 'Aproveite esse tempinho para preparar um bom café da manhã com calma. 🌿'
        },
        afternoon: {
          greeting: `Boa tarde, ${motherName}!`,
          content: `Como foram as sonecas de ${babyName} hoje? Bebês de ${ageInMonths} meses ainda estão desenvolvendo ritmo circadiano.`,
          tip: 'Lembre-se: dias difíceis não definem você como mãe. ☀️'
        },
        evening: {
          greeting: `Boa noite, ${motherName}!`,
          content: `Hora de preparar ${babyName} para a noite. Bebês de ${ageInMonths} meses se beneficiam de rotinas previsíveis e calmas.`,
          tip: 'Que a noite seja serena para vocês dois. 🌙'
        }
      },
      en: {
        morning: {
          greeting: `Good morning, ${motherName}!`,
          content: `Did ${babyName} just wake up? ${ageInMonths}-month-old babies usually stay awake for about ${ageInMonths < 4 ? '1 to 1.5 hours' : '1.5 to 2 hours'} before their first nap.`,
          tip: 'Take this time to prepare a nice breakfast calmly. 🌿'
        },
        afternoon: {
          greeting: `Good afternoon, ${motherName}!`,
          content: `How were ${babyName}'s naps today? ${ageInMonths}-month-old babies are still developing their circadian rhythm.`,
          tip: 'Remember: difficult days don\'t define you as a mother. ☀️'
        },
        evening: {
          greeting: `Good evening, ${motherName}!`,
          content: `Time to prepare ${babyName} for the night. ${ageInMonths}-month-old babies benefit from predictable and calm routines.`,
          tip: 'May the night be peaceful for both of you. 🌙'
        }
      }
    };

    return messages[language as keyof typeof messages][timeOfDay];
  };

  const toggleAudio = (contentId: string) => {
    setAudioPlaying(audioPlaying === contentId ? null : contentId);
  };

  const getTimeIcon = () => {
    const timeOfDay = getCurrentTimeOfDay();
    if (timeOfDay === 'morning') return <Sunrise className="w-5 h-5 text-primary" />;
    if (timeOfDay === 'afternoon') return <Sun className="w-5 h-5 text-primary" />;
    return <Moon className="w-5 h-5 text-primary" />;
  };

  const content = {
    pt: {
      title: "Sono do Bebê",
      personalizedMessage: getPersonalizedMessage(),
      specialistCard: {
        title: "Especialista da Semana",
        videoTitle: "Como criar uma rotina flexível que funciona para toda família",
        nextLive: "Próxima live: Sexta às 10h",
        sendQuestion: "Enviar Pergunta",
        viewReplays: "Ver Replays"
      },
      sleepTools: {
        title: "Ferramentas de Sono",
        calendar: "Calendário + Calculadora de janela",
        diary: "Diário simples com emoji",
        planner: "Planejador de rotina estruturada"
      },
      articles: {
        title: "Artigos Relacionados",
        items: [
          "Sinais de sono que você pode não estar notando",
          "Sonecas curtas: quando se preocupar?",
          "Rotinas noturnas intuitivas"
        ]
      },
      community: {
        title: "Comunidade - Entre Mães",
        subtitle: "Postagens recentes sobre Sono",
        respond: "Responder",
        postAnonymously: "Postar Anonimamente"
      },
      listenAudio: "Ouvir em áudio"
    },
    en: {
      title: "Baby Sleep",
      personalizedMessage: getPersonalizedMessage(),
      specialistCard: {
        title: "Specialist of the Week",
        videoTitle: "How to create a flexible routine that works for the whole family",
        nextLive: "Next live: Friday at 10am",
        sendQuestion: "Send Question",
        viewReplays: "View Replays"
      },
      sleepTools: {
        title: "Sleep Tools",
        calendar: "Calendar + Wake window calculator",
        diary: "Simple diary with emoji",
        planner: "Structured routine planner"
      },
      articles: {
        title: "Related Articles",
        items: [
          "Sleep signs you might not be noticing",
          "Short naps: when to worry?",
          "Intuitive nighttime routines"
        ]
      },
      community: {
        title: "Community - Between Mothers",
        subtitle: "Recent posts about Sleep",
        respond: "Respond",
        postAnonymously: "Post Anonymously"
      },
      listenAudio: "Listen to audio"
    }
  };

  const currentContent = content[language as keyof typeof content];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2 flex items-center justify-center gap-2">
            <Moon className="w-6 h-6 text-primary" />
            {currentContent.title}
          </h1>
        </div>

        {/* 1. Personalized Message */}
        <Card className="border border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              {getTimeIcon()}
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-2">
                  {currentContent.personalizedMessage.greeting}
                </h3>
                <p className="text-muted-foreground text-sm mb-2">
                  {currentContent.personalizedMessage.content}
                </p>
                <p className="text-sm font-medium text-primary">
                  {currentContent.personalizedMessage.tip}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Featured Article */}
        <Card className="border border-muted/30">
          <CardContent className="p-4">
            <div className="space-y-3">
              <h3 className="font-medium text-foreground text-base">
                "Como criar rotinas de sono que respeitam o ritmo natural do bebê"
              </h3>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>Por Luiza Telles</span>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleAudio('featured-article')}
                    className="h-6 px-2 text-primary"
                  >
                    {audioPlaying === 'featured-article' ? (
                      <Pause className="w-4 h-4 mr-1" />
                    ) : (
                      <Play className="w-4 h-4 mr-1" />
                    )}
                    Áudio
                  </Button>
                  <Clock className="w-4 h-4" />
                  <span>6 min</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 2. Specialist Card */}
        <div className="space-y-4">
          <div className="text-center">
            <h2 className="text-xl font-bold text-foreground mb-1">
              {currentContent.specialistCard.title}
            </h2>
            <p className="text-muted-foreground text-sm">
              Converse ao vivo com nossa especialista
            </p>
          </div>

          <Card className="bg-gradient-to-br from-primary/10 to-purple-50 border border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm">
                  <span className="text-2xl">👩‍⚕️</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-foreground text-lg mb-1">
                    Dra. Ana Silva
                  </h3>
                  <p className="text-primary font-medium">
                    Especialista em Sono Infantil
                  </p>
                </div>
              </div>

              <Card className="bg-white/80 border-none mb-4">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Video className="w-4 h-4 text-primary" />
                    <span className="font-medium text-foreground">Vídeo introdutório</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    "{currentContent.specialistCard.videoTitle}"
                  </p>
                </CardContent>
              </Card>

              <div className="bg-white/60 rounded-lg p-3 mb-4">
                <div className="flex items-center gap-2 text-primary">
                  <Calendar className="w-4 h-4" />
                  <span className="font-medium text-sm">
                    {currentContent.specialistCard.nextLive}
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button className="flex-1">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  {currentContent.specialistCard.sendQuestion}
                </Button>
                <Button variant="outline" className="flex-1">
                  <Play className="w-4 h-4 mr-2" />
                  {currentContent.specialistCard.viewReplays}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 3. Sleep Tools */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Clock className="w-5 h-5 text-primary" />
              {currentContent.sleepTools.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <Calendar className="w-4 h-4 mr-3" />
              {currentContent.sleepTools.calendar}
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <PenTool className="w-4 h-4 mr-3" />
              {currentContent.sleepTools.diary}
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Clock className="w-4 h-4 mr-3" />
              {currentContent.sleepTools.planner}
            </Button>
          </CardContent>
        </Card>

        {/* 4. Related Articles */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Coffee className="w-5 h-5 text-primary" />
              {currentContent.articles.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {currentContent.articles.items.map((article, index) => (
              <Card key={index} className="border border-muted">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-sm text-foreground flex-1">
                      {article}
                    </h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleAudio(`article-${index}`)}
                      className="ml-2"
                    >
                      {audioPlaying === `article-${index}` ? (
                        <Pause className="w-4 h-4" />
                      ) : (
                        <Play className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {currentContent.listenAudio}
                  </p>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>

        {/* 5. Community */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Users className="w-5 h-5 text-primary" />
              {currentContent.community.title}
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              {currentContent.community.subtitle}
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Sample community posts */}
            <div className="space-y-3">
              <Card className="border border-muted/50 bg-muted/20">
                <CardContent className="p-3">
                  <p className="text-sm text-foreground">
                    "Minha filha de 4 meses ainda acorda de 2 em 2 horas... é normal?"
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="secondary" className="text-xs">2 respostas</Badge>
                    <Button variant="ghost" size="sm" className="h-6 text-xs">
                      {currentContent.community.respond}
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border border-muted/50 bg-muted/20">
                <CardContent className="p-3">
                  <p className="text-sm text-foreground">
                    "Sonecas de 20 minutos estão me deixando exausta..."
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="secondary" className="text-xs">5 respostas</Badge>
                    <Button variant="ghost" size="sm" className="h-6 text-xs">
                      {currentContent.community.respond}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Separator />
            
            <Button className="w-full">
              <Heart className="w-4 h-4 mr-2" />
              {currentContent.community.postAnonymously}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};