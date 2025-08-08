import { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Play, 
  Pause, 
  RotateCcw, 
  BookOpen, 
  Users, 
  Phone, 
  Clock,
  ChevronRight,
  Heart,
  Baby,
  Sparkles,
  Plus,
  MessageCircle,
  Eye
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface BreastfeedingProps {
  onBack: () => void;
}

const Breastfeeding = ({ onBack }: BreastfeedingProps) => {
  const [isNursing, setIsNursing] = useState(false);
  const [nursingTimer, setNursingTimer] = useState(0);
  const [selectedSide, setSelectedSide] = useState<'left' | 'right' | 'both'>('left');
  const [notes, setNotes] = useState('');
  const [showNotes, setShowNotes] = useState(false);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [nursingHistory, setNursingHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const { t } = useLanguage();
  const { toast } = useToast();
  
  // Mock user data
  const babyAge = 3; // meses
  
  // Load nursing history on component mount
  useEffect(() => {
    loadNursingHistory();
  }, []);
  
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isNursing) {
      interval = setInterval(() => {
        setNursingTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isNursing]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startNursing = () => {
    setIsNursing(true);
    setNursingTimer(0);
    setStartTime(new Date());
  };

  const stopNursing = () => {
    setIsNursing(false);
    setShowNotes(true);
  };

  const loadNursingHistory = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('breastfeeding_sessions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) {
        console.error('Error loading nursing history:', error);
        return;
      }

      setNursingHistory(data || []);
    } catch (error) {
      console.error('Error loading nursing history:', error);
    }
  };

  const saveNursing = async () => {
    if (!startTime) return;
    
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Erro",
          description: "Você precisa estar logado para salvar mamadas",
          variant: "destructive"
        });
        return;
      }

      const endTime = new Date();
      
      const { error } = await supabase
        .from('breastfeeding_sessions')
        .insert({
          user_id: user.id,
          start_time: startTime.toISOString(),
          end_time: endTime.toISOString(),
          duration_seconds: nursingTimer,
          side: selectedSide,
          notes: notes || null
        });

      if (error) {
        console.error('Error saving nursing session:', error);
        toast({
          title: "Erro",
          description: "Não foi possível salvar a mamada. Tente novamente.",
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Sucesso",
        description: "Mamada salva com sucesso!"
      });

      // Reset form and reload history
      setNursingTimer(0);
      setNotes('');
      setShowNotes(false);
      setStartTime(null);
      await loadNursingHistory();
      
    } catch (error) {
      console.error('Error saving nursing session:', error);
      toast({
        title: "Erro",
        description: "Erro inesperado. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Conteúdo recomendado baseado na idade
  const recommendedContent = [
    {
      id: 1,
      title: "Picos de crescimento e aumento da demanda: o que esperar aos 3 meses",
      type: "article",
      readTime: "5 min",
      isCompleted: false,
      gradient: "from-primary/20 to-sage/20"
    },
    {
      id: 2,
      title: "Como manter uma boa produção de leite mesmo quando o bebê mama menos",
      type: "video",
      readTime: "8 min",
      isCompleted: true,
      gradient: "from-terracotta/20 to-secondary/20"
    },
    {
      id: 3,
      title: "Quando a distração começa a atrapalhar a amamentação",
      type: "article",
      readTime: "4 min",
      isCompleted: false,
      gradient: "from-sage/20 to-primary/20"
    }
  ];

  // Dúvidas frequentes por idade
  const frequentQuestions = [
    "Meu bebê fica distraído no peito, isso é normal?",
    "Quantas mamadas por dia são esperadas?",
    "É normal ele mamar por apenas 5 minutos?",
    "Como saber se está mamando o suficiente?"
  ];

  // Histórico de mamadas (real data from database)

  // Comunidade - posts das mães
  const communityPosts = [
    {
      id: 1,
      author: "Mariana",
      babyAge: "3 meses",
      time: "2h",
      content: "Senti que meu leite diminuiu, mas segui amamentando em livre demanda e voltou ao normal em 2 dias.",
      likes: 12,
      replies: 3
    },
    {
      id: 2,
      author: "Carolina",
      babyAge: "2 meses",
      time: "5h",
      content: "Alguém mais sente que o bebê mama muito rápido? O meu termina em 5 minutos e fico preocupada.",
      likes: 8,
      replies: 7
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 via-background to-sage/5">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/20 via-terracotta/10 to-sage/20 p-4 pb-6">
        <div className="flex items-center space-x-3 mb-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onBack}
            className="text-primary hover:bg-primary/20"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="text-2xl">🍼</div>
          <h1 className="font-playfair text-2xl font-semibold text-foreground">
            Amamentação
          </h1>
        </div>
        
        <p className="text-muted-foreground ml-11">
          Seu bebê tem {babyAge} meses – aqui estão recomendações e ferramentas pensadas para esta fase.
        </p>
      </div>

      <div className="p-4 space-y-6">
        
        {/* Bloco 1: Recomendado para você */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-playfair text-lg font-semibold text-foreground">
              Recomendado para você
            </h2>
            <Button variant="ghost" size="sm" className="text-primary">
              Ver todos <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
          
          <div className="flex overflow-x-auto gap-4 pb-2">
            {recommendedContent.map((content) => (
              <Card 
                key={content.id}
                className={`bg-gradient-to-br ${content.gradient} border-none shadow-soft flex-shrink-0 w-64 cursor-pointer hover:shadow-md transition-all duration-200`}
              >
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2 flex-1">
                      <h3 className="font-medium text-sm leading-tight text-foreground">
                        {content.title}
                      </h3>
                      <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                        <span>{content.readTime}</span>
                        <span>•</span>
                        <span className="capitalize">{content.type}</span>
                      </div>
                    </div>
                    {content.isCompleted && (
                      <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Bloco 2: Registrar mamadas */}
        <div className="space-y-4">
          <h2 className="font-playfair text-lg font-semibold text-foreground">
            Registrar mamadas
          </h2>
          
          <Card className="bg-gradient-to-br from-terracotta/10 to-primary/10 border-none shadow-soft">
            <CardContent className="p-6 space-y-4">
              {/* Timer e controles */}
              <div className="text-center space-y-4">
                <div className="text-4xl font-mono font-bold text-primary">
                  {formatTime(nursingTimer)}
                </div>
                
                <div className="flex justify-center space-x-4">
                  {!isNursing ? (
                    <Button 
                      onClick={startNursing}
                      className="bg-primary hover:bg-primary/90 text-primary-foreground px-8"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Iniciar Amamentação
                    </Button>
                  ) : (
                    <Button 
                      onClick={stopNursing}
                      variant="destructive"
                      className="px-8"
                    >
                      <Pause className="w-4 h-4 mr-2" />
                      Parar Amamentação
                    </Button>
                  )}
                </div>
              </div>

              {/* Seleção do lado */}
              <div className="space-y-2">
                <p className="text-sm font-medium text-foreground">Escolha o lado</p>
                <div className="flex space-x-2">
                  {(['left', 'right', 'both'] as const).map((side) => (
                    <Button
                      key={side}
                      variant={selectedSide === side ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedSide(side)}
                      className="flex-1"
                    >
                      {side === 'left' ? 'Mama Esquerda' : 
                       side === 'right' ? 'Mama Direita' : 'Ambos'}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Notas */}
              {showNotes && (
                <div className="space-y-2 animate-fade-in">
                  <p className="text-sm font-medium text-foreground">Observações (opcional)</p>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Como foi a mamada? Bebê estava calmo, agitado..."
                    className="w-full p-3 rounded-lg border border-border bg-background text-sm resize-none"
                    rows={2}
                  />
                  <div className="flex space-x-2">
                    <Button onClick={saveNursing} className="flex-1" disabled={loading}>
                      {loading ? "Salvando..." : "Salvar Mamada"}
                    </Button>
                    <Button variant="outline" onClick={() => setShowNotes(false)} disabled={loading}>
                      Cancelar
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Histórico */}
          <div className="space-y-3">
            <h3 className="font-medium text-sm text-foreground">Hoje</h3>
            {nursingHistory.length === 0 ? (
              <p className="text-sm text-muted-foreground">Nenhuma mamada registrada hoje</p>
            ) : (
              nursingHistory.map((record, index) => {
                const startTime = new Date(record.start_time);
                const durationMinutes = Math.floor(record.duration_seconds / 60);
                const sideDisplay = record.side === 'left' ? 'Esquerda' : 
                                   record.side === 'right' ? 'Direita' : 'Ambos';
                
                return (
                  <Card key={index} className="bg-background/50 border-border/50">
                    <CardContent className="p-3 flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2 text-sm">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <span className="font-medium">
                            {startTime.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                          </span>
                          <span className="text-muted-foreground">•</span>
                          <span>{durationMinutes} min</span>
                          <span className="text-muted-foreground">•</span>
                          <span>{sideDisplay}</span>
                        </div>
                        {record.notes && (
                          <p className="text-xs text-muted-foreground">{record.notes}</p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </div>
        </div>

        {/* Bloco 3: Biblioteca de dúvidas frequentes */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-playfair text-lg font-semibold text-foreground">
              Dúvidas Frequentes
            </h2>
            <Button variant="ghost" size="sm" className="text-primary">
              Ver mais <BookOpen className="w-4 h-4 ml-1" />
            </Button>
          </div>
          
          <div className="space-y-2">
            {frequentQuestions.map((question, index) => (
              <Card key={index} className="bg-sage/10 border-none shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer">
                <CardContent className="p-4 flex items-center justify-between">
                  <p className="text-sm text-foreground flex-1">{question}</p>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Bloco 4: Entre Mães - Amamentação */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-playfair text-lg font-semibold text-foreground">
              Entre Mães - Amamentação
            </h2>
            <Button variant="ghost" size="sm" className="text-primary">
              <Users className="w-4 h-4 mr-1" />
              Ver todos
            </Button>
          </div>
          
          <p className="text-sm text-muted-foreground">
            Experiências e dicas de outras mães sobre amamentação
          </p>

          <div className="space-y-3">
            {communityPosts.map((post) => (
              <Card key={post.id} className="bg-gradient-to-br from-primary/5 to-sage/5 border-none shadow-soft">
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium text-primary">
                          {post.author[0]}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {post.author}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          mãe de bebê de {post.babyAge} • {post.time}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-foreground leading-relaxed">
                    {post.content}
                  </p>
                  
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <button className="flex items-center space-x-1 hover:text-primary transition-colors">
                      <Heart className="w-4 h-4" />
                      <span>{post.likes}</span>
                    </button>
                    <button className="flex items-center space-x-1 hover:text-primary transition-colors">
                      <MessageCircle className="w-4 h-4" />
                      <span>{post.replies}</span>
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-gradient-to-r from-primary/10 to-terracotta/10 border-none shadow-soft">
            <CardContent className="p-4">
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                <Plus className="w-4 h-4 mr-2" />
                Compartilhar experiência
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Bloco 5: Fale com uma especialista */}
        <div className="space-y-4">
          <h2 className="font-playfair text-lg font-semibold text-foreground">
            Fale com uma especialista
          </h2>
          
          <Card className="bg-gradient-to-r from-terracotta/20 to-primary/20 border-none shadow-soft">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-terracotta/30 rounded-full flex items-center justify-center">
                  <Phone className="w-6 h-6 text-terracotta" />
                </div>
                <div className="space-y-1 flex-1">
                  <h3 className="font-playfair font-semibold text-foreground">
                    Falar com uma consultora de amamentação
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Tire dúvidas por videochamada, quando uma especialista estiver online
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-green-600 font-medium">
                  2 especialistas online agora
                </span>
              </div>
              
              <Button className="w-full bg-terracotta hover:bg-terracotta/90 text-white">
                <Phone className="w-4 h-4 mr-2" />
                Iniciar conversa
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Breastfeeding;