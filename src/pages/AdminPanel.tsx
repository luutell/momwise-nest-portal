import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  category: string;
  image_url?: string;
  published: boolean;
  created_at: string;
}

const categories = [
  'Ritmo Leve',
  'Entendendo o Bebê',
  'Primeiras Mordidas',
  'No seu Tempo',
  'Juntas no Começo',
  'Mãe Inteira',
  'Entre Mães',
  'Higiene Natural'
];

export default function AdminPanel() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: '',
    category: '',
    image_url: '',
    audio_url: '',
    introduction: '',
    practical_tip: '',
    published: false
  });
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch posts
  const { data: posts, isLoading } = useQuery({
    queryKey: ['admin-posts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Post[];
    }
  });

  // Create/Update post mutation
  const savePostMutation = useMutation({
    mutationFn: async (postData: typeof formData) => {
      if (editingPost) {
        const { error } = await supabase
          .from('posts')
          .update(postData)
          .eq('id', editingPost.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('posts')
          .insert([postData]);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-posts'] });
      setIsDialogOpen(false);
      setEditingPost(null);
      resetForm();
      toast({
        title: editingPost ? 'Post atualizado!' : 'Post criado!',
        description: 'O post foi salvo com sucesso.'
      });
    },
    onError: (error) => {
      toast({
        title: 'Erro',
        description: 'Erro ao salvar o post: ' + error.message,
        variant: 'destructive'
      });
    }
  });

  // Delete post mutation
  const deletePostMutation = useMutation({
    mutationFn: async (postId: string) => {
      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', postId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-posts'] });
      toast({
        title: 'Post deletado!',
        description: 'O post foi removido com sucesso.'
      });
    }
  });

  const resetForm = () => {
      setFormData({
        title: '',
        content: '',
        author: '',
        category: '',
        image_url: '',
        audio_url: '',
        introduction: '',
        practical_tip: '',
        published: false
      });
  };

  const handleEdit = (post: Post) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      content: post.content,
      author: post.author,
      category: post.category,
      image_url: post.image_url || '',
      audio_url: '',
      introduction: '',
      practical_tip: '',
      published: post.published
    });
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (!formData.title || !formData.content || !formData.author || !formData.category) {
      toast({
        title: 'Campos obrigatórios',
        description: 'Preencha todos os campos obrigatórios.',
        variant: 'destructive'
      });
      return;
    }
    savePostMutation.mutate(formData);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Painel Admin</h1>
          <p className="text-gray-600">Gerencie os posts do blog</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              onClick={() => {
                setEditingPost(null);
                resetForm();
              }}
              className="bg-terracotta hover:bg-terracotta/90"
            >
              <Plus className="w-4 h-4 mr-2" />
              Novo Post
            </Button>
          </DialogTrigger>
          
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingPost ? 'Editar Post' : 'Criar Novo Post'}
              </DialogTitle>
              <DialogDescription>
                Preencha as informações do post abaixo.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Título *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Digite o título do post"
                />
              </div>

              <div>
                <Label htmlFor="author">Autor *</Label>
                <Input
                  id="author"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  placeholder="Nome do autor"
                />
              </div>

              <div>
                <Label htmlFor="category">Categoria *</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Ritmo Leve">🔄 Ritmo Leve</SelectItem>
                    <SelectItem value="Entendendo o Bebê">🧠 Entendendo o Bebê</SelectItem>
                    <SelectItem value="Primeiras Mordidas">🍽 Primeiras Mordidas</SelectItem>
                    <SelectItem value="No seu Tempo">💪 No seu Tempo</SelectItem>
                    <SelectItem value="Juntas no Começo">🤱 Juntas no Começo</SelectItem>
                    <SelectItem value="Mãe Inteira">🛀 Mãe Inteira</SelectItem>
                    <SelectItem value="Entre Mães">🤝 Entre Mães</SelectItem>
                    <SelectItem value="Higiene Natural">🚼 Higiene Natural</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="introduction">Introdução</Label>
                <Textarea
                  id="introduction"
                  value={formData.introduction}
                  onChange={(e) => setFormData({ ...formData, introduction: e.target.value })}
                  placeholder="Introdução breve do post..."
                  className="min-h-20"
                />
              </div>

              <div>
                <Label htmlFor="content">Conteúdo Principal *</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Escreva o conteúdo principal do post..."
                  className="min-h-[200px]"
                />
              </div>

              <div>
                <Label htmlFor="practical_tip">Dica Prática</Label>
                <Textarea
                  id="practical_tip"
                  value={formData.practical_tip}
                  onChange={(e) => setFormData({ ...formData, practical_tip: e.target.value })}
                  placeholder="Dica prática relacionada ao conteúdo..."
                  className="min-h-20"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="image_url">URL da Imagem</Label>
                  <Input
                    id="image_url"
                    type="url"
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    placeholder="https://exemplo.com/imagem.jpg"
                  />
                </div>
                <div>
                  <Label htmlFor="audio_url">URL do Áudio</Label>
                  <Input
                    id="audio_url"
                    type="url"
                    value={formData.audio_url}
                    onChange={(e) => setFormData({ ...formData, audio_url: e.target.value })}
                    placeholder="https://exemplo.com/audio.mp3"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="published"
                  checked={formData.published}
                  onCheckedChange={(checked) => setFormData({ ...formData, published: checked })}
                />
                <Label htmlFor="published">Publicar imediatamente</Label>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancelar
              </Button>
              <Button 
                onClick={handleSave}
                disabled={savePostMutation.isPending}
                className="bg-terracotta hover:bg-terracotta/90"
              >
                {savePostMutation.isPending ? 'Salvando...' : 'Salvar'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Posts List */}
      <div className="grid gap-4">
        {isLoading ? (
          <div className="text-center py-8">Carregando posts...</div>
        ) : (
          posts?.map((post) => (
            <Card key={post.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{post.title}</CardTitle>
                    <CardDescription>
                      Por {post.author} • {post.category} • {' '}
                      {new Date(post.created_at).toLocaleDateString('pt-BR')}
                      {post.published ? (
                        <span className="ml-2 text-green-600 font-medium">Publicado</span>
                      ) : (
                        <span className="ml-2 text-yellow-600 font-medium">Rascunho</span>
                      )}
                    </CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(post)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deletePostMutation.mutate(post.id)}
                      disabled={deletePostMutation.isPending}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 line-clamp-2">
                  {post.content.substring(0, 150)}...
                </p>
                {post.image_url && (
                  <img 
                    src={post.image_url} 
                    alt={post.title}
                    className="mt-3 w-full h-32 object-cover rounded-md"
                  />
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}