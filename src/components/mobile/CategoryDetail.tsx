import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookOpen, Play, Heart, Clock, Calendar, PenTool, FileText, Video, MessageCircle, CheckCircle, Bookmark, User, Clock8, Baby } from 'lucide-react';
import AudioPlayer from './AudioPlayer';

interface Article {
  id: string;
  title: string;
  excerpt: string;
  readTime: string;
  type: 'article' | 'audio' | 'reflection';
  duration?: string;
}

interface CategoryDetailProps {
  categoryId: string;
  title: string;
  description: string;
  onBack: () => void;
}

// Temas específicos para "Ritmo Leve" baseados na imagem
const ritmoLeveThemes = [
  {
    id: 'entendendo-sono',
    icon: '💤',
    title: 'Entendendo o Sono',
    description: 'Aprenda a ler os sinais e respeitar as janelas naturais'
  },
  {
    id: 'rotina-leve',
    icon: '⏳',
    title: 'Rotina Leve',
    description: 'Organização com flexibilidade e acolhimento'
  },
  {
    id: 'ambiente-sonecas',
    icon: '🌙',
    title: 'Ambiente e Sonecas',
    description: 'Dicas para tornar os cochilos mais tranquilos'
  },
  {
    id: 'saltos-regressoes',
    icon: '🌊',
    title: 'Saltos e Regressões',
    description: 'O que são e como lidar com mais leveza'
  },
  {
    id: 'planejamento-dia',
    icon: '📋',
    title: 'Planejamento do Dia',
    description: 'Crie uma rotina afetiva com o bebê no centro'
  },
  {
    id: 'diario-ritmos',
    icon: '📖',
    title: 'Diário de Ritmos',
    description: 'Registre e reflita sobre o que está funcionando'
  }
];

const interactiveTools = [
  {
    id: 'calculadora-sono',
    icon: Clock,
    title: 'Calculadora de janela de sono',
    description: 'Descubra os momentos ideais para sonecas'
  },
  {
    id: 'calendario-sono',
    icon: Calendar,
    title: 'Calendário do sono por idade',
    description: 'Veja padrões esperados para cada fase'
  },
  {
    id: 'planejador-rotina',
    icon: PenTool,
    title: 'Planejador de rotina personalizado',
    description: 'Monte sua rotina respeitando o ritmo familiar'
  },
  {
    id: 'diario-sono',
    icon: FileText,
    title: 'Meu Diário do Sono',
    description: 'Anotações simples para acompanhar o progresso'
  }
];

const CategoryDetail = ({ categoryId, title, description, onBack }: CategoryDetailProps) => {
  return (
    <div className="min-h-screen bg-warm-white">
      {/* 🟤 1. TOPO FIXO */}
      <div className="bg-gradient-warm text-primary-foreground p-4 pb-6">
        <div className="flex items-center mb-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onBack}
            className="text-primary-foreground hover:bg-primary-foreground/20 mr-3"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="font-playfair text-2xl font-semibold">⏳ Ritmo Leve</h1>
        </div>
        <p className="text-primary-foreground/90 text-sm mb-3">
          Sono, rotina e organização com mais paz e presença
        </p>
        <p className="text-primary-foreground/80 text-xs leading-relaxed">
          Aqui você encontra conteúdos para ajudar sua família a viver os dias com mais calma. 
          Respeitando o ritmo do bebê e o seu, sem rigidez, com sabedoria e afeto.
        </p>
      </div>

      <div className="p-4 space-y-6">
        {/* 🟤 2. MENU PRINCIPAL DE TEMAS */}
        <div>
          <h2 className="font-playfair text-lg font-semibold mb-4">Temas</h2>
          <div className="grid grid-cols-1 gap-3">
            {ritmoLeveThemes.map((theme) => (
              <Card key={theme.id} className="border-none shadow-gentle hover:shadow-soft transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <div className="text-2xl">{theme.icon}</div>
                    <div className="flex-1">
                      <h3 className="font-playfair font-medium text-sm mb-1">{theme.title}</h3>
                      <p className="text-xs text-muted-foreground">{theme.description}</p>
                    </div>
                    <ArrowLeft className="w-4 h-4 text-muted-foreground rotate-180" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* 🟤 4. ESPECIALISTA DA SEMANA */}
        <Card className="border-none shadow-gentle bg-gradient-soft">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-playfair font-semibold text-sm">Dra. Ana Silva</h3>
                <p className="text-xs text-muted-foreground">Especialista da semana</p>
              </div>
            </div>
            
            <div className="mb-4">
              <div className="bg-primary/10 rounded-lg p-3 mb-3">
                <div className="flex items-center space-x-2 mb-2">
                  <Video className="w-4 h-4 text-primary" />
                  <span className="text-xs font-medium">Vídeo introdutório</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  "Como criar uma rotina flexível que funciona para toda família"
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-xs">
                <Calendar className="w-4 h-4 text-primary" />
                <span>Próxima live: Sexta, 19/07 às 10h</span>
              </div>
              
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="flex-1 text-xs">
                  <MessageCircle className="w-3 h-3 mr-1" />
                  Envie sua pergunta
                </Button>
                <Button variant="outline" size="sm" className="flex-1 text-xs">
                  <Video className="w-3 h-3 mr-1" />
                  Ver replays
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 🟤 5. FERRAMENTAS INTERATIVAS */}
        <div>
          <h2 className="font-playfair text-lg font-semibold mb-4">Ferramentas Interativas</h2>
          <div className="grid grid-cols-2 gap-3">
            {interactiveTools.map((tool) => (
              <Card key={tool.id} className="border-none shadow-gentle hover:shadow-soft transition-shadow cursor-pointer">
                <CardContent className="p-3 text-center">
                  <tool.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                  <h3 className="font-medium text-xs mb-1">{tool.title}</h3>
                  <p className="text-xs text-muted-foreground leading-tight">{tool.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* 🟤 6. COMUNIDADE */}
        <div>
          <h2 className="font-playfair text-lg font-semibold mb-4">💬 Comunidade</h2>
          
          {/* Comentários e relatos */}
          <div className="space-y-3">
            <Card className="border-none shadow-gentle">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                    <Baby className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-medium text-xs">Mariana</h4>
                      <span className="text-xs text-muted-foreground">há 2h</span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-2">
                      "Consegui criar uma rotina que funciona! O bebê está dormindo melhor e eu também. 
                      A dica do ambiente escuro fez toda diferença nas sonecas."
                    </p>
                    <div className="flex items-center space-x-3">
                      <button className="flex items-center space-x-1 text-xs text-muted-foreground">
                        <Heart className="w-3 h-3" />
                        <span>12</span>
                      </button>
                      <button className="text-xs text-muted-foreground">Responder</button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-gentle">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                    <Baby className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-medium text-xs">Luciana</h4>
                      <span className="text-xs text-muted-foreground">há 5h</span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-2">
                      "Dica: comecei a observar os sinais de sono antes de ele ficar muito agitado. 
                      Mudou completamente nossa rotina! 💕"
                    </p>
                    <div className="flex items-center space-x-3">
                      <button className="flex items-center space-x-1 text-xs text-muted-foreground">
                        <Heart className="w-3 h-3" />
                        <span>8</span>
                      </button>
                      <button className="text-xs text-muted-foreground">Responder</button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Caixa para novo comentário */}
          <Card className="border-2 border-dashed border-primary/30 mt-4">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <MessageCircle className="w-5 h-5 text-primary" />
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">
                    Compartilhe sua experiência ou dica com outras mães...
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CategoryDetail;