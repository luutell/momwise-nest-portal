import { Calendar, Play, BookOpen, Headphones } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

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
  const today = new Date();
  const currentDay = today.getDate();
  
  // Mock user data - in real app this would come from user profile
  const userName = "Luiza";
  const postPartumDay = 23;
  
  const formatDate = (date: Date) => {
    const days = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'];
    const months = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
    
    const dayName = days[date.getDay()];
    const day = date.getDate();
    const month = months[date.getMonth()];
    
    return `Hoje é ${dayName}, ${day} de ${month}`;
  };

  return (
    <div className="p-4 space-y-6">
      {/* Header personalizado */}
      <div className="space-y-2">
        <h1 className="font-playfair text-2xl font-semibold text-foreground">
          Olá, {userName} 👋
        </h1>
        <p className="text-muted-foreground text-sm">
          {formatDate(today)}
        </p>
        <p className="text-primary text-sm font-medium">
          Você está no dia {postPartumDay} pós-parto
        </p>
      </div>

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
                
                {/* Card do conteúdo */}
                <Card 
                  className={`
                    ${isToday ? 'ring-2 ring-primary bg-primary/5' : ''} 
                    ${isPast && item.content.completed ? 'bg-muted/50' : ''} 
                    border-none shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer
                  `}
                >
                  <CardContent className="p-3 text-center space-y-2">
                    {/* Ícone do tipo de conteúdo */}
                    <div className="flex justify-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${colorClasses}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>
                    
                    {/* Título */}
                    <h3 className="text-xs font-medium text-foreground leading-tight">
                      {item.content.title}
                    </h3>
                    
                    {/* Duração */}
                    <p className="text-xs text-muted-foreground">
                      {item.content.duration}
                    </p>
                    
                    {/* Status de conclusão */}
                    {item.content.completed && (
                      <div className="w-2 h-2 bg-primary rounded-full mx-auto"></div>
                    )}
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
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
    </div>
  );
};

export default Home;