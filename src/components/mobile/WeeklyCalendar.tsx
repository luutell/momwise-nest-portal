import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, Heart, BookOpen, Moon } from 'lucide-react';

const weeklyContent = {
  monday: {
    title: 'Mindful Monday',
    content: 'Morning reflection: How did you and baby sleep?',
    type: 'reflection',
    icon: Heart
  },
  tuesday: {
    title: 'Nourishment Tuesday', 
    content: 'Focus on hydration and nutrient-rich foods',
    type: 'nutrition',
    icon: Heart
  },
  wednesday: {
    title: 'Wisdom Wednesday',
    content: 'Expert tip: Reading your baby\'s hunger cues',
    type: 'education',
    icon: BookOpen
  },
  thursday: {
    title: 'Gentle Thursday',
    content: 'Self-care ritual: 5-minute breathing exercise',
    type: 'wellness',
    icon: Heart
  },
  friday: {
    title: 'Connection Friday',
    content: 'Story from mama Sarah: Finding my feeding rhythm',
    type: 'community',
    icon: Heart
  },
  saturday: {
    title: 'Rest Saturday',
    content: 'Sleep tip: Creating a calming bedtime routine',
    type: 'sleep',
    icon: Moon
  },
  sunday: {
    title: 'Reflection Sunday',
    content: 'Weekly check-in: What felt good this week?',
    type: 'reflection',
    icon: Heart
  }
};

const WeeklyCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [currentWeek, setCurrentWeek] = useState(0);

  const getDayName = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
  };

  const getTodaysContent = () => {
    if (!selectedDate) return null;
    const dayName = getDayName(selectedDate) as keyof typeof weeklyContent;
    return weeklyContent[dayName];
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'reflection': return 'bg-primary/20 text-primary';
      case 'nutrition': return 'bg-terracotta/20 text-terracotta';
      case 'education': return 'bg-sage/20 text-sage';
      case 'wellness': return 'bg-secondary/20 text-secondary';
      case 'community': return 'bg-primary/20 text-primary';
      case 'sleep': return 'bg-terracotta/20 text-terracotta';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const todaysContent = getTodaysContent();

  return (
    <div className="p-4">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-playfair text-2xl font-semibold">Your Weekly Journey</h2>
          <div className="flex items-center space-x-2">
            <button onClick={() => setCurrentWeek(prev => prev - 1)}>
              <ChevronLeft className="w-5 h-5 text-muted-foreground" />
            </button>
            <span className="text-sm font-medium">Week {12 + currentWeek}</span>
            <button onClick={() => setCurrentWeek(prev => prev + 1)}>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
        </div>
        
        <p className="text-muted-foreground text-sm">
          Each day brings new gentle guidance and connection
        </p>
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

      {/* Today's Content */}
      {todaysContent && (
        <Card className="border-none shadow-gentle">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="font-playfair text-lg">
                {todaysContent.title}
              </CardTitle>
              <Badge className={getTypeColor(todaysContent.type)}>
                {todaysContent.type}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-start space-x-3">
              <todaysContent.icon className="w-5 h-5 text-primary mt-0.5" />
              <p className="text-sm text-foreground leading-relaxed">
                {todaysContent.content}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Weekly Overview */}
      <div className="mt-6">
        <h3 className="font-playfair text-lg font-medium mb-4">This Week at a Glance</h3>
        <div className="space-y-3">
          {Object.entries(weeklyContent).map(([day, content]) => (
            <Card key={day} className="border-none shadow-gentle bg-card/50">
              <CardContent className="p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <content.icon className="w-4 h-4 text-primary" />
                    <div>
                      <p className="font-medium text-sm capitalize">{day}</p>
                      <p className="text-xs text-muted-foreground">{content.title}</p>
                    </div>
                  </div>
                  <Badge className={`${getTypeColor(content.type)} text-xs`}>
                    {content.type}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeeklyCalendar;