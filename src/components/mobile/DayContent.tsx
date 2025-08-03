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
      
      const { data, error } = await supabase
        .from('posts')
        .select('id')
        .eq('category', content.category)
        .eq('published', true)
        .limit(1);
      
      if (error) {
        console.error('Error finding corresponding post:', error);
        return null;
      }
      
      // Return the first post in the same category
      return data && data.length > 0 ? data[0] : null;
    },
    enabled: content.content_type === 'article'
  });

  const handleActionClick = () => {
    if (content.content_type === 'article' && correspondingPost?.id) {
      // Navigate to the post detail page
      navigate(`/app/post/${correspondingPost.id}`);
    } else if (content.content_url) {
      // Open external URL
      window.open(content.content_url, '_blank');
    } else {
      // Show content inline or handle other content types
      console.log('Showing content:', content);
    }
  };
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