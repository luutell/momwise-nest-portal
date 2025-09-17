-- Create table for elimination tracking
CREATE TABLE public.elimination_entries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  elimination_type TEXT NOT NULL, -- 'xixi', 'coco', 'ambos'
  location TEXT NOT NULL, -- 'penico', 'vaso', 'fralda', 'acidente', 'outro'
  status TEXT NOT NULL DEFAULT 'capturada', -- 'capturada', 'perdida'
  signals_observed TEXT[], -- array de sinais observados
  activity_before TEXT, -- 'dormindo', 'mamando', 'brincando', 'chorando', 'outro'
  baby_mood TEXT, -- 'calmo', 'agitado', 'chorando', 'neutro'
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.elimination_entries ENABLE ROW LEVEL SECURITY;

-- Create policies for user access
CREATE POLICY "Users can view their own elimination entries" 
ON public.elimination_entries 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own elimination entries" 
ON public.elimination_entries 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own elimination entries" 
ON public.elimination_entries 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own elimination entries" 
ON public.elimination_entries 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_elimination_entries_updated_at
BEFORE UPDATE ON public.elimination_entries
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for better performance on user queries
CREATE INDEX idx_elimination_entries_user_id_timestamp ON public.elimination_entries(user_id, timestamp DESC);