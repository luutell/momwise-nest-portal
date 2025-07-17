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
    <section className="py-20 px-6 bg-sage text-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Features */}
          <div>
            <h2 className="font-playfair text-4xl md:text-5xl font-semibold text-background mb-6">
              What You'll Discover
            </h2>
            <p className="text-lg text-background/80 mb-12">
              MomWise combines the wisdom of generations with modern expertise, 
              creating a nurturing space for conscious motherhood.
            </p>
            
            <div className="space-y-8">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className="flex items-start gap-4"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-12 h-12 bg-background/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <feature.icon className="h-6 w-6 text-background" />
                  </div>
                  <div>
                    <h3 className="font-playfair text-xl font-semibold text-background mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-background/80 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Phone mockup */}
          <div className="flex justify-center">
            <div className="relative">
              {/* Phone frame */}
              <div className="w-80 h-[600px] bg-slate-900 rounded-[3rem] p-3 shadow-2xl">
                <div className="w-full h-full bg-background rounded-[2.5rem] overflow-hidden">
                  {/* Status bar */}
                  <div className="flex justify-between items-center px-6 py-3 bg-sage text-background">
                    <span className="text-sm font-medium">9:41</span>
                    <span className="text-sm">MomWise</span>
                    <div className="flex gap-1">
                      <div className="w-1 h-1 bg-background rounded-full"></div>
                      <div className="w-1 h-1 bg-background rounded-full"></div>
                      <div className="w-1 h-1 bg-background rounded-full"></div>
                    </div>
                  </div>
                  
                  {/* App content */}
                  <div className="p-6 h-full bg-background">
                    <div className="text-center mb-8">
                      <h3 className="font-playfair text-2xl font-semibold text-foreground mb-2">
                        Good Morning, Sarah
                      </h3>
                      <p className="text-muted-foreground">How are you feeling today?</p>
                    </div>
                    
                    {/* Quick actions */}
                    <div className="grid grid-cols-2 gap-4 mb-8">
                      <div className="bg-sage/10 rounded-xl p-4 text-center">
                        <Heart className="h-8 w-8 text-sage mx-auto mb-2" />
                        <span className="text-sm font-medium text-foreground">Track Mood</span>
                      </div>
                      <div className="bg-terracotta/10 rounded-xl p-4 text-center">
                        <Baby className="h-8 w-8 text-terracotta mx-auto mb-2" />
                        <span className="text-sm font-medium text-foreground">Baby Care</span>
                      </div>
                    </div>
                    
                    {/* Daily wisdom card */}
                    <div className="bg-sage/5 rounded-xl p-4 border border-sage/20">
                      <div className="flex items-center gap-3 mb-3">
                        <Sparkles className="h-5 w-5 text-sage" />
                        <span className="font-medium text-foreground">Daily Wisdom</span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        "Trust your instincts, mama. You know your baby better than anyone else."
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;