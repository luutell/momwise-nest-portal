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
import watercolorBg from '@/assets/watercolor-hero-bg.jpg';

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

  const handleSkipPersonalization = () => {
    setShowOnboarding(false);
    setShowProfileSetup(false);
  };

  if (showOnboarding) {
    return <Onboarding onComplete={handleOnboardingComplete} onSkip={handleSkipPersonalization} />;
  }

  if (showProfileSetup) {
    return <ProfileSetup onComplete={handleProfileSetupComplete} onSkip={handleSkipPersonalization} />;
  }

  return (
    <SidebarProvider defaultOpen={false}>
      <div className="min-h-screen w-full max-w-sm mx-auto bg-background font-inter flex overflow-hidden">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header */}
          <header className="relative bg-gradient-warm text-cream p-4 pb-6 rounded-b-2xl shadow-soft overflow-hidden">
            <div className="flex items-center justify-between mb-4 relative z-10">
              <div className="flex items-center space-x-3">
                <SidebarTrigger className="text-white hover:bg-white/10 rounded-lg p-2 bg-white/20 border border-white/30">
                  <Menu className="w-5 h-5 text-white" />
                </SidebarTrigger>
                <h1 className="font-playfair text-2xl font-semibold relative">
                  <span 
                    className="relative z-10 inline-block text-transparent bg-clip-text"
                    style={{ 
                      backgroundImage: `url(${watercolorBg})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      WebkitBackgroundClip: 'text',
                      backgroundClip: 'text',
                      filter: 'contrast(1.5) saturate(1.2) brightness(1.1)'
                    }}
                  >
                    MomWise
                  </span>
                  <span 
                    className="absolute inset-0 text-white opacity-30"
                    style={{ zIndex: -1 }}
                  >
                    MomWise
                  </span>
                </h1>
              </div>
              <div className="w-8 h-8 bg-cream/20 rounded-full flex items-center justify-center">
                <Heart className="w-4 h-4 text-white" />
              </div>
            </div>
            
            <DailyInsight />
          </header>

          {/* Main Content */}
          <main className="flex-1 pb-20 overflow-y-auto -mt-2">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full h-full">
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
              <TabsList className="fixed bottom-0 left-1/2 transform -translate-x-1/2 max-w-sm w-full h-16 rounded-none bg-card border-t border-border flex z-50">
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