-- Create storage buckets for posts
INSERT INTO storage.buckets (id, name, public) 
VALUES 
  ('post-images', 'post-images', true),
  ('post-audio', 'post-audio', true);

-- Create storage policies for post images
CREATE POLICY "Post images are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'post-images');

CREATE POLICY "Admins can upload post images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'post-images');

CREATE POLICY "Admins can update post images" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'post-images');

CREATE POLICY "Admins can delete post images" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'post-images');

-- Create storage policies for post audio
CREATE POLICY "Post audio are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'post-audio');

CREATE POLICY "Admins can upload post audio" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'post-audio');

CREATE POLICY "Admins can update post audio" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'post-audio');

CREATE POLICY "Admins can delete post audio" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'post-audio');