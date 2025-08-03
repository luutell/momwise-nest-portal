import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { Heart, MessageCircle, MoreHorizontal, Plus, Search, Bookmark, Flag, Share, ArrowLeft, Send, Trash, ChevronDown } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface CommunityPost {
  id: string;
  user_id: string;
  category: string;
  content: string;
  is_anonymous: boolean;
  allow_private_messages: boolean;
  created_at: string;
  comment_count?: number;
  reaction_count?: number;
  user_reacted?: boolean;
  user_saved?: boolean;
  is_recent?: boolean;
}

interface Profile {
  name: string;
}

const categories = [
  'All',
  'Breastfeeding & Comfort',
  'Baby Sleep',
  'First Bites',
  'In Your Own Time',
  'Complete Mother',
  'Natural Hygiene'
];

const quickComments = [
  "Thank you for sharing 💛",
  "I went through something similar",
  "Would you like to talk more about this?"
];

const emojiReactions = [
  { emoji: '🤍', label: 'I understand you', type: 'understanding' },
  { emoji: '🫂', label: 'You are not alone', type: 'support' },
  { emoji: '🌈', label: 'It gave me hope', type: 'hope' },
  { emoji: '💡', label: 'Useful tip', type: 'helpful' }
];

export default function EntreMaes() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const [showPostDetail, setShowPostDetail] = useState(false);
  const [selectedPost, setSelectedPost] = useState<CommunityPost | null>(null);
  const [newPost, setNewPost] = useState({
    category: '',
    content: '',
    is_anonymous: false,
    allow_private_messages: false
  });
  const [newComment, setNewComment] = useState({
    content: '',
    is_anonymous: false
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch posts with counts
  const { data: posts = [], isLoading, error } = useQuery({
    queryKey: ['community-posts', selectedCategory, searchQuery],
    queryFn: async () => {
      console.log('Buscando postagens...', { selectedCategory, searchQuery });
      
      // Primeiro uma consulta simples para verificar se o carregamento básico funciona
      let baseQuery = supabase
        .from('community_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (selectedCategory !== 'All') {
        baseQuery = baseQuery.eq('category', selectedCategory);
      }

      if (searchQuery) {
        baseQuery = baseQuery.ilike('content', `%${searchQuery}%`);
      }

      const { data: basePosts, error: baseError } = await baseQuery;
      console.log('Resultado da consulta base:', { basePosts, baseError });
      
      if (baseError) {
        console.error('Erro ao buscar postagens:', baseError);
        throw baseError;
      }

      if (!basePosts || basePosts.length === 0) {
        console.log('Nenhuma postagem encontrada');
        return [];
      }

      // Agora buscar dados adicionais para cada postagem
      const postsWithCounts = await Promise.all(
        basePosts.map(async (post) => {
          // Get current user
          const { data: { user } } = await supabase.auth.getUser();
          
          // Count comments
          const { count: commentCount } = await supabase
            .from('community_comments')
            .select('*', { count: 'exact', head: true })
            .eq('post_id', post.id);

          // Count reactions
          const { count: reactionCount } = await supabase
            .from('community_reactions')
            .select('*', { count: 'exact', head: true })
            .eq('post_id', post.id);

          // Check if user reacted (only if authenticated)
          let userReacted = false;
          if (user) {
            const { data: userReaction } = await supabase
              .from('community_reactions')
              .select('id')
              .eq('post_id', post.id)
              .eq('user_id', user.id)
              .maybeSingle();
            userReacted = !!userReaction;
          }

          // Check if user saved (only if authenticated)
          let userSaved = false;
          if (user) {
            const { data: savedPost } = await supabase
              .from('saved_posts')
              .select('id')
              .eq('post_id', post.id)
              .eq('user_id', user.id)
              .maybeSingle();
            userSaved = !!savedPost;
          }

          return {
            ...post,
            comment_count: commentCount || 0,
            reaction_count: reactionCount || 0,
            user_reacted: userReacted,
            user_saved: userSaved,
            is_recent: new Date(post.created_at) > new Date(Date.now() - 24 * 60 * 60 * 1000)
          };
        })
      );
      
      console.log('Postagens processadas:', postsWithCounts);
      return postsWithCounts;
    }
  });

  // Log any query errors
  React.useEffect(() => {
    if (error) {
      console.error('Erro na consulta de postagens:', error);
      toast({
        title: "Error loading posts",
        description: "There was a problem loading the posts. Please try again.",
        variant: "destructive",
      });
    }
  }, [error]);

  // Fetch featured posts (top 2 with most interactions)
  const { data: featuredPosts = [] } = useQuery({
    queryKey: ['featured-posts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('community_posts')
        .select(`
          *,
          comment_count:community_comments(count),
          reaction_count:community_reactions(count),
          profiles:user_id(name)
        `)
        .gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;

      // Sort by total interactions and take top 2
      return data
        .map(post => ({
          ...post,
          comment_count: post.comment_count?.[0]?.count || 0,
          reaction_count: post.reaction_count?.[0]?.count || 0,
          total_interactions: (post.comment_count?.[0]?.count || 0) + (post.reaction_count?.[0]?.count || 0)
        }))
        .sort((a, b) => b.total_interactions - a.total_interactions)
        .slice(0, 2);
    }
  });

  // Fetch comments for selected post
  const { data: comments = [] } = useQuery({
    queryKey: ['post-comments', selectedPost?.id],
    queryFn: async () => {
      if (!selectedPost?.id) return [];
      
      const { data, error } = await supabase
        .from('community_comments')
        .select('*, profiles:user_id(name)')
        .eq('post_id', selectedPost.id)
        .order('created_at', { ascending: true });

      if (error) throw error;
      return data;
    },
    enabled: !!selectedPost?.id
  });

  // Create new post mutation
  const createPostMutation = useMutation({
    mutationFn: async (postData: typeof newPost) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('community_posts')
        .insert({
          ...postData,
          user_id: user.id
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['community-posts'] });
      queryClient.invalidateQueries({ queryKey: ['featured-posts'] });
      setShowNewPostModal(false);
      setNewPost({
        category: '',
        content: '',
        is_anonymous: false,
        allow_private_messages: false
      });
      toast({
        title: "Post created!",
        description: "Your post has been published successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Could not create the post. Please try again.",
        variant: "destructive",
      });
    }
  });

  // Toggle reaction mutation
  const toggleReactionMutation = useMutation({
    mutationFn: async (postId: string) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      // Check if user already reacted
      const { data: existingReaction } = await supabase
        .from('community_reactions')
        .select('id')
        .eq('post_id', postId)
        .eq('user_id', user.id)
        .maybeSingle();

      if (existingReaction) {
        // Remove reaction
        const { error } = await supabase
          .from('community_reactions')
          .delete()
          .eq('id', existingReaction.id);
        if (error) throw error;
      } else {
        // Add reaction
        const { error } = await supabase
          .from('community_reactions')
          .insert({
            post_id: postId,
            user_id: user.id,
            reaction_type: 'heart'
          });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['community-posts'] });
      queryClient.invalidateQueries({ queryKey: ['featured-posts'] });
    }
  });

  // Save/unsave post mutation
  const toggleSavePostMutation = useMutation({
    mutationFn: async (postId: string) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      // Check if post is already saved
      const { data: existingSave } = await supabase
        .from('saved_posts')
        .select('id')
        .eq('post_id', postId)
        .eq('user_id', user.id)
        .maybeSingle();

      if (existingSave) {
        // Remove save
        const { error } = await supabase
          .from('saved_posts')
          .delete()
          .eq('id', existingSave.id);
        if (error) throw error;
        toast({
          title: "Post removed from saved",
          description: "The post has been removed from your saved list.",
        });
      } else {
        // Add save
        const { error } = await supabase
          .from('saved_posts')
          .insert({
            post_id: postId,
            user_id: user.id
          });
        if (error) throw error;
        toast({
          title: "Post saved!",
          description: "Post added to your saved list.",
        });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['community-posts'] });
    }
  });

  // Add comment mutation
  const addCommentMutation = useMutation({
    mutationFn: async (content: string) => {
      if (!selectedPost?.id || !content.trim()) return;
      
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('community_comments')
        .insert({
          post_id: selectedPost.id,
          user_id: user.id,
          content: content,
          is_anonymous: newComment.is_anonymous
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['post-comments'] });
      queryClient.invalidateQueries({ queryKey: ['community-posts'] });
      setNewComment({ content: '', is_anonymous: false });
      toast({
        title: "Comment added!",
        description: "Your comment has been published successfully.",
      });
    }
  });

  const handleCreatePost = () => {
    if (!newPost.category || !newPost.content.trim()) {
      toast({
        title: "Required fields",
        description: "Category and text are required.",
        variant: "destructive",
      });
      return;
    }

    if (newPost.content.length > 1200) {
      toast({
        title: "Text too long",
        description: "The text must be at most 1200 characters.",
        variant: "destructive",
      });
      return;
    }

    createPostMutation.mutate(newPost);
  };

  const truncateContent = (content: string, lines: number = 3) => {
    // Simular 3 linhas (aproximadamente 120 caracteres por linha)
    const maxLength = lines * 120;
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  const getDisplayName = (post: any) => {
    if (post.is_anonymous) return 'Anonymous Mother';
    return post.profiles?.name || 'Mother';
  };

  const openPostDetail = (post: CommunityPost) => {
    setSelectedPost(post);
    setShowPostDetail(true);
  };

  const addQuickComment = (comment: string) => {
    addCommentMutation.mutate(comment);
  };

  // Main feed view
  if (!showPostDetail) {
    return (
      <div className="min-h-screen bg-background">
        {/* Banner fixo */}
        <div className="bg-primary/10 border-l-4 border-primary p-4 mb-6">
          <p className="text-sm text-primary font-medium">
            🧡 This is a space for support and listening between mothers. Write with care, read with empathy.
          </p>
          <button className="text-primary text-xs underline mt-1">
            Learn the community rules
          </button>
        </div>

        {/* Barra de busca */}
        <div className="p-4 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          {/* Filtros por categoria */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                className="whitespace-nowrap"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Posts em destaque */}
        {featuredPosts.length > 0 && (
          <div className="px-4 mb-6">
            <h3 className="text-lg font-semibold mb-3 text-primary">
              ❤️ Conversations that touched hearts
            </h3>
            <div className="space-y-3">
              {featuredPosts.map((post) => (
                <Card 
                  key={post.id} 
                  className="border-primary/20 cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => openPostDetail(post)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">
                          {getDisplayName(post)}
                        </span>
                        <Badge variant="secondary" className="text-xs">
                          {post.category}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      {truncateContent(post.content)}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MessageCircle className="h-3 w-3" />
                        {post.comment_count}
                      </span>
                      <span className="flex items-center gap-1">
                        <Heart className="h-3 w-3" />
                        {post.reaction_count}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Feed de postagens */}
        <div className="px-4 space-y-4 pb-20">
          {isLoading ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Loading posts...</p>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No posts found.</p>
            </div>
          ) : (
            posts.map((post) => (
              <Card key={post.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">
                        {getDisplayName(post)}
                      </span>
                      <Badge variant="secondary" className="text-xs">
                        {post.category}
                      </Badge>
                      {post.is_recent && (
                        <Badge variant="destructive" className="text-xs">
                          New
                        </Badge>
                      )}
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-background border z-50">
                        <DropdownMenuItem onClick={(e) => {
                          e.stopPropagation();
                          toggleSavePostMutation.mutate(post.id);
                        }}>
                          <Bookmark className="h-4 w-4 mr-2" />
                          Save
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Share className="h-4 w-4 mr-2" />
                          Share
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Flag className="h-4 w-4 mr-2" />
                          Report
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  
                  <p 
                    className="text-sm text-muted-foreground mb-3 cursor-pointer"
                    onClick={() => openPostDetail(post)}
                  >
                    {truncateContent(post.content)}
                  </p>
                  
                  <div className="flex items-center gap-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openPostDetail(post);
                      }}
                      className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary"
                    >
                      <MessageCircle className="h-3 w-3" />
                      {post.comment_count}
                    </button>
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleReactionMutation.mutate(post.id);
                      }}
                      className={`flex items-center gap-1 text-xs transition-colors ${
                        post.user_reacted 
                          ? 'text-red-500 hover:text-red-600' 
                          : 'text-muted-foreground hover:text-red-500'
                      }`}
                    >
                      <Heart className={`h-3 w-3 ${post.user_reacted ? 'fill-current' : ''}`} />
                      🤍 {post.reaction_count}
                    </button>
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSavePostMutation.mutate(post.id);
                      }}
                      className={`flex items-center gap-1 text-xs transition-colors ${
                        post.user_saved 
                          ? 'text-primary hover:text-primary/80' 
                          : 'text-muted-foreground hover:text-primary'
                      }`}
                    >
                      <Bookmark className={`h-3 w-3 ${post.user_saved ? 'fill-current' : ''}`} />
                      📌
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Botão flutuante */}
        <Dialog open={showNewPostModal} onOpenChange={setShowNewPostModal}>
          <DialogTrigger asChild>
            <Button 
              className="fixed bottom-20 right-4 rounded-full h-14 w-14 shadow-lg"
              size="icon"
            >
              <Plus className="h-6 w-6" />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>📝 Create new post</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Category *</label>
                <Select value={newPost.category} onValueChange={(value) => setNewPost({...newPost, category: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border z-50">
                    {categories.slice(1).map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium">Text *</label>
                <Textarea
                  placeholder="Share your experience..."
                  value={newPost.content}
                  onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                  maxLength={1200}
                  className="min-h-[120px]"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {newPost.content.length}/1200 characters
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="anonymous"
                    checked={newPost.is_anonymous}
                    onCheckedChange={(checked) => setNewPost({...newPost, is_anonymous: !!checked})}
                  />
                  <label htmlFor="anonymous" className="text-sm">
                    Post as Anonymous
                  </label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="private-messages"
                    checked={newPost.allow_private_messages}
                    onCheckedChange={(checked) => setNewPost({...newPost, allow_private_messages: !!checked})}
                  />
                  <label htmlFor="private-messages" className="text-sm">
                    Accept private messages about this post?
                  </label>
                </div>
              </div>
              
              <Button 
                onClick={handleCreatePost}
                className="w-full"
                disabled={createPostMutation.isPending}
              >
                {createPostMutation.isPending ? 'Publishing...' : 'Create Post'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  // Post detail view
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 bg-background border-b p-4 flex items-center gap-3 z-10">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setShowPostDetail(false)}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="font-semibold">Post</h1>
      </div>

      {selectedPost && (
        <div className="p-4 space-y-6">
          {/* Post content */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="font-medium">
                    {getDisplayName(selectedPost)}
                  </span>
                  <Badge variant="secondary" className="text-xs">
                    {selectedPost.category}
                  </Badge>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-background border z-50">
                    <DropdownMenuItem onClick={() => toggleSavePostMutation.mutate(selectedPost.id)}>
                      <Bookmark className="h-4 w-4 mr-2" />
                      Save
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      <Flag className="h-4 w-4 mr-2" />
                      Report
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              
              <p className="text-sm leading-relaxed mb-4">{selectedPost.content}</p>
              
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                <span className="flex items-center gap-1">
                  <Heart className="h-3 w-3" />
                  {selectedPost.reaction_count} likes
                </span>
                <span className="flex items-center gap-1">
                  <MessageCircle className="h-3 w-3" />
                  {selectedPost.comment_count} comments
                </span>
              </div>

              {/* Emoji reactions */}
              <div className="border-t pt-4">
                <p className="text-xs font-medium mb-3">Quick reactions:</p>
                <div className="grid grid-cols-2 gap-2">
                  {emojiReactions.map((reaction) => (
                    <Button
                      key={reaction.type}
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2 justify-start text-xs h-10"
                      onClick={() => toggleReactionMutation.mutate(selectedPost.id)}
                    >
                      <span className="text-base">{reaction.emoji}</span>
                      <span>{reaction.label}</span>
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Comments section */}
          <div className="space-y-4">
            <h3 className="font-semibold">Comments ({comments.length})</h3>
            
            {/* Comments list */}
            <div className="space-y-4">
              {comments.map((comment) => (
                <Card key={comment.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-medium text-sm">
                        {comment.is_anonymous ? 'Anonymous' : comment.profiles?.name || 'Mother'}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(comment.created_at).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                    <p className="text-sm">{comment.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Quick comment suggestions */}
            <div className="space-y-3">
              <p className="text-xs font-medium">Suggested phrases:</p>
              <div className="flex flex-wrap gap-2">
                {quickComments.map((comment, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="text-xs"
                    onClick={() => addQuickComment(comment)}
                    disabled={addCommentMutation.isPending}
                  >
                    {comment}
                  </Button>
                ))}
              </div>
            </div>

            {/* New comment form */}
            <Card>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <Textarea
                    placeholder="Write a response..."
                    value={newComment.content}
                    onChange={(e) => setNewComment({...newComment, content: e.target.value})}
                    className="min-h-[80px]"
                  />
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="anonymous-comment"
                        checked={newComment.is_anonymous}
                        onCheckedChange={(checked) => setNewComment({...newComment, is_anonymous: !!checked})}
                      />
                      <label htmlFor="anonymous-comment" className="text-xs">
                        Comment as Anonymous
                      </label>
                    </div>
                    
                    <Button 
                      onClick={() => addCommentMutation.mutate(newComment.content)}
                      size="sm"
                      disabled={!newComment.content.trim() || addCommentMutation.isPending}
                    >
                      <Send className="h-3 w-3 mr-1" />
                      {addCommentMutation.isPending ? 'Sending...' : 'Send comment'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}