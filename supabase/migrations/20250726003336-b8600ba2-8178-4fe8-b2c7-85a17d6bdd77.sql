-- Criar tabela para conteúdos do calendário
CREATE TABLE public.calendar_contents (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  content_type TEXT NOT NULL CHECK (content_type IN ('video', 'audio', 'article', 'activity', 'tip')),
  content_url TEXT,
  content_data JSONB,
  thumbnail_url TEXT,
  duration_minutes INTEGER,
  category TEXT NOT NULL,
  maternity_phase TEXT NOT NULL CHECK (maternity_phase IN ('pregnancy', 'newborn', 'infant', 'toddler', 'general')),
  baby_age_min_days INTEGER,
  baby_age_max_days INTEGER,
  is_premium BOOLEAN DEFAULT false,
  day_of_week INTEGER CHECK (day_of_week BETWEEN 0 AND 6), -- 0 = domingo, 6 = sábado
  week_offset INTEGER DEFAULT 0, -- Semana relativa ao nascimento
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar índices para performance
CREATE INDEX idx_calendar_contents_phase ON public.calendar_contents(maternity_phase);
CREATE INDEX idx_calendar_contents_age_range ON public.calendar_contents(baby_age_min_days, baby_age_max_days);
CREATE INDEX idx_calendar_contents_day_week ON public.calendar_contents(day_of_week);

-- Habilitar RLS
ALTER TABLE public.calendar_contents ENABLE ROW LEVEL SECURITY;

-- Política para visualizar conteúdos (todos podem ver)
CREATE POLICY "Calendar contents are viewable by everyone" 
ON public.calendar_contents 
FOR SELECT 
USING (true);

-- Trigger para atualizar updated_at
CREATE TRIGGER update_calendar_contents_updated_at
BEFORE UPDATE ON public.calendar_contents
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Inserir alguns conteúdos de exemplo
INSERT INTO public.calendar_contents (
  title, description, content_type, category, maternity_phase, 
  baby_age_min_days, baby_age_max_days, day_of_week, week_offset,
  content_data, is_premium
) VALUES 
-- Recém-nascido (0-28 dias)
('Primeiros cuidados com o recém-nascido', 'Aprenda os cuidados essenciais nos primeiros dias', 'video', 'Cuidados Básicos', 'newborn', 0, 7, 1, 0, '{"duration": "15 min", "expert": "Dra. Ana Silva"}', false),
('Amamentação: primeiros dias', 'Dicas para estabelecer a amamentação', 'video', 'Amamentação', 'newborn', 0, 14, 3, 0, '{"duration": "20 min", "expert": "Consultora em Aleitamento"}', false),
('Relaxamento para mães', 'Técnicas de respiração e relaxamento', 'audio', 'Autocuidado', 'newborn', 0, 28, 5, 0, '{"duration": "10 min", "type": "meditation"}', false),

-- Bebê 1-3 meses
('Desenvolvimento motor: 2 meses', 'Marcos do desenvolvimento aos 2 meses', 'article', 'Desenvolvimento', 'infant', 30, 90, 2, 4, '{"reading_time": "5 min"}', false),
('Rotina de sono: 3 meses', 'Como estabelecer uma rotina de sono', 'video', 'Sono', 'infant', 60, 120, 4, 8, '{"duration": "25 min", "expert": "Consultora do Sono"}', true),
('Massagem relaxante para bebês', 'Técnicas de massagem para acalmar', 'video', 'Cuidados Básicos', 'infant', 30, 120, 6, 6, '{"duration": "12 min", "expert": "Fisioterapeuta"}', false),

-- Bebê 4-6 meses
('Introdução alimentar: começando', 'Primeiros alimentos do bebê', 'video', 'Alimentação', 'infant', 120, 180, 1, 16, '{"duration": "30 min", "expert": "Nutricionista Infantil"}', true),
('Brincadeiras sensoriais', 'Atividades para estimular os sentidos', 'activity', 'Desenvolvimento', 'infant', 120, 180, 3, 16, '{"materials": ["tecidos", "chocalhos"], "duration": "20 min"}', false),
('Autocuidado materno', 'Encontrando tempo para si mesma', 'article', 'Autocuidado', 'infant', 120, 180, 5, 16, '{"reading_time": "8 min"}', false);

-- Função para calcular a fase da maternidade
CREATE OR REPLACE FUNCTION public.get_maternity_phase(baby_birth_date DATE)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
AS $$
DECLARE
  baby_age_days INTEGER;
BEGIN
  IF baby_birth_date IS NULL THEN
    RETURN 'general';
  END IF;
  
  baby_age_days := EXTRACT(DAY FROM (CURRENT_DATE - baby_birth_date));
  
  IF baby_age_days < 0 THEN
    RETURN 'pregnancy';
  ELSIF baby_age_days <= 28 THEN
    RETURN 'newborn';
  ELSIF baby_age_days <= 365 THEN
    RETURN 'infant';
  ELSIF baby_age_days <= 1095 THEN -- 3 anos
    RETURN 'toddler';
  ELSE
    RETURN 'general';
  END IF;
END;
$$;

-- Função para buscar conteúdos personalizados do calendário
CREATE OR REPLACE FUNCTION public.get_personalized_calendar_content(
  user_baby_birth_date DATE,
  target_date DATE
)
RETURNS TABLE(
  id UUID,
  title TEXT,
  description TEXT,
  content_type TEXT,
  content_url TEXT,
  content_data JSONB,
  thumbnail_url TEXT,
  duration_minutes INTEGER,
  category TEXT,
  is_premium BOOLEAN
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
AS $$
DECLARE
  baby_age_days INTEGER;
  maternity_phase TEXT;
  day_of_week INTEGER;
  week_offset INTEGER;
BEGIN
  -- Calcular idade do bebê e fase
  IF user_baby_birth_date IS NULL THEN
    baby_age_days := 0;
    maternity_phase := 'general';
    week_offset := 0;
  ELSE
    baby_age_days := EXTRACT(DAY FROM (target_date - user_baby_birth_date));
    maternity_phase := public.get_maternity_phase(user_baby_birth_date);
    week_offset := EXTRACT(WEEK FROM (target_date - user_baby_birth_date));
  END IF;
  
  day_of_week := EXTRACT(DOW FROM target_date); -- 0 = domingo
  
  RETURN QUERY
  SELECT 
    cc.id,
    cc.title,
    cc.description,
    cc.content_type,
    cc.content_url,
    cc.content_data,
    cc.thumbnail_url,
    cc.duration_minutes,
    cc.category,
    cc.is_premium
  FROM public.calendar_contents cc
  WHERE 
    cc.maternity_phase = maternity_phase
    AND (cc.baby_age_min_days IS NULL OR baby_age_days >= cc.baby_age_min_days)
    AND (cc.baby_age_max_days IS NULL OR baby_age_days <= cc.baby_age_max_days)
    AND (cc.day_of_week IS NULL OR cc.day_of_week = day_of_week)
  ORDER BY 
    CASE WHEN cc.week_offset = week_offset THEN 1 ELSE 2 END,
    cc.created_at DESC
  LIMIT 1;
END;
$$;