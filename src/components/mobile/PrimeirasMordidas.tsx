import { useState } from 'react';
import { ArrowLeft, Clock, Book, Play, Heart, MessageCircle, Bookmark, Share2, ChevronDown, ChevronUp, Baby, Utensils, Clock as ClockIcon, Apple } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

interface PrimeirasMordidasProps {
  onBack: () => void;
}

const PrimeirasMordidas = ({ onBack }: PrimeirasMordidasProps) => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [savedFoods, setSavedFoods] = useState<string[]>([]);
  const { t } = useLanguage();

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const toggleSaveFood = (food: string) => {
    setSavedFoods(prev => 
      prev.includes(food) 
        ? prev.filter(f => f !== food)
        : [...prev, food]
    );
  };

  const isEnglish = t('language') === 'en';

  // Content in both languages
  const content = {
    title: isEnglish ? 'First Bites' : 'Primeiras Mordidas',
    subtitle: isEnglish ? 'Where ancestral nutrition meets intuitive care.' : 'Onde a nutrição ancestral encontra o cuidado intuitivo.',
    
    sections: [
      {
        id: 'why-different',
        title: isEnglish ? 'Why Start Differently?' : 'Por que começar diferente?',
        subtitle: isEnglish ? 'What does gut health have to do with first spoonfuls?' : 'O que a saúde intestinal tem a ver com as primeiras colheradas?',
        icon: Baby,
        content: {
          intro: isEnglish 
            ? 'The gut (microbiome) plays a fundamental role in your baby\'s health, influencing everything from digestion to immune system development.'
            : 'O intestino (microbioma) desempenha um papel fundamental na saúde do seu bebê, influenciando desde a digestão até o desenvolvimento do sistema imunológico.',
          symptoms: isEnglish
            ? 'Common symptoms linked to gut flora imbalance:'
            : 'Sintomas mais comuns ligados ao desequilíbrio da flora intestinal:',
          symptomsList: isEnglish
            ? ['Eczema', 'Respiratory allergies', 'Colic, constipation or diarrhea', 'Reflux', 'Food reactions']
            : ['Eczema', 'Alergias respiratórias', 'Cólicas, constipação ou diarreia', 'Refluxo', 'Reações a alimentos'],
          conclusion: isEnglish
            ? 'Feeding can be a path to healing and prevention when we understand these connections.'
            : 'A alimentação pode ser um caminho de cura e prevenção quando entendemos essas conexões.'
        }
      },
      {
        id: 'before-first-food',
        title: isEnglish ? 'Before the First Food' : 'Antes da Primeira Comida',
        subtitle: isEnglish ? 'How to prepare your baby\'s body to receive solid foods.' : 'Como preparar o corpo do bebê para receber alimentos sólidos.',
        icon: ClockIcon,
        content: {
          intro: isEnglish
            ? 'Preparation is as important as the food itself. Going slow is essential for healthy development.'
            : 'A preparação é tão importante quanto o alimento em si. Ir devagar é essencial para um desenvolvimento saudável.',
          readinessSigns: isEnglish
            ? 'Real readiness signs (not just age-based):'
            : 'Sinais de prontidão reais (não baseados apenas em idade):',
          signsList: isEnglish
            ? ['Sits without support', 'Shows interest in food', 'Lost the tongue-thrust reflex', 'Can grab objects and bring to mouth']
            : ['Senta sem apoio', 'Demonstra interesse na comida', 'Perdeu o reflexo de protrusão da língua', 'Consegue pegar objetos e levar à boca'],
          preparation: isEnglish
            ? 'Ways to strengthen the gut before solid food:'
            : 'Formas de fortalecer o intestino antes da comida sólida:',
          prepList: isEnglish
            ? ['Quality maternal nutrition', 'Probiotics (with guidance)', 'Skin-to-skin contact', 'Reducing toxins in the environment']
            : ['Alimentação materna de qualidade', 'Probióticos (com orientação)', 'Tempo no colo pele a pele', 'Redução de toxinas no ambiente']
        }
      },
      {
        id: 'weekly-plan',
        title: isEnglish ? 'Introduction Plan — Week by Week' : 'Plano de Introdução Alimentar — Semana a Semana',
        subtitle: isEnglish ? 'An intuitive guide for busy mothers.' : 'Um guia intuitivo para mães ocupadas.',
        icon: Book,
        content: {
          weeks: [
            {
              week: 1,
              food: isEnglish ? 'Warm, gelatinous bone broth' : 'Caldo de carne morno e em gelatina',
              benefits: isEnglish ? 'Repairs intestinal mucosa, easy to digest, mineral source' : 'Repara a mucosa intestinal, fácil de digerir, fonte de minerais',
              tip: isEnglish ? 'Offer with a spoon, preferably in the morning, observe baby\'s reaction' : 'Oferecer com colher, preferencialmente manhã, observar reação do bebê'
            },
            {
              week: 2,
              food: isEnglish ? 'Egg yolk from pasture-raised hens' : 'Gema de ovo de galinha caipira',
              benefits: isEnglish ? 'Rich in choline for brain development, healthy fats' : 'Rica em colina para desenvolvimento cerebral, gorduras saudáveis',
              tip: isEnglish ? 'Start with 1/4 yolk, can mix with breast milk' : 'Começar com 1/4 da gema, pode misturar com leite materno'
            },
            {
              week: 3,
              food: isEnglish ? 'Mashed avocado' : 'Abacate amassado',
              benefits: isEnglish ? 'Healthy fats, fiber, potassium' : 'Gorduras saudáveis, fibras, potássio',
              tip: isEnglish ? 'Choose very ripe, can add a pinch of sea salt' : 'Escolher bem maduro, pode adicionar pitada de sal marinho'
            },
            {
              week: 4,
              food: isEnglish ? 'Sweet potato with ghee' : 'Batata doce com ghee',
              benefits: isEnglish ? 'Beta-carotene, healthy carbohydrates, vitamin A' : 'Betacaroteno, carboidratos saudáveis, vitamina A',
              tip: isEnglish ? 'Cook well, mash with ghee for better absorption' : 'Cozinhar bem, amassar com ghee para melhor absorção'
            }
          ]
        }
      },
      {
        id: 'superfoods',
        title: isEnglish ? 'Essential Foods' : 'Alimentos Fundamentais',
        subtitle: isEnglish ? 'The real superfoods to start with' : 'Os verdadeiros superalimentos para começar',
        icon: Apple,
        content: {
          foods: [
            {
              name: isEnglish ? 'Bone Broth (not just bone)' : 'Caldo de carne (e não só osso)',
              description: isEnglish ? 'Rich in collagen, minerals, and amino acids that heal and nourish the gut' : 'Rico em colágeno, minerais e aminoácidos que curam e nutrem o intestino'
            },
            {
              name: isEnglish ? 'Liver and Organ Meats' : 'Fígado e vísceras',
              description: isEnglish ? 'Nature\'s multivitamin, rich in iron, B vitamins, and vitamin A' : 'O multivitamínico da natureza, rico em ferro, vitaminas do complexo B e vitamina A'
            },
            {
              name: isEnglish ? 'Natural Yogurt and Kefir' : 'Iogurte natural e kefir',
              description: isEnglish ? 'Probiotics that colonize the gut with good bacteria' : 'Probióticos que colonizam o intestino com bactérias benéficas'
            },
            {
              name: isEnglish ? 'Vegetables Cooked in Good Fat' : 'Legumes cozidos em gordura boa',
              description: isEnglish ? 'Facilitates absorption of fat-soluble vitamins' : 'Facilita a absorção de vitaminas lipossolúveis'
            },
            {
              name: isEnglish ? 'Fermented Foods in Micro-doses' : 'Fermentados em microdoses',
              description: isEnglish ? 'Introduce beneficial bacteria gradually' : 'Introduzem bactérias benéficas gradualmente'
            },
            {
              name: isEnglish ? 'Ghee, Lard and Saturated Fats' : 'Ghee, banha e outras gorduras saturadas',
              description: isEnglish ? 'Essential for brain development and hormone production' : 'Essenciais para desenvolvimento cerebral e produção hormonal'
            }
          ]
        }
      },
      {
        id: 'faq',
        title: isEnglish ? 'Frequent Questions & Real Fears' : 'Dúvidas Frequentes & Medos Reais',
        subtitle: isEnglish ? 'Honest answers to real mothers\' questions' : 'Respostas sinceras para perguntas de mães reais',
        icon: MessageCircle,
        content: {
          faqs: [
            {
              question: isEnglish ? 'What if the baby has a reaction?' : 'E se o bebê tiver reação?',
              answer: isEnglish ? 'Reactions are information. Stop the food, wait 3-5 days, and try again in smaller amounts. Each baby has their own rhythm.' : 'Reações são informações. Pare o alimento, aguarde 3-5 dias e tente novamente em menores quantidades. Cada bebê tem seu ritmo.'
            },
            {
              question: isEnglish ? 'Do I need to introduce 100 foods by 1 year?' : 'Preciso introduzir 100 alimentos até 1 ano?',
              answer: isEnglish ? 'Quality over quantity. It\'s better to master 20 nutritious foods than to rush through 100 without proper absorption.' : 'Qualidade sobre quantidade. Melhor dominar 20 alimentos nutritivos do que correr atrás de 100 sem absorção adequada.'
            },
            {
              question: isEnglish ? 'What if my baby doesn\'t accept anything?' : 'O que faço se meu bebê não aceita nada?',
              answer: isEnglish ? 'Patience is key. Keep offering without pressure. Sometimes it takes 10+ exposures for acceptance. Trust the process.' : 'Paciência é fundamental. Continue oferecendo sem pressão. Às vezes são necessárias 10+ exposições para aceitação. Confie no processo.'
            },
            {
              question: isEnglish ? 'My baby still has reflux. Can I start?' : 'Meu bebê ainda tem refluxo. Posso começar?',
              answer: isEnglish ? 'Start with healing foods like bone broth. Work on the root cause while introducing foods that help repair the gut.' : 'Comece com alimentos curativos como caldo de carne. Trabalhe a causa raiz enquanto introduz alimentos que ajudam a reparar o intestino.'
            }
          ]
        }
      }
    ],
    
    testimonials: [
      {
        text: isEnglish 
          ? "At 6 months, my daughter started with bone broth and organ meats and today, at 9 months, she eats everything. I never imagined such a peaceful introduction was possible."
          : "Com 6 meses, minha filha começou com caldo de carne e vísceras e, hoje, aos 9 meses, come tudo. Nunca imaginei que fosse possível uma introdução tão tranquila.",
        author: isEnglish ? "Ellen, Clara's mother" : "Ellen, mãe da Clara"
      },
      {
        text: isEnglish
          ? "Following ancestral nutrition, my son had no allergic reactions and developed a healthy relationship with food from the start."
          : "Seguindo a nutrição ancestral, meu filho não teve reações alérgicas e desenvolveu uma relação saudável com a comida desde o início.",
        author: isEnglish ? "Marina, João's mother" : "Marina, mãe do João"
      },
      {
        text: isEnglish
          ? "The emphasis on gut health made all the difference. Today I see the results in my daughter's immunity and disposition."
          : "A ênfase na saúde intestinal fez toda a diferença. Hoje vejo os resultados na imunidade e disposição da minha filha.",
        author: isEnglish ? "Carla, Sofia's mother" : "Carla, mãe da Sofia"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-terracotta/5 to-sage/10">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="flex items-center p-4">
          <Button variant="ghost" onClick={onBack} className="mr-3 p-2">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-terracotta/20 rounded-full flex items-center justify-center">
              <Utensils className="w-5 h-5 text-terracotta" />
            </div>
            <div>
              <h1 className="font-playfair text-lg font-medium text-foreground">
                {content.title}
              </h1>
              <p className="text-sm text-muted-foreground">
                {content.subtitle}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6 pb-20">
        {/* Hero Section */}
        <Card className="bg-gradient-to-br from-terracotta/10 via-background to-sage/5 border-none shadow-soft">
          <CardContent className="p-6 text-center space-y-4">
            <div className="w-16 h-16 bg-terracotta/20 rounded-full flex items-center justify-center mx-auto">
              <Utensils className="w-8 h-8 text-terracotta" />
            </div>
            <h2 className="font-playfair text-xl font-medium text-foreground">
              {content.title} 🌱
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {content.subtitle}
            </p>
          </CardContent>
        </Card>

        {/* Main Sections */}
        {content.sections.map((section) => {
          const Icon = section.icon;
          const isExpanded = expandedSection === section.id;
          
          return (
            <Card key={section.id} className="border-none shadow-soft">
              <CardHeader 
                className="cursor-pointer" 
                onClick={() => toggleSection(section.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{section.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {section.subtitle}
                      </p>
                    </div>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                  )}
                </div>
              </CardHeader>
              
              {isExpanded && (
                <CardContent className="pt-0 space-y-4">
                  {/* Content based on section */}
                  {section.id === 'why-different' && (
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        {section.content.intro}
                      </p>
                      <div>
                        <h4 className="font-medium text-foreground mb-2">
                          {section.content.symptoms}
                        </h4>
                        <ul className="space-y-1">
                          {section.content.symptomsList.map((symptom, index) => (
                            <li key={index} className="text-sm text-muted-foreground flex items-center">
                              <span className="w-1.5 h-1.5 bg-terracotta rounded-full mr-2"></span>
                              {symptom}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <p className="text-muted-foreground leading-relaxed italic">
                        {section.content.conclusion}
                      </p>
                    </div>
                  )}

                  {section.id === 'before-first-food' && (
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        {section.content.intro}
                      </p>
                      <div>
                        <h4 className="font-medium text-foreground mb-2">
                          {section.content.readinessSigns}
                        </h4>
                        <ul className="space-y-1">
                          {section.content.signsList.map((sign, index) => (
                            <li key={index} className="text-sm text-muted-foreground flex items-center">
                              <span className="w-1.5 h-1.5 bg-sage rounded-full mr-2"></span>
                              {sign}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground mb-2">
                          {section.content.preparation}
                        </h4>
                        <ul className="space-y-1">
                          {section.content.prepList.map((prep, index) => (
                            <li key={index} className="text-sm text-muted-foreground flex items-center">
                              <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                              {prep}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {section.id === 'weekly-plan' && (
                    <div className="space-y-4">
                      {section.content.weeks.map((week) => (
                        <Card key={week.week} className="bg-background border border-border">
                          <CardContent className="p-4">
                            <div className="flex items-start space-x-3">
                              <div className="w-8 h-8 bg-terracotta/20 rounded-full flex items-center justify-center flex-shrink-0">
                                <span className="text-sm font-medium text-terracotta">
                                  {week.week}
                                </span>
                              </div>
                              <div className="space-y-2 flex-1">
                                <h5 className="font-medium text-foreground">
                                  {week.food}
                                </h5>
                                <p className="text-sm text-muted-foreground">
                                  <strong>
                                    {isEnglish ? 'Benefits:' : 'Benefícios:'}
                                  </strong> {week.benefits}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  <strong>
                                    {isEnglish ? 'Tip:' : 'Dica:'}
                                  </strong> {week.tip}
                                </p>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => toggleSaveFood(week.food)}
                                  className={`text-xs ${savedFoods.includes(week.food) ? 'text-primary' : 'text-muted-foreground'}`}
                                >
                                  <Bookmark className={`w-4 h-4 mr-1 ${savedFoods.includes(week.food) ? 'fill-current' : ''}`} />
                                  {isEnglish ? 'Save Food' : 'Salvar Alimento'}
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}

                  {section.id === 'superfoods' && (
                    <div className="space-y-3">
                      {section.content.foods.map((food, index) => (
                        <Card key={index} className="bg-background border border-border">
                          <CardContent className="p-4">
                            <div className="flex items-start space-x-3">
                              <div className="w-8 h-8 bg-sage/20 rounded-full flex items-center justify-center flex-shrink-0">
                                <Apple className="w-4 h-4 text-sage" />
                              </div>
                              <div className="space-y-1 flex-1">
                                <h5 className="font-medium text-foreground">
                                  {food.name}
                                </h5>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                  {food.description}
                                </p>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => toggleSaveFood(food.name)}
                                  className={`text-xs mt-2 ${savedFoods.includes(food.name) ? 'text-primary' : 'text-muted-foreground'}`}
                                >
                                  <Bookmark className={`w-4 h-4 mr-1 ${savedFoods.includes(food.name) ? 'fill-current' : ''}`} />
                                  {isEnglish ? 'Save Food' : 'Salvar Alimento'}
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}

                  {section.id === 'faq' && (
                    <div className="space-y-4">
                      {section.content.faqs.map((faq, index) => (
                        <Card key={index} className="bg-background border border-border">
                          <CardContent className="p-4">
                            <h5 className="font-medium text-foreground mb-2">
                              {faq.question}
                            </h5>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {faq.answer}
                            </p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </CardContent>
              )}
            </Card>
          );
        })}

        {/* Testimonials */}
        <Card className="border-none shadow-soft">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                <Heart className="w-5 h-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-lg">
                  {isEnglish ? 'Real Mothers\' Stories' : 'Depoimentos de Mães'}
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  {isEnglish 
                    ? 'Real stories from those who chose the ancestral nutrition path'
                    : 'Histórias reais de quem escolheu o caminho da nutrição ancestral'}
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {content.testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-gradient-to-br from-sage/5 to-background border border-border">
                <CardContent className="p-4">
                  <p className="text-muted-foreground leading-relaxed italic mb-3">
                    "{testimonial.text}"
                  </p>
                  <p className="text-sm font-medium text-foreground">
                    — {testimonial.author}
                  </p>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button className="w-full bg-terracotta hover:bg-terracotta/90 text-white">
            <MessageCircle className="w-4 h-4 mr-2" />
            {isEnglish ? 'I have a question' : 'Tenho uma dúvida'}
          </Button>
          
          <div className="flex space-x-2">
            <Button variant="outline" className="flex-1">
              <Play className="w-4 h-4 mr-2" />
              {isEnglish ? 'Listen as Audio' : 'Ouvir como Áudio'}
            </Button>
            <Button variant="outline" className="flex-1">
              <Share2 className="w-4 h-4 mr-2" />
              {isEnglish ? 'Share' : 'Compartilhar'}
            </Button>
          </div>
        </div>

        {/* Saved Foods Summary */}
        {savedFoods.length > 0 && (
          <Card className="bg-gradient-to-br from-primary/10 via-background to-sage/5 border-none shadow-soft">
            <CardContent className="p-4">
              <h4 className="font-medium text-foreground mb-2">
                {isEnglish ? 'Saved Foods' : 'Alimentos Salvos'} ({savedFoods.length})
              </h4>
              <div className="flex flex-wrap gap-2">
                {savedFoods.map((food, index) => (
                  <span key={index} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                    {food}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default PrimeirasMordidas;