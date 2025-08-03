-- Create community posts table
CREATE TABLE public.community_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  category TEXT NOT NULL,
  content TEXT NOT NULL,
  is_anonymous BOOLEAN DEFAULT false,
  allow_private_messages BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create community comments table
CREATE TABLE public.community_comments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID REFERENCES public.community_posts(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  is_anonymous BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create community reactions table (for "Te entendo" button)
CREATE TABLE public.community_reactions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID REFERENCES public.community_posts(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  reaction_type TEXT DEFAULT 'heart',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(post_id, user_id)
);

-- Create saved posts table
CREATE TABLE public.saved_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  post_id UUID REFERENCES public.community_posts(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, post_id)
);

-- Enable RLS
ALTER TABLE public.community_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_reactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_posts ENABLE ROW LEVEL SECURITY;

-- RLS Policies for community_posts
CREATE POLICY "Anyone can view community posts" 
ON public.community_posts 
FOR SELECT 
USING (true);

CREATE POLICY "Authenticated users can create posts" 
ON public.community_posts 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own posts" 
ON public.community_posts 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own posts" 
ON public.community_posts 
FOR DELETE 
USING (auth.uid() = user_id);

-- RLS Policies for community_comments
CREATE POLICY "Anyone can view comments" 
ON public.community_comments 
FOR SELECT 
USING (true);

CREATE POLICY "Authenticated users can create comments" 
ON public.community_comments 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own comments" 
ON public.community_comments 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own comments" 
ON public.community_comments 
FOR DELETE 
USING (auth.uid() = user_id);

-- RLS Policies for community_reactions
CREATE POLICY "Anyone can view reactions" 
ON public.community_reactions 
FOR SELECT 
USING (true);

CREATE POLICY "Authenticated users can create reactions" 
ON public.community_reactions 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own reactions" 
ON public.community_reactions 
FOR DELETE 
USING (auth.uid() = user_id);

-- RLS Policies for saved_posts
CREATE POLICY "Users can view their own saved posts" 
ON public.saved_posts 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can save posts" 
ON public.saved_posts 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove saved posts" 
ON public.saved_posts 
FOR DELETE 
USING (auth.uid() = user_id);

-- Add trigger for timestamp updates
CREATE TRIGGER update_community_posts_updated_at
BEFORE UPDATE ON public.community_posts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_community_comments_updated_at
BEFORE UPDATE ON public.community_comments
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_community_posts_category ON public.community_posts(category);
CREATE INDEX idx_community_posts_created_at ON public.community_posts(created_at DESC);
CREATE INDEX idx_community_comments_post_id ON public.community_comments(post_id);
CREATE INDEX idx_community_reactions_post_id ON public.community_reactions(post_id);