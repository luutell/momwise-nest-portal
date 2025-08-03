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
import { Heart, MessageCircle, MoreHorizontal, Plus, Search, Bookmark, Flag, Share } from 'lucide-react';
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
  'Todas',
  'Amamentação e Acolhimento',
  'Sono do Bebê',
  'Primeiras Mordidas',
  'No seu Tempo',
  'Mãe Inteira',
  'Higiene Natural'
];

export default function EntreMaes() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const [showCommentsModal, setShowCommentsModal] = useState(false);
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
  const { data: posts = [], isLoading } = useQuery({
    queryKey: ['community-posts', selectedCategory, searchQuery],
    queryFn: async () => {
      let query = supabase
        .from('community_posts')
        .select(`
          *,
          comment_count:community_comments(count),
          reaction_count:community_reactions(count),
          user_reacted:community_reactions!inner(id),
          user_saved:saved_posts!inner(id)
        `)
        .order('created_at', { ascending: false });

      if (selectedCategory !== 'Todas') {
        query = query.eq('category', selectedCategory);
      }

      if (searchQuery) {
        query = query.ilike('content', `%${searchQuery}%`);
      }

      const { data, error } = await query;
      if (error) throw error;

      // Process data to add computed fields
      return data.map(post => ({
        ...post,
        comment_count: post.comment_count?.[0]?.count || 0,
        reaction_count: post.reaction_count?.[0]?.count || 0,
        user_reacted: post.user_reacted?.length > 0,
        user_saved: post.user_saved?.length > 0,
        is_recent: new Date(post.created_at) > new Date(Date.now() - 24 * 60 * 60 * 1000)
      }));
    }
  });

  // Fetch featured posts (top 2 with most interactions)
  const { data: featuredPosts = [] } = useQuery({
    queryKey: ['featured-posts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('community_posts')
        .select(`
          *,
          comment_count:community_comments(count),
          reaction_count:community_reactions(count)
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
      setShowNewPostModal(false);
      setNewPost({
        category: '',
        content: '',
        is_anonymous: false,
        allow_private_messages: false
      });
      toast({
        title: "Postagem criada!",
        description: "Sua postagem foi publicada com sucesso.",
      });
    },
    onError: (error) => {
      toast({
        title: "Erro",
        description: "Não foi possível criar a postagem. Tente novamente.",
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
        .single();

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
        .single();

      if (existingSave) {
        // Remove save
        const { error } = await supabase
          .from('saved_posts')
          .delete()
          .eq('id', existingSave.id);
        if (error) throw error;
      } else {
        // Add save
        const { error } = await supabase
          .from('saved_posts')
          .insert({
            post_id: postId,
            user_id: user.id
          });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['community-posts'] });
      toast({
        title: "Post salvo!",
        description: "Você pode encontrar posts salvos no seu perfil.",
      });
    }
  });

  // Add comment mutation
  const addCommentMutation = useMutation({
    mutationFn: async () => {
      if (!selectedPost?.id || !newComment.content.trim()) return;
      
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('community_comments')
        .insert({
          post_id: selectedPost.id,
          user_id: user.id,
          content: newComment.content,
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
        title: "Comentário adicionado!",
        description: "Seu comentário foi publicado com sucesso.",
      });
    }
  });

  const handleCreatePost = () => {
    if (!newPost.category || !newPost.content.trim()) {
      toast({
        title: "Campos obrigatórios",
        description: "Categoria e texto são obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    if (newPost.content.length > 1200) {
      toast({
        title: "Texto muito longo",
        description: "O texto deve ter no máximo 1200 caracteres.",
        variant: "destructive",
      });
      return;
    }

    createPostMutation.mutate(newPost);
  };

  const truncateContent = (content: string, maxLength: number = 400) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  const getDisplayName = (post: CommunityPost, profile?: Profile) => {
    if (post.is_anonymous) return 'Mãe Anônima';
    return profile?.name || 'Mãe';
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Banner fixo */}
      <div className="bg-primary/10 border-l-4 border-primary p-4 mb-6">
        <p className="text-sm text-primary font-medium">
          🧡 Este é um espaço de apoio e escuta entre mães. Escreva com carinho, leia com empatia.
        </p>
        <button className="text-primary text-xs underline mt-1">
          Conheça as regras da comunidade
        </button>
      </div>

      {/* Barra de busca */}
      <div className="p-4 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar postagens..."
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
            ❤️ Conversas que tocaram corações
          </h3>
          <div className="space-y-3">
            {featuredPosts.map((post) => (
              <Card key={post.id} className="border-primary/20">
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
            <p className="text-muted-foreground">Carregando postagens...</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Nenhuma postagem encontrada.</p>
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
                        Recente
                      </Badge>
                    )}
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => toggleSavePostMutation.mutate(post.id)}>
                        <Bookmark className="h-4 w-4 mr-2" />
                        {post.user_saved ? 'Remover dos salvos' : 'Salvar'}
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Share className="h-4 w-4 mr-2" />
                        Compartilhar
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Flag className="h-4 w-4 mr-2" />
                        Denunciar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                
                <p 
                  className="text-sm text-muted-foreground mb-3 cursor-pointer"
                  onClick={() => {
                    setSelectedPost(post);
                    setShowCommentsModal(true);
                  }}
                >
                  {truncateContent(post.content)}
                  {post.content.length > 400 && (
                    <span className="text-primary ml-1">Ver mais</span>
                  )}
                </p>
                
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => {
                      setSelectedPost(post);
                      setShowCommentsModal(true);
                    }}
                    className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary"
                  >
                    <MessageCircle className="h-3 w-3" />
                    {post.comment_count} comentários
                  </button>
                  
                  <button
                    onClick={() => toggleReactionMutation.mutate(post.id)}
                    className={`flex items-center gap-1 text-xs transition-colors ${
                      post.user_reacted 
                        ? 'text-red-500 hover:text-red-600' 
                        : 'text-muted-foreground hover:text-red-500'
                    }`}
                  >
                    <Heart className={`h-3 w-3 ${post.user_reacted ? 'fill-current' : ''}`} />
                    {post.user_reacted ? 'Te entendo' : 'Me tocou'} ({post.reaction_count})
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
            <DialogTitle>📝 Criar nova postagem</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Categoria *</label>
              <Select value={newPost.category} onValueChange={(value) => setNewPost({...newPost, category: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent>
                  {categories.slice(1).map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium">Texto *</label>
              <Textarea
                placeholder="Compartilhe sua experiência..."
                value={newPost.content}
                onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                maxLength={1200}
                className="min-h-[120px]"
              />
              <p className="text-xs text-muted-foreground mt-1">
                {newPost.content.length}/1200 caracteres
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
                  Publicar como anônima
                </label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="private-messages"
                  checked={newPost.allow_private_messages}
                  onCheckedChange={(checked) => setNewPost({...newPost, allow_private_messages: !!checked})}
                />
                <label htmlFor="private-messages" className="text-sm">
                  Aceitar mensagens privadas
                </label>
              </div>
            </div>
            
            <Button 
              onClick={handleCreatePost}
              className="w-full"
              disabled={createPostMutation.isPending}
            >
              {createPostMutation.isPending ? 'Publicando...' : 'Publicar postagem'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal de comentários */}
      <Dialog open={showCommentsModal} onOpenChange={setShowCommentsModal}>
        <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>💬 Comentários</DialogTitle>
          </DialogHeader>
          
          {selectedPost && (
            <div className="space-y-4">
              {/* Post original */}
              <div className="border-b pb-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-medium text-sm">
                    {getDisplayName(selectedPost)}
                  </span>
                  <Badge variant="secondary" className="text-xs">
                    {selectedPost.category}
                  </Badge>
                </div>
                <p className="text-sm">{selectedPost.content}</p>
              </div>
              
              {/* Lista de comentários */}
              <div className="space-y-3">
                {comments.map((comment) => (
                  <div key={comment.id} className="bg-muted/50 p-3 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-xs">
                        {comment.is_anonymous ? 'Anônima' : comment.profiles?.name || 'Mãe'}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(comment.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm">{comment.content}</p>
                  </div>
                ))}
              </div>
              
              {/* Novo comentário */}
              <div className="border-t pt-4 space-y-3">
                <Textarea
                  placeholder="Escreva um comentário..."
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
                      Comentar anonimamente
                    </label>
                  </div>
                  
                  <Button 
                    onClick={() => addCommentMutation.mutate()}
                    size="sm"
                    disabled={!newComment.content.trim() || addCommentMutation.isPending}
                  >
                    {addCommentMutation.isPending ? 'Enviando...' : 'Comentar'}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}