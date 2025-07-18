import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookOpen, Play, Heart, Clock, Calendar, PenTool, FileText, Video, MessageCircle, CheckCircle, Bookmark, User, Clock8, Baby, Moon, Sparkles, Wind, TreePine, Sun } from 'lucide-react';
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

// Temas específicos para "Ritmo Leve" com design renovado
const ritmoLeveThemes = [
  {
    id: 'entendendo-sono',
    icon: Moon,
    emoji: '💤',
    title: 'Entendendo o Sono',
    description: 'Aprenda a ler os sinais e respeitar as janelas naturais',
    gradient: 'bg-indigo-300',
    accent: 'text-indigo-600'
  },
  {
    id: 'rotina-leve',
    icon: Clock,
    emoji: '⏳',
    title: 'Rotina Leve',
    description: 'Organização com flexibilidade e acolhimento',
    gradient: 'bg-emerald-300',
    accent: 'text-emerald-600'
  },
  {
    id: 'ambiente-sonecas',
    icon: Wind,
    emoji: '🌙',
    title: 'Ambiente e Sonecas',
    description: 'Dicas para tornar os cochilos mais tranquilos',
    gradient: 'bg-slate-300',
    accent: 'text-slate-600'
  },
  {
    id: 'saltos-regressoes',
    icon: Sparkles,
    emoji: '🌊',
    title: 'Saltos e Regressões',
    description: 'O que são e como lidar com mais leveza',
    gradient: 'bg-cyan-300',
    accent: 'text-cyan-600'
  },
  {
    id: 'planejamento-dia',
    icon: Sun,
    emoji: '📋',
    title: 'Planejamento do Dia',
    description: 'Crie uma rotina afetiva com o bebê no centro',
    gradient: 'bg-amber-300',
    accent: 'text-amber-600'
  },
  {
    id: 'diario-ritmos',
    icon: BookOpen,
    emoji: '📖',
    title: 'Diário de Ritmos',
    description: 'Registre e reflita sobre o que está funcionando',
    gradient: 'bg-rose-300',
    accent: 'text-rose-600'
  }
];

const interactiveTools = [
  {
    id: 'calculadora-sono',
    icon: Clock,
    title: 'Calculadora de janela de sono',
    description: 'Descubra os momentos ideais para sonecas',
    gradient: 'from-emerald-500/20 to-teal-500/20',
    accent: 'text-emerald-600'
  },
  {
    id: 'calendario-sono',
    icon: Calendar,
    title: 'Calendário do sono por idade',
    description: 'Veja padrões esperados para cada fase',
    gradient: 'from-indigo-500/20 to-purple-500/20',
    accent: 'text-indigo-600'
  },
  {
    id: 'planejador-rotina',
    icon: PenTool,
    title: 'Planejador de rotina personalizado',
    description: 'Monte sua rotina respeitando o ritmo familiar',
    gradient: 'from-amber-500/20 to-orange-500/20',
    accent: 'text-amber-600'
  },
  {
    id: 'diario-sono',
    icon: FileText,
    title: 'Meu Diário do Sono',
    description: 'Anotações simples para acompanhar o progresso',
    gradient: 'from-rose-500/20 to-pink-500/20',
    accent: 'text-rose-600'
  }
];

const CategoryDetail = ({ categoryId, title, description, onBack }: CategoryDetailProps) => {
  return (
    <div className="min-h-screen bg-terracotta relative overflow-hidden">
      {/* Elementos decorativos de fundo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-xl"></div>
        <div className="absolute top-40 left-5 w-24 h-24 bg-teal-500/10 rounded-full blur-lg"></div>
        <div className="absolute bottom-32 right-20 w-40 h-40 bg-cyan-500/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-10 left-10 text-6xl opacity-5 text-gray-600">🌿</div>
        <div className="absolute top-32 right-5 text-4xl opacity-5 text-gray-600">🍃</div>
        <div className="absolute bottom-40 left-20 text-5xl opacity-5 text-gray-600">💫</div>
      </div>

      {/* 🟤 1. TOPO FIXO - Hero Section Renovado */}
      <div className="relative z-10">
        <div className="bg-gray-800/90 backdrop-blur-sm border-b border-gray-700 shadow-sm">
          <div className="p-6 pb-8">
            <div className="flex items-center mb-6">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={onBack}
                className="hover:bg-gray-700 text-emerald-400 mr-3"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div className="flex items-center space-x-3">
                <div className="text-4xl">⏳</div>
                <div>
                  <h1 className="font-playfair text-2xl font-bold text-white">Ritmo Leve</h1>
                  <p className="text-emerald-400 font-semibold text-sm">Sono, rotina e organização</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-700/60 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-gray-600">
              <p className="text-gray-300 text-sm leading-relaxed text-center">
                Aqui você encontra conteúdos para ajudar sua família a viver os dias com mais calma. 
                Respeitando o ritmo do bebê e o seu, sem rigidez, com sabedoria e afeto.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 p-8 space-y-12">
        {/* 🟤 2. MENU PRINCIPAL DE TEMAS - Redesenhado */}
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <h2 className="font-playfair text-2xl font-bold text-white">Temas Principais</h2>
            <p className="text-gray-400">Escolha o tema que mais precisa hoje</p>
          </div>
           <div className="space-y-8">
            {ritmoLeveThemes.map((theme) => {
              const Icon = theme.icon;
              return (
                <Card key={theme.id} className="border-none shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer hover:scale-[1.02] overflow-hidden group">
                  <div className={`${theme.gradient} relative`}>
                    <div className="absolute top-4 right-4 text-3xl opacity-30">{theme.emoji}</div>
                    <CardContent className="p-6 relative">
                      <div className="flex items-center space-x-5">
                        <div className="w-16 h-16 bg-white/90 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                          <Icon className={`w-8 h-8 ${theme.accent}`} />
                        </div>
                        <div className="space-y-2 flex-1">
                          <h3 className="font-playfair text-lg font-bold text-white">{theme.title}</h3>
                          <p className="text-white/90 text-sm">{theme.description}</p>
                          <div className="flex items-center space-x-2 text-xs text-white/80">
                            <Play className="w-3 h-3" />
                            <span>Vídeo • Texto • Dica prática</span>
                          </div>
                        </div>
                        <ArrowLeft className="w-5 h-5 text-white/70 rotate-180 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </CardContent>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* 🟤 4. ESPECIALISTA DA SEMANA - Redesenhado */}
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <h3 className="font-playfair text-2xl font-bold text-white">Especialista da Semana</h3>
            <p className="text-gray-400">Converse ao vivo com nossa especialista</p>
          </div>
          
          <Card className="bg-gray-800/60 backdrop-blur-sm border border-gray-700 shadow-xl overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/10 rounded-full blur-2xl"></div>
            <CardContent className="relative p-6 space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 bg-gray-700/60 backdrop-blur-sm rounded-full flex items-center justify-center text-3xl flex-shrink-0 shadow-lg border border-gray-600">
                  👩‍⚕️
                </div>
                <div className="space-y-2">
                  <h4 className="font-playfair text-xl font-bold text-white">Dra. Ana Silva</h4>
                  <p className="text-violet-400 font-semibold">Especialista em Sono Infantil</p>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="bg-gray-700/50 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-gray-600">
                  <div className="flex items-center space-x-2 mb-2">
                    <Video className="w-5 h-5 text-violet-400" />
                    <span className="text-sm font-bold text-white">Vídeo introdutório</span>
                  </div>
                  <p className="text-sm text-gray-300">
                    "Como criar uma rotina flexível que funciona para toda família"
                  </p>
                </div>

                <div className="bg-gray-700/30 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-gray-600">
                  <div className="flex items-center space-x-2 text-sm text-violet-400 font-semibold">
                    <Calendar className="w-4 h-4" />
                    <span>Próxima live: Sexta, 19/07 às 10h</span>
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <Button className="flex-1 bg-violet-600 hover:bg-violet-700 text-white font-semibold shadow-lg">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Enviar Pergunta
                  </Button>
                  <Button variant="outline" className="flex-1 bg-gray-700/50 border-gray-600 text-violet-400 font-semibold hover:bg-gray-700/70">
                    <Video className="w-4 h-4 mr-2" />
                    Ver Replays
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 🟤 5. FERRAMENTAS INTERATIVAS - Redesenhado */}
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h3 className="font-playfair text-2xl font-bold text-slate-800">Ferramentas Interativas</h3>
            <p className="text-slate-600">Recursos práticos para o seu dia a dia</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {interactiveTools.map((tool) => {
              const Icon = tool.icon;
              return (
                <Card key={tool.id} className="border-none shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105 group overflow-hidden">
                  <div className={`bg-gradient-to-br ${tool.gradient} h-full`}>
                    <CardContent className="p-5 text-center space-y-4 h-full flex flex-col justify-between">
                      <div className="space-y-3">
                        <div className="w-12 h-12 bg-white/50 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto shadow-md group-hover:scale-110 transition-transform duration-300">
                          <Icon className={`w-6 h-6 ${tool.accent}`} />
                        </div>
                        <div className="space-y-2">
                          <h5 className="font-playfair text-sm font-bold text-slate-800 leading-tight">
                            {tool.title}
                          </h5>
                          <p className="text-xs text-slate-600 leading-relaxed">
                            {tool.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* 🟤 6. COMUNIDADE - Redesenhado */}
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h3 className="font-playfair text-2xl font-bold text-slate-800">💬 Comunidade</h3>
            <p className="text-slate-600">Compartilhe experiências com outras mães</p>
          </div>
          
          {/* Comentários e relatos */}
          <div className="space-y-4">
            <Card className="bg-gradient-to-br from-emerald-100/50 to-teal-100/50 border-emerald-200/50 shadow-lg">
              <CardContent className="p-5 space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-emerald-300/50 rounded-full flex items-center justify-center text-lg shadow-md">
                    👩
                  </div>
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="text-sm font-bold text-slate-800">Mariana</h4>
                      <span className="text-xs text-slate-500">há 2h</span>
                    </div>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      "Consegui criar uma rotina que funciona! O bebê está dormindo melhor e eu também. 
                      A dica do ambiente escuro fez toda diferença nas sonecas."
                    </p>
                    <div className="flex items-center space-x-4">
                      <button className="flex items-center space-x-1 text-xs text-slate-500 hover:text-emerald-600 transition-colors">
                        <Heart className="w-3 h-3" />
                        <span className="font-medium">12</span>
                      </button>
                      <button className="text-xs text-slate-500 hover:text-emerald-600 transition-colors font-medium">Responder</button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-amber-100/50 to-orange-100/50 border-amber-200/50 shadow-lg">
              <CardContent className="p-5 space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-amber-300/50 rounded-full flex items-center justify-center text-lg shadow-md">
                    👩
                  </div>
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="text-sm font-bold text-slate-800">Luciana</h4>
                      <span className="text-xs text-slate-500">há 5h</span>
                    </div>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      "Dica: comecei a observar os sinais de sono antes de ele ficar muito agitado. 
                      Mudou completamente nossa rotina! 💕"
                    </p>
                    <div className="flex items-center space-x-4">
                      <button className="flex items-center space-x-1 text-xs text-slate-500 hover:text-amber-600 transition-colors">
                        <Heart className="w-3 h-3" />
                        <span className="font-medium">8</span>
                      </button>
                      <button className="text-xs text-slate-500 hover:text-amber-600 transition-colors font-medium">Responder</button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Caixa para novo comentário */}
          <Card className="bg-gradient-to-r from-rose-100/50 to-pink-100/50 border-rose-200/50 shadow-lg">
            <CardContent className="p-5">
              <div className="flex space-x-4">
                <div className="w-12 h-12 bg-rose-300/50 rounded-full flex items-center justify-center text-lg shadow-md">
                  🤱
                </div>
                <div className="flex-1 space-y-4">
                  <textarea 
                    placeholder="Compartilhe sua experiência ou dica com outras mães..."
                    className="w-full p-4 rounded-xl bg-white/70 border border-rose-200/50 text-sm placeholder:text-slate-500 resize-none focus:ring-2 focus:ring-rose-300 focus:border-transparent transition-all"
                    rows={3}
                  />
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-500 font-medium flex items-center space-x-1">
                      <span>💡</span>
                      <span>Suas dicas ajudam outras mães</span>
                    </span>
                    <Button className="bg-rose-500 hover:bg-rose-600 text-white font-semibold shadow-lg">
                      Compartilhar
                    </Button>
                  </div>
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