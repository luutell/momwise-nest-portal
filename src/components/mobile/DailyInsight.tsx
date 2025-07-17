import { useState, useEffect } from 'react';
import { Sparkles, Pause, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

const insights = [
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
];

const DailyInsight = () => {
  const [currentInsight, setCurrentInsight] = useState(0);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  useEffect(() => {
    // Rotate through insights daily
    const today = new Date().getDay();
    setCurrentInsight(today % insights.length);
  }, []);

  const insight = insights[currentInsight];

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
              Today's Gentle Guidance
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