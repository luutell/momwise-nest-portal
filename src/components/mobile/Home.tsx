import { useState, useEffect } from 'react';
import { Calendar, Play, BookOpen, Headphones, RotateCcw, Baby, Utensils, Clock, Heart, Users, Phone } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import CategoryDetail from './CategoryDetail';
import Breastfeeding from './Breastfeeding';
import DayContent from './DayContent';
import { usePersonalizedCalendar } from '@/hooks/usePersonalizedCalendar';
import { useProfile } from '@/hooks/useProfile';
import { useLanguage } from '@/contexts/LanguageContext';
import { ProfileData } from '@/hooks/useProfile';

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
  const [selectedDayContent, setSelectedDayContent] = useState<any | null>(null);
  const { profile: supabaseProfile } = useProfile();
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const { t } = useLanguage();
  
  useEffect(() => {
    console.log('🔍 useEffect Home - supabaseProfile:', supabaseProfile);
    
    // First try to get from Supabase
    if (supabaseProfile) {
      console.log('✅ Using Supabase profile data');
      setProfileData(supabaseProfile);
      return;
    }

    // Fallback to localStorage
    const profileData = localStorage.getItem('profile_data');
    const onboardingData = localStorage.getItem('onboarding_data');
    
    console.log('🔍 localStorage profile_data:', profileData);
    console.log('🔍 localStorage onboarding_data:', onboardingData);
    
    const savedProfile = profileData || onboardingData;
    if (savedProfile) {
      try {
        const parsed = JSON.parse(savedProfile);
        console.log('✅ Using localStorage profile data:', parsed);
        setProfileData(parsed);
      } catch (error) {
        console.error('❌ Error parsing profile data:', error);
      }
    } else {
      console.log('❌ No profile data found in localStorage');
    }
  }, [supabaseProfile]);

  // Get baby birth date for personalized calendar
  const getBabyBirthDate = (): Date | null => {
    if (profileData?.baby_birth_date) {
      return new Date(profileData.baby_birth_date);
    }
    return null;
  };

  const babyBirthDate = getBabyBirthDate();
  const { weeklyContent, loading, fetchWeekContent } = usePersonalizedCalendar(babyBirthDate);
  
  const today = new Date();
  const currentDay = today.getDate();
  
  // Use personalized data from onboarding
  const userName = profileData?.name || "Mama";
  const babyName = profileData?.baby_name || "seu bebê";
  
  console.log('🔍 userName:', userName);
  console.log('🔍 babyName:', babyName);
  console.log('🔍 profileData:', profileData);
  
  // Calculate baby age in days
  const calculateBabyAge = (): number => {
    if (!babyBirthDate) return 0;
    const diffTime = Math.abs(today.getTime() - babyBirthDate.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };
  
  const babyAge = calculateBabyAge();
  
  // Generate current week dates
  const getCurrentWeekDates = (): Date[] => {
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay()); // Start on Sunday
    
    const weekDates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      weekDates.push(date);
    }
    return weekDates;
  };
  
  const currentWeekDates = getCurrentWeekDates();
  
  // Load week content when baby birth date changes
  useEffect(() => {
    if (babyBirthDate && fetchWeekContent) {
      console.log('🔍 Loading week content for baby age:', babyAge, 'days');
      fetchWeekContent(currentWeekDates);
    }
  }, [babyBirthDate, babyAge]);
  
  // Convert weekly content to the format expected by the UI
  const weeklyContents = currentWeekDates.map((date, index) => {
    const dateKey = date.toISOString().split('T')[0];
    const content = weeklyContent[dateKey];
    const dayNames = t('language') === 'en' 
      ? ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
      : ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB'];
    
    return {
      day: dayNames[date.getDay()],
      date: date.getDate(),
      content: content ? {
        type: content.content_type as 'video' | 'article' | 'audio',
        title: content.title,
        duration: content.duration_minutes ? `${content.duration_minutes} min` : '5 min',
        completed: false
      } : {
        type: 'article' as const,
        title: t('language') === 'en' ? 'Content in preparation' : 'Conteúdo em preparação',
        duration: '5 min',
        completed: false
      }
    };
  });

  // Seções fixas do app
  const sections = [
    {
      id: 'sono-do-bebe',
      title: t('language') === 'en' ? 'Baby Sleep' : 'Sono do Bebê',
      emoji: '🛌',
      icon: RotateCcw,
      description: t('language') === 'en' ? 'Sleep routine, regressions, night rituals' : 'Rotina de sono, regressões, rituais noturnos',
      color: 'bg-sage/20 hover:bg-sage/30 text-sage'
    },
    {
      id: 'entendendo-bebe',
      title: t('language') === 'en' ? 'Understanding Baby' : 'Entendendo o Bebê',
      emoji: '🧠',
      icon: Baby,
      description: t('language') === 'en' ? 'Crying, milestones, myths' : 'Choro, marcos, mitos',
      color: 'bg-primary/20 hover:bg-primary/30 text-primary'
    },
    {
      id: 'primeiras-mordidas',
      title: t('language') === 'en' ? 'First Bites' : 'Primeiras Mordidas',
      emoji: '🍽',
      icon: Utensils,
      description: t('language') === 'en' ? 'Feeding and relationship with food' : 'Alimentação e relação com o comer',
      color: 'bg-terracotta/20 hover:bg-terracotta/30 text-terracotta'
    },
    {
      id: 'no-seu-tempo',
      title: t('language') === 'en' ? 'At Your Pace' : 'No seu Tempo',
      emoji: '💪',
      icon: Clock,
      description: t('language') === 'en' ? 'Development and respectful stimulation' : 'Desenvolvimento e estímulos respeitosos',
      color: 'bg-secondary/20 hover:bg-secondary/30 text-secondary'
    },
    {
      id: 'amamentacao-e-acolhimento',
      title: t('language') === 'en' ? 'Breastfeeding & Support' : 'Amamentação e Acolhimento',
      emoji: '🤱',
      icon: Heart,
      description: t('language') === 'en' ? 'Nutrition and postpartum' : 'Nutrição e pós-parto',
      color: 'bg-primary/20 hover:bg-primary/30 text-primary'
    },
    {
      id: 'mae-inteira',
      title: t('language') === 'en' ? 'Whole Mother' : 'Mãe Inteira',
      emoji: '🛀',
      icon: Heart,
      description: t('language') === 'en' ? 'Emotional health, self-care, maternal body' : 'Saúde emocional, autocuidado, corpo da mãe',
      color: 'bg-terracotta/20 hover:bg-terracotta/30 text-terracotta'
    },
    {
      id: 'entre-maes',
      title: t('language') === 'en' ? 'Between Mothers' : 'Entre Mães',
      emoji: '🤝',
      icon: Users,
      description: t('language') === 'en' ? 'Support network, stories, community' : 'Rede de apoio, relatos, comunidade',
      color: 'bg-sage/20 hover:bg-sage/30 text-sage'
    },
    {
      id: 'higiene-natural',
      title: t('language') === 'en' ? 'Natural Hygiene' : 'Higiene Natural',
      emoji: '🚼',
      icon: Users,
      description: t('language') === 'en' ? 'Diapers, EC, conscious care' : 'Fraldas, EC, cuidados conscientes',
      color: 'bg-secondary/20 hover:bg-secondary/30 text-secondary'
    }
  ];

  // Se um conteúdo de dia específico está selecionado, mostra o DayContent
  if (selectedDayContent) {
    const selectedDate = currentWeekDates.find(date => date.getDate() === selectedDayContent.day);
    return (
      <DayContent 
        content={selectedDayContent.content}
        date={selectedDate || new Date()}
        onBack={() => setSelectedDayContent(null)}
      />
    );
  }

  // Se uma categoria está selecionada, mostra o componente apropriado
  if (selectedCategory) {
    const category = sections.find(s => s.id === selectedCategory);
    
    // Componente especial para Amamentação
    if (selectedCategory === 'amamentacao-e-acolhimento') {
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
    const days = t('language') === 'en' 
      ? ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
      : ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'];
    const months = t('language') === 'en'
      ? ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
      : ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
    
    const dayName = days[date.getDay()];
    const day = date.getDate();
    const month = months[date.getMonth()];
    
    return t('language') === 'en' ? `Today is ${dayName}, ${month} ${day}` : `Hoje é ${dayName}, ${day} de ${month}`;
  };


  return (
    <div className="pb-6">
      <div className="space-y-6">

        {/* Seção de Boas-vindas Personalizada */}
        {profileData && (
          <div className="space-y-4 px-4">
            <Card className="bg-gradient-to-br from-primary/10 via-background to-sage/5 border-none shadow-soft">
              <CardContent className="p-6 space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                    <Heart className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                     <h2 className="font-playfair text-lg font-medium text-foreground">
                      {t('language') === 'en' ? `Hello, ${userName}! 💛` : `Olá, ${userName}! 💛`}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {babyAge > 0 
                        ? (t('language') === 'en' 
                          ? `${babyName} is ${babyAge} days old`
                          : `${babyName} tem ${babyAge} dias de vida`)
                        : (t('language') === 'en' 
                          ? `${babyName} will arrive soon!`
                          : `Em breve ${babyName} chegará!`)
                      }
                    </p>
                  </div>
                </div>
                
                {profileData.interests && profileData.interests.length > 0 && (
                  <div className="pt-2">
                  <p className="text-xs text-muted-foreground mb-2">
                    {t('language') === 'en' ? 'Your interests:' : 'Seus interesses:'}
                  </p>
                    <div className="flex flex-wrap gap-1">
                      {profileData.interests.map((interest, index) => (
                        <span key={index} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Calendário Semanal */}
        <div className="space-y-4 px-4">
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-primary" />
            <h2 className="font-playfair text-lg font-medium text-foreground">
              {t('language') === 'en' ? 'Your Week' : 'Sua Semana'}
            </h2>
          </div>
          
          <p className="text-muted-foreground text-sm">
            {t('language') === 'en' ? 'Each day brings new personalized content for your phase' : 'Cada dia traz um novo conteúdo personalizado para sua fase'}
          </p>

          {/* Grid do calendário */}
          <div className="grid grid-cols-7 gap-2 px-0">
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
                    onClick={() => {
                      const dateKey = currentWeekDates[index].toISOString().split('T')[0];
                      const content = weeklyContent[dateKey];
                      if (content) {
                        setSelectedDayContent({ day: item.date, content });
                      } else {
                        setSelectedDay(isSelected ? null : item.date);
                      }
                    }}
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
                          {t('language') === 'en' 
                            ? `Content specially selected for day ${selectedContent.date} of your journey.`
                            : `Conteúdo especialmente selecionado para o dia ${selectedContent.date} da sua jornada.`}
                        </p>
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <span>{selectedContent.content.duration}</span>
                          <span>•</span>
                          <span className="capitalize">{selectedContent.content.type}</span>
                          {selectedContent.content.completed && (
                            <>
                              <span>•</span>
                              <span className="text-primary">{t('language') === 'en' ? '✓ Completed' : '✓ Concluído'}</span>
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
        <div className="space-y-4 px-4">
          <h3 className="font-playfair text-lg font-medium text-foreground">
            {t('language') === 'en' ? "Today's Highlight" : 'Destaque de Hoje'}
          </h3>
          
          <Card className="bg-gradient-to-br from-primary/10 via-background to-sage/5 border-none shadow-soft">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Play className="w-6 h-6 text-primary" />
                </div>
                <div className="space-y-2">
                  <h4 className="font-playfair font-medium text-foreground">
                    {t('language') === 'en' ? 'Relaxing baby massage' : 'Massagem relaxante no bebê'}
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t('language') === 'en' 
                      ? 'Learn gentle massage techniques that help soothe your baby and strengthen the bond between you.'
                      : 'Aprenda técnicas suaves de massagem que ajudam a acalmar seu bebê e fortalecer o vínculo entre vocês.'}
                  </p>
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <span>{t('language') === 'en' ? '4 minutes' : '4 minutos'}</span>
                    <span>•</span>
                    <span>{t('language') === 'en' ? 'Video' : 'Vídeo'}</span>
                    <span>•</span>
                    <span>{t('language') === 'en' ? 'With specialist' : 'Com especialista'}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Chamada para Especialista */}
        <div className="space-y-4 px-4">
          <Card className="bg-gradient-to-r from-terracotta/20 to-primary/20 border-none shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-terracotta/30 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-terracotta" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-playfair font-semibold text-foreground">
                    {t('language') === 'en' ? '📞 Ask questions live with specialist' : '📞 Tire dúvidas ao vivo com especialista'}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {t('language') === 'en' ? 'This Friday at 10am! Click to participate' : 'Nesta sexta às 10h! Clique para participar'}
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
            {t('language') === 'en' ? 'Explore by Topics' : 'Explore por Temas'}
          </h3>
          <p className="text-sm text-muted-foreground">
            {t('language') === 'en' ? 'Browse content organized for your journey' : 'Navegue pelos conteúdos organizados para sua jornada'}
          </p>
        </div>
        
        <div className="flex overflow-x-auto gap-4 pl-4 pr-4 pb-2">
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