import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Lightbulb } from 'lucide-react';
import { format, addDays, subDays } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  introduction?: string;
  practical_tip?: string;
}

interface MicroddicasDiariasProps {
  posts: Post[];
}

const MicroddicasDiarias = ({ posts }: MicroddicasDiariasProps) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Função para obter a microdica do dia baseada no índice
  const getMicroddicaForDate = (date: Date) => {
    if (posts.length === 0) return null;
    
    // Usar o dia do ano como índice para ter consistência
    const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000);
    const index = dayOfYear % posts.length;
    return posts[index];
  };

  const yesterday = subDays(selectedDate, 1);
  const today = new Date();
  const tomorrow = addDays(selectedDate, 1);

  const currentMicrodica = getMicroddicaForDate(selectedDate);

  const isToday = (date: Date) => {
    return format(date, 'yyyy-MM-dd') === format(today, 'yyyy-MM-dd');
  };

  const isSelected = (date: Date) => {
    return format(date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd');
  };

  if (posts.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center space-x-2">
          <Lightbulb className="w-6 h-6 text-yellow-500" />
          <h2 className="font-playfair text-2xl font-bold text-slate-800">Microdica Diária</h2>
        </div>
        <p className="text-slate-600">Uma dica prática para cada dia</p>
      </div>

      {/* Navegador de 3 dias */}
      <div className="bg-gradient-to-br from-yellow-400/10 via-amber-300/5 to-orange-400/10 rounded-2xl p-4 shadow-lg">
        <div className="grid grid-cols-3 gap-2 mb-4">
          {/* Ontem */}
          <Button
            variant="ghost"
            className={`h-auto p-3 flex-col space-y-1 ${
              isSelected(yesterday) 
                ? 'bg-yellow-100 text-yellow-800 border border-yellow-200' 
                : 'hover:bg-yellow-50 text-slate-600'
            }`}
            onClick={() => setSelectedDate(yesterday)}
          >
            <span className="text-xs font-medium">Ontem</span>
            <span className="text-sm font-bold">
              {format(yesterday, 'dd/MM', { locale: ptBR })}
            </span>
          </Button>

          {/* Hoje */}
          <Button
            variant="ghost"
            className={`h-auto p-3 flex-col space-y-1 ${
              isSelected(today) 
                ? 'bg-yellow-200 text-yellow-900 border border-yellow-300 shadow-md' 
                : 'hover:bg-yellow-50 text-slate-600'
            }`}
            onClick={() => setSelectedDate(today)}
          >
            <span className="text-xs font-medium">Hoje</span>
            <span className="text-sm font-bold">
              {format(today, 'dd/MM', { locale: ptBR })}
            </span>
            {isToday(today) && (
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            )}
          </Button>

          {/* Amanhã */}
          <Button
            variant="ghost"
            className={`h-auto p-3 flex-col space-y-1 ${
              isSelected(tomorrow) 
                ? 'bg-yellow-100 text-yellow-800 border border-yellow-200' 
                : 'hover:bg-yellow-50 text-slate-600'
            }`}
            onClick={() => setSelectedDate(tomorrow)}
          >
            <span className="text-xs font-medium">Amanhã</span>
            <span className="text-sm font-bold">
              {format(tomorrow, 'dd/MM', { locale: ptBR })}
            </span>
          </Button>
        </div>

        {/* Microdica do dia selecionado */}
        {currentMicrodica && (
          <Card className="bg-white/60 backdrop-blur-sm border-yellow-200/50 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-start space-x-3">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Lightbulb className="w-6 h-6 text-yellow-600" />
                </div>
                <div className="flex-1 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-yellow-700 bg-yellow-100 px-2 py-1 rounded-full">
                      {isToday(selectedDate) ? 'HOJE' : format(selectedDate, 'dd/MM', { locale: ptBR })}
                    </span>
                    <span className="text-xs text-slate-500">
                      Por {currentMicrodica.author}
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-playfair text-base font-bold text-slate-800">
                      {currentMicrodica.title.replace('Microdica:', '').trim()}
                    </h3>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      {currentMicrodica.practical_tip || currentMicrodica.introduction || 
                       currentMicrodica.content.substring(0, 120) + '...'}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Navegação adicional */}
        <div className="flex items-center justify-center space-x-4 mt-4">
          <Button
            variant="ghost"
            size="sm"
            className="text-yellow-700 hover:bg-yellow-100"
            onClick={() => setSelectedDate(subDays(selectedDate, 1))}
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Anterior
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className="text-yellow-700 hover:bg-yellow-100"
            onClick={() => setSelectedDate(today)}
          >
            Hoje
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className="text-yellow-700 hover:bg-yellow-100"
            onClick={() => setSelectedDate(addDays(selectedDate, 1))}
          >
            Próxima
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MicroddicasDiarias;