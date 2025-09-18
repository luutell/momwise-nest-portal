import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookOpen, Play, Heart, Clock, Calendar, PenTool, FileText, Video, MessageCircle, CheckCircle, Bookmark, User, Clock8, Baby, Moon, Sparkles, Wind, TreePine, Sun, CheckSquare, Image as ImageIcon, Users, ChevronRight, Star, Target, Lightbulb, Timer, BarChart3, TrendingUp, Share2, X } from 'lucide-react';
import AudioPlayer from './AudioPlayer';
import MicroddicasDiarias from './MicroddicasDiarias';
import ChecklistSinais from './ChecklistSinais';
import CardsVisuais from './CardsVisuais';
import DiarioEliminacao from './DiarioEliminacao';

import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  category: string;
  image_url?: string;
  audio_url?: string;
  introduction?: string;
  practical_tip?: string;
  published: boolean;
  created_at: string;
  language: string;
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
    gradient: 'from-indigo-500/20 via-purple-400/15 to-blue-500/20',
    accent: 'text-indigo-600'
  },
  {
    id: 'rotina-leve',
    icon: Clock,
    emoji: '⏳',
    title: 'Rotina Leve',
    description: 'Organização com flexibilidade e acolhimento',
    gradient: 'from-emerald-500/20 via-teal-400/15 to-green-500/20',
    accent: 'text-emerald-600'
  },
  {
    id: 'ambiente-sonecas',
    icon: Wind,
    emoji: '🌙',
    title: 'Ambiente e Sonecas',
    description: 'Dicas para tornar os cochilos mais tranquilos',
    gradient: 'from-slate-500/20 via-gray-400/15 to-zinc-500/20',
    accent: 'text-slate-600'
  },
  {
    id: 'saltos-regressoes',
    icon: Sparkles,
    emoji: '🌊',
    title: 'Saltos e Regressões',
    description: 'O que são e como lidar com mais leveza',
    gradient: 'from-cyan-500/20 via-blue-400/15 to-sky-500/20',
    accent: 'text-cyan-600'
  },
  {
    id: 'planejamento-dia',
    icon: Sun,
    emoji: '📋',
    title: 'Planejamento do Dia',
    description: 'Crie uma rotina afetiva com o bebê no centro',
    gradient: 'from-amber-500/20 via-yellow-400/15 to-orange-500/20',
    accent: 'text-amber-600'
  },
  {
    id: 'diario-ritmos',
    icon: BookOpen,
    emoji: '📖',
    title: 'Diário de Ritmos',
    description: 'Registre e reflita sobre o que está funcionando',
    gradient: 'from-rose-500/20 via-pink-400/15 to-red-500/20',
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
  const navigate = useNavigate();
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  
  // Função para extrair e destacar faixas etárias dos títulos
  const parseTitle = (title: string) => {
    // Regex para encontrar faixas etárias como (0-3 meses), (4-6 meses), etc.
    const ageRangeRegex = /\((\d+-\d+\s*(?:meses?|anos?|semanas?))\)/i;
    const match = title.match(ageRangeRegex);
    
    if (match) {
      const ageRange = match[1];
      const titleWithoutAge = title.replace(match[0], '').trim();
      return { titleWithoutAge, ageRange };
    }
    
    return { titleWithoutAge: title, ageRange: null };
  };
  
  // Função para definir cores das badges baseado na faixa etária
  const getAgeRangeColor = (ageRange: string | null) => {
    if (!ageRange) return 'bg-slate-100 text-slate-700';
    
    if (ageRange.includes('0-3')) {
      return 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg border-0';
    } else if (ageRange.includes('4-6')) {
      return 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg border-0';
    } else if (ageRange.includes('7-12')) {
      return 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg border-0';
    } else if (ageRange.includes('1-2') || ageRange.includes('12-24')) {
      return 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg border-0';
    }
    
    return 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg border-0';
  };
  
  // Mapear categoryId para nome da categoria no banco de dados
  const categoryMap: { [key: string]: string } = {
    'sono-do-bebe': 'Sono do Bebê',
    'entendendo-bebe': 'Entendendo o Bebê',
    'primeiras-mordidas': 'Primeiras Mordidas',
    'no-seu-tempo': 'No seu Tempo',
    'amamentacao-e-acolhimento': 'Amamentação e Acolhimento',
    'mae-inteira': 'Mãe Inteira',
    'entre-maes': 'Entre Mães',
    'higiene-natural': 'Higiene Natural'
  };
  
  const categoryName = categoryMap[categoryId] || title;
  
  // Buscar posts da categoria filtrados por idioma baseado na moeda de pagamento
  const { data: posts, isLoading } = useQuery({
    queryKey: ['category-posts', categoryName],
    queryFn: async () => {
      // Primeiro verificar a moeda de pagamento do usuário
      const { data: { user } } = await supabase.auth.getUser();
      let userLanguage = 'pt'; // default para português
      
      if (user?.email) {
        const { data: subscriber } = await supabase
          .from('subscribers')
          .select('payment_currency')
          .eq('email', user.email)
          .single();
        
        // Se paga em USD, mostrar conteúdo em inglês
        if (subscriber?.payment_currency === 'USD') {
          userLanguage = 'en';
        }
      }
      
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('category', categoryName)
        .eq('published', true)
        .eq('language', userLanguage)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Post[];
    },
    enabled: !!categoryName
  });

  const handlePostClick = (postId: string) => {
    navigate(`/app/post/${postId}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-foreground">Carregando...</p>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-50/50 relative overflow-hidden">
      {/* Elementos decorativos de fundo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-32 h-32 bg-emerald-200/20 rounded-full blur-xl"></div>
        <div className="absolute top-40 left-5 w-24 h-24 bg-teal-200/20 rounded-full blur-lg"></div>
        <div className="absolute bottom-32 right-20 w-40 h-40 bg-cyan-200/20 rounded-full blur-2xl"></div>
        <div className="absolute bottom-10 left-10 text-6xl opacity-10">🌿</div>
        <div className="absolute top-32 right-5 text-4xl opacity-10">🍃</div>
        <div className="absolute bottom-40 left-20 text-5xl opacity-10">💫</div>
      </div>

      {/* 🟤 1. TOPO FIXO - Hero Section Renovado */}
      <div className="relative z-10">
        <div className="bg-gradient-to-br from-emerald-400/20 via-teal-300/15 to-cyan-400/20 backdrop-blur-sm border-b border-emerald-100/50 shadow-sm">
          <div className="p-6 pb-8">
            <div className="flex items-center mb-6">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={onBack}
                className="hover:bg-emerald-100 text-emerald-700 mr-3"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div className="flex items-center space-x-3">
                <div className="text-4xl">⏳</div>
                <div>
                  <h1 className="font-playfair text-2xl font-bold text-slate-800">{title}</h1>
                  <p className="text-emerald-600 font-semibold text-sm">{description}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/40 backdrop-blur-sm rounded-xl p-4 shadow-lg">
              <p className="text-slate-700 text-sm leading-relaxed text-center">
                {posts?.length || 0} {posts?.length === 1 ? 'artigo encontrado' : 'artigos encontrados'} nesta categoria
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 p-4 space-y-8">
        {/* Separar microdicas dos artigos para Higiene Natural */}
        {categoryId === 'higiene-natural' ? (
          <>
            {/* Seção de Microdicas com navegação de 3 dias */}
            <MicroddicasDiarias posts={posts?.filter(post => post.title.includes('Microdica')) || []} />
            
            {/* Artigos principais (não microdicas) */}
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <h2 className="font-playfair text-2xl font-bold text-slate-800">Artigos Pilar</h2>
                <p className="text-slate-600">Guias completos por faixa etária</p>
              </div>
              
              {posts?.filter(post => !post.title.includes('Microdica')).length === 0 ? (
                <Card className="border-none shadow-lg">
                  <CardContent className="p-8 text-center">
                    <BookOpen className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="font-medium text-foreground mb-2">
                      Nenhum artigo encontrado
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Ainda não temos conteúdo publicado nesta categoria
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {posts?.filter(post => !post.title.includes('Microdica')).map((post) => {
                    // Verificar se é o artigo "Introdução à Higiene Natural"
                    const isIntroductionArticle = post.title.includes('Introdução à Higiene Natural') || post.id === '9a1ffb18-1bbb-4d5b-b24e-87e060c72a51';
                    
                    if (isIntroductionArticle) {
                      return (
                        <Card 
                          key={post.id} 
                          className="relative border-4 border-gradient-to-r from-terracotta to-sage shadow-2xl hover:shadow-3xl transition-all duration-500 cursor-pointer hover:scale-[1.04] overflow-hidden group bg-gradient-to-br from-white via-cream/40 to-sage/10"
                          onClick={() => handlePostClick(post.id)}
                        >
                          {/* Badge de destaque */}
                          <div className="absolute top-4 right-4 z-20">
                            <div className="bg-gradient-to-r from-terracotta to-terracotta/80 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg flex items-center space-x-2">
                              <Star className="w-4 h-4 fill-white" />
                              <span>ARTIGO ESSENCIAL</span>
                            </div>
                          </div>
                          
                          {/* Borda decorativa animada */}
                          <div className="absolute inset-0 bg-gradient-to-r from-terracotta/20 via-transparent to-sage/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                          
                          <CardContent className="p-8">
                            <div className="space-y-4">
                              <div className="text-center mb-4">
                                <div className="text-3xl mb-2">🌱</div>
                                <span className="bg-terracotta/10 text-terracotta font-semibold px-3 py-1 rounded-full text-sm">
                                  COMECE AQUI
                                </span>
                              </div>
                              
                              <div className="text-center space-y-3">
                                <h3 className="font-playfair text-2xl font-bold text-gray-800 leading-tight">
                                  {post.title}
                                </h3>
                                
                                <p className="text-gray-600 text-base leading-relaxed px-2">
                                  {post.introduction || post.content.substring(0, 180) + '...'}
                                </p>
                                
                                <div className="flex justify-center items-center space-x-4 text-sm text-gray-500 mt-4">
                                  <span className="flex items-center space-x-1">
                                    <User className="w-4 h-4" />
                                    <span>{post.author}</span>
                                  </span>
                                  <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                                  <span className="flex items-center space-x-1">
                                    <Clock className="w-4 h-4" />
                                    <span>{Math.ceil(post.content.length / 200)} min</span>
                                  </span>
                                  {post.audio_url && (
                                    <>
                                      <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                                      <span className="flex items-center space-x-1 text-terracotta">
                                        <Play className="w-4 h-4" />
                                        <span>Áudio</span>
                                      </span>
                                    </>
                                  )}
                                </div>
                              </div>
                              
                              <div className="text-center mt-6">
                                <Button 
                                  className="bg-gradient-to-r from-terracotta to-terracotta/90 hover:from-terracotta/90 hover:to-terracotta text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                                >
                                  Começar jornada
                                  <ChevronRight className="w-4 h-4 ml-2" />
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    }
                    
                    // Renderização normal para outros artigos
                    return (
                      <Card 
                        key={post.id} 
                        className="border-none shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-[1.02] overflow-hidden group"
                        onClick={() => handlePostClick(post.id)}
                      >
                        <CardContent className="p-6">
                          <div className="flex space-x-4">
                            {post.image_url && (
                              <img 
                                src={post.image_url} 
                                alt={post.title}
                                className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                              />
                            )}
                            <div className="flex-1 space-y-2">
                              {(() => {
                                const { titleWithoutAge, ageRange } = parseTitle(post.title);
                                return (
                                  <div className="space-y-2">
                                    <div className="flex flex-wrap items-start gap-2">
                                      <h3 className="font-playfair text-lg font-bold text-slate-800 line-clamp-2 flex-1 min-w-0">
                                        {titleWithoutAge}
                                      </h3>
                                      {ageRange && (
                                        <Badge 
                                          className={`text-xs font-bold px-3 py-1 flex-shrink-0 ${getAgeRangeColor(ageRange)}`}
                                        >
                                          {ageRange}
                                        </Badge>
                                      )}
                                    </div>
                                  </div>
                                );
                              })()}
                              <p className="text-sm text-slate-600 line-clamp-2">
                                {post.introduction || post.content.substring(0, 150) + '...'}
                              </p>
                              <div className="flex items-center justify-between">
                                <span className="text-xs text-slate-500">
                                  Por {post.author}
                                </span>
                                <div className="flex items-center space-x-2">
                                  {post.audio_url && (
                                    <div className="flex items-center space-x-1">
                                      <Play className="w-3 h-3 text-primary" />
                                      <span className="text-xs text-primary">Áudio</span>
                                    </div>
                                  )}
                                  <Clock className="w-3 h-3 text-slate-500" />
                                  <span className="text-xs text-slate-500">
                                    {Math.ceil(post.content.length / 200)} min
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              )}
            </div>
          </>
        ) : (
          /* Layout original para outras categorias */
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="font-playfair text-2xl font-bold text-slate-800">Artigos</h2>
              <p className="text-slate-600">Conteúdos selecionados para você</p>
            </div>
            
            {posts?.length === 0 ? (
              <Card className="border-none shadow-lg">
                <CardContent className="p-8 text-center">
                  <BookOpen className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="font-medium text-foreground mb-2">
                    Nenhum artigo encontrado
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Ainda não temos conteúdo publicado nesta categoria
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {posts?.map((post) => (
                  <Card 
                    key={post.id} 
                    className="border-none shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-[1.02] overflow-hidden group"
                    onClick={() => handlePostClick(post.id)}
                  >
                    <CardContent className="p-6">
                      <div className="flex space-x-4">
                        {post.image_url && (
                          <img 
                            src={post.image_url} 
                            alt={post.title}
                            className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                          />
                        )}
                        <div className="flex-1 space-y-2">
                          {(() => {
                            const { titleWithoutAge, ageRange } = parseTitle(post.title);
                            return (
                              <div className="space-y-2">
                                <div className="flex flex-wrap items-start gap-2">
                                  <h3 className="font-playfair text-lg font-bold text-slate-800 line-clamp-2 flex-1 min-w-0">
                                    {titleWithoutAge}
                                  </h3>
                                  {ageRange && (
                                    <Badge 
                                      className={`text-xs font-bold px-3 py-1 flex-shrink-0 ${getAgeRangeColor(ageRange)}`}
                                    >
                                      {ageRange}
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            );
                          })()}
                          <p className="text-sm text-slate-600 line-clamp-2">
                            {post.introduction || post.content.substring(0, 150) + '...'}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-slate-500">
                              Por {post.author}
                            </span>
                            <div className="flex items-center space-x-2">
                              {post.audio_url && (
                                <div className="flex items-center space-x-1">
                                  <Play className="w-3 h-3 text-primary" />
                                  <span className="text-xs text-primary">Áudio</span>
                                </div>
                              )}
                              <Clock className="w-3 h-3 text-slate-500" />
                              <span className="text-xs text-slate-500">
                                {Math.ceil(post.content.length / 200)} min
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 🟤 4. ESPECIALISTA DA SEMANA - Específico para Higiene Natural */}
        {categoryId === 'higiene-natural' ? (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h3 className="font-playfair text-2xl font-bold text-slate-800">Especialista da Semana</h3>
              <p className="text-slate-600">Consultora especializada em Higiene Natural</p>
            </div>
            
            <Card className="bg-gradient-to-br from-emerald-400/20 via-teal-300/15 to-cyan-400/20 border-none shadow-xl overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-200/30 rounded-full blur-2xl"></div>
              <CardContent className="relative p-6 space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center text-3xl flex-shrink-0 shadow-lg">
                    💚
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-playfair text-xl font-bold text-slate-800">Dra. Marina Santos</h4>
                    <p className="text-emerald-700 font-semibold">Consultora em Higiene Natural</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-white/40 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Video className="w-5 h-5 text-emerald-600" />
                      <span className="text-sm font-bold text-slate-800">Vídeo: Primeiros Sinais</span>
                    </div>
                    <p className="text-sm text-slate-700">
                      "Como reconhecer e responder aos sinais do seu bebê com amor e flexibilidade"
                    </p>
                  </div>

                  <div className="bg-white/30 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                    <div className="flex items-center space-x-2 text-sm text-emerald-600 font-semibold">
                      <Calendar className="w-4 h-4" />
                      <span>Próxima live: Quinta, 21/11 às 14h</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-3">
                    <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-lg">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Fazer Pergunta
                    </Button>
                    <Button variant="outline" className="flex-1 bg-white/40 border-emerald-200 text-emerald-700 font-semibold hover:bg-white/60">
                      <Video className="w-4 h-4 mr-2" />
                      Ver Replays
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h3 className="font-playfair text-2xl font-bold text-slate-800">Especialista da Semana</h3>
              <p className="text-slate-600">Converse ao vivo com nossa especialista</p>
            </div>
            
            <Card className="bg-gradient-to-br from-violet-400/20 via-purple-300/15 to-indigo-400/20 border-none shadow-xl overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-violet-200/30 rounded-full blur-2xl"></div>
              <CardContent className="relative p-6 space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center text-3xl flex-shrink-0 shadow-lg">
                    👩‍⚕️
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-playfair text-xl font-bold text-slate-800">Dra. Ana Silva</h4>
                    <p className="text-violet-700 font-semibold">Especialista em Sono Infantil</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-white/40 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Video className="w-5 h-5 text-violet-600" />
                      <span className="text-sm font-bold text-slate-800">Vídeo introdutório</span>
                    </div>
                    <p className="text-sm text-slate-700">
                      "Como criar uma rotina flexível que funciona para toda família"
                    </p>
                  </div>

                  <div className="bg-white/30 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                    <div className="flex items-center space-x-2 text-sm text-violet-600 font-semibold">
                      <Calendar className="w-4 h-4" />
                      <span>Próxima live: Sexta, 19/07 às 10h</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-3">
                    <Button className="flex-1 bg-violet-600 hover:bg-violet-700 text-white font-semibold shadow-lg">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Enviar Pergunta
                    </Button>
                    <Button variant="outline" className="flex-1 bg-white/40 border-violet-200 text-violet-700 font-semibold hover:bg-white/60">
                      <Video className="w-4 h-4 mr-2" />
                      Ver Replays
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* 🟤 5. FERRAMENTAS INTERATIVAS - Específico para Higiene Natural */}
        {categoryId === 'higiene-natural' ? (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h3 className="font-playfair text-2xl font-bold text-slate-800">Ferramentas Interativas</h3>
              <p className="text-slate-600">Recursos práticos para higiene natural</p>
            </div>
            
            {selectedTool ? (
              /* Layout quando uma ferramenta está selecionada */
              <div className="space-y-6">
                {/* Header da ferramenta selecionada */}
                <Card className="bg-gradient-to-r from-emerald-100 to-teal-100 border-emerald-200 shadow-lg">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-white/50 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-md">
                          {selectedTool === 'checklist-sinais' && <CheckSquare className="w-8 h-8 text-emerald-600" />}
                          {selectedTool === 'diario-eliminacao' && <Calendar className="w-8 h-8 text-cyan-600" />}
                          {selectedTool === 'videos-praticos' && <Play className="w-8 h-8 text-purple-600" />}
                          {selectedTool === 'cards-visuais' && <ImageIcon className="w-8 h-8 text-orange-600" />}
                        </div>
                        <div>
                          <h4 className="font-playfair text-lg font-bold text-slate-800">
                            {selectedTool === 'checklist-sinais' && 'Checklist de Sinais'}
                            {selectedTool === 'diario-eliminacao' && 'Diário de Eliminação'}
                            {selectedTool === 'videos-praticos' && 'Vídeos Práticos'}
                            {selectedTool === 'cards-visuais' && 'Cards Visuais'}
                          </h4>
                          <p className="text-sm text-slate-600">
                            {selectedTool === 'checklist-sinais' && 'Registre e acompanhe padrões'}
                            {selectedTool === 'diario-eliminacao' && 'Identifique horários e rotinas'}
                            {selectedTool === 'videos-praticos' && 'Técnicas demonstradas'}
                            {selectedTool === 'cards-visuais' && 'Guias visuais por idade'}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSelectedTool(null)}
                        className="text-slate-500 hover:text-slate-700"
                      >
                        <X className="w-5 h-5" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Outras ferramentas minimizadas */}
                <div className="flex justify-center">
                  <div className="flex space-x-3 max-w-sm">
                    {/* Checklist de Sinais */}
                    {selectedTool !== 'checklist-sinais' && (
                      <Card 
                        className="w-20 border-none shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-105 group"
                        onClick={() => setSelectedTool('checklist-sinais')}
                      >
                        <div className="bg-gradient-to-br from-emerald-500/20 via-teal-400/15 to-green-500/20 h-full">
                          <CardContent className="p-3 text-center">
                            <div className="w-8 h-8 bg-white/50 backdrop-blur-sm rounded-lg flex items-center justify-center mx-auto mb-2 shadow-sm group-hover:scale-110 transition-transform duration-300">
                              <CheckSquare className="w-4 h-4 text-emerald-600" />
                            </div>
                            <p className="text-xs font-semibold text-slate-800 leading-tight">Checklist</p>
                          </CardContent>
                        </div>
                      </Card>
                    )}

                    {/* Diário de Eliminação */}
                    {selectedTool !== 'diario-eliminacao' && (
                      <Card 
                        className="w-20 border-none shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-105 group"
                        onClick={() => setSelectedTool('diario-eliminacao')}
                      >
                        <div className="bg-gradient-to-br from-cyan-500/20 via-blue-400/15 to-teal-500/20 h-full">
                          <CardContent className="p-3 text-center">
                            <div className="w-8 h-8 bg-white/50 backdrop-blur-sm rounded-lg flex items-center justify-center mx-auto mb-2 shadow-sm group-hover:scale-110 transition-transform duration-300">
                              <Calendar className="w-4 h-4 text-cyan-600" />
                            </div>
                            <p className="text-xs font-semibold text-slate-800 leading-tight">Diário</p>
                          </CardContent>
                        </div>
                      </Card>
                    )}

                    {/* Vídeos Práticos */}
                    {selectedTool !== 'videos-praticos' && (
                      <Card 
                        className="w-20 border-none shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-105 group"
                        onClick={() => setSelectedTool('videos-praticos')}
                      >
                        <div className="bg-gradient-to-br from-purple-500/20 via-violet-400/15 to-indigo-500/20 h-full">
                          <CardContent className="p-3 text-center">
                            <div className="w-8 h-8 bg-white/50 backdrop-blur-sm rounded-lg flex items-center justify-center mx-auto mb-2 shadow-sm group-hover:scale-110 transition-transform duration-300">
                              <Play className="w-4 h-4 text-purple-600" />
                            </div>
                            <p className="text-xs font-semibold text-slate-800 leading-tight">Vídeos</p>
                          </CardContent>
                        </div>
                      </Card>
                    )}

                    {/* Cards Visuais */}
                    {selectedTool !== 'cards-visuais' && (
                      <Card 
                        className="w-20 border-none shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-105 group"
                        onClick={() => setSelectedTool('cards-visuais')}
                      >
                        <div className="bg-gradient-to-br from-orange-500/20 via-amber-400/15 to-yellow-500/20 h-full">
                          <CardContent className="p-3 text-center">
                            <div className="w-8 h-8 bg-white/50 backdrop-blur-sm rounded-lg flex items-center justify-center mx-auto mb-2 shadow-sm group-hover:scale-110 transition-transform duration-300">
                              <ImageIcon className="w-4 h-4 text-orange-600" />
                            </div>
                            <p className="text-xs font-semibold text-slate-800 leading-tight">Cards</p>
                          </CardContent>
                        </div>
                      </Card>
                    )}
                  </div>
                </div>

                {/* Conteúdo da ferramenta selecionada */}
                <div>
                  {selectedTool === 'checklist-sinais' && <ChecklistSinais />}
                  {selectedTool === 'diario-eliminacao' && <DiarioEliminacao />}
                  
                  {selectedTool === 'videos-praticos' && (
                    <Card className="bg-purple-50 border-purple-200">
                      <CardContent className="p-6 text-center">
                        <Play className="w-12 h-12 mx-auto text-purple-600 mb-4" />
                        <h3 className="font-playfair text-lg font-bold text-slate-800 mb-2">Vídeos Práticos</h3>
                        <p className="text-slate-600">Em breve! Vídeos demonstrativos estão sendo preparados.</p>
                      </CardContent>
                    </Card>
                  )}
                  {selectedTool === 'cards-visuais' && <CardsVisuais />}
                </div>
              </div>
            ) : (
              /* Layout padrão das ferramentas */
              <div className="grid grid-cols-2 gap-4">
                {/* Checklist de Sinais */}
                <Card 
                  className="border-none shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105 group overflow-hidden"
                  onClick={() => setSelectedTool('checklist-sinais')}
                >
                  <div className="bg-gradient-to-br from-emerald-500/20 via-teal-400/15 to-green-500/20 h-full">
                    <CardContent className="p-5 text-center space-y-4 h-full flex flex-col justify-between">
                      <div className="space-y-3">
                        <div className="w-12 h-12 bg-white/50 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto shadow-md group-hover:scale-110 transition-transform duration-300">
                          <CheckSquare className="w-6 h-6 text-emerald-600" />
                        </div>
                        <div className="space-y-2">
                          <h5 className="font-playfair text-sm font-bold text-slate-800 leading-tight">
                            Checklist de Sinais
                          </h5>
                          <p className="text-xs text-slate-600 leading-relaxed">
                            Quais sinais você percebeu hoje? Registre e acompanhe padrões
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </div>
                </Card>

                {/* Diário de Eliminação */}
                <Card 
                  className="border-none shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105 group overflow-hidden"
                  onClick={() => setSelectedTool('diario-eliminacao')}
                >
                  <div className="bg-gradient-to-br from-cyan-500/20 via-blue-400/15 to-teal-500/20 h-full">
                    <CardContent className="p-5 text-center space-y-4 h-full flex flex-col justify-between">
                      <div className="space-y-3">
                        <div className="w-12 h-12 bg-white/50 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto shadow-md group-hover:scale-110 transition-transform duration-300">
                          <Calendar className="w-6 h-6 text-cyan-600" />
                        </div>
                        <div className="space-y-2">
                          <h5 className="font-playfair text-sm font-bold text-slate-800 leading-tight">
                            Diário de Eliminação
                          </h5>
                          <p className="text-xs text-slate-600 leading-relaxed">
                            Registre horários e padrões para identificar rotinas
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </div>
                </Card>

                {/* Vídeos Práticos */}
                <Card 
                  className="border-none shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105 group overflow-hidden"
                  onClick={() => setSelectedTool('videos-praticos')}
                >
                  <div className="bg-gradient-to-br from-purple-500/20 via-violet-400/15 to-indigo-500/20 h-full">
                    <CardContent className="p-5 text-center space-y-4 h-full flex flex-col justify-between">
                      <div className="space-y-3">
                        <div className="w-12 h-12 bg-white/50 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto shadow-md group-hover:scale-110 transition-transform duration-300">
                          <Play className="w-6 h-6 text-purple-600" />
                        </div>
                        <div className="space-y-2">
                          <h5 className="font-playfair text-sm font-bold text-slate-800 leading-tight">
                            Vídeos Práticos
                          </h5>
                          <p className="text-xs text-slate-600 leading-relaxed">
                            Demonstrações de posições e técnicas suaves
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </div>
                </Card>

                {/* Cards Visuais */}
                <Card 
                  className="border-none shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105 group overflow-hidden"
                  onClick={() => setSelectedTool('cards-visuais')}
                >
                  <div className="bg-gradient-to-br from-orange-500/20 via-amber-400/15 to-yellow-500/20 h-full">
                    <CardContent className="p-5 text-center space-y-4 h-full flex flex-col justify-between">
                      <div className="space-y-3">
                        <div className="w-12 h-12 bg-white/50 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto shadow-md group-hover:scale-110 transition-transform duration-300">
                          <ImageIcon className="w-6 h-6 text-orange-600" />
                        </div>
                        <div className="space-y-2">
                          <h5 className="font-playfair text-sm font-bold text-slate-800 leading-tight">
                            Cards Visuais
                          </h5>
                          <p className="text-xs text-slate-600 leading-relaxed">
                            Infográficos sobre sinais por faixa etária
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              </div>
            )}
            
            {/* Seção de EC Parcial vs Full-time */}
            <Card className="bg-gradient-to-br from-emerald-100/50 to-teal-100/50 border-emerald-200/50 shadow-lg">
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <h4 className="font-playfair text-lg font-bold text-slate-800">💚 EC Parcial vs Full-time</h4>
                  <p className="text-sm text-slate-600">Escolha o que funciona para sua família - sem julgamentos</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/60 p-4 rounded-lg">
                    <h5 className="font-semibold text-emerald-700 mb-2">EC Parcial</h5>
                    <ul className="text-xs text-slate-600 space-y-1">
                      <li>• Apenas em casa</li>
                      <li>• Horários específicos</li>
                      <li>• Combine com fraldas</li>
                      <li>• Sem pressão</li>
                    </ul>
                  </div>
                  <div className="bg-white/60 p-4 rounded-lg">
                    <h5 className="font-semibold text-teal-700 mb-2">EC Full-time</h5>
                    <ul className="text-xs text-slate-600 space-y-1">
                      <li>• Todos os momentos</li>
                      <li>• Saídas também</li>
                      <li>• Maior dedicação</li>
                      <li>• Flexível sempre</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
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
        )}

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