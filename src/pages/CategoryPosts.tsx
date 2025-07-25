import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Calendar, User, Home as HomeIcon, BookOpen, Heart, MessageCircle, MoreHorizontal } from 'lucide-react';

interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  category: string;
  image_url?: string;
  published: boolean;
  created_at: string;
}

const categoryMap: { [key: string]: string } = {
  'ritmo-leve': 'Ritmo Leve',
  'entendendo-o-bebe': 'Entendendo o Bebê',
  'primeiras-mordidas': 'Primeiras Mordidas',
  'no-seu-tempo': 'No seu Tempo',
  'juntas-no-comeco': 'Juntas no Começo',
  'mae-inteira': 'Mãe Inteira',
  'entre-maes-categoria': 'Entre Mães',
  'higiene-natural': 'Higiene Natural'
};

export default function CategoryPosts() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const categoryKey = pathname.split('/').pop() || '';
  const category = categoryMap[categoryKey] || categoryKey;
  
  const { data: posts, isLoading } = useQuery({
    queryKey: ['category-posts', category],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('category', category)
        .eq('published', true)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Post[];
    },
    enabled: !!category
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
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

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 bg-background border-b border-border z-10">
        <div className="flex items-center justify-between p-4">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate('/app')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <h1 className="font-playfair text-lg font-semibold">
            {category}
          </h1>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="w-5 h-5" />
          </Button>
        </div>
        
        <div className="px-4 pb-4">
          <p className="text-sm text-muted-foreground">
            {posts?.length || 0} {posts?.length === 1 ? 'artigo encontrado' : 'artigos encontrados'}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4 pb-24">
        {posts?.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-medium text-foreground mb-2">
              Nenhum artigo encontrado
            </h3>
            <p className="text-sm text-muted-foreground">
              Ainda não temos conteúdo publicado nesta categoria
            </p>
          </div>
        ) : (
          posts?.map((post) => (
            <Card key={post.id} className="border border-border hover:shadow-md transition-shadow">
              <Link to={`/app/post/${post.id}`}>
                {post.image_url && (
                  <div className="relative h-48 w-full">
                    <img 
                      src={post.image_url} 
                      alt={post.title}
                      className="w-full h-full object-cover rounded-t-lg"
                    />
                  </div>
                )}
                
                <CardContent className="p-4">
                  <h3 className="font-playfair text-lg font-semibold text-foreground mb-2 line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-3">
                    {post.content.substring(0, 150)}...
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center space-x-3">
                      <span className="flex items-center">
                        <User className="w-3 h-3 mr-1" />
                        {post.author}
                      </span>
                      <span className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {new Date(post.created_at).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                    
                    <Button 
                      variant="link" 
                      size="sm"
                      className="p-0 h-auto text-primary hover:text-primary/80 text-xs"
                    >
                      Ler mais →
                    </Button>
                  </div>
                </CardContent>
              </Link>
            </Card>
          ))
        )}
      </div>

      {/* Bottom Navigation */}
      <Tabs value="biblioteca" className="w-full h-full">
        <TabsList className="fixed bottom-0 left-1/2 transform -translate-x-1/2 max-w-sm w-full h-16 rounded-none bg-card border-t border-border flex z-50">
          <TabsTrigger 
            value="home" 
            className="flex-1 flex-col h-full data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
            onClick={() => navigate('/app')}
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
            onClick={() => navigate('/app')}
          >
            <Heart className="w-5 h-5 mb-1" />
            <span className="text-xs">Entre Mães</span>
          </TabsTrigger>
          
          <TabsTrigger 
            value="chat" 
            className="flex-1 flex-col h-full data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
            onClick={() => navigate('/app')}
          >
            <MessageCircle className="w-5 h-5 mb-1" />
            <span className="text-xs">Chat</span>
          </TabsTrigger>
          
          <TabsTrigger 
            value="profile" 
            className="flex-1 flex-col h-full data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
            onClick={() => navigate('/app')}
          >
            <User className="w-5 h-5 mb-1" />
            <span className="text-xs">Perfil</span>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}