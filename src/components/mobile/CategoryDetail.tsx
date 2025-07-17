import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookOpen, Play, Heart } from 'lucide-react';
import AudioPlayer from './AudioPlayer';

interface Article {
  id: string;
  title: string;
  excerpt: string;
  readTime: string;
  type: 'article' | 'audio' | 'reflection';
  duration?: string;
}

interface CategoryDetailProps {
  categoryId: string;
  title: string;
  description: string;
  onBack: () => void;
}

const sampleContent: Record<string, Article[]> = {
  breastfeeding: [
    {
      id: '1',
      title: 'Understanding Your Baby\'s Feeding Cues',
      excerpt: 'Learn to recognize early hunger signs and trust your instincts in feeding your little one.',
      readTime: '4 min read',
      type: 'article'
    },
    {
      id: '2',
      title: 'Guided Breathing for Nursing',
      excerpt: 'A gentle 5-minute breathing exercise to help you relax during feeding time.',
      readTime: '5 min',
      type: 'audio',
      duration: '5:23'
    },
    {
      id: '3',
      title: 'Reflection: Your Feeding Journey',
      excerpt: 'Take a moment to honor your breastfeeding experience and acknowledge your strength.',
      readTime: '3 min',
      type: 'reflection'
    }
  ],
  sleep: [
    {
      id: '1',
      title: 'Creating Sacred Sleep Rhythms',
      excerpt: 'Discover how to honor your baby\'s natural sleep patterns while caring for your own rest.',
      readTime: '6 min read',
      type: 'article'
    },
    {
      id: '2',
      title: 'Bedtime Meditation for Mother & Baby',
      excerpt: 'A soothing audio guide to help both you and your baby transition into peaceful sleep.',
      readTime: '8 min',
      type: 'audio',
      duration: '8:15'
    }
  ]
};

const CategoryDetail = ({ categoryId, title, description, onBack }: CategoryDetailProps) => {
  const articles = sampleContent[categoryId] || [];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'article': return <BookOpen className="w-4 h-4" />;
      case 'audio': return <Play className="w-4 h-4" />;
      case 'reflection': return <Heart className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'article': return 'bg-sage/20 text-sage';
      case 'audio': return 'bg-terracotta/20 text-terracotta';
      case 'reflection': return 'bg-primary/20 text-primary';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-warm-white">
      {/* Header */}
      <div className="bg-gradient-warm text-primary-foreground p-4 pb-6">
        <div className="flex items-center mb-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onBack}
            className="text-primary-foreground hover:bg-primary-foreground/20 mr-3"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="font-playfair text-xl font-semibold">{title}</h1>
        </div>
        <p className="text-primary-foreground/90 text-sm">
          {description}
        </p>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* This Week's Focus */}
        <Card className="mb-6 border-none shadow-gentle bg-gradient-soft">
          <CardContent className="p-4">
            <h3 className="font-playfair font-medium mb-2">This Week in {title}</h3>
            <p className="text-sm text-muted-foreground">
              Focus on trusting your instincts and finding your unique rhythm together.
            </p>
          </CardContent>
        </Card>

        {/* Audio Featured Content */}
        {articles.find(a => a.type === 'audio') && (
          <div className="mb-6">
            <h3 className="font-playfair text-lg font-medium mb-4">Featured Audio</h3>
            <AudioPlayer
              title="Guided Breathing for Nursing"
              duration="5:23"
              description="A gentle 5-minute breathing exercise to help you relax during feeding time."
            />
          </div>
        )}

        {/* Articles & Content */}
        <div className="space-y-4">
          <h3 className="font-playfair text-lg font-medium">Gentle Guidance</h3>
          
          {articles.map((article) => (
            <Card key={article.id} className="border-none shadow-gentle hover:shadow-soft transition-shadow cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <Badge className={getTypeColor(article.type)}>
                    <span className="flex items-center space-x-1">
                      {getTypeIcon(article.type)}
                      <span className="capitalize">{article.type}</span>
                    </span>
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {article.duration || article.readTime}
                  </span>
                </div>
                
                <h4 className="font-playfair font-medium mb-2 text-sm">
                  {article.title}
                </h4>
                
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {article.excerpt}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Community Stories */}
        <div className="mt-8">
          <h3 className="font-playfair text-lg font-medium mb-4">From Our Community</h3>
          <Card className="border-none shadow-gentle">
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                <div>
                  <h4 className="font-medium text-sm mb-1">Sarah's Story</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    "I learned to trust my body's wisdom and my baby's natural rhythms. It wasn't always easy, but it was always worth it."
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CategoryDetail;