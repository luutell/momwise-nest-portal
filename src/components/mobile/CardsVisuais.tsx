import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Baby, Clock, Users, Lightbulb } from 'lucide-react';

// Import das ilustrações educativas
import sinais03Meses from '@/assets/cards-visuais/sinais-0-3-meses.jpg';
import sinais46Meses from '@/assets/cards-visuais/sinais-4-6-meses.jpg';
import sinais712Meses from '@/assets/cards-visuais/sinais-7-12-meses.jpg';
import sinais12Anos from '@/assets/cards-visuais/sinais-1-2-anos.jpg';

interface AgeGroupData {
  id: string;
  title: string;
  ageRange: string;
  image: string;
  bgGradient: string;
  badgeColor: string;
  signs: string[];
  tips: string[];
  developmentNotes: string;
}

const ageGroups: AgeGroupData[] = [
  {
    id: '0-3-meses',
    title: 'Primeiros Sinais',
    ageRange: '0-3 meses',
    image: sinais03Meses,
    bgGradient: 'from-pink-100 to-purple-100',
    badgeColor: 'bg-gradient-to-r from-pink-500 to-purple-500 text-white',
    signs: [
      '😤 Caretas e expressões concentradas',
      '🦵 Movimentos sutis das pernas',
      '👀 Olhar focado e atento',
      '😌 Pausa nas atividades',
      '🤏 Mãozinhas fechadas'
    ],
    tips: [
      'Observe momentos de pausa durante a amamentação',
      'Aproveite os momentos de troca de fralda',
      'Não há pressão - apenas observe e aprenda'
    ],
    developmentNotes: 'Nesta fase, os sinais são muito sutis. O bebê ainda está desenvolvendo controle corporal básico.'
  },
  {
    id: '4-6-meses',
    title: 'Sinais Mais Claros',
    ageRange: '4-6 meses',
    image: sinais46Meses,
    bgGradient: 'from-blue-100 to-cyan-100',
    badgeColor: 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white',
    signs: [
      '👉 Apontar ou alcançar',
      '🔊 Sons específicos (grunhidos)',
      '🧘 Postura mais ereta',
      '👁️ Contato visual direcionado',
      '⏰ Padrões de horários'
    ],
    tips: [
      'Comece a oferecer o penico em horários regulares',
      'Observe os sinais após as refeições',
      'Use palavras simples como "xixi" e "cocô"'
    ],
    developmentNotes: 'O bebê começa a ter mais controle e consciência corporal. Os sinais ficam mais definidos.'
  },
  {
    id: '7-12-meses',
    title: 'Comunicação Ativa',
    ageRange: '7-12 meses',
    image: sinais712Meses,
    bgGradient: 'from-green-100 to-emerald-100',
    badgeColor: 'bg-gradient-to-r from-green-500 to-emerald-500 text-white',
    signs: [
      '🚶 Engatinhar até o banheiro',
      '🗣️ Tentar dizer "xixi" ou "cocô"',
      '👋 Gestos com as mãos',
      '🎯 Apontar para o penico',
      '😣 Inquietação dirigida'
    ],
    tips: [
      'Deixe o penico sempre visível e acessível',
      'Comemore as tentativas, mesmo sem sucesso',
      'Estabeleça uma rotina mais consistente'
    ],
    developmentNotes: 'Fase de maior desenvolvimento da comunicação. O bebê pode começar a se dirigir ao banheiro.'
  },
  {
    id: '1-2-anos',
    title: 'Autonomia Crescente',
    ageRange: '1-2 anos',
    image: sinais12Anos,
    bgGradient: 'from-orange-100 to-amber-100',
    badgeColor: 'bg-gradient-to-r from-orange-500 to-red-500 text-white',
    signs: [
      '💬 Palavras claras: "xixi", "cocô"',
      '🚶‍♂️ Caminha até o banheiro sozinho',
      '👆 Indica quando quer ir',
      '⏱️ Avisa com antecedência',
      '🎉 Orgulho dos sucessos'
    ],
    tips: [
      'Permita tentativas independentes',
      'Use roupas fáceis de tirar',
      'Mantenha o ambiente acolhedor e sem pressão'
    ],
    developmentNotes: 'A criança desenvolve maior autonomia e pode comunicar suas necessidades claramente.'
  }
];

