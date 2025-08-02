import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookOpen, Clock, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  category: string;
  image_url?: string;
  audio_url?: string;
  introduction?: string;
  practical_tip?: string;
  published: boolean;
  created_at: string;
}

const categoryIcons = {
  'Sono do Bebê': '🛌',
  'Entendendo o Bebê': '🧠',
  'Primeiras Mordidas': '🍽',
  'No seu Tempo': '💪',
  'Amamentação e Acolhimento': '🤱',
  'Mãe Inteira': '🛀',
  'Entre Mães': '🤝',
  'Higiene Natural': '🚼'
};

const categories = [
  'Sono do Bebê',
  'Entendendo o Bebê',
  'Primeiras Mordidas',
  'No seu Tempo',
  'Amamentação e Acolhimento',
  'Mãe Inteira',
  'Entre Mães',
  'Higiene Natural'
];

export default function Biblioteca() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const navigate = useNavigate();
  const { t } = useLanguage();

  // Fetch all published posts
  const { data: posts, isLoading } = useQuery({
    queryKey: ['published-posts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Post[];
    }
  });

  // Filter posts by selected category
  const filteredPosts = selectedCategory 
    ? posts?.filter(post => post.category === selectedCategory)
    : posts;

  // Group posts by category for overview
  const postsByCategory = posts?.reduce((acc, post) => {
    if (!acc[post.category]) {
      acc[post.category] = [];
    }
    acc[post.category].push(post);
    return acc;
  }, {} as Record<string, Post[]>) || {};

  const handlePostClick = (postId: string) => {
    navigate(`/app/post/${postId}`);
  };

  const handleCategoryClick = (category: string) => {
    const slug = category.toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/ã/g, 'a')
      .replace(/ê/g, 'e')
      .replace(/ç/g, 'c');
    navigate(`/app/${slug}`);
  };

  if (isLoading) {
    return (
      <div className="p-4 space-y-4">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="font-playfair text-2xl text-foreground">{t('app.biblioteca.title')}</h1>
          {selectedCategory && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setSelectedCategory(null)}
            >
              Ver todas
            </Button>
          )}
        </div>

        {!selectedCategory ? (
          // Category overview
          <div className="space-y-4">
            <p className="text-muted-foreground">
              {t('language') === 'en' ? 'Explore content organized by category' : 'Explore conteúdos organizados por categoria'}
            </p>
            
            <div className="grid gap-3">
              {categories.map((category) => {
                const categoryPosts = postsByCategory[category] || [];
                return (
                  <Card 
                    key={category} 
                    className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => handleCategoryClick(category)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">
                            {categoryIcons[category as keyof typeof categoryIcons]}
                          </span>
                          <div>
                            <h3 className="font-medium">{category}</h3>
                            <p className="text-sm text-muted-foreground">
                              {categoryPosts.length} artigo{categoryPosts.length !== 1 ? 's' : ''}
                            </p>
                          </div>
                        </div>
                        <Badge variant="secondary">
                          {categoryPosts.length}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        ) : (
          // Posts in selected category
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">
                {categoryIcons[selectedCategory as keyof typeof categoryIcons]}
              </span>
              <h2 className="font-playfair text-xl">{selectedCategory}</h2>
            </div>
            
            {filteredPosts?.length === 0 ? (
              <Card>
                <CardContent className="p-6 text-center">
                  <BookOpen className="w-12 h-12 mx-auto text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">
                    Nenhum conteúdo encontrado nesta categoria
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-3">
                {filteredPosts?.map((post) => (
                  <Card 
                    key={post.id}
                    className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => handlePostClick(post.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex space-x-3">
                        {post.image_url && (
                          <img 
                            src={post.image_url} 
                            alt={post.title}
                            className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium line-clamp-2 mb-1">
                            {post.title}
                          </h3>
                          <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                            {post.introduction || post.content.substring(0, 100) + '...'}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">
                              Por {post.author}
                            </span>
                            <div className="flex items-center space-x-2">
                              {post.audio_url && (
                                <div className="flex items-center space-x-1">
                                  <Play className="w-3 h-3 text-primary" />
                                  <span className="text-xs text-primary">Áudio</span>
                                </div>
                              )}
                              <Clock className="w-3 h-3 text-muted-foreground" />
                              <span className="text-xs text-muted-foreground">
                                {Math.ceil(post.content.length / 200)} min
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}