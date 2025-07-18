import { 
  Baby, Moon, Heart, Lightbulb, Users, ShoppingCart, 
  Flower, Baby as BabyCry, RotateCcw, Utensils, 
  Sparkles, Bed, Search
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const categories = [
  {
    id: 'practical-tips',
    title: 'Dicas Práticas',
    icon: Lightbulb,
    color: 'bg-sage/20 hover:bg-sage/30',
    iconColor: 'text-sage',
    description: 'Dicas práticas e aplicáveis no dia a dia'
  },
  {
    id: 'emotional-support',
    title: 'Apoio Emocional',
    icon: Heart,
    color: 'bg-primary/20 hover:bg-primary/30',
    iconColor: 'text-primary',
    description: 'Apoio emocional'
  },
  {
    id: 'with-experts',
    title: 'Com Especialistas',
    icon: Sparkles,
    color: 'bg-terracotta/20 hover:bg-terracotta/30',
    iconColor: 'text-terracotta',
    description: 'Conteúdos por especialistas (pediatras, nutricionistas, psicólogas, etc.)'
  },
  {
    id: 'no-judgment',
    title: 'Sem Julgamentos',
    icon: Flower,
    color: 'bg-secondary/20 hover:bg-secondary/30',
    iconColor: 'text-secondary',
    description: 'Explicações claras e sem julgamentos'
  },
  {
    id: 'between-mothers',
    title: 'Entre Mães',
    icon: Users,
    color: 'bg-sage/20 hover:bg-sage/30',
    iconColor: 'text-sage',
    description: 'Troca com outras mães'
  },
  {
    id: 'collective-mothers',
    title: 'Coletivo de Mães',
    icon: ShoppingCart,
    color: 'bg-primary/20 hover:bg-primary/30',
    iconColor: 'text-primary',
    description: 'Compras coletivas'
  },
  {
    id: 'self-care',
    title: 'Cuidando de Si',
    icon: Heart,
    color: 'bg-terracotta/20 hover:bg-terracotta/30',
    iconColor: 'text-terracotta',
    description: 'Autocuidado e saúde da mãe'
  },
  {
    id: 'understanding-cry',
    title: 'Entendendo o Choro',
    icon: BabyCry,
    color: 'bg-secondary/20 hover:bg-secondary/30',
    iconColor: 'text-secondary',
    description: 'Como interpretar o choro do bebê'
  },
  {
    id: 'light-rhythm',
    title: 'Ritmo Leve',
    icon: RotateCcw,
    color: 'bg-sage/20 hover:bg-sage/30',
    iconColor: 'text-sage',
    description: 'Como montar uma rotina leve com o bebê'
  },
  {
    id: 'daily-with-baby',
    title: 'No Dia a Dia com o Bebê',
    icon: Baby,
    color: 'bg-primary/20 hover:bg-primary/30',
    iconColor: 'text-primary',
    description: 'Manejo e posições para segurar, ninar e trocar o bebê'
  },
  {
    id: 'baby-feeding',
    title: 'Alimentação do Bebê',
    icon: Utensils,
    color: 'bg-terracotta/20 hover:bg-terracotta/30',
    iconColor: 'text-terracotta',
    description: 'Introdução alimentar com orientação prática'
  },
  {
    id: 'stimulation-respect',
    title: 'Estímulo com Respeito',
    icon: Sparkles,
    color: 'bg-secondary/20 hover:bg-secondary/30',
    iconColor: 'text-secondary',
    description: 'Atividades para estimular o bebê com respeito ao seu tempo'
  },
  {
    id: 'sleep-regressions',
    title: 'Sono e Regressões',
    icon: Moon,
    color: 'bg-sage/20 hover:bg-sage/30',
    iconColor: 'text-sage',
    description: 'Explicações sobre sono e regressões'
  },
  {
    id: 'phases-discoveries',
    title: 'Fases e Descobertas',
    icon: Search,
    color: 'bg-primary/20 hover:bg-primary/30',
    iconColor: 'text-primary',
    description: 'Curiosidades sobre o desenvolvimento do bebê'
  }
];

const CategoryHub = () => {
  return (
    <div className="p-4">
      <div className="mb-6">
        <h2 className="font-playfair text-2xl font-semibold text-foreground mb-2">
          Your Nurturing Journey
        </h2>
        <p className="text-muted-foreground">
          Explore gentle guidance across all aspects of motherhood
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <Card 
              key={category.id} 
              className={`${category.color} border-none shadow-gentle transition-all duration-300 hover:scale-105 cursor-pointer`}
            >
              <CardContent className="p-4 flex flex-col items-center text-center h-full">
                <div className="mb-3">
                  <Icon className={`w-8 h-8 ${category.iconColor}`} />
                </div>
                <h3 className="font-playfair font-medium text-sm mb-2 text-foreground">
                  {category.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {category.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Weekly Highlights Section */}
      <div className="mt-8">
        <h3 className="font-playfair text-lg font-medium mb-4">This Week's Focus</h3>
        <Card className="bg-gradient-soft border-none shadow-soft">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
              <div>
                <h4 className="font-medium text-sm mb-1">Week 12: Finding Your Rhythm</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  This week, we explore how to tune into your baby's natural patterns and trust your maternal intuition.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CategoryHub;