const CardsVisuais = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="text-4xl mb-2">🎨</div>
        <h2 className="font-playfair text-xl font-bold text-slate-800">Cards Visuais Educativos</h2>
        <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
          <p className="text-sm text-orange-700 leading-relaxed">
            <strong>Guias visuais por idade:</strong> Cada fase tem suas características únicas. 
            Use estes cards como referência, lembrando que cada bebê se desenvolve no seu ritmo. 🧡
          </p>
        </div>
      </div>

      {/* Cards por faixa etária */}
      <div className="space-y-6">
        {ageGroups.map((group, index) => (
          <Card key={group.id} className={`overflow-hidden shadow-lg border-none bg-gradient-to-br ${group.bgGradient}`}>
            <CardContent className="p-0">
              {/* Header do card com imagem */}
              <div className="relative">
                <img 
                  src={group.image} 
                  alt={`Sinais para ${group.ageRange}`}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-playfair text-lg font-bold text-white mb-1">
                        {group.title}
                      </h3>
                      <Badge className={`${group.badgeColor} font-bold shadow-lg`}>
                        {group.ageRange}
                      </Badge>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                      <Baby className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Conteúdo do card */}
              <div className="p-6 space-y-6">
                {/* Nota de desenvolvimento */}
                <div className="bg-white/60 p-4 rounded-lg border border-white/50">
                  <div className="flex items-start space-x-3">
                    <Clock className="w-5 h-5 text-slate-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-slate-800 mb-2">Desenvolvimento nesta fase</h4>
                      <p className="text-sm text-slate-700 leading-relaxed">{group.developmentNotes}</p>
                    </div>
                  </div>
                </div>

                {/* Sinais principais */}
                <div className="bg-white/60 p-4 rounded-lg border border-white/50">
                  <div className="flex items-start space-x-3">
                    <Users className="w-5 h-5 text-slate-600 flex-shrink-0 mt-0.5" />
                    <div className="space-y-3 flex-1">
                      <h4 className="font-semibold text-slate-800">Sinais principais para observar</h4>
                      <div className="grid gap-2">
                        {group.signs.map((sign, signIndex) => (
                          <div key={signIndex} className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-slate-400 rounded-full flex-shrink-0" />
                            <span className="text-sm text-slate-700">{sign}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Dicas práticas */}
                <div className="bg-white/60 p-4 rounded-lg border border-white/50">
                  <div className="flex items-start space-x-3">
                    <Lightbulb className="w-5 h-5 text-slate-600 flex-shrink-0 mt-0.5" />
                    <div className="space-y-3 flex-1">
                      <h4 className="font-semibold text-slate-800">Dicas práticas</h4>
                      <div className="space-y-2">
                        {group.tips.map((tip, tipIndex) => (
                          <div key={tipIndex} className="flex items-start space-x-2">
                            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full flex-shrink-0 mt-2" />
                            <span className="text-sm text-slate-700 leading-relaxed">{tip}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Footer motivacional */}
      <Card className="bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-200">
        <CardContent className="p-6 text-center">
          <div className="text-3xl mb-3">💜</div>
          <h3 className="font-playfair text-lg font-bold text-slate-800 mb-3">Lembre-se sempre</h3>
          <div className="space-y-2 text-sm text-slate-700">
            <p>🌱 <strong>Cada bebê é único</strong> e se desenvolve no seu próprio ritmo</p>
            <p>🤗 <strong>Sem pressão</strong> - a higiene natural é sobre conexão, não performance</p>
            <p>💪 <strong>Seja gentil consigo mesma</strong> - você está aprendendo junto com seu bebê</p>
            <p>🎯 <strong>Foque no processo</strong>, não apenas nos resultados</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CardsVisuais;