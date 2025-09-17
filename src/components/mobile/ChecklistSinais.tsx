import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Circle, Calendar, TrendingUp, BookOpen, Download } from 'lucide-react';
import jsPDF from 'jspdf';

interface Signal {
  id: string;
  name: string;
  observed: boolean;
}

interface DayEntry {
  date: string;
  signals: Signal[];
  notes: string;
}

const ChecklistSinais = () => {
  const [selectedDay, setSelectedDay] = useState(new Date().toISOString().split('T')[0]);
  const [dayEntries, setDayEntries] = useState<DayEntry[]>([]);
  
  const availableSignals = [
    { id: 'caretas', name: '😤 Caretas e expressões' },
    { id: 'movimentos', name: '🦵 Movimentos de perna' },
    { id: 'sons', name: '🔊 Sons específicos' },
    { id: 'inquietacao', name: '😣 Inquietação' },
    { id: 'concentracao', name: '🤔 Concentração/foco' },
    { id: 'nenhum', name: '🤷‍♀️ Nenhum sinal percebido' }
  ];

  const getCurrentEntry = () => {
    return dayEntries.find(entry => entry.date === selectedDay) || {
      date: selectedDay,
      signals: availableSignals.map(signal => ({ ...signal, observed: false })),
      notes: ''
    };
  };

  const toggleSignal = (signalId: string) => {
    const updatedEntries = [...dayEntries];
    const entryIndex = updatedEntries.findIndex(entry => entry.date === selectedDay);
    
    if (entryIndex === -1) {
      const newEntry = {
        date: selectedDay,
        signals: availableSignals.map(signal => ({
          ...signal,
          observed: signal.id === signalId
        })),
        notes: ''
      };
      updatedEntries.push(newEntry);
    } else {
      updatedEntries[entryIndex].signals = updatedEntries[entryIndex].signals.map(signal =>
        signal.id === signalId ? { ...signal, observed: !signal.observed } : signal
      );
    }
    
    setDayEntries(updatedEntries);
  };

  const updateNotes = (notes: string) => {
    const updatedEntries = [...dayEntries];
    const entryIndex = updatedEntries.findIndex(entry => entry.date === selectedDay);
    
    if (entryIndex === -1) {
      const newEntry = {
        date: selectedDay,
        signals: availableSignals.map(signal => ({ ...signal, observed: false })),
        notes
      };
      updatedEntries.push(newEntry);
    } else {
      updatedEntries[entryIndex].notes = notes;
    }
    
    setDayEntries(updatedEntries);
  };

  const getLastSevenDays = () => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      days.push(date.toISOString().split('T')[0]);
    }
    return days;
  };

  const getWeeklySummary = () => {
    const lastSevenDays = getLastSevenDays();
    const summary: { [key: string]: number } = {};
    
    availableSignals.forEach(signal => {
      summary[signal.name] = 0;
    });
    
    lastSevenDays.forEach(date => {
      const entry = dayEntries.find(e => e.date === date);
      if (entry) {
        entry.signals.forEach(signal => {
          if (signal.observed) {
            summary[signal.name]++;
          }
        });
      }
    });
    
    return summary;
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    const summary = getWeeklySummary();
    
    // Configurar fonte e título
    doc.setFontSize(20);
    doc.text('Resumo dos últimos 7 dias', 20, 30);
    
    // Subtítulo
    doc.setFontSize(12);
    doc.text('Checklist de Sinais - Higiene Natural', 20, 45);
    
    // Data de geração
    const today = new Date().toLocaleDateString('pt-BR');
    doc.text(`Gerado em: ${today}`, 20, 55);
    
    // Linha separadora
    doc.line(20, 65, 190, 65);
    
    // Cabeçalho da tabela
    doc.setFontSize(14);
    doc.text('Sinais Observados', 20, 80);
    
    // Dados do resumo
    let yPosition = 95;
    doc.setFontSize(11);
    
    Object.entries(summary).forEach(([signal, count]) => {
      // Remove emojis para o PDF
      const cleanSignal = signal.replace(/[\u{1F300}-\u{1F9FF}]/gu, '').trim();
      doc.text(`${cleanSignal}:`, 25, yPosition);
      doc.text(`${count}x esta semana`, 140, yPosition);
      yPosition += 15;
    });
    
    // Mensagem motivacional
    yPosition += 20;
    doc.setFontSize(10);
    doc.text('Padrões são naturais! Use essas informações como um guia gentil,', 20, yPosition);
    doc.text('não como regras rígidas. Você conhece seu bebê melhor que ninguém.', 20, yPosition + 10);
    
    // Salvar PDF
    doc.save(`resumo-sinais-${today.replace(/\//g, '-')}.pdf`);
  };

  const currentEntry = getCurrentEntry();
  const weeklySummary = getWeeklySummary();
  const observedToday = currentEntry.signals.filter(s => s.observed).length;

  return (
    <div className="space-y-6">
      {/* Header acolhedor */}
      <div className="text-center space-y-3">
        <div className="text-4xl mb-2">🌟</div>
        <h2 className="font-playfair text-xl font-bold text-slate-800">Checklist de Sinais</h2>
        <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100">
          <p className="text-sm text-emerald-700 leading-relaxed">
            <strong>Lembre-se:</strong> Não há certo ou errado! Esta ferramenta é apenas para observar e aprender sobre seu bebê. 
            Cada dia é único e cada bebê tem seu próprio ritmo. 💚
          </p>
        </div>
      </div>

      {/* Seletor de data */}
      <Card className="bg-gradient-to-r from-teal-50 to-emerald-50 border-teal-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-teal-600" />
              <span className="text-sm font-semibold text-teal-700">Registrar para:</span>
            </div>
            <Badge className="bg-teal-100 text-teal-700 border-teal-300">
              {observedToday} sinais hoje
            </Badge>
          </div>
          <input
            type="date"
            value={selectedDay}
            onChange={(e) => setSelectedDay(e.target.value)}
            className="w-full p-3 rounded-lg border border-teal-200 bg-white text-sm focus:ring-2 focus:ring-teal-300 focus:border-transparent"
            max={new Date().toISOString().split('T')[0]}
          />
        </CardContent>
      </Card>

      {/* Lista de sinais */}
      <div className="space-y-3">
        <h3 className="font-semibold text-slate-700 flex items-center space-x-2">
          <span>👁️</span>
          <span>Quais sinais você percebeu hoje?</span>
        </h3>
        
        <div className="grid gap-3">
          {currentEntry.signals.map((signal) => (
            <Button
              key={signal.id}
              variant="ghost"
              onClick={() => toggleSignal(signal.id)}
              className={`h-auto p-4 flex items-center justify-start space-x-3 rounded-xl border-2 transition-all duration-200 ${
                signal.observed
                  ? 'bg-emerald-100 border-emerald-300 text-emerald-800 shadow-md'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <div className="flex-shrink-0">
                {signal.observed ? (
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                ) : (
                  <Circle className="w-5 h-5 text-slate-400" />
                )}
              </div>
              <span className="text-sm font-medium">{signal.name}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Anotações */}
      <Card className="bg-orange-50 border-orange-200">
        <CardContent className="p-4 space-y-3">
          <h3 className="font-semibold text-slate-700 flex items-center space-x-2">
            <BookOpen className="w-4 h-4" />
            <span>Anotações do dia (opcional)</span>
          </h3>
          <textarea
            value={currentEntry.notes}
            onChange={(e) => updateNotes(e.target.value)}
            placeholder="Como foi o dia? Alguma observação especial? Lembre-se: sem pressão, apenas registre o que sentir vontade..."
            className="w-full p-3 rounded-lg border border-orange-200 bg-white text-sm resize-none focus:ring-2 focus:ring-orange-300 focus:border-transparent"
            rows={3}
          />
        </CardContent>
      </Card>

      {/* Resumo semanal */}
      <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200">
        <CardContent className="p-4 space-y-4">
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-4 h-4 text-purple-600" />
            <h3 className="font-semibold text-slate-700">Resumo dos últimos 7 dias</h3>
          </div>
          
          <div className="space-y-2">
            {Object.entries(weeklySummary).map(([signal, count]) => (
              <div key={signal} className="flex items-center justify-between py-2 px-3 bg-white/60 rounded-lg">
                <span className="text-sm text-slate-700">{signal}</span>
                <Badge variant="outline" className="text-xs">
                  {count}x esta semana
                </Badge>
              </div>
            ))}
          </div>
          
          <div className="bg-purple-100/50 p-3 rounded-lg">
            <p className="text-xs text-purple-700 text-center leading-relaxed mb-3">
              💜 <strong>Padrões são naturais!</strong> Use essas informações como um guia gentil, 
              não como regras rígidas. Você conhece seu bebê melhor que ninguém.
            </p>
            <div className="flex justify-center">
              <Button
                onClick={exportToPDF}
                size="sm"
                variant="outline"
                className="text-purple-600 border-purple-300 hover:bg-purple-100"
              >
                <Download className="w-4 h-4 mr-2" />
                Exportar PDF
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChecklistSinais;