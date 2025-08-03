-- Add language field to posts table
ALTER TABLE public.posts ADD COLUMN language TEXT DEFAULT 'pt' CHECK (language IN ('pt', 'en'));

-- Add currency field to subscribers table to track payment currency
ALTER TABLE public.subscribers ADD COLUMN payment_currency TEXT DEFAULT 'BRL' CHECK (payment_currency IN ('BRL', 'USD'));

-- Update existing posts with language based on content
UPDATE public.posts 
SET language = 'en' 
WHERE title LIKE '%Sleep%' OR title LIKE '%Why%' OR introduction LIKE '%baby%' OR content LIKE '%babies%';

UPDATE public.posts 
SET language = 'pt' 
WHERE language IS NULL OR title LIKE '%sono%' OR title LIKE '%bebê%' OR title LIKE '%Por que%';