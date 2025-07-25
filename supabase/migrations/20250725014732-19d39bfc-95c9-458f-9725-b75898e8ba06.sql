-- Adicionar novos campos à tabela posts
ALTER TABLE public.posts 
ADD COLUMN introduction TEXT,
ADD COLUMN practical_tip TEXT,
ADD COLUMN audio_url TEXT;

-- Criar tabela para feedback dos posts
CREATE TABLE public.post_feedback (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
  user_id UUID,
  is_helpful BOOLEAN NOT NULL,
  suggestion TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on post_feedback
ALTER TABLE public.post_feedback ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para post_feedback
CREATE POLICY "Anyone can read feedback stats" 
ON public.post_feedback 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can insert feedback" 
ON public.post_feedback 
FOR INSERT 
WITH CHECK (true);

-- Criar função para calcular estatísticas de feedback
CREATE OR REPLACE FUNCTION public.get_post_feedback_stats(post_uuid UUID)
RETURNS TABLE (
  total_feedback BIGINT,
  helpful_percentage NUMERIC
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COUNT(*) as total_feedback,
    CASE 
      WHEN COUNT(*) = 0 THEN 0
      ELSE ROUND((COUNT(*) FILTER (WHERE is_helpful = true) * 100.0 / COUNT(*)), 0)
    END as helpful_percentage
  FROM public.post_feedback
  WHERE post_id = post_uuid;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;