import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  category: string;
  image_url?: string;
  audio_url?: string;
  introduction?: string;
}

interface SearchResult {
  post: Post;
  matchedSentences: string[];
}

interface SearchResultsProps {
  results: SearchResult[];
  searchTerm: string;
}

export function SearchResults({ results, searchTerm }: SearchResultsProps) {
  const navigate = useNavigate();

  const handlePostClick = (postId: string) => {
    navigate(`/app/post/${postId}`);
  };

  if (results.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">
          Nenhum resultado encontrado para "{searchTerm}"
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        {results.length} {results.length === 1 ? 'resultado encontrado' : 'resultados encontrados'} para "{searchTerm}"
      </p>
      
      <div className="space-y-3">
        {results.map(({ post, matchedSentences }) => (
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
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-medium line-clamp-2 flex-1">
                      {post.title}
                    </h3>
                    <Badge variant="secondary" className="ml-2 text-xs">
                      {post.category}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2 mb-3">
                    {matchedSentences.map((sentence, index) => (
                      <p 
                        key={index}
                        className="text-sm text-muted-foreground line-clamp-2"
                        dangerouslySetInnerHTML={{ __html: sentence }}
                      />
                    ))}
                  </div>
                  
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
    </div>
  );
}