import { useState, useEffect } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Heart, BookOpen, Moon, Play, Clock, Star } from 'lucide-react';
import { usePersonalizedCalendar } from '@/hooks/usePersonalizedCalendar';
import { useProfile } from '@/hooks/useProfile';

const WeeklyCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [currentWeek, setCurrentWeek] = useState(0);
  const { profile } = useProfile();
  
  // Get baby birth date from profile or localStorage
  const getBabyBirthDate = () => {
    // Try profile first
    if (profile?.baby_birth_date) {
      return new Date(profile.baby_birth_date);
    }
    
    // Fallback to localStorage
    const localProfile = localStorage.getItem('profile_data');
    if (localProfile) {
      try {
        const parsed = JSON.parse(localProfile);
        if (parsed.baby_birth_date) {
          return new Date(parsed.baby_birth_date);
        }
      } catch (e) {
        console.error('Error parsing local profile:', e);
      }
    }
    
    return undefined;
  };
  
  const babyBirthDate = getBabyBirthDate();
  const { 
    weeklyContent, 
    loading, 
    fetchWeekContent, 
    getContentTypeIcon, 
    getContentTypeColor 
  } = usePersonalizedCalendar(babyBirthDate);

  // Calcular datas da semana atual
  const getWeekDates = (weekOffset: number = 0) => {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay() + (weekOffset * 7));
    
    const weekDates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      weekDates.push(date);
    }
    return weekDates;
  };

  useEffect(() => {
    if (babyBirthDate) {
      const weekDates = getWeekDates(currentWeek);
      fetchWeekContent(weekDates);
    }
  }, [currentWeek, babyBirthDate, fetchWeekContent]);

  const getTodaysContent = () => {
    if (!selectedDate) return null;
    const dateKey = selectedDate.toISOString().split('T')[0];
    return weeklyContent[dateKey];
  };

  const getPhaseMessage = () => {
    if (!babyBirthDate) {
      return "Configure a data de nascimento do seu bebê para conteúdos personalizados";
    }
    
    const daysDiff = Math.floor((new Date().getTime() - babyBirthDate.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysDiff < 0) {
      return "Preparando-se para a chegada do bebê";
    } else if (daysDiff <= 28) {
      return `Recém-nascido: ${daysDiff} dias de vida`;
    } else if (daysDiff <= 365) {
      const months = Math.floor(daysDiff / 30);
      return `Fase infantil: ${months} ${months === 1 ? 'mês' : 'meses'}`;
    } else {
      const years = Math.floor(daysDiff / 365);
      return `${years} ${years === 1 ? 'ano' : 'anos'} de idade`;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'video': return 'bg-red-100 text-red-800';
      case 'audio': return 'bg-orange-100 text-orange-800';
      case 'article': return 'bg-blue-100 text-blue-800';
      case 'activity': return 'bg-green-100 text-green-800';
      case 'tip': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDayName = (date: Date) => {
    return date.toLocaleDateString('pt-BR', { weekday: 'short' });
  };

  const todaysContent = getTodaysContent();
  const weekDates = getWeekDates(currentWeek);

  return (
    <div className="p-4 space-y-6">
      {/* Header com fase da maternidade */}
      <div className="text-center">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-playfair text-2xl font-semibold">Sua Semana</h2>
          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setCurrentWeek(prev => prev - 1)}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <span className="text-sm font-medium px-2">
              {currentWeek === 0 ? 'Esta semana' : `${currentWeek > 0 ? '+' : ''}${currentWeek} semana${Math.abs(currentWeek) !== 1 ? 's' : ''}`}
            </span>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setCurrentWeek(prev => prev + 1)}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        <div className="bg-primary/5 rounded-lg p-3 mb-4">
          <p className="text-sm text-primary font-medium">
            {getPhaseMessage()}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Cada dia traz um novo conteúdo personalizado para sua fase
          </p>
        </div>
      </div>

      {/* Calendar */}
      <Card className="mb-6 border-none shadow-gentle">
        <CardContent className="p-4">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="w-full"
            classNames={{
              day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
              day_today: "bg-sage/20 text-sage",
            }}
          />
        </CardContent>
      </Card>

      {/* Conteúdo do Dia Selecionado */}
      {todaysContent && (
        <Card className="border border-border">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="font-playfair text-lg">
                {todaysContent.title}
              </CardTitle>
              <div className="flex items-center space-x-2">
                <Badge className={getTypeColor(todaysContent.content_type)}>
                  {getContentTypeIcon(todaysContent.content_type)} {todaysContent.content_type}
                </Badge>
                {todaysContent.is_premium && (
                  <Badge variant="outline" className="text-yellow-600 border-yellow-600">
                    <Star className="w-3 h-3 mr-1" />
                    Premium
                  </Badge>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <p className="text-sm text-foreground leading-relaxed">
                {todaysContent.description}
              </p>
              
              {todaysContent.content_data && (
                <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                  {todaysContent.duration_minutes && (
                    <span className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {todaysContent.duration_minutes} min
                    </span>
                  )}
                  {todaysContent.content_data.expert && (
                    <span>Com {todaysContent.content_data.expert}</span>
                  )}
                </div>
              )}
              
              <Badge variant="secondary" className="text-xs">
                {todaysContent.category}
              </Badge>
              
              <div className="pt-2">
                <Button size="sm" className="w-full">
                  <Play className="w-4 h-4 mr-2" />
                  {todaysContent.content_type === 'video' ? 'Assistir' : 
                   todaysContent.content_type === 'audio' ? 'Ouvir' : 
                   todaysContent.content_type === 'article' ? 'Ler' : 'Ver conteúdo'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Visão Semanal */}
      <div>
        <h3 className="font-playfair text-lg font-medium mb-4">Conteúdos da Semana</h3>
        
        {loading ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Carregando conteúdos personalizados...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3">
            {weekDates.map((date, index) => {
              const dateKey = date.toISOString().split('T')[0];
              const content = weeklyContent[dateKey];
              const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();
              
              return (
                <Card 
                  key={dateKey} 
                  className={`cursor-pointer transition-all ${isSelected ? 'ring-2 ring-primary' : ''} ${!content ? 'opacity-50' : ''}`}
                  onClick={() => setSelectedDate(date)}
                >
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="text-center min-w-[50px]">
                          <p className="text-xs text-muted-foreground capitalize">
                            {getDayName(date)}
                          </p>
                          <p className="font-medium text-sm">
                            {date.getDate()}
                          </p>
                        </div>
                        <div className="flex-1">
                          {content ? (
                            <>
                              <p className="font-medium text-sm">{content.title}</p>
                              <p className="text-xs text-muted-foreground truncate">
                                {content.description}
                              </p>
                            </>
                          ) : (
                            <p className="text-xs text-muted-foreground italic">
                              Nenhum conteúdo disponível
                            </p>
                          )}
                        </div>
                      </div>
                      {content && (
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">
                            {getContentTypeIcon(content.content_type)}
                          </span>
                          {content.is_premium && (
                            <Star className="w-3 h-3 text-yellow-600" />
                          )}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default WeeklyCalendar;