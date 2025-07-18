import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Home as HomeIcon, Calendar, Heart, User, BookOpen, MessageCircle } from 'lucide-react';
import Home from '@/components/mobile/Home';
import WeeklyCalendar from '@/components/mobile/WeeklyCalendar';
import DailyInsight from '@/components/mobile/DailyInsight';
import Profile from '@/components/mobile/Profile';
import Onboarding from '@/components/mobile/Onboarding';

const MobileApp = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [showOnboarding, setShowOnboarding] = useState(true);

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
  };

  if (showOnboarding) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  return (
    <div className="min-h-screen bg-warm-white font-inter">
      {/* Header */}
      <header className="bg-gradient-warm text-primary-foreground p-4 pb-6 rounded-b-2xl shadow-soft">
        <div className="flex items-center justify-between mb-4">
          <h1 className="font-playfair text-2xl font-semibold">MomWise</h1>
          <div className="w-8 h-8 bg-primary-foreground/20 rounded-full flex items-center justify-center">
            <Heart className="w-4 h-4" />
          </div>
        </div>
        <DailyInsight />
      </header>

      {/* Main Content */}
      <main className="flex-1 pb-20">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsContent value="home" className="mt-0">
            <Home />
          </TabsContent>
          
          <TabsContent value="calendar" className="mt-0">
            <WeeklyCalendar />
          </TabsContent>
          
          <TabsContent value="biblioteca" className="mt-0">
            <div className="p-4">
              <h2 className="font-playfair text-xl mb-4">Biblioteca</h2>
              <p className="text-muted-foreground">Todos os conteúdos organizados por categoria...</p>
            </div>
          </TabsContent>

          <TabsContent value="entre-maes" className="mt-0">
            <div className="p-4">
              <h2 className="font-playfair text-xl mb-4">Entre Mães</h2>
              <p className="text-muted-foreground">Comunidade e trocas reais entre mães...</p>
            </div>
          </TabsContent>
          
          <TabsContent value="chat" className="mt-0">
            <div className="p-4">
              <h2 className="font-playfair text-xl mb-4">Chat</h2>
              <p className="text-muted-foreground">Converse com especialistas...</p>
            </div>
          </TabsContent>
          
          <TabsContent value="profile" className="mt-0">
            <Profile />
          </TabsContent>

          {/* Bottom Navigation */}
          <TabsList className="fixed bottom-0 left-0 right-0 h-16 rounded-none bg-card border-t border-border flex">
            <TabsTrigger 
              value="home" 
              className="flex-1 flex-col h-full data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
            >
              <HomeIcon className="w-5 h-5 mb-1" />
              <span className="text-xs">Home</span>
            </TabsTrigger>
            
            <TabsTrigger 
              value="biblioteca" 
              className="flex-1 flex-col h-full data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
            >
              <BookOpen className="w-5 h-5 mb-1" />
              <span className="text-xs">Biblioteca</span>
            </TabsTrigger>
            
            <TabsTrigger 
              value="entre-maes" 
              className="flex-1 flex-col h-full data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
            >
              <Heart className="w-5 h-5 mb-1" />
              <span className="text-xs">Entre Mães</span>
            </TabsTrigger>
            
            <TabsTrigger 
              value="chat" 
              className="flex-1 flex-col h-full data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
            >
              <MessageCircle className="w-5 h-5 mb-1" />
              <span className="text-xs">Chat</span>
            </TabsTrigger>
            
            <TabsTrigger 
              value="profile" 
              className="flex-1 flex-col h-full data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
            >
              <User className="w-5 h-5 mb-1" />
              <span className="text-xs">Perfil</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </main>
    </div>
  );
};

export default MobileApp;