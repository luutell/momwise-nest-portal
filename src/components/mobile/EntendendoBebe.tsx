import React, { useState } from 'react';
import { ChevronLeft, BookOpen, Heart, MessageCircle, Play, Pause, Save, Star, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { useProfile } from "@/hooks/useProfile";

interface EntendendoBebeProps {
  onBack: () => void;
}

const EntendendoBebe: React.FC<EntendendoBebeProps> = ({ onBack }) => {
  const { language } = useLanguage();
  const { profile } = useProfile();
  const [expandedSection, setExpandedSection] = useState<number | null>(null);
  const [audioPlaying, setAudioPlaying] = useState<number | null>(null);
  const [savedSections, setSavedSections] = useState<number[]>([]);
  const [personalNotes, setPersonalNotes] = useState<Record<number, string>>({});
  const [weeklyAudioPlaying, setWeeklyAudioPlaying] = useState(false);

  // Calculate baby's age in weeks
  const getBabyWeeks = (): number => {
    const profileData = profile || JSON.parse(localStorage.getItem('profile_data') || '{}');
    if (!profileData?.baby_birth_date) return 1;
    
    const birthDate = new Date(profileData.baby_birth_date);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - birthDate.getTime());
    const diffWeeks = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 7));
    return Math.max(1, diffWeeks);
  };

  const babyWeeks = getBabyWeeks();

  // Weekly insights based on baby's age
  const getWeeklyInsight = (weeks: number) => {
    const insights = {
      pt: [
        {
          week: 1,
          title: "Primeiros Dias",
          content: "Seu bebê está adaptando-se ao mundo externo. Choros frequentes são normais - é sua única forma de comunicação. Responda com presença e calma."
        },
        {
          week: 11,
          title: "Reconhecimento de Voz",
          content: "Seu bebê pode começar a diferenciar sua voz de outras. Essa escuta seletiva fortalece o vínculo e também influencia a forma como ele se autorregula. Responder com uma voz calma e familiar, especialmente nos momentos de choro, ajuda a desenvolver segurança e previsibilidade."
        },
        {
          week: 8,
          title: "Primeiros Sorrisos",
          content: "O sorriso social está emergindo! Não é apenas reflexo, é o início da comunicação intencional. Cada sorriso seu de volta fortalece as conexões neurais do bebê."
        },
        {
          week: 16,
          title: "Descobrindo as Mãos",
          content: "Seu bebê está descobrindo que tem controle sobre suas mãos. Esse é um marco importante da consciência corporal. Permita que explore sem pressa."
        },
        {
          week: 24,
          title: "Exploração Sensorial",
          content: "Tudo vai à boca! Esta é a principal forma de exploração do bebê. Ofereça objetos seguros e variados. É neuroplasticidade em ação."
        }
      ],
      en: [
        {
          week: 1,
          title: "First Days",
          content: "Your baby is adapting to the outside world. Frequent crying is normal - it's their only form of communication. Respond with presence and calm."
        },
        {
          week: 11,
          title: "Voice Recognition",
          content: "Your baby may start to differentiate your voice from others. This selective listening strengthens bonding and also influences how they self-regulate. Responding with a calm and familiar voice, especially during crying moments, helps develop security and predictability."
        },
        {
          week: 8,
          title: "First Smiles",
          content: "Social smiling is emerging! It's not just reflex, it's the beginning of intentional communication. Each smile you give back strengthens the baby's neural connections."
        },
        {
          week: 16,
          title: "Discovering Hands",
          content: "Your baby is discovering they have control over their hands. This is an important milestone in body awareness. Allow them to explore without rushing."
        },
        {
          week: 24,
          title: "Sensory Exploration",
          content: "Everything goes to the mouth! This is the baby's main form of exploration. Offer safe and varied objects. It's neuroplasticity in action."
        }
      ]
    };

    const weeklyInsights = insights[language as keyof typeof insights];
    // Find the closest week or use the last available insight
    const insight = weeklyInsights.find(i => i.week === weeks) || 
                   weeklyInsights.find(i => i.week <= weeks) || 
                   weeklyInsights[0];
    
    return insight;
  };

  const weeklyInsight = getWeeklyInsight(babyWeeks);

  const content = {
    pt: {
      title: "Entendendo o Bebê — Choro, Marcos, Mitos",
      subtitle: "Onde a sabedoria ancestral encontra a ciência moderna",
      weeklyTitle: "🌟 Destaque da Semana",
      weeklySubtitle: `Semana ${babyWeeks} — Entendendo o Bebê`,
      essentialTitle: "📚 Conteúdos Essenciais",
      sections: [
        {
          title: "O Choro Tem Voz",
          subtitle: "Compreendendo a linguagem primária do bebê",
          content: `• Tipos de choro e o que podem sinalizar
• Como responder com presença e calma
• O que é autocontrole e por que bebês não o têm
• O papel do choro no vínculo mãe-bebê
• Dica prática: Técnica da escuta ativa sem pânico

O choro é a primeira e mais importante forma de comunicação do seu bebê. Não é manipulação, é necessidade. Cada som carrega uma mensagem que, com tempo e observação, você aprenderá a decifrar.`,
          tips: [
            "Choro de fome: rítmico e crescente",
            "Choro de cansaço: lamentoso e intermitente", 
            "Choro de desconforto: agudo e persistente",
            "Choro de cólica: intenso e inconsolável por períodos"
          ]
        },
        {
          title: "Marcos do Desenvolvimento: Um Ritmo, Não Uma Corrida",
          subtitle: "Seu bebê não está atrasado, ele está em processo",
          content: `• O que são os marcos e como usá-los com leveza
• Variações normais e o perigo da comparação
• Sinais de prontidão reais vs. expectativas externas
• Dica prática: Diário de observação afetiva

Cada bebê tem seu próprio ritmo de desenvolvimento. Os marcos são guias, não regras rígidas. Observe seu filho com amor e respeite seu tempo único.`,
          tips: [
            "Sorrir: 6-8 semanas (pode variar até 12 semanas)",
            "Sustentar a cabeça: 2-4 meses",
            "Rolar: 4-6 meses",
            "Sentar sem apoio: 6-8 meses"
          ]
        },
        {
          title: "Desconstruindo os Mitos",
          subtitle: "Informações que libertam, não que culpam",
          content: `• "Ele só chora porque te sente insegura": falso!
• "Está manhoso": por que isso não existe nos primeiros anos
• "Precisa aprender a se acalmar sozinho": a importância da co-regulação
• Dica prática: Refraseando mitos — como responder com consciência

Muitos mitos sobre bebês foram criados em épocas onde se priorizava a conveniência adulta sobre as necessidades infantis. É hora de questionar essas crenças.`,
          tips: [
            "Bebês não são manipulativos - são dependentes",
            "Co-regulação vem antes da auto-regulação",
            "Sua presença é medicina, não malcriação",
            "Cada bebê é único, comparações são inúteis"
          ]
        },
        {
          title: "A Mãe Que Observa É a Mãe Que Sabe",
          subtitle: "Intuição como ferramenta legítima",
          content: `• O que a ciência diz sobre intuição materna
• Como cultivar a escuta interna mesmo em meio ao caos
• Práticas ancestrais de presença e sintonia
• Dica prática: Ritual diário de reconexão mãe-bebê

Sua intuição materna não é imaginação - é uma ferramenta evolutiva real. A ciência comprova que mães desenvolvem uma sensibilidade especial para compreender seus bebês.`,
          tips: [
            "Reserve 5 minutos diários para observação silenciosa",
            "Confie nas suas primeiras impressões sobre o bebê",
            "Anote padrões que você observa",
            "Lembre-se: você é a especialista do seu filho"
          ]
        }
      ],
      buttons: {
        save: "Salvar",
        saved: "Salvo",
        listen: "Ouvir",
        pause: "Pausar",
        notes: "Minhas anotações",
        notesPlaceholder: "Escreva suas reflexões e observações sobre este tópico...",
        shareDoubt: "Compartilhar dúvida no Entre Mães",
        showMore: "Ver mais",
        showLess: "Ver menos",
        weeklyListen: "Ouça a dica da semana em áudio",
        weeklyShare: "Compartilhe sua semana na aba Entre Mães"
      }
    },
    en: {
      title: "Understanding Baby — Crying, Milestones, Myths",
      subtitle: "Where ancestral wisdom meets modern science",
      weeklyTitle: "🌟 Weekly Highlight",
      weeklySubtitle: `Week ${babyWeeks} — Understanding Baby`,
      essentialTitle: "📚 Essential Content",
      sections: [
        {
          title: "Crying Has a Voice",
          subtitle: "Understanding your baby's primary language",
          content: `• Types of crying and what they may signal
• How to respond with presence and calm
• What self-control is and why babies don't have it
• The role of crying in mother-baby bonding
• Practical tip: Active listening technique without panic

Crying is your baby's first and most important form of communication. It's not manipulation, it's need. Each sound carries a message that, with time and observation, you'll learn to decipher.`,
          tips: [
            "Hunger cry: rhythmic and escalating",
            "Tired cry: plaintive and intermittent",
            "Discomfort cry: sharp and persistent",
            "Colic cry: intense and inconsolable for periods"
          ]
        },
        {
          title: "Developmental Milestones: A Rhythm, Not a Race",
          subtitle: "Your baby isn't delayed, they're in process",
          content: `• What milestones are and how to use them lightly
• Normal variations and the danger of comparison
• Real readiness signs vs. external expectations
• Practical tip: Affective observation diary

Each baby has their own developmental rhythm. Milestones are guides, not rigid rules. Observe your child with love and respect their unique timing.`,
          tips: [
            "Smiling: 6-8 weeks (can vary up to 12 weeks)",
            "Head control: 2-4 months",
            "Rolling: 4-6 months",
            "Sitting without support: 6-8 months"
          ]
        },
        {
          title: "Deconstructing Myths",
          subtitle: "Information that liberates, not blames",
          content: `• "They only cry because they sense you're insecure": false!
• "They're being fussy": why this doesn't exist in early years
• "They need to learn to self-soothe": the importance of co-regulation
• Practical tip: Reframing myths — how to respond consciously

Many baby myths were created in times when adult convenience was prioritized over infant needs. It's time to question these beliefs.`,
          tips: [
            "Babies aren't manipulative - they're dependent",
            "Co-regulation comes before self-regulation",
            "Your presence is medicine, not spoiling",
            "Each baby is unique, comparisons are useless"
          ]
        },
        {
          title: "The Observing Mother Is the Knowing Mother",
          subtitle: "Intuition as a legitimate tool",
          content: `• What science says about maternal intuition
• How to cultivate inner listening even amid chaos
• Ancestral practices of presence and attunement
• Practical tip: Daily mother-baby reconnection ritual

Your maternal intuition isn't imagination - it's a real evolutionary tool. Science proves that mothers develop special sensitivity to understand their babies.`,
          tips: [
            "Reserve 5 minutes daily for silent observation",
            "Trust your first impressions about the baby",
            "Note patterns you observe",
            "Remember: you are the expert on your child"
          ]
        }
      ],
      buttons: {
        save: "Save",
        saved: "Saved",
        listen: "Listen",
        pause: "Pause",
        notes: "My notes",
        notesPlaceholder: "Write your reflections and observations about this topic...",
        shareDoubt: "Share doubt in Between Mothers",
        showMore: "Show more",
        showLess: "Show less",
        weeklyListen: "Listen to this week's tip in audio",
        weeklyShare: "Share your week in Between Mothers"
      }
    }
  };

  const currentContent = content[language as keyof typeof content];

  const toggleSection = (index: number) => {
    setExpandedSection(expandedSection === index ? null : index);
  };

  const toggleAudio = (index: number) => {
    if (audioPlaying === index) {
      setAudioPlaying(null);
    } else {
      setAudioPlaying(index);
      // Here you would implement actual audio playback
      setTimeout(() => setAudioPlaying(null), 3000); // Simulate audio ending
    }
  };

  const toggleSave = (index: number) => {
    if (savedSections.includes(index)) {
      setSavedSections(savedSections.filter(i => i !== index));
    } else {
      setSavedSections([...savedSections, index]);
    }
  };

  const updateNotes = (index: number, notes: string) => {
    setPersonalNotes(prev => ({
      ...prev,
      [index]: notes
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-orange-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="text-rose-600 hover:text-rose-700 hover:bg-rose-50"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Voltar
          </Button>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="mb-4">
            <span className="text-4xl">🌿</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {currentContent.title}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {currentContent.subtitle}
          </p>
        </div>

        {/* Weekly Highlight Section */}
        <div className="mb-8">
          <Card className="border-primary/20 bg-gradient-to-br from-primary/5 via-background to-sage/5 shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                  <Star className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-foreground">
                    {currentContent.weeklyTitle}
                  </h2>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      {currentContent.weeklySubtitle}
                    </p>
                  </div>
                </div>
              </div>
              
              <Badge variant="secondary" className="w-fit">
                {weeklyInsight?.title}
              </Badge>
            </CardHeader>
            
            <CardContent className="pt-0">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                {weeklyInsight?.content}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setWeeklyAudioPlaying(!weeklyAudioPlaying)}
                  className="border-primary/30 text-primary hover:bg-primary/10"
                >
                  {weeklyAudioPlaying ? (
                    <Pause className="w-4 h-4 mr-2" />
                  ) : (
                    <Play className="w-4 h-4 mr-2" />
                  )}
                  {currentContent.buttons.weeklyListen}
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-sage hover:bg-sage/10"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  {currentContent.buttons.weeklyShare}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Essential Content Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="w-5 h-5 text-sage" />
            <h2 className="text-xl font-semibold text-foreground">
              {currentContent.essentialTitle}
            </h2>
          </div>
          
          <p className="text-muted-foreground text-sm mb-6">
            {language === 'en' 
              ? 'Timeless content you can explore anytime'
              : 'Conteúdos atemporais que você pode explorar a qualquer momento'
            }
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-6">
          {currentContent.sections.map((section, index) => (
            <Card key={index} className="border-rose-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="cursor-pointer" onClick={() => toggleSection(index)}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-xl text-gray-900 dark:text-white mb-2">
                      {section.title}
                    </CardTitle>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {section.subtitle}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleAudio(index);
                      }}
                      className="text-rose-600 hover:text-rose-700"
                    >
                      {audioPlaying === index ? (
                        <Pause className="w-4 h-4" />
                      ) : (
                        <Play className="w-4 h-4" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSave(index);
                      }}
                      className={savedSections.includes(index) ? "text-rose-600" : "text-gray-400"}
                    >
                      {savedSections.includes(index) ? (
                        <Heart className="w-4 h-4 fill-current" />
                      ) : (
                        <Save className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </CardHeader>

              {expandedSection === index && (
                <CardContent className="pt-0">
                  <div className="prose prose-rose max-w-none dark:prose-invert">
                    <div className="whitespace-pre-line text-gray-700 dark:text-gray-300 mb-6">
                      {section.content}
                    </div>
                    
                    {/* Tips */}
                    <div className="bg-rose-50 dark:bg-gray-800 rounded-lg p-4 mb-6">
                      <h4 className="font-semibold text-rose-800 dark:text-rose-300 mb-3">
                        💡 {language === 'en' ? 'Practical tips:' : 'Dicas práticas:'}
                      </h4>
                      <ul className="space-y-2">
                        {section.tips.map((tip, tipIndex) => (
                          <li key={tipIndex} className="text-sm text-rose-700 dark:text-rose-300">
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Personal Notes */}
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {currentContent.buttons.notes}
                      </label>
                      <Textarea
                        placeholder={currentContent.buttons.notesPlaceholder}
                        value={personalNotes[index] || ''}
                        onChange={(e) => updateNotes(index, e.target.value)}
                        className="min-h-[100px] border-rose-200 focus:border-rose-400 dark:border-gray-600"
                      />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-3">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-rose-200 text-rose-600 hover:bg-rose-50"
                      >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        {currentContent.buttons.shareDoubt}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleSave(index)}
                        className={savedSections.includes(index) ? "text-rose-600 bg-rose-50" : "text-gray-600"}
                      >
                        {savedSections.includes(index) ? currentContent.buttons.saved : currentContent.buttons.save}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <Card className="border-rose-100 bg-gradient-to-r from-rose-50 to-orange-50 dark:from-gray-800 dark:to-gray-700">
            <CardContent className="py-8">
              <BookOpen className="w-12 h-12 text-rose-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Continue Explorando
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Descubra mais conteúdos sobre maternidade consciente e nutrição ancestral
              </p>
              <Button 
                onClick={onBack}
                className="bg-rose-500 hover:bg-rose-600 text-white"
              >
                Voltar à Home
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EntendendoBebe;