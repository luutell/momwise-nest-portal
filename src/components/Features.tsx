import { Heart, Moon, Users, Sparkles, Shield, Baby } from 'lucide-react';
import { Card } from './ui/card';

const features = [
  {
    icon: Heart,
    title: "Emotional Support",
    description: "Gentle guidance through the emotional landscape of motherhood, honoring your feelings and experiences."
  },
  {
    icon: Baby,
    title: "Practical Wisdom",
    description: "Evidence-based tips on breastfeeding, sleep, and baby care rooted in both modern science and ancestral knowledge."
  },
  {
    icon: Users,
    title: "Expert Community",
    description: "Connect with trusted specialists and fellow mothers who understand your journey without judgment."
  },
  {
    icon: Moon,
    title: "Gentle Routines",
    description: "Flexible, intuitive approaches to daily rhythms that honor your baby's natural patterns and your needs."
  },
  {
    icon: Shield,
    title: "Holistic Wellness",
    description: "Holistic approaches to hygiene, nutrition, and wellness that align with your values and instincts."
  },
  {
    icon: Sparkles,
    title: "Self-Care Rituals",
    description: "Nurturing practices to help you replenish your energy and reconnect with your inner wisdom."
  }
];

const Features = () => {
  return (
    <section className="py-20 px-6 bg-gradient-to-b from-background to-terracotta/85">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl font-semibold text-foreground mb-6">
            What You'll Discover
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            MomWise combines the wisdom of generations with modern expertise, 
            creating a nurturing space for conscious motherhood.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="p-8 bg-card/50 backdrop-blur-sm border-sage/20 hover:shadow-warm transition-all duration-300 hover:-translate-y-1"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-sage to-terracotta rounded-full flex items-center justify-center mb-6">
                  <feature.icon className="h-8 w-8 text-background" />
                </div>
                <h3 className="font-playfair text-xl font-semibold text-foreground mb-4">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;