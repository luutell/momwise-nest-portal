import { Heart, Moon, Users, Sparkles, Shield, Baby } from 'lucide-react';
import { Card } from './ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

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
  const { t } = useLanguage();

  const featuresWithTranslations = [
    {
      icon: Heart,
      title: t('features.emotional.title'),
      description: t('features.emotional.description')
    },
    {
      icon: Baby,
      title: t('features.practical.title'),
      description: t('features.practical.description')
    },
    {
      icon: Users,
      title: t('features.community.title'),
      description: t('features.community.description')
    },
    {
      icon: Moon,
      title: t('features.routines.title'),
      description: t('features.routines.description')
    },
    {
      icon: Shield,
      title: t('features.wellness.title'),
      description: t('features.wellness.description')
    },
    {
      icon: Sparkles,
      title: t('features.selfcare.title'),
      description: t('features.selfcare.description')
    }
  ];

  return (
    <section className="py-20 px-6 bg-white/20 backdrop-blur-sm transition-all duration-1000 ease-in-out">
      <div className="max-w-7xl mx-auto">
        <Card className="bg-terracotta/85 backdrop-blur-sm text-background p-12 shadow-2xl border-none transition-all duration-1000 ease-in-out">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left side - Features */}
            <div>
              <h2 className="font-playfair text-4xl md:text-5xl font-semibold text-background mb-6">
                {t('features.title')}
              </h2>
              <p className="text-lg text-background/80 mb-12">
                {t('features.description')}
              </p>
              
              <div className="space-y-8">
                {featuresWithTranslations.map((feature, index) => (
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
                    
                    {/* App content - Weekly Categories with Daily Wisdom */}
                    <div className="p-6 h-full bg-background">
                      <div className="text-center mb-6">
                        <h3 className="font-playfair text-2xl font-semibold text-foreground mb-2">
                          {t('features.app.journey')}
                        </h3>
                        <p className="text-muted-foreground">{t('features.app.weekly')}</p>
                      </div>
                      
                      {/* Daily Wisdom Card */}
                      <div className="bg-sage/5 rounded-xl p-4 border border-sage/20 mb-6">
                        <div className="flex items-center gap-3 mb-3">
                          <Sparkles className="h-5 w-5 text-sage" />
                          <span className="font-medium text-foreground">{t('features.app.daily.wisdom')}</span>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          "{t('features.app.wisdom.quote')}"
                        </p>
                      </div>
                      
                      {/* Weekly Categories */}
                      <div className="space-y-3">
                        <div className="bg-sage/10 rounded-xl p-4 border-l-4 border-sage">
                          <h4 className="font-semibold text-foreground mb-2">Week 8</h4>
                          <div className="flex flex-wrap gap-2">
                            <span className="bg-sage/20 text-sage text-xs px-2 py-1 rounded-full">Breastfeeding</span>
                            <span className="bg-sage/20 text-sage text-xs px-2 py-1 rounded-full">Baby Sleep</span>
                            <span className="bg-sage/20 text-sage text-xs px-2 py-1 rounded-full">Bonding</span>
                          </div>
                        </div>
                        
                        <div className="bg-terracotta/10 rounded-xl p-4 border-l-4 border-terracotta">
                          <h4 className="font-semibold text-foreground mb-2">Week 12</h4>
                          <div className="flex flex-wrap gap-2">
                            <span className="bg-terracotta/20 text-terracotta text-xs px-2 py-1 rounded-full">Baby Handling</span>
                            <span className="bg-terracotta/20 text-terracotta text-xs px-2 py-1 rounded-full">Natural Hygiene</span>
                            <span className="bg-terracotta/20 text-terracotta text-xs px-2 py-1 rounded-full">Routine</span>
                          </div>
                        </div>
                        
                        <div className="bg-sage/10 rounded-xl p-4 border-l-4 border-sage">
                          <h4 className="font-semibold text-foreground mb-2">Week 16</h4>
                          <div className="flex flex-wrap gap-2">
                            <span className="bg-sage/20 text-sage text-xs px-2 py-1 rounded-full">Food Introduction</span>
                            <span className="bg-sage/20 text-sage text-xs px-2 py-1 rounded-full">Age Activities</span>
                            <span className="bg-sage/20 text-sage text-xs px-2 py-1 rounded-full">Mental Health</span>
                          </div>
                        </div>
                        
                        <div className="bg-terracotta/10 rounded-xl p-4 border-l-4 border-terracotta">
                          <h4 className="font-semibold text-foreground mb-2">Week 20</h4>
                          <div className="flex flex-wrap gap-2">
                            <span className="bg-terracotta/20 text-terracotta text-xs px-2 py-1 rounded-full">Holistic Wellness</span>
                            <span className="bg-terracotta/20 text-terracotta text-xs px-2 py-1 rounded-full">Myth Busting</span>
                            <span className="bg-terracotta/20 text-terracotta text-xs px-2 py-1 rounded-full">Postpartum</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default Features;