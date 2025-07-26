import { useState } from 'react';
import { Search, Play, Bookmark, Calendar, Clock, Users, ChevronRight, Filter, Bell, Heart, MessageSquare, Radio } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

const categories = [
  'Amamentação',
  'Pós-parto', 
  'Sono',
  'Introdução Alimentar',
  'Desenvolvimento',
  'Relacionamentos',
  'Saúde Mental'
];

const todayHighlight = {
  id: 1,
  title: 'Amamentação: Sinais de que seu bebê está bem alimentado',
  specialist: 'Dra. Ana Carolina',
  avatar: '/lovable-uploads/eea7514a-fcb9-43ad-ad9b-2acbd4ee31ea.png',
  category: 'Amamentação',
  time: '14:00',
  duration: '45 min',
  isLive: true,
  viewers: 127,
  description: 'Aprenda a identificar se seu bebê está recebendo leite suficiente'
};

const videocalls = [
  {
    id: 2,
    title: 'Sono do bebê: Criando uma rotina saudável',
    specialist: 'Dr. Pedro Santos',
    avatar: '/lovable-uploads/ccbd5038-df1a-4632-9976-d2b053a544c9.png',
    category: 'Sono',
    time: '10:00',
    date: 'Hoje',
    duration: '40 min',
    isLive: false,
    hasReplay: true,
    views: 234,
    likes: 45,
    isPremium: false
  },
  {
    id: 3,
    title: 'Introdução Alimentar: Primeiros sabores',
    specialist: 'Nutri. Maria Silva',
    avatar: '/lovable-uploads/9d4b19c9-65a5-4ee3-9afa-64adf0ee24d6.png',
    category: 'Introdução Alimentar',
    time: '15:30',
    date: 'Amanhã',
    duration: '50 min',
    isLive: false,
    hasReplay: false,
    isScheduled: true,
    isPremium: true
  },
  {
    id: 4,
    title: 'Cuidando da saúde mental no pós-parto',
    specialist: 'Psicóloga Laura Costa',
    avatar: '/lovable-uploads/eea7514a-fcb9-43ad-ad9b-2acbd4ee31ea.png',
    category: 'Saúde Mental',
    time: '16:00',
    date: '25/01',
    duration: '60 min',
    isLive: false,
    hasReplay: true,
    views: 189,
    likes: 67,
    isPremium: true
  }
];

type UserType = 'free' | 'premium';

