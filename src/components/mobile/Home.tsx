import { useState } from 'react';
import { Calendar, Play, BookOpen, Headphones, RotateCcw, Baby, Utensils, Clock, Heart, Users, Phone } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import CategoryDetail from './CategoryDetail';
import Breastfeeding from './Breastfeeding';

interface WeeklyContent {
  day: string;
  date: number;
  content: {
    type: 'video' | 'article' | 'audio';
    title: string;
    duration?: string;
    completed?: boolean;
  };
}

const weeklyContents: WeeklyContent[] = [
  {
    day: 'SEG',
    date: 14,
    content: {
      type: 'video',
      title: 'Primeiros sinais de fome',
      duration: '3 min',
      completed: true
    }
  },
  {
    day: 'TER',
    date: 15,
    content: {
      type: 'article',
      title: 'Cólicas do bebê: como aliviar',
      duration: '5 min',
      completed: true
    }
  },
  {
    day: 'QUA',
    date: 16,
    content: {
      type: 'audio',
      title: 'Meditação para mães',
      duration: '10 min',
      completed: false
    }
  },
  {
    day: 'QUI',
    date: 17,
    content: {
      type: 'video',
      title: 'Massagem relaxante no bebê',
      duration: '4 min',
      completed: false
    }
  },
  {
    day: 'SEX',
    date: 18,
    content: {
      type: 'article',
      title: 'Desenvolvimento motor: 3 semanas',
      duration: '6 min',
      completed: false
    }
  },
  {
    day: 'SAB',
    date: 19,
    content: {
      type: 'audio',
      title: 'Sons da natureza para dormir',
      duration: '15 min',
      completed: false
    }
  },
  {
    day: 'DOM',
    date: 20,
    content: {
      type: 'video',
      title: 'Tempo de qualidade em família',
      duration: '5 min',
      completed: false
    }
  }
];

const getContentIcon = (type: string) => {
  switch (type) {
    case 'video':
      return Play;
    case 'article':
      return BookOpen;
    case 'audio':
      return Headphones;
    default:
      return BookOpen;
  }
};

