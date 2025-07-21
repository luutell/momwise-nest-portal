import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Home as HomeIcon, Calendar, Heart, User, BookOpen, MessageCircle, Menu } from 'lucide-react';
import { AppSidebar } from '@/components/AppSidebar';
import Home from '@/components/mobile/Home';
import WeeklyCalendar from '@/components/mobile/WeeklyCalendar';
import DailyInsight from '@/components/mobile/DailyInsight';
import Profile from '@/components/mobile/Profile';
import Onboarding from '@/components/mobile/Onboarding';
import ProfileSetup from '@/components/mobile/ProfileSetup';

const MobileApp = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [showProfileSetup, setShowProfileSetup] = useState(false);

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    setShowProfileSetup(true);
  };

  const handleProfileSetupComplete = () => {
    setShowProfileSetup(false);
  };

  if (showOnboarding) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  if (showProfileSetup) {
    return <ProfileSetup onComplete={handleProfileSetupComplete} />;
  }

  return (
    <SidebarProvider defaultOpen={false}>
      <div className="min-h-screen w-full bg-warm-white font-inter flex">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="bg-gradient-warm text-primary-foreground p-4 pb-6 rounded-b-2xl shadow-soft">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <SidebarTrigger className="text-primary-foreground hover:bg-primary-foreground/10 rounded-lg p-2">
                  <Menu className="w-5 h-5" />
                </SidebarTrigger>
                <h1 className="font-playfair text-2xl font-semibold">MomWise</h1>
              </div>
              <div className="w-8 h-8 bg-primary-foreground/20 rounded-full flex items-center justify-center">
                <Heart className="w-4 h-4" />
              </div>
            </div>
            
            {/* Mensagem personalizada em terracota */}
            <div className="bg-terracotta/20 rounded-xl p-4 mb-4">
              <p className="text-terracotta font-medium text-lg">
                Olá Luiza! 👋
              </p>
              <p className="text-terracotta/80 text-sm">
                Hoje é dia 21 de julho, seu bebê tem 20 dias
              </p>
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
      </div>
    </SidebarProvider>
  );
};

export default MobileApp;