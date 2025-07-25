import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, User, Tag, Volume2 } from 'lucide-react';
import AudioPlayer from '@/components/mobile/AudioPlayer';
import PostFeedback from '@/components/mobile/PostFeedback';

interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  category: string;
  image_url?: string;
  published: boolean;
  created_at: string;
  introduction?: string;
  practical_tip?: string;
  audio_url?: string;
}

export default function PostDetail() {
  const { id } = useParams<{ id: string }>();
  
  const { data: post, isLoading } = useQuery({
    queryKey: ['post', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', id)
        .eq('published', true)
        .single();
      
      if (error) throw error;
      return data as Post;
    },
    enabled: !!id
  });

  if (isLoading) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="text-center py-8">Carregando post...</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">Post não encontrado.</p>
          <Link to="/app">
            <Button variant="outline">Voltar ao início</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <Link 
          to={`/app/${post.category.toLowerCase()}`} 
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar para {post.category}
        </Link>
      </div>

      <article className="bg-white rounded-lg shadow-sm">
        {post.image_url && (
          <div className="mb-6">
            <img 
              src={post.image_url} 
              alt={post.title}
              className="w-full h-64 md:h-96 object-cover rounded-lg"
            />
          </div>
        )}

        <div className="space-y-4">
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <span className="flex items-center">
              <Tag className="w-4 h-4 mr-1" />
              {post.category}
            </span>
            <span className="flex items-center">
              <User className="w-4 h-4 mr-1" />
              {post.author}
            </span>
            <span className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              {new Date(post.created_at).toLocaleDateString('pt-BR')}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            {post.title}
          </h1>

          {post.introduction && (
            <div className="bg-terracotta/5 rounded-lg p-4 border-l-4 border-terracotta">
              <p className="text-gray-700 leading-relaxed font-medium">
                {post.introduction}
              </p>
            </div>
          )}

          {post.audio_url && (
            <div className="bg-sage/10 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <Volume2 className="w-5 h-5 text-sage mr-2" />
                <h3 className="font-semibold text-gray-900">Ouvir este conteúdo</h3>
              </div>
              <AudioPlayer
                title={post.title}
                duration="5:30"
                description="Versão em áudio narrada"
                audioUrl={post.audio_url}
              />
            </div>
          )}

          <div className="prose prose-lg max-w-none">
            <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
              {post.content}
            </div>
          </div>

          {post.practical_tip && (
            <div className="bg-sage/5 rounded-lg p-4 border-l-4 border-sage">
              <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                <span className="text-sage mr-2">💡</span>
                Dica Prática
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {post.practical_tip}
              </p>
            </div>
          )}
        </div>

        {/* Feedback Section */}
        <div className="mt-8">
          <PostFeedback postId={post.id} />
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <Link 
              to={`/app/${post.category.toLowerCase().replace(/\s+/g, '-')}`}
              className="text-terracotta hover:text-terracotta/80 font-medium"
            >
              ← Ver mais posts de {post.category}
            </Link>
            
            <Button 
              variant="outline"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              Voltar ao topo
            </Button>
          </div>
        </div>
      </article>
    </div>
  );
}