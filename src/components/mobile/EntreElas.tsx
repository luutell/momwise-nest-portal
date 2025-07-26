import { useState } from 'react';
import { Search, Heart, MessageCircle, Share, Plus, MoreHorizontal, Clock, TrendingUp, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

const categories = [
  {
    id: 'sono-do-bebe',
    name: 'Sono do Bebê',
    description: 'Rotina de sono, regressões, rituais noturnos',
    color: 'bg-blue-100 text-blue-800',
    posts: 234
  },
  {
    id: 'pos-parto',
    name: 'Pós-parto Real',
    description: 'Corpo, emoções, puerpério, libido',
    color: 'bg-pink-100 text-pink-800',
    posts: 189
  },
  {
    id: 'amamentacao-e-acolhimento',
    name: 'Amamentação e Acolhimento',
    description: 'Nutrição e pós-parto',
    color: 'bg-green-100 text-green-800',
    posts: 312
  },
  {
    id: 'primeiras-mordidas',
    name: 'Primeiras Mordidas',
    description: 'Alimentação e relação com o comer',
    color: 'bg-orange-100 text-orange-800',
    posts: 156
  },
  {
    id: 'relacionamentos',
    name: 'Relacionamentos & Sexo',
    description: 'Mudanças no casal, libido, separações',
    color: 'bg-purple-100 text-purple-800',
    posts: 98
  },
  {
    id: 'no-seu-tempo',
    name: 'No seu Tempo',
    description: 'Desenvolvimento e estímulos respeitosos',
    color: 'bg-teal-100 text-teal-800',
    posts: 145
  },
  {
    id: 'mae-inteira',
    name: 'Mãe Inteira',
    description: 'Saúde emocional, autocuidado, corpo da mãe',
    color: 'bg-gray-100 text-gray-800',
    posts: 278
  },
  {
    id: 'entre-maes',
    name: 'Entre Mães',
    description: 'Rede de apoio, relatos, comunidade',
    color: 'bg-indigo-100 text-indigo-800',
    posts: 67
  },
  {
    id: 'higiene-natural',
    name: 'Higiene Natural',
    description: 'Fraldas, EC, cuidados conscientes',
    color: 'bg-yellow-100 text-yellow-800',
    posts: 423
  }
];

const samplePosts = [
  {
    id: 1,
    category: 'Pós-parto Real',
    author: 'Anônimo',
    avatar: null,
    time: '1d',
    content: 'Manas, preciso da opinião de vocês. Descobri ontem pela ex do meu namorado que ele mandou mensagem pra ela na sexta...',
    tag: 'Relacionamentos',
    likes: 17,
    comments: 10,
    isAnonymous: true
  },
  {
    id: 2,
    category: 'Pós-parto Real',
    author: 'Anônimo',
    avatar: null,
    time: '2h',
    content: 'Você notou alguma mudança no sexo após o parto?',
    tag: 'Relacionamentos',
    likes: 9,
    comments: 9,
    isAnonymous: true
  },
  {
    id: 3,
    category: 'Maternidade',
    author: 'Mamãe do João',
    avatar: '/lovable-uploads/edecb7d9-f5ad-4b7d-b3eb-1da61c76e533.png',
    time: '3h',
    content: 'Qual é a forma justa de dividir o cuidado com os filhos e as tarefas domésticas?',
    tag: 'Co-parentalidade',
    likes: 23,
    comments: 15,
    isAnonymous: false
  }
];

const EntreElas = () => {
  const [activeTab, setActiveTab] = useState('populares');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  if (selectedCategory) {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="sticky top-0 bg-background border-b border-border z-10">
          <div className="flex items-center justify-between p-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setSelectedCategory(null)}
            >
              ← Voltar
            </Button>
            <h1 className="font-playfair text-lg font-semibold">
              {categories.find(c => c.id === selectedCategory)?.name}
            </h1>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Posts Timeline */}
        <div className="p-4 space-y-4 pb-24">
          {samplePosts.map((post) => (
            <Card key={post.id} className="border border-border">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <Avatar className="w-8 h-8">
                    {post.isAnonymous ? (
                      <AvatarFallback className="bg-primary/10 text-primary">
                        ?
                      </AvatarFallback>
                    ) : (
                      <>
                        <AvatarImage src={post.avatar} />
                        <AvatarFallback>{post.author[0]}</AvatarFallback>
                      </>
                    )}
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-sm font-medium text-foreground">
                        {post.author}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {post.time}
                      </span>
                      <MoreHorizontal className="w-4 h-4 text-muted-foreground ml-auto" />
                    </div>
                    
                    <p className="text-foreground mb-3 text-sm leading-relaxed">
                      {post.content}
                    </p>
                    
                    <Badge variant="secondary" className="mb-3 text-xs">
                      {post.tag}
                    </Badge>
                    
                    <div className="flex items-center space-x-6">
                      <Button variant="ghost" size="sm" className="p-0 h-auto">
                        <Heart className="w-4 h-4 mr-1" />
                        <span className="text-sm">{post.likes}</span>
                      </Button>
                      
                      <Button variant="ghost" size="sm" className="p-0 h-auto">
                        <MessageCircle className="w-4 h-4 mr-1" />
                        <span className="text-sm">{post.comments}</span>
                      </Button>
                      
                      <Button variant="ghost" size="sm" className="p-0 h-auto">
                        <Share className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* New Post Button */}
        <Button 
          className="fixed bottom-20 right-4 w-14 h-14 rounded-full shadow-lg bg-primary hover:bg-primary/90"
          size="icon"
        >
          <Plus className="w-6 h-6" />
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 bg-background border-b border-border z-10">
        <div className="p-4">
          <h1 className="font-playfair text-xl font-semibold mb-4 text-center">
            Entre Elas
          </h1>
          
          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          {/* Navigation Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="populares" className="text-xs">
                <TrendingUp className="w-4 h-4 mr-1" />
                Populares
              </TabsTrigger>
              <TabsTrigger value="minhas" className="text-xs">
                <Users className="w-4 h-4 mr-1" />
                Minhas postagens
              </TabsTrigger>
              <TabsTrigger value="seguindo" className="text-xs">
                <Clock className="w-4 h-4 mr-1" />
                Seguindo
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 pb-24">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsContent value="populares" className="mt-0">
            <div className="space-y-4">
              <h2 className="font-playfair text-lg font-semibold mb-4">
                Categorias
              </h2>
              
              <div className="grid grid-cols-1 gap-3">
                {categories.map((category) => (
                  <Card 
                    key={category.id} 
                    className="border border-border cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="font-medium text-foreground mb-1">
                            {category.name}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-2">
                            {category.description}
                          </p>
                          <Badge variant="secondary" className="text-xs">
                            {category.posts} postagens
                          </Badge>
                        </div>
                        <div className="ml-4">
                          <div className={`w-12 h-12 rounded-full ${category.color} flex items-center justify-center`}>
                            <MessageCircle className="w-5 h-5" />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="minhas" className="mt-0">
            <div className="text-center py-12">
              <MessageCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-medium text-foreground mb-2">
                Suas postagens aparecerão aqui
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Compartilhe suas experiências com outras mães
              </p>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Criar primeira postagem
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="seguindo" className="mt-0">
            <div className="text-center py-12">
              <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-medium text-foreground mb-2">
                Siga tópicos do seu interesse
              </h3>
              <p className="text-sm text-muted-foreground">
                As postagens de tópicos que você segue aparecerão aqui
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* New Post Button */}
      <Button 
        className="fixed bottom-20 right-4 w-14 h-14 rounded-full shadow-lg bg-primary hover:bg-primary/90"
        size="icon"
      >
        <Plus className="w-6 h-6" />
      </Button>
    </div>
  );
};

export default EntreElas;