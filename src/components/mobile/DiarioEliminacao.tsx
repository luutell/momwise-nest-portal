import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { 
  Clock, 
  Droplets, 
  CheckCircle, 
  XCircle, 
  Calendar,
  TrendingUp,
  Download,
  Plus,
  Timer,
  BarChart3,
  Edit,
  Trash2
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { format, startOfDay, endOfDay, subDays, isToday } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import jsPDF from 'jspdf';

interface EliminationEntry {
  id: string;
  timestamp: string;
  elimination_type: 'xixi' | 'coco' | 'ambos';
  location: 'penico' | 'vaso' | 'fralda' | 'acidente' | 'outro';
  status: 'capturada' | 'perdida';
  signals_observed: string[];
  activity_before?: string;
  baby_mood?: string;
  notes?: string;
  created_at: string;
}

const DiarioEliminacao = () => {
  const [entries, setEntries] = useState<EliminationEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [showForm, setShowForm] = useState(false);
  const [editingEntry, setEditingEntry] = useState<EliminationEntry | null>(null);
  const { toast } = useToast();
  
  // Form state
  const [formData, setFormData] = useState({
    timestamp: new Date().toISOString().slice(0, 16),
    elimination_type: 'xixi' as 'xixi' | 'coco' | 'ambos',
    location: 'penico' as 'penico' | 'vaso' | 'fralda' | 'acidente' | 'outro',
    status: 'capturada' as 'capturada' | 'perdida',
    signals_observed: [] as string[],
    activity_before: '',
    baby_mood: '',
    notes: ''
  });

  const eliminationTypes = [
    { value: 'xixi', label: '💧 Xixi', icon: '💧' },
    { value: 'coco', label: '💩 Cocô', icon: '💩' },
    { value: 'ambos', label: '💧💩 Ambos', icon: '💧💩' }
  ];

  const locations = [
    { value: 'penico', label: '🚽 Penico' },
    { value: 'vaso', label: '🚿 Vaso sanitário' },
    { value: 'fralda', label: '🍼 Fralda' },
    { value: 'acidente', label: '💦 Acidente' },
    { value: 'outro', label: '📍 Outro local' }
  ];

  const availableSignals = [
    'Concentração',
    'Inquietação', 
    'Caretas',
    'Sons específicos',
    'Movimentos',
    'Parou de brincar',
    'Ficou quieto'
  ];

  const activities = [
    'Dormindo',
    'Mamando',
    'Brincando',
    'Chorando',
    'Banho',
    'Troca',
    'Outro'
  ];

  const moods = [
    'Calmo',
    'Agitado',
    'Chorando',
    'Neutro',
    'Feliz'
  ];

  useEffect(() => {
    fetchEntries();
  }, [selectedDate]);

  const fetchEntries = async () => {
    try {
      const startDate = startOfDay(new Date(selectedDate));
      const endDate = endOfDay(new Date(selectedDate));
      
      const { data, error } = await supabase
        .from('elimination_entries')
        .select('*')
        .gte('timestamp', startDate.toISOString())
        .lte('timestamp', endDate.toISOString())
        .order('timestamp', { ascending: false });

      if (error) throw error;
      setEntries(data || []);
    } catch (error) {
      console.error('Error fetching entries:', error);
      toast({
        title: "Erro",
        description: "Erro ao carregar registros",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Usuário não autenticado');

      const entryData = {
        user_id: user.id,
        timestamp: new Date(formData.timestamp).toISOString(),
        elimination_type: formData.elimination_type,
        location: formData.location,
        status: formData.status,
        signals_observed: formData.signals_observed,
        activity_before: formData.activity_before || null,
        baby_mood: formData.baby_mood || null,
        notes: formData.notes || null
      };

      if (editingEntry) {
        const { error } = await supabase
          .from('elimination_entries')
          .update(entryData)
          .eq('id', editingEntry.id);
        
        if (error) throw error;
        toast({
          title: "Sucesso",
          description: "Registro atualizado com sucesso!",
        });
      } else {
        const { error } = await supabase
          .from('elimination_entries')
          .insert(entryData);
        
        if (error) throw error;
        toast({
          title: "Sucesso", 
          description: "Registro salvo com sucesso!",
        });
      }

      resetForm();
      fetchEntries();
    } catch (error) {
      console.error('Error saving entry:', error);
      toast({
        title: "Erro",
        description: "Erro ao salvar registro",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      timestamp: new Date().toISOString().slice(0, 16),
      elimination_type: 'xixi',
      location: 'penico',
      status: 'capturada',
      signals_observed: [],
      activity_before: '',
      baby_mood: '',
      notes: ''
    });
    setShowForm(false);
    setEditingEntry(null);
  };

  const editEntry = (entry: EliminationEntry) => {
    setFormData({
      timestamp: new Date(entry.timestamp).toISOString().slice(0, 16),
      elimination_type: entry.elimination_type,
      location: entry.location,
      status: entry.status,
      signals_observed: entry.signals_observed || [],
      activity_before: entry.activity_before || '',
      baby_mood: entry.baby_mood || '',
      notes: entry.notes || ''
    });
    setEditingEntry(entry);
    setShowForm(true);
  };

  const deleteEntry = async (id: string) => {
    try {
      const { error } = await supabase
        .from('elimination_entries')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      toast({
        title: "Sucesso",
        description: "Registro removido com sucesso!",
      });
      fetchEntries();
    } catch (error) {
      console.error('Error deleting entry:', error);
      toast({
        title: "Erro",
        description: "Erro ao remover registro",
        variant: "destructive",
      });
    }
  };

  const toggleSignal = (signal: string) => {
    setFormData(prev => ({
      ...prev,
      signals_observed: prev.signals_observed.includes(signal)
        ? prev.signals_observed.filter(s => s !== signal)
        : [...prev.signals_observed, signal]
    }));
  };

  const quickAdd = (type: 'xixi' | 'coco') => {
    setFormData({
      ...formData,
      elimination_type: type,
      timestamp: new Date().toISOString().slice(0, 16)
    });
    setShowForm(true);
  };

  const getWeeklyStats = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;

      const startDate = subDays(new Date(), 6);
      const endDate = new Date();

      const { data, error } = await supabase
        .from('elimination_entries')
        .select('*')
        .eq('user_id', user.id)
        .gte('timestamp', startDate.toISOString())
        .lte('timestamp', endDate.toISOString());

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching weekly stats:', error);
      return null;
    }
  };

  const exportToPDF = async () => {
    const weeklyData = await getWeeklyStats();
    if (!weeklyData) return;

    const doc = new jsPDF();
    
    // Configurar fonte e título
    doc.setFontSize(20);
    doc.text('Diário de Eliminação - Resumo Semanal', 20, 30);
    
    // Data de geração
    const today = new Date().toLocaleDateString('pt-BR');
    doc.setFontSize(12);
    doc.text(`Período: ${subDays(new Date(), 6).toLocaleDateString('pt-BR')} - ${today}`, 20, 45);
    
    // Linha separadora
    doc.line(20, 55, 190, 55);
    
    // Estatísticas
    doc.setFontSize(14);
    doc.text('Estatísticas', 20, 70);
    
    let yPos = 85;
    doc.setFontSize(11);
    
    const totalEntries = weeklyData.length;
    const successRate = weeklyData.filter(e => e.status === 'capturada').length / totalEntries * 100;
    
    doc.text(`Total de registros: ${totalEntries}`, 25, yPos);
    yPos += 10;
    doc.text(`Taxa de sucesso: ${successRate.toFixed(1)}%`, 25, yPos);
    yPos += 20;
    
    // Registros por dia
    doc.text('Registros por dia:', 25, yPos);
    yPos += 15;
    
    for (let i = 6; i >= 0; i--) {
      const date = subDays(new Date(), i);
      const dayEntries = weeklyData.filter(e => 
        isToday(new Date(e.timestamp)) === isToday(date)
      );
      
      doc.text(
        `${format(date, 'dd/MM', { locale: ptBR })}: ${dayEntries.length} registros`,
        30,
        yPos
      );
      yPos += 10;
    }
    
    doc.save(`diario-eliminacao-${today.replace(/\//g, '-')}.pdf`);
    
    toast({
      title: "Sucesso",
      description: "Relatório PDF exportado com sucesso!",
    });
  };

  const todayEntries = entries;
  const todaySuccessRate = todayEntries.length > 0 
    ? (todayEntries.filter(e => e.status === 'capturada').length / todayEntries.length * 100)
    : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="text-4xl mb-2">🚽</div>
        <h2 className="font-playfair text-xl font-bold text-slate-800">Diário de Eliminação</h2>
        <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
          <p className="text-sm text-blue-700 leading-relaxed">
            <strong>Registre com carinho:</strong> Cada sucesso é uma conquista! Use este diário para 
            entender o ritmo natural do seu bebê e celebrar cada progresso. 💙
          </p>
        </div>
      </div>

      {/* Seletor de data e botões rápidos */}
      <Card className="bg-gradient-to-r from-blue-50 to-teal-50 border-blue-200">
        <CardContent className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-semibold text-blue-700">Visualizar:</span>
            </div>
            <Badge className="bg-blue-100 text-blue-700 border-blue-300">
              {todayEntries.length} registros
            </Badge>
          </div>
          
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full p-3 rounded-lg border border-blue-200 bg-white text-sm focus:ring-2 focus:ring-blue-300 focus:border-transparent"
            max={new Date().toISOString().split('T')[0]}
          />

          {/* Botões de ação rápida */}
          <div className="flex space-x-2">
            <Button
              onClick={() => quickAdd('xixi')}
              size="sm"
              className="flex-1 bg-blue-100 text-blue-700 hover:bg-blue-200 border border-blue-300"
              variant="outline"
            >
              💧 Xixi Agora
            </Button>
            <Button
              onClick={() => quickAdd('coco')}
              size="sm"
              className="flex-1 bg-amber-100 text-amber-700 hover:bg-amber-200 border border-amber-300"
              variant="outline"
            >
              💩 Cocô Agora  
            </Button>
            <Button
              onClick={() => setShowForm(true)}
              size="sm"
              variant="outline"
              className="border-green-300 text-green-700 hover:bg-green-50"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Formulário */}
      {showForm && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-green-800">
                  {editingEntry ? 'Editar Registro' : 'Novo Registro'}
                </h3>
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="sm"
                  onClick={resetForm}
                  className="text-green-600 hover:bg-green-100"
                >
                  ✕
                </Button>
              </div>

              {/* Data e hora */}
              <div>
                <label className="text-sm font-medium text-green-700 mb-1 block">
                  <Clock className="w-4 h-4 inline mr-1" />
                  Data e Hora
                </label>
                <input
                  type="datetime-local"
                  value={formData.timestamp}
                  onChange={(e) => setFormData({...formData, timestamp: e.target.value})}
                  className="w-full p-2 rounded-lg border border-green-200 bg-white text-sm focus:ring-2 focus:ring-green-300"
                  required
                />
              </div>

              {/* Tipo de eliminação */}
              <div>
                <label className="text-sm font-medium text-green-700 mb-2 block">Tipo:</label>
                <div className="grid grid-cols-3 gap-2">
                  {eliminationTypes.map((type) => (
                    <Button
                      key={type.value}
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setFormData({...formData, elimination_type: type.value as any})}
                      className={`${
                        formData.elimination_type === type.value
                          ? 'bg-green-200 border-green-400 text-green-800'
                          : 'bg-white border-green-200 text-green-700'
                      }`}
                    >
                      {type.label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Local */}
              <div>
                <label className="text-sm font-medium text-green-700 mb-2 block">Local:</label>
                <div className="grid grid-cols-2 gap-2">
                  {locations.map((location) => (
                    <Button
                      key={location.value}
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setFormData({...formData, location: location.value as any})}
                      className={`text-xs ${
                        formData.location === location.value
                          ? 'bg-green-200 border-green-400 text-green-800'
                          : 'bg-white border-green-200 text-green-700'
                      }`}
                    >
                      {location.label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Status */}
              <div>
                <label className="text-sm font-medium text-green-700 mb-2 block">Status:</label>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setFormData({...formData, status: 'capturada'})}
                    className={`${
                      formData.status === 'capturada'
                        ? 'bg-green-200 border-green-400 text-green-800'
                        : 'bg-white border-green-200 text-green-700'
                    }`}
                  >
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Capturada
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setFormData({...formData, status: 'perdida'})}
                    className={`${
                      formData.status === 'perdida'
                        ? 'bg-red-200 border-red-400 text-red-800'
                        : 'bg-white border-green-200 text-green-700'
                    }`}
                  >
                    <XCircle className="w-4 h-4 mr-1" />
                    Perdida
                  </Button>
                </div>
              </div>

              {/* Sinais observados */}
              <div>
                <label className="text-sm font-medium text-green-700 mb-2 block">Sinais observados:</label>
                <div className="grid grid-cols-2 gap-1">
                  {availableSignals.map((signal) => (
                    <Button
                      key={signal}
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleSignal(signal)}
                      className={`text-xs justify-start ${
                        formData.signals_observed.includes(signal)
                          ? 'bg-green-100 text-green-800'
                          : 'text-green-600 hover:bg-green-50'
                      }`}
                    >
                      {formData.signals_observed.includes(signal) ? '✓ ' : '○ '}
                      {signal}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Campos opcionais em linha */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-green-700 mb-1 block">Atividade anterior:</label>
                  <select
                    value={formData.activity_before}
                    onChange={(e) => setFormData({...formData, activity_before: e.target.value})}
                    className="w-full p-2 rounded-lg border border-green-200 bg-white text-sm focus:ring-2 focus:ring-green-300"
                  >
                    <option value="">Selecionar...</option>
                    {activities.map((activity) => (
                      <option key={activity} value={activity}>{activity}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-green-700 mb-1 block">Humor do bebê:</label>
                  <select
                    value={formData.baby_mood}
                    onChange={(e) => setFormData({...formData, baby_mood: e.target.value})}
                    className="w-full p-2 rounded-lg border border-green-200 bg-white text-sm focus:ring-2 focus:ring-green-300"
                  >
                    <option value="">Selecionar...</option>
                    {moods.map((mood) => (
                      <option key={mood} value={mood}>{mood}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Notas */}
              <div>
                <label className="text-sm font-medium text-green-700 mb-1 block">Observações (opcional):</label>
                <Textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  placeholder="Como foi? Alguma observação especial..."
                  className="border-green-200 focus:ring-2 focus:ring-green-300"
                  rows={2}
                />
              </div>

              <Button 
                type="submit" 
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 text-white"
              >
                {loading ? 'Salvando...' : editingEntry ? 'Atualizar' : 'Salvar Registro'}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Lista de registros do dia */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-700">
              Registros de {format(new Date(selectedDate), 'dd/MM/yyyy', { locale: ptBR })}
            </h3>
            {todayEntries.length > 0 && (
              <Badge variant="outline" className="text-xs">
                Taxa de sucesso: {todaySuccessRate.toFixed(0)}%
              </Badge>
            )}
          </div>

          {todayEntries.length === 0 ? (
            <div className="text-center py-8 text-slate-500">
              <Droplets className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>Nenhum registro para este dia</p>
            </div>
          ) : (
            <div className="space-y-3">
              {todayEntries.map((entry) => (
                <div
                  key={entry.id}
                  className={`p-3 rounded-lg border-2 ${
                    entry.status === 'capturada'
                      ? 'border-green-200 bg-green-50'
                      : 'border-red-200 bg-red-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">
                        {entry.elimination_type === 'xixi' && '💧'}
                        {entry.elimination_type === 'coco' && '💩'}
                        {entry.elimination_type === 'ambos' && '💧💩'}
                      </span>
                      <span className="font-medium text-sm">
                        {format(new Date(entry.timestamp), 'HH:mm', { locale: ptBR })}
                      </span>
                      {entry.status === 'capturada' ? (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-600" />
                      )}
                    </div>
                    <div className="flex space-x-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => editEntry(entry)}
                        className="p-1 h-auto"
                      >
                        <Edit className="w-3 h-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => deleteEntry(entry.id)}
                        className="p-1 h-auto text-red-600 hover:bg-red-100"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="text-xs text-slate-600 space-y-1">
                    <div>📍 <strong>Local:</strong> {
                      locations.find(l => l.value === entry.location)?.label || entry.location
                    }</div>
                    
                    {entry.signals_observed?.length > 0 && (
                      <div>👀 <strong>Sinais:</strong> {entry.signals_observed.join(', ')}</div>
                    )}
                    
                    {entry.activity_before && (
                      <div>🎯 <strong>Atividade:</strong> {entry.activity_before}</div>
                    )}
                    
                    {entry.baby_mood && (
                      <div>😊 <strong>Humor:</strong> {entry.baby_mood}</div>
                    )}
                    
                    {entry.notes && (
                      <div>📝 <strong>Notas:</strong> {entry.notes}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Estatísticas e Export */}
      <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200">
        <CardContent className="p-4 space-y-4">
          <div className="flex items-center space-x-2">
            <BarChart3 className="w-4 h-4 text-purple-600" />
            <h3 className="font-semibold text-slate-700">Relatório Semanal</h3>
          </div>
          
          <div className="bg-purple-100/50 p-3 rounded-lg">
            <p className="text-xs text-purple-700 text-center leading-relaxed mb-3">
              💜 <strong>Cada progresso conta!</strong> Os padrões naturais se desenvolvem com o tempo. 
              Celebrate cada sucesso e seja gentil nos dias mais desafiadores.
            </p>
            <div className="flex justify-center">
              <Button
                onClick={exportToPDF}
                size="sm"
                variant="outline"
                className="text-purple-600 border-purple-300 hover:bg-purple-100"
              >
                <Download className="w-4 h-4 mr-2" />
                Exportar Relatório PDF
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DiarioEliminacao;