import { useState, useEffect } from 'react';
import { Sparkles, Pause, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const insights = {
  en: [
    {
      title: "Morning Reflection",
      text: "What does your body need today? Take a moment to tune in.",
      type: "reflection"
    },
    {
      title: "Gentle Reminder", 
      text: "Your baby's rhythm is unique. Trust the process and your intuition.",
      type: "wisdom"
    },
    {
      title: "Nourishment Note",
      text: "Remember to drink water when baby feeds. You're nourishing two hearts.",
      type: "care"
    },
    {
      title: "Connection Moment",
      text: "You're doing beautifully. Every mother's journey is sacred and valid.",
      type: "affirmation"
    },
    {
      title: "Natural Rhythm",
      text: "Notice your baby's patterns today. What are they telling you?",
      type: "observation"
    }
  ],
  pt: [
    {
      title: "Reflexão Matinal",
      text: "O que seu corpo precisa hoje? Reserve um momento para se conectar.",
      type: "reflection"
    },
    {
      title: "Lembrete Suave", 
      text: "O ritmo do seu bebê é único. Confie no processo e na sua intuição.",
      type: "wisdom"
    },
    {
      title: "Nota de Nutrição",
      text: "Lembre-se de beber água quando o bebê mamar. Você está nutrindo dois corações.",
      type: "care"
    },
    {
      title: "Momento de Conexão",
      text: "Você está indo maravilhosamente bem. A jornada de cada mãe é sagrada e válida.",
      type: "affirmation"
    },
    {
      title: "Ritmo Natural",
      text: "Observe os padrões do seu bebê hoje. O que eles estão te dizendo?",
      type: "observation"
    }
  ]
};

const DailyInsight = () => {
  const [currentInsight, setCurrentInsight] = useState(0);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const { language, t } = useLanguage();

  useEffect(() => {
    // Rotate through insights daily
    const today = new Date().getDay();
    const currentInsights = insights[language];
    setCurrentInsight(today % currentInsights.length);
  }, [language]);

  const currentInsights = insights[language];
  const insight = currentInsights[currentInsight];

  const handleAudioToggle = () => {
    setIsAudioPlaying(!isAudioPlaying);
    // In a real app, this would control audio playback
    if (!isAudioPlaying) {
      // Start audio
      console.log('Starting audio for:', insight.title);
    } else {
      // Stop audio
      console.log('Stopping audio');
    }
  };

  return (
    <div className="bg-primary-foreground/10 rounded-xl p-4 backdrop-blur-sm">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <Sparkles className="w-4 h-4 text-primary-foreground/80" />
            <span className="text-xs text-primary-foreground/80 uppercase tracking-wide font-medium">
              {language === 'en' ? "Today's Gentle Guidance" : 'Orientação Suave de Hoje'}
            </span>
          </div>
          
          <h3 className="font-playfair text-primary-foreground font-medium mb-2">
            {insight.title}
          </h3>
          
          <p className="text-sm text-primary-foreground/90 leading-relaxed">
            {insight.text}
          </p>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={handleAudioToggle}
          className="ml-3 text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
        >
          {isAudioPlaying ? (
            <Pause className="w-4 h-4" />
          ) : (
            <Play className="w-4 h-4" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default DailyInsight;