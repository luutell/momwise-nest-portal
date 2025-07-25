import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { ThumbsUp, ThumbsDown, Sparkles } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface PostFeedbackProps {
  postId: string;
}

interface FeedbackStats {
  total_feedback: number;
  helpful_percentage: number;
}

export default function PostFeedback({ postId }: PostFeedbackProps) {
  const [feedback, setFeedback] = useState<boolean | null>(null);
  const [suggestion, setSuggestion] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const queryClient = useQueryClient();

  // Buscar estatísticas do feedback
  const { data: stats } = useQuery({
    queryKey: ['post-feedback-stats', postId],
    queryFn: async () => {
      const { data, error } = await supabase
        .rpc('get_post_feedback_stats', { post_uuid: postId });
      
      if (error) throw error;
      return data[0] as FeedbackStats;
    }
  });

  // Enviar feedback
  const submitFeedback = useMutation({
    mutationFn: async () => {
      if (feedback === null) return;
      
      const { error } = await supabase
        .from('post_feedback')
        .insert({
          post_id: postId,
          is_helpful: feedback,
          suggestion: suggestion.trim() || null
        });

      if (error) throw error;
    },
    onSuccess: () => {
      setSubmitted(true);
      queryClient.invalidateQueries({ queryKey: ['post-feedback-stats', postId] });
      toast({
        title: "Obrigada pelo feedback!",
        description: "Sua opinião nos ajuda a melhorar nossos conteúdos.",
      });
    },
    onError: () => {
      toast({
        title: "Erro ao enviar feedback",
        description: "Tente novamente em alguns momentos.",
        variant: "destructive"
      });
    }
  });

  if (submitted) {
    return (
      <Card className="bg-terracotta/5 border-terracotta/20">
        <CardContent className="p-6 text-center">
          <Sparkles className="w-8 h-8 text-terracotta mx-auto mb-3" />
          <h3 className="font-semibold text-gray-900 mb-2">
            Obrigada pelo seu feedback!
          </h3>
          <p className="text-gray-600 text-sm">
            Sua opinião é muito importante para nós.
          </p>
          {stats && stats.total_feedback > 0 && (
            <p className="text-terracotta font-medium mt-3 flex items-center justify-center">
              <Sparkles className="w-4 h-4 mr-1" />
              {stats.helpful_percentage}% das mães acharam este conteúdo valioso!
            </p>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-gray-200">
      <CardContent className="p-6">
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">
              Esse conteúdo foi útil para você?
            </h3>
            <div className="flex gap-3">
              <Button
                variant={feedback === true ? "default" : "outline"}
                size="sm"
                onClick={() => setFeedback(true)}
                className="flex items-center space-x-2"
              >
                <ThumbsUp className="w-4 h-4" />
                <span>Sim</span>
              </Button>
              <Button
                variant={feedback === false ? "default" : "outline"}
                size="sm"
                onClick={() => setFeedback(false)}
                className="flex items-center space-x-2"
              >
                <ThumbsDown className="w-4 h-4" />
                <span>Não</span>
              </Button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quer deixar uma sugestão, fazer uma pergunta ou contar sua experiência?
              <span className="text-gray-500 text-xs block mt-1">
                (Opcional - até 500 caracteres)
              </span>
            </label>
            <Textarea
              placeholder="Conte para nós sua experiência ou deixe uma sugestão..."
              value={suggestion}
              onChange={(e) => setSuggestion(e.target.value)}
              maxLength={500}
              className="resize-none"
              rows={3}
            />
            <div className="text-xs text-gray-500 mt-1 text-right">
              {suggestion.length}/500
            </div>
          </div>

          <Button
            onClick={() => submitFeedback.mutate()}
            disabled={feedback === null || submitFeedback.isPending}
            className="w-full"
          >
            {submitFeedback.isPending ? 'Enviando...' : 'Enviar Feedback'}
          </Button>

          {stats && stats.total_feedback > 0 && (
            <div className="text-center pt-3 border-t border-gray-100">
              <p className="text-terracotta font-medium flex items-center justify-center">
                <Sparkles className="w-4 h-4 mr-1" />
                {stats.helpful_percentage}% das mães acharam este conteúdo valioso!
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Baseado em {stats.total_feedback} avaliações
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}