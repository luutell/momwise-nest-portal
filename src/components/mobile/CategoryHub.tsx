import { Baby, Moon, Heart, Droplets, Utensils, Flower, Users, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const categories = [
  {
    id: 'breastfeeding',
    title: 'Breastfeeding',
    icon: Droplets,
    color: 'bg-sage/20 hover:bg-sage/30',
    iconColor: 'text-sage',
    description: 'Guidance and support for your feeding journey'
  },
  {
    id: 'sleep',
    title: 'Baby Sleep',
    icon: Moon,
    color: 'bg-terracotta/20 hover:bg-terracotta/30',
    iconColor: 'text-terracotta',
    description: 'Understanding natural sleep rhythms'
  },
  {
    id: 'postpartum',
    title: 'Postpartum Care',
    icon: Heart,
    color: 'bg-primary/20 hover:bg-primary/30',
    iconColor: 'text-primary',
    description: 'Healing and recovery support'
  },
  {
    id: 'emotions',
    title: 'Emotional Wellness',
    icon: Sparkles,
    color: 'bg-secondary/20 hover:bg-secondary/30',
    iconColor: 'text-secondary',
    description: 'Mental health and emotional balance'
  },
  {
    id: 'hygiene',
    title: 'Natural Hygiene',
    icon: Flower,
    color: 'bg-sage/20 hover:bg-sage/30',
    iconColor: 'text-sage',
    description: 'Gentle, natural care practices'
  },
  {
    id: 'nutrition',
    title: 'Nutrition',
    icon: Utensils,
    color: 'bg-terracotta/20 hover:bg-terracotta/30',
    iconColor: 'text-terracotta',
    description: 'Nourishing you and your baby'
  },
  {
    id: 'identity',
    title: 'Maternal Identity',
    icon: Users,
    color: 'bg-primary/20 hover:bg-primary/30',
    iconColor: 'text-primary',
    description: 'Embracing your motherhood journey'
  },
  {
    id: 'development',
    title: 'Child Development',
    icon: Baby,
    color: 'bg-secondary/20 hover:bg-secondary/30',
    iconColor: 'text-secondary',
    description: 'Play and developmental milestones'
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