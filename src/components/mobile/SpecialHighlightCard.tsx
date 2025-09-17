import { Heart } from 'lucide-react';

interface SpecialHighlightCardProps {
  title: string;
  subtitle: string;
  leftColumn: {
    title: string;
    items: string[];
  };
  rightColumn: {
    title: string;
    items: string[];
  };
}

export default function SpecialHighlightCard({ 
  title, 
  subtitle, 
  leftColumn, 
  rightColumn 
}: SpecialHighlightCardProps) {
  return (
    <div className="my-8 bg-gradient-to-br from-sage/20 via-sage/15 to-sage/25 rounded-2xl p-6 border-2 border-sage/30 shadow-lg">
      <div className="text-center mb-6">
        <div className="flex justify-center items-center mb-3">
          <Heart className="w-8 h-8 text-sage fill-sage" />
        </div>
        <h3 className="text-2xl font-playfair font-bold text-gray-800 mb-2">
          {title}
        </h3>
        <p className="text-gray-600 text-lg leading-relaxed">
          {subtitle}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white/70 rounded-xl p-5 border border-sage/20">
          <h4 className="text-xl font-semibold text-sage mb-4 font-playfair">
            {leftColumn.title}
          </h4>
          <ul className="space-y-3">
            {leftColumn.items.map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="w-2 h-2 bg-sage rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span className="text-gray-700 leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white/70 rounded-xl p-5 border border-sage/20">
          <h4 className="text-xl font-semibold text-sage mb-4 font-playfair">
            {rightColumn.title}
          </h4>
          <ul className="space-y-3">
            {rightColumn.items.map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="w-2 h-2 bg-sage rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span className="text-gray-700 leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600 italic">
          💚 Lembre-se: não existe forma certa ou errada - escolha o que funciona para sua família
        </p>
      </div>
    </div>
  );
}