import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'pt';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  // Auto-detect language from URL path
  const getLanguageFromPath = (): Language => {
    const path = window.location.pathname;
    if (path.startsWith('/en')) return 'en';
    return 'pt'; // Default to Portuguese
  };

  const [language] = useState<Language>(getLanguageFromPath());
  const setLanguage = () => {}; // Disabled language switching

  const translations = {
    en: {
      // Hero section
      'hero.subtitle': 'where maternal wisdom transcends',
      'hero.manifesto': 'MomWise combines the wisdom of generations with modern expertise, creating a nurturing and non-judgmental space where every mother\'s journey is honored with warmth and understanding.',
      'hero.email.placeholder': 'Your email address',
      'hero.join.waitlist': 'Join Waitlist',
      'hero.email.description': 'Be the first to know when MomWise launches',
      'hero.trust.badge': 'Trusted by mothers worldwide',

      // Features section
      'features.title': 'What You\'ll Discover',
      'features.description': 'MomWise combines the wisdom of generations with modern expertise, creating a nurturing space for conscious motherhood.',
      'features.emotional.title': 'Emotional Support',
      'features.emotional.description': 'Gentle guidance through the emotional landscape of motherhood, honoring your feelings and experiences.',
      'features.practical.title': 'Practical Wisdom',
      'features.practical.description': 'Evidence-based tips on breastfeeding, sleep, and baby care rooted in both modern science and ancestral knowledge.',
      'features.community.title': 'Expert Community',
      'features.community.description': 'Connect with trusted specialists and fellow mothers who understand your journey without judgment.',
      'features.routines.title': 'Gentle Routines',
      'features.routines.description': 'Flexible, intuitive approaches to daily rhythms that honor your baby\'s natural patterns and your needs.',
      'features.wellness.title': 'Holistic Wellness',
      'features.wellness.description': 'Holistic approaches to hygiene, nutrition, and wellness that align with your values and instincts.',
      'features.selfcare.title': 'Self-Care Rituals',
      'features.selfcare.description': 'Nurturing practices to help you replenish your energy and reconnect with your inner wisdom.',
      'features.app.journey': 'Your Journey',
      'features.app.weekly': 'Week by week guidance',
      'features.app.daily.wisdom': 'Daily Wisdom',
      'features.app.wisdom.quote': 'Trust your instincts, mama. You know your baby better than anyone else.',

      // Testimonials section
      'testimonials.title': 'Voices of Wisdom',
      'testimonials.description': 'Hear from mothers who have found their path through gentle guidance and intuitive wisdom.',
      'testimonials.sarah.quote': 'Finally, a space that honors my intuition while providing the gentle guidance I was searching for. MomWise feels like having a wise friend by my side.',
      'testimonials.sarah.author': 'Sarah Chen',
      'testimonials.sarah.role': 'Mother of two',
      'testimonials.maria.quote': 'The combination of ancestral wisdom and modern expertise is exactly what I needed. It\'s reassuring to know I\'m not alone in this journey.',
      'testimonials.maria.author': 'Maria González',
      'testimonials.maria.role': 'New mother',
      'testimonials.aisha.quote': 'MomWise respects my choices and empowers me to trust my instincts. The content is thoughtful, gentle, and deeply nurturing.',
      'testimonials.aisha.author': 'Aisha Patel',
      'testimonials.aisha.role': 'Expecting mother',

      // Footer section
      'footer.subtitle': 'where maternal wisdom transcends',
      'footer.message': 'We\'re crafting something beautiful for mothers everywhere. A digital sanctuary where wisdom flows freely and every mother\'s journey is celebrated.',
      'footer.coming.soon': 'App launching soon',
      'footer.copyright': '© 2024 MomWise. Nurturing mothers with wisdom and love.',

      // Language switcher
      'language.english': 'English',
      'language.portuguese': 'Português',
      
      // Hero additional
      'hero.preview.app': 'Preview Mobile App'
    },
    pt: {
      // Hero section
      'hero.subtitle': 'onde a sabedoria materna transcende',
      'hero.manifesto': 'O MomWise combina a sabedoria de gerações com conhecimento moderno, criando um espaço acolhedor e sem julgamentos onde a jornada de cada mãe é honrada com carinho e compreensão.',
      'hero.email.placeholder': 'Seu endereço de email',
      'hero.join.waitlist': 'Entrar na Lista',
      'hero.email.description': 'Seja a primeira a saber quando o MomWise for lançado',
      'hero.trust.badge': 'Confiado por mães no mundo todo',

      // Features section
      'features.title': 'O Que Você Descobrirá',
      'features.description': 'O MomWise combina a sabedoria de gerações com conhecimento moderno, criando um espaço acolhedor para uma maternidade consciente.',
      'features.emotional.title': 'Apoio Emocional',
      'features.emotional.description': 'Orientação suave através da paisagem emocional da maternidade, honrando seus sentimentos e experiências.',
      'features.practical.title': 'Sabedoria Prática',
      'features.practical.description': 'Dicas baseadas em evidências sobre amamentação, sono e cuidados com o bebê, enraizadas tanto na ciência moderna quanto no conhecimento ancestral.',
      'features.community.title': 'Comunidade de Especialistas',
      'features.community.description': 'Conecte-se com especialistas confiáveis e outras mães que compreendem sua jornada sem julgamentos.',
      'features.routines.title': 'Rotinas Suaves',
      'features.routines.description': 'Abordagens flexíveis e intuitivas para ritmos diários que honram os padrões naturais do seu bebê e suas necessidades.',
      'features.wellness.title': 'Bem-estar Holístico',
      'features.wellness.description': 'Abordagens holísticas para higiene, nutrição e bem-estar que se alinham com seus valores e instintos.',
      'features.selfcare.title': 'Rituais de Autocuidado',
      'features.selfcare.description': 'Práticas nutritivas para ajudá-la a recarregar suas energias e reconectar-se com sua sabedoria interior.',
      'features.app.journey': 'Sua Jornada',
      'features.app.weekly': 'Orientação semana a semana',
      'features.app.daily.wisdom': 'Sabedoria Diária',
      'features.app.wisdom.quote': 'Confie nos seus instintos, mamãe. Você conhece seu bebê melhor que qualquer outra pessoa.',

      // Testimonials section
      'testimonials.title': 'Vozes de Sabedoria',
      'testimonials.description': 'Ouça mães que encontraram seu caminho através de orientação suave e sabedoria intuitiva.',
      'testimonials.sarah.quote': 'Finalmente, um espaço que honra minha intuição enquanto oferece a orientação suave que eu estava procurando. O MomWise é como ter uma amiga sábia ao meu lado.',
      'testimonials.sarah.author': 'Sarah Chen',
      'testimonials.sarah.role': 'Mãe de dois',
      'testimonials.maria.quote': 'A combinação de sabedoria ancestral e conhecimento moderno é exatamente o que eu precisava. É reconfortante saber que não estou sozinha nesta jornada.',
      'testimonials.maria.author': 'Maria González',
      'testimonials.maria.role': 'Mãe recente',
      'testimonials.aisha.quote': 'O MomWise respeita minhas escolhas e me capacita a confiar nos meus instintos. O conteúdo é cuidadoso, suave e profundamente nutritivo.',
      'testimonials.aisha.author': 'Aisha Patel',
      'testimonials.aisha.role': 'Futura mãe',

      // Footer section
      'footer.subtitle': 'onde a sabedoria materna transcende',
      'footer.message': 'Estamos criando algo lindo para mães em todos os lugares. Um santuário digital onde a sabedoria flui livremente e a jornada de cada mãe é celebrada.',
      'footer.coming.soon': 'App lançando em breve',
      'footer.copyright': '© 2024 MomWise. Nutrindo mães com sabedoria e amor.',

      // Language switcher
      'language.english': 'English',
      'language.portuguese': 'Português',
      
      // Hero additional
      'hero.preview.app': 'Visualizar App Mobile'
    }
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};