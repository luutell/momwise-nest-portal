import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Home, Calendar, Heart, User } from 'lucide-react';
import CategoryHub from '@/components/mobile/CategoryHub';
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
            <CategoryHub />
          </TabsContent>
          
          <TabsContent value="calendar" className="mt-0">
            <WeeklyCalendar />
          </TabsContent>
          
          <TabsContent value="wellness" className="mt-0">
            <div className="p-4">
              <h2 className="font-playfair text-xl mb-4">Wellness & Stories</h2>
              <p className="text-muted-foreground">Community features coming soon...</p>
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
              <Home className="w-5 h-5 mb-1" />
              <span className="text-xs">Home</span>
            </TabsTrigger>
            
            <TabsTrigger 
              value="calendar" 
              className="flex-1 flex-col h-full data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
            >
              <Calendar className="w-5 h-5 mb-1" />
              <span className="text-xs">Calendar</span>
            </TabsTrigger>
            
            <TabsTrigger 
              value="wellness" 
              className="flex-1 flex-col h-full data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
            >
              <Heart className="w-5 h-5 mb-1" />
              <span className="text-xs">Wellness</span>
            </TabsTrigger>
            
            <TabsTrigger 
              value="profile" 
              className="flex-1 flex-col h-full data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
            >
              <User className="w-5 h-5 mb-1" />
              <span className="text-xs">Profile</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </main>
    </div>
  );
};

export default MobileApp;