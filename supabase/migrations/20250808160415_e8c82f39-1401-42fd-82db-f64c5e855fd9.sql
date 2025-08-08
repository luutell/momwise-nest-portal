-- Create table for breastfeeding sessions
CREATE TABLE public.breastfeeding_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  start_time TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  end_time TIMESTAMP WITH TIME ZONE,
  duration_seconds INTEGER NOT NULL,
  side TEXT NOT NULL CHECK (side IN ('left', 'right', 'both')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.breastfeeding_sessions ENABLE ROW LEVEL SECURITY;

-- Create policies for user access
CREATE POLICY "Users can view their own breastfeeding sessions" 
ON public.breastfeeding_sessions 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own breastfeeding sessions" 
ON public.breastfeeding_sessions 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own breastfeeding sessions" 
ON public.breastfeeding_sessions 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own breastfeeding sessions" 
ON public.breastfeeding_sessions 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_breastfeeding_sessions_updated_at
BEFORE UPDATE ON public.breastfeeding_sessions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();