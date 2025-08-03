import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Play, BookOpen, Headphones, Clock, Star, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface CalendarContent {
  id: string;
  title: string;
  description: string;
  content_type: string;
  category: string;
  duration_minutes?: number;
  is_premium: boolean;
  content_url?: string;
  thumbnail_url?: string;
  content_data?: {
    expert?: string;
    tips?: string[];
    full_content?: string;
  };
}

interface DayContentProps {
  content: CalendarContent;
  date: Date;
  onBack: () => void;
}

const DayContent = ({ content, date, onBack }: DayContentProps) => {
  const navigate = useNavigate();
  
  // Try to find corresponding post for articles
  const { data: correspondingPost } = useQuery({
    queryKey: ['corresponding-post', content.title, content.category],
    queryFn: async () => {
      if (content.content_type !== 'article') return null;
      
      console.log('🔍 Looking for corresponding post for:', content.title, 'in category:', content.category);
      
      const { data, error } = await supabase
        .from('posts')
        .select('id, title')
        .eq('category', content.category)
        .eq('published', true)
        .limit(1);
      
      if (error) {
        console.error('❌ Error finding corresponding post:', error);
        return null;
      }
      
      console.log('✅ Found posts in category:', data);
      
      // Return the first post in the same category
      const result = data && data.length > 0 ? data[0] : null;
      console.log('📖 Using post:', result);
      return result;
    },
    enabled: content.content_type === 'article'
  });

  const handleActionClick = () => {
    console.log('🖱️ Action clicked! Content type:', content.content_type);
    console.log('📝 Corresponding post:', correspondingPost);
    
    if (content.content_type === 'article' && correspondingPost?.id) {
      console.log('➡️ Navigating to post:', correspondingPost.id);
      // Navigate to the post detail page
      navigate(`/app/post/${correspondingPost.id}`);
    } else if (content.content_url) {
      console.log('🔗 Opening external URL:', content.content_url);
      // Open external URL
      window.open(content.content_url, '_blank');
    } else if (content.content_type === 'article') {
      // If no corresponding post found, show expanded content inline
      console.log('📖 Showing content inline');
      setShowExpandedContent(true);
    } else {
      console.log('❓ No action available for this content');
      console.log('Content details:', content);
    }
  };

  const [showExpandedContent, setShowExpandedContent] = useState(false);
  const getContentIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Play className="w-5 h-5" />;
      case 'article':
        return <BookOpen className="w-5 h-5" />;
      case 'audio':
        return <Headphones className="w-5 h-5" />;
      default:
        return <BookOpen className="w-5 h-5" />;
    }
  };

  const getContentTypeColor = (type: string) => {
    switch (type) {
      case 'video':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'audio':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'article':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getActionText = (type: string) => {
    switch (type) {
      case 'video':
        return 'Assistir vídeo';
      case 'audio':
        return 'Ouvir áudio';
      case 'article':
        return 'Ler artigo';
      default:
        return 'Ver conteúdo';
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-sage/10">
      <div className="p-4 space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="font-playfair text-xl font-semibold">Conteúdo do Dia</h1>
            <p className="text-sm text-muted-foreground capitalize">
              {formatDate(date)}
            </p>
          </div>
        </div>

        {/* Content Card */}
        <Card className="border-none shadow-lg">
          {content.thumbnail_url && (
            <div className="w-full h-48 bg-muted rounded-t-lg overflow-hidden">
              <img 
                src={content.thumbnail_url} 
                alt={content.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          <CardHeader className="pb-4">
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <CardTitle className="font-playfair text-xl leading-tight pr-2">
                  {content.title}
                </CardTitle>
                {content.is_premium && (
                  <Badge variant="outline" className="text-yellow-600 border-yellow-600 flex-shrink-0">
                    <Star className="w-3 h-3 mr-1" />
                    Premium
                  </Badge>
                )}
              </div>
              
              <div className="flex items-center space-x-3">
                <Badge className={getContentTypeColor(content.content_type)}>
                  {getContentIcon(content.content_type)}
                  <span className="ml-1 capitalize">{content.content_type}</span>
                </Badge>
                
                {content.duration_minutes && (
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="w-3 h-3 mr-1" />
                    {content.duration_minutes} min
                  </div>
                )}
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <div>
              <p className="text-foreground leading-relaxed">
                {content.description}
              </p>
            </div>

            {content.content_data?.expert && (
              <div className="bg-primary/5 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Heart className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-primary">Com especialista</span>
                </div>
                <p className="text-sm text-foreground">
                  {content.content_data.expert}
                </p>
              </div>
            )}

            {content.content_data?.tips && content.content_data.tips.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-medium text-foreground">Dicas importantes:</h4>
                <ul className="space-y-2">
                  {content.content_data.tips.map((tip, index) => (
                    <li key={index} className="flex items-start space-x-2 text-sm">
                      <span className="text-primary">•</span>
                      <span className="text-foreground">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="pt-4">
              <Button size="lg" className="w-full" onClick={handleActionClick}>
                {getContentIcon(content.content_type)}
                <span className="ml-2">{getActionText(content.content_type)}</span>
              </Button>
            </div>

            {/* Show expanded content if no post found */}
            {showExpandedContent && content.content_data?.full_content && (
              <div className="mt-6 p-4 bg-primary/5 rounded-lg border">
                <h4 className="font-medium text-foreground mb-3">Conteúdo completo:</h4>
                <div className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
                  {content.content_data.full_content}
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setShowExpandedContent(false)}
                  className="mt-3"
                >
                  Fechar
                </Button>
              </div>
            )}

            <div className="text-center">
              <Badge variant="secondary" className="text-xs">
                {content.category}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Related Actions */}
        <Card className="border-none shadow-sm">
          <CardContent className="p-4">
            <div className="space-y-3">
              <h4 className="font-medium text-foreground">Depois de consumir este conteúdo:</h4>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" size="sm">
                  ❤️ Gostei
                </Button>
                <Button variant="outline" size="sm">
                  💬 Comentar
                </Button>
                <Button variant="outline" size="sm">
                  📌 Salvar
                </Button>
                <Button variant="outline" size="sm">
                  📤 Compartilhar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DayContent;