const getContentColor = (type: string) => {
  switch (type) {
    case 'video':
      return 'text-primary bg-primary/20';
    case 'article':
      return 'text-sage bg-sage/20';
    case 'audio':
      return 'text-terracotta bg-terracotta/20';
    default:
      return 'text-sage bg-sage/20';
  }
};

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  
  const today = new Date();
  const currentDay = today.getDate();
  
  // Mock user data - in real app this would come from user profile
  const userName = "Luiza";
  const postPartumDay = 23;

  // Seções fixas do app
  const sections = [
    {
      id: 'ritmo-leve',
      title: 'Ritmo Leve',
      emoji: '🔄',
      icon: RotateCcw,
      description: 'Rotina, sono, regressões',
      color: 'bg-sage/20 hover:bg-sage/30 text-sage'
    },
    {
      id: 'entendendo-bebe',
      title: 'Entendendo o Bebê',
      emoji: '🧠',
      icon: Baby,
      description: 'Choro, marcos, mitos',
      color: 'bg-primary/20 hover:bg-primary/30 text-primary'
    },
    {
      id: 'primeiras-mordidas',
      title: 'Primeiras Mordidas',
      emoji: '🍽',
      icon: Utensils,
      description: 'Alimentação',
      color: 'bg-terracotta/20 hover:bg-terracotta/30 text-terracotta'
    },
    {
      id: 'no-seu-tempo',
      title: 'No seu Tempo',
      emoji: '💪',
      icon: Clock,
      description: 'Atividades de estímulo',
      color: 'bg-secondary/20 hover:bg-secondary/30 text-secondary'
    },
    {
      id: 'amamentacao',
      title: 'Amamentação',
      emoji: '🍼',
      icon: Heart,
      description: 'Registro, dicas e comunidade',
      color: 'bg-primary/20 hover:bg-primary/30 text-primary'
    },
    {
      id: 'mae-inteira',
      title: 'Mãe Inteira',
      emoji: '🛀',
      icon: Heart,
      description: 'Autocuidado, saúde emocional',
      color: 'bg-terracotta/20 hover:bg-terracotta/30 text-terracotta'
    },
    {
      id: 'entre-maes',
      title: 'Entre Mães',
      emoji: '🤝',
      icon: Users,
      description: 'Comunidade e trocas reais',
      color: 'bg-sage/20 hover:bg-sage/30 text-sage'
    }
  ];

  // Se uma categoria está selecionada, mostra o componente apropriado
  if (selectedCategory) {
    const category = sections.find(s => s.id === selectedCategory);
    
    // Componente especial para Amamentação
    if (selectedCategory === 'amamentacao') {
      return (
        <Breastfeeding onBack={() => setSelectedCategory(null)} />
      );
    }
    
    // Outros componentes usam CategoryDetail
    return (
      <CategoryDetail
        categoryId={selectedCategory}
        title={category?.title || ''}
        description={category?.description || ''}
        onBack={() => setSelectedCategory(null)}
      />
    );
  }
  
  const formatDate = (date: Date) => {
    const days = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'];
    const months = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
    
    const dayName = days[date.getDay()];
    const day = date.getDate();
    const month = months[date.getMonth()];
    
    return `Hoje é ${dayName}, ${day} de ${month}`;
  };


  return (
    <div className="pb-6">
      <div className="p-4 space-y-6">

        {/* Calendário Semanal */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-primary" />
            <h2 className="font-playfair text-lg font-medium text-foreground">
              Sua Semana
            </h2>
          </div>
          
          <p className="text-muted-foreground text-sm">
            Cada dia traz um novo conteúdo personalizado para sua fase
          </p>

          {/* Grid do calendário */}
          <div className="grid grid-cols-7 gap-2">
            {weeklyContents.map((item, index) => {
              const Icon = getContentIcon(item.content.type);
              const isToday = item.date === currentDay;
              const isPast = item.date < currentDay;
              const isSelected = selectedDay === item.date;
              const colorClasses = getContentColor(item.content.type);
              
              return (
                <div key={index} className="space-y-2">
                  {/* Dia da semana */}
                  <div className="text-center">
                    <p className="text-xs font-medium text-muted-foreground">
                      {item.day}
                    </p>
                    <p className={`text-sm font-semibold ${isToday ? 'text-primary' : 'text-foreground'}`}>
                      {item.date}
                    </p>
                  </div>
                  
                  {/* Card do conteúdo - apenas ícone */}
                  <Card 
                    onClick={() => setSelectedDay(isSelected ? null : item.date)}
                    className={`
                      ${isToday ? 'ring-2 ring-primary' : ''} 
                      ${isSelected ? 'ring-2 ring-primary bg-primary/10' : 'bg-background'} 
                      ${isPast && item.content.completed ? 'bg-muted/30' : ''} 
                      border-none shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer h-16
                    `}
                  >
                    <CardContent className="p-2 flex flex-col items-center justify-center h-full">
                      {/* Ícone do tipo de conteúdo com maior contraste */}
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${colorClasses.replace('/20', '/40')}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      
                      {/* Status de conclusão */}
                      {item.content.completed && (
                        <div className="w-2 h-2 bg-primary rounded-full mt-1"></div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>

          {/* Card expandido quando um dia é selecionado */}
          {selectedDay && (
            <Card className="bg-gradient-to-br from-primary/10 via-background to-sage/5 border-none shadow-lg animate-fade-in">
              <CardContent className="p-6 space-y-4">
                {(() => {
                  const selectedContent = weeklyContents.find(item => item.date === selectedDay);
                  if (!selectedContent) return null;
                  
                  const Icon = getContentIcon(selectedContent.content.type);
                  const colorClasses = getContentColor(selectedContent.content.type);
                  
                  return (
                    <div className="flex items-start space-x-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${colorClasses.replace('/20', '/30')}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="space-y-2 flex-1">
                        <h4 className="font-playfair font-medium text-foreground">
                          {selectedContent.content.title}
                        </h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          Conteúdo especialmente selecionado para o dia {selectedContent.date} da sua jornada.
                        </p>
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <span>{selectedContent.content.duration}</span>
                          <span>•</span>
                          <span className="capitalize">{selectedContent.content.type}</span>
                          {selectedContent.content.completed && (
                            <>
                              <span>•</span>
                              <span className="text-primary">✓ Concluído</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Conteúdo em destaque do dia */}
        <div className="space-y-4">
          <h3 className="font-playfair text-lg font-medium text-foreground">
            Destaque de Hoje
          </h3>
          
          <Card className="bg-gradient-to-br from-primary/10 via-background to-sage/5 border-none shadow-soft">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Play className="w-6 h-6 text-primary" />
                </div>
                <div className="space-y-2">
                  <h4 className="font-playfair font-medium text-foreground">
                    Massagem relaxante no bebê
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Aprenda técnicas suaves de massagem que ajudam a acalmar seu bebê 
                    e fortalecer o vínculo entre vocês.
                  </p>
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <span>4 minutos</span>
                    <span>•</span>
                    <span>Vídeo</span>
                    <span>•</span>
                    <span>Com especialista</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Chamada para Especialista */}
        <div className="space-y-4">
          <Card className="bg-gradient-to-r from-terracotta/20 to-primary/20 border-none shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-terracotta/30 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-terracotta" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-playfair font-semibold text-foreground">
                    📞 Tire dúvidas ao vivo com especialista
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Nesta sexta às 10h! Clique para participar
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Seções fixas - scroll horizontal */}
      <div className="space-y-4">
        <div className="px-4">
          <h3 className="font-playfair text-lg font-medium text-foreground">
            Explore por Temas
          </h3>
          <p className="text-sm text-muted-foreground">
            Navegue pelos conteúdos organizados para sua jornada
          </p>
        </div>
        
        <div className="flex overflow-x-auto gap-4 px-4 pb-2">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <Card 
                key={section.id}
                onClick={() => setSelectedCategory(section.id)}
                className={`${section.color.split(' ')[0]} border-none shadow-soft hover:shadow-md transition-all duration-200 cursor-pointer flex-shrink-0 w-40`}
              >
                <CardContent className="p-4 text-center space-y-3">
                  <div className="text-2xl">{section.emoji}</div>
                  <div className="space-y-1">
                    <h4 className="font-playfair font-medium text-sm text-foreground">
                      {section.title}
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {section.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;