const VideocallsHub = () => {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSchedule, setShowSchedule] = useState(false);

  const userType = 'free' as const;
  const savedLimit = 2;
  const savedCount = 1;

  if (showSchedule) {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="sticky top-0 bg-background border-b border-border z-10">
          <div className="flex items-center justify-between p-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setShowSchedule(false)}
            >
              ← Voltar
            </Button>
            <h1 className="font-playfair text-lg font-semibold">
              Agenda de Videocalls
            </h1>
            <Button variant="ghost" size="sm">
              <Filter className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Schedule Content */}
        <div className="p-4 space-y-4 pb-24">
          <Card className="border border-border">
            <CardHeader className="pb-3">
              <h3 className="font-medium text-foreground">Esta Semana</h3>
            </CardHeader>
            <CardContent className="space-y-3">
              {videocalls.filter(v => v.isScheduled || v.date === 'Hoje' || v.date === 'Amanhã').map((call) => (
                <div key={call.id} className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={call.avatar} />
                    <AvatarFallback>{call.specialist[0]}</AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm text-foreground truncate">
                      {call.title}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {call.specialist}
                    </p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {call.category}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {call.date} às {call.time}
                      </span>
                    </div>
                  </div>
                  
                  <Button variant="ghost" size="sm">
                    <Bell className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 bg-background border-b border-border z-10">
        <div className="p-4">
          <h1 className="font-playfair text-xl font-semibold mb-4 text-center">
            Videocalls com Especialistas
          </h1>
          
          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por especialista, tema..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          {/* Categories Filter */}
          <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
            <Button
              variant={activeCategory === 'Todos' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveCategory('Todos')}
            >
              Todos
            </Button>
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveCategory(category)}
                className="whitespace-nowrap"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 pb-24 space-y-6">
        {/* Today's Highlight */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-playfair text-lg font-semibold">
              Destaque do Dia
            </h2>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowSchedule(true)}
            >
              <Calendar className="w-4 h-4 mr-2" />
              Agenda
            </Button>
          </div>
          
          <Card className="border border-border overflow-hidden">
            <div className="relative">
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                <Play className="w-12 h-12 text-primary" />
              </div>
              
              {todayHighlight.isLive && (
                <div className="absolute top-3 left-3 flex items-center space-x-1 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                  <Radio className="w-3 h-3" />
                  <span>AO VIVO</span>
                </div>
              )}
              
              <div className="absolute top-3 right-3 bg-black/50 text-white px-2 py-1 rounded text-xs">
                {todayHighlight.viewers} assistindo
              </div>
            </div>
            
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={todayHighlight.avatar} />
                  <AvatarFallback>{todayHighlight.specialist[0]}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-foreground mb-1">
                    {todayHighlight.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {todayHighlight.specialist}
                  </p>
                  <p className="text-xs text-muted-foreground mb-3">
                    {todayHighlight.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary" className="text-xs">
                        {todayHighlight.category}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {todayHighlight.time} • {todayHighlight.duration}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <Bookmark className="w-4 h-4" />
                      </Button>
                      <Button size="sm">
                        <Play className="w-4 h-4 mr-2" />
                        Assistir
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Videocalls List */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-playfair text-lg font-semibold">
              Todas as Videocalls
            </h2>
            <Button variant="ghost" size="sm">
              Explorar todas
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
          
          <div className="space-y-4">
            {videocalls.map((call) => (
              <Card key={call.id} className="border border-border">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className="relative">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={call.avatar} />
                        <AvatarFallback>{call.specialist[0]}</AvatarFallback>
                      </Avatar>
                      {call.isPremium && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                          <span className="text-xs text-white">★</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-foreground mb-1">
                        {call.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        {call.specialist}
                      </p>
                      
                      <div className="flex items-center space-x-2 mb-3">
                        <Badge variant="outline" className="text-xs">
                          {call.category}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {call.date} • {call.time} • {call.duration}
                        </span>
                      </div>
                      
                      {call.hasReplay && (
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground mb-3">
                          <span className="flex items-center">
                            <Users className="w-3 h-3 mr-1" />
                            {call.views} visualizações
                          </span>
                          <span className="flex items-center">
                            <Heart className="w-3 h-3 mr-1" />
                            {call.likes} curtidas
                          </span>
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          {call.hasReplay && (
                            <Button variant="outline" size="sm">
                              <Play className="w-4 h-4 mr-2" />
                              {userType === 'free' ? 'Ver Prévia' : 'Assistir Replay'}
                            </Button>
                          )}
                          
                          {call.isScheduled && (
                            <Button variant="outline" size="sm">
                              <Bell className="w-4 h-4 mr-2" />
                              Lembrar
                            </Button>
                          )}
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            disabled={userType === 'free' && savedCount >= savedLimit}
                          >
                            <Bookmark className="w-4 h-4" />
                          </Button>
                          
                          {call.isPremium && (
                            <Button variant="ghost" size="sm" disabled={userType === 'free'}>
                              <MessageSquare className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                      
                      {call.isPremium && userType === 'free' && (
                        <div className="mt-2 p-2 bg-muted/50 rounded-lg">
                          <p className="text-xs text-muted-foreground">
                            ⭐ Conteúdo Premium - Assine para acesso completo
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* User limits info */}
        {userType === 'free' && (
          <Card className="border border-primary/20 bg-primary/5">
            <CardContent className="p-4 text-center">
              <h3 className="font-medium text-foreground mb-2">
                Biblioteca Pessoal
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                Você salvou {savedCount} de {savedLimit} videocalls permitidas
              </p>
              <Button size="sm">
                Assinar para acesso ilimitado
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default VideocallsHub;