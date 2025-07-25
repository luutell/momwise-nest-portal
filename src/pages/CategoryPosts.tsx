import { Link, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, User } from 'lucide-react';

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
      <div className="p-6 max-w-4xl mx-auto">
        <div className="text-center py-8">Carregando posts...</div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <Link to="/app" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{category}</h1>
        <p className="text-gray-600">
          {posts?.length || 0} {posts?.length === 1 ? 'artigo encontrado' : 'artigos encontrados'}
        </p>
      </div>

      <div className="grid gap-6">
        {posts?.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-gray-600">Nenhum post encontrado nesta categoria ainda.</p>
            </CardContent>
          </Card>
        ) : (
          posts?.map((post) => (
            <Card key={post.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <Link to={`/app/post/${post.id}`}>
                <div className="flex flex-col md:flex-row">
                  {post.image_url && (
                    <div className="md:w-1/3">
                      <img 
                        src={post.image_url} 
                        alt={post.title}
                        className="w-full h-48 md:h-full object-cover rounded-l-lg"
                      />
                    </div>
                  )}
                  <div className={`${post.image_url ? 'md:w-2/3' : 'w-full'}`}>
                    <CardHeader>
                      <CardTitle className="text-xl hover:text-terracotta transition-colors">
                        {post.title}
                      </CardTitle>
                      <CardDescription className="flex items-center space-x-4 text-sm">
                        <span className="flex items-center">
                          <User className="w-4 h-4 mr-1" />
                          {post.author}
                        </span>
                        <span className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {new Date(post.created_at).toLocaleDateString('pt-BR')}
                        </span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 line-clamp-3">
                        {post.content.substring(0, 200)}...
                      </p>
                      <Button 
                        variant="link" 
                        className="p-0 h-auto text-terracotta mt-2 hover:text-terracotta/80"
                      >
                        Ler mais →
                      </Button>
                    </CardContent>
                  </div>
                </div>
              </Link>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}