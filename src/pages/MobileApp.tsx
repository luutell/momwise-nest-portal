import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Home as HomeIcon, Calendar, Heart, User, BookOpen, MessageCircle, Menu } from 'lucide-react';
import { AppSidebar } from '@/components/AppSidebar';
import AuthWrapper from '@/components/auth/AuthWrapper';
import { useProfile } from '@/hooks/useProfile';
import Home from '@/components/mobile/Home';
import WeeklyCalendar from '@/components/mobile/WeeklyCalendar';
import DailyInsight from '@/components/mobile/DailyInsight';
import Profile from '@/components/mobile/Profile';
import Onboarding from '@/components/mobile/Onboarding';
import ProfileSetup from '@/components/mobile/ProfileSetup';
import Biblioteca from '@/components/mobile/Biblioteca';

const MobileApp = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('home');
  const { profile, loading } = useProfile();
  
  // Show onboarding if user doesn't have a profile or hasn't completed onboarding
  const showOnboarding = !loading && (!profile || !profile.onboarding_completed);

  // Set active tab based on route
  useEffect(() => {
    if (location.pathname === '/app/biblioteca') {
      setActiveTab('biblioteca');
    }
  }, [location.pathname]);

  const handleOnboardingComplete = async () => {
    // Force profile refresh to check for updates
    await new Promise(resolve => setTimeout(resolve, 100));
    window.location.reload();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-primary/5 to-sage/10">
        <div className="text-center">
          <img 
            src="/lovable-uploads/edecb7d9-f5ad-4b7d-b3eb-1da61c76e533.png" 
            alt="MomWise" 
            className="h-16 w-16 mx-auto mb-4 rounded-full object-contain"
          />
          <p className="text-foreground">Carregando...</p>
        </div>
      </div>
    );
  }

  if (showOnboarding) {
    // If no profile exists, show onboarding first
    if (!profile) {
      return <Onboarding onComplete={handleOnboardingComplete} onSkip={handleOnboardingComplete} />;
    }
    // If profile exists but onboarding not completed, show profile setup
    return <ProfileSetup onComplete={handleOnboardingComplete} onSkip={handleOnboardingComplete} />;
  }

  return (
    <AuthWrapper>
    <SidebarProvider defaultOpen={false}>
      <div className="min-h-screen w-full max-w-sm mx-auto bg-background font-inter flex overflow-hidden">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header */}
          <header className="bg-gradient-warm text-primary-foreground p-4 pb-2 rounded-b-2xl shadow-soft">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <SidebarTrigger className="text-foreground bg-background/90 hover:bg-background rounded-lg p-2 border border-border shadow-sm">
                  <Menu className="w-5 h-5 text-sidebar-foreground" />
                </SidebarTrigger>
                <img 
                  src="/lovable-uploads/edecb7d9-f5ad-4b7d-b3eb-1da61c76e533.png" 
                  alt="MomWise" 
                  className="h-10 w-auto rounded-lg"
                />
              </div>
              <img 
                src="/lovable-uploads/edecb7d9-f5ad-4b7d-b3eb-1da61c76e533.png" 
                alt="MomWise" 
                className="w-8 h-8 rounded-full object-contain"
              />
            </div>
            
            
          </header>

          {/* Main Content */}
          <main className="flex-1 pb-20 overflow-y-auto">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full h-full">
              <TabsContent value="home" className="mt-0 p-0">
                <Home />
              </TabsContent>
              
              <TabsContent value="calendar" className="mt-0 p-0">
                <WeeklyCalendar />
              </TabsContent>
              
              <TabsContent value="biblioteca" className="mt-0 p-0">
                <Biblioteca />
              </TabsContent>

              <TabsContent value="entre-maes" className="mt-0 p-0">
                <div className="p-4">
                  <h2 className="font-playfair text-xl mb-4">Entre Mães</h2>
                  <p className="text-muted-foreground">Comunidade e trocas reais entre mães...</p>
                </div>
              </TabsContent>
              
              <TabsContent value="chat" className="mt-0 p-0">
                <div className="p-4">
                  <h2 className="font-playfair text-xl mb-4">Chat</h2>
                  <p className="text-muted-foreground">Converse com especialistas...</p>
                </div>
              </TabsContent>
              
              <TabsContent value="profile" className="mt-0 p-0">
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
                  onClick={() => window.history.pushState({}, '', '/app/biblioteca')}
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
    </AuthWrapper>
  );
};

export default MobileApp;