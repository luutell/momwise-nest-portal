import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

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
  const location = useLocation();
  
  // Auto-detect language from localStorage first, then URL path
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const stored = localStorage.getItem('preferred_language');
      if (stored === 'en' || stored === 'pt') return stored as Language;
      const path = window.location.pathname;
      return path.startsWith('/en') ? 'en' : 'pt';
    } catch {
      return 'pt';
    }
  });

  // Listen for route changes through React Router
  useEffect(() => {
    if (location?.pathname) {
      const path = location.pathname;
      const newLang: Language = path.startsWith('/en') ? 'en' : 'pt';
      setLanguageState(newLang);
      try { localStorage.setItem('preferred_language', newLang); } catch {}
    }
  }, [location?.pathname]);

  const setLanguage = () => {}; // Disabled manual language switching

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
      'hero.preview.app': 'Preview Mobile App',
      
      // Mobile App
      'app.home.title': 'Your Journey',
      'app.home.daily.wisdom': 'Daily Wisdom',
      'app.home.trust.instincts': 'Trust your instincts, mama. You know your baby better than anyone else.',
      'app.home.weekly.guidance': 'Week by week guidance',
      'app.biblioteca.title': 'Library',
      'app.biblioteca.categories': 'Categories',
      'app.biblioteca.no.posts': 'No content available for this category yet.',
      'app.categoria.gentle.rhythm': 'Gentle Rhythm',
      'app.categoria.understanding.baby': 'Understanding Baby',
      'app.categoria.first.bites': 'First Bites',
      'app.categoria.your.time': 'In Your Time',
      'app.categoria.together.beginning': 'Together in the Beginning',
      'app.categoria.whole.mother': 'Whole Mother',
      'app.categoria.between.mothers': 'Between Mothers',
      'app.categoria.natural.hygiene': 'Natural Hygiene',
      'app.breastfeeding.title': 'Breastfeeding Journey',
      'app.breastfeeding.tracking': 'Feeding Tracking',
      'app.breastfeeding.left.breast.selector': 'Left Breast',
      'app.breastfeeding.right.breast.selector': 'Right Breast',
      'app.breastfeeding.both': 'Both',
      'app.breastfeeding.optional.notes': 'Optional notes:',
      'app.breastfeeding.notes.placeholder': 'Was the baby calm? Crying? Did they pause?',
      'app.breastfeeding.save.feeding': 'Save feeding',
      'app.breastfeeding.cancel': 'Cancel',
      'app.breastfeeding.today': 'Today',
      'app.breastfeeding.frequent.questions': 'Library of frequent questions',
      'app.breastfeeding.see.more': 'See more',
      'app.breastfeeding.between.mothers': 'Between Mothers – Breastfeeding',
      'app.breastfeeding.community.focused': 'Community focused on "breastfeeding" topic',
      'app.breastfeeding.share.experience': 'Share experience',
      'app.breastfeeding.talk.specialist': 'Talk to a specialist',
      'app.breastfeeding.talk.consultant': 'Talk to a breastfeeding consultant',
      'app.breastfeeding.videocall.description': 'Ask questions via video call when a specialist is online',
      'app.breastfeeding.specialists.online': 'specialists online now',
      'app.breastfeeding.start.conversation': 'Start conversation',
      'app.breastfeeding.baby.age.months': 'Your baby is {months} months old – here are recommendations and tools designed for this stage.',
      
      // Biblioteca specific
      'app.biblioteca.view.all': 'View all',
      'app.biblioteca.explore.content': 'Explore content organized by category',
      'app.biblioteca.no.content': 'No content found in this category',
      'app.biblioteca.by.author': 'By {author}',
      'app.biblioteca.audio': 'Audio',
      'app.biblioteca.articles': 'articles',
      'app.biblioteca.article': 'article',
      
      // Profile Setup
      'profile.setup.step1.title': 'About you',
      'profile.setup.step1.description': 'Let\'s get to know each other better',
      'profile.setup.step2.title': 'About your baby',
      'profile.setup.step2.description': 'Tell us about your little one',
      'profile.setup.step3.title': 'Your interests',
      'profile.setup.step3.description': 'What makes the most sense right now',
      'profile.setup.step4.title': 'Your style',
      'profile.setup.step4.description': 'How you prefer to learn',
      'profile.setup.age.label': 'What is your age? (optional)',
      'profile.setup.age.placeholder': 'Select your age',
      'profile.setup.age.years': 'years old'
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
      'hero.preview.app': 'Visualizar App Mobile',
      
      // Mobile App
      'app.home.title': 'Sua Jornada',
      'app.home.daily.wisdom': 'Sabedoria Diária',
      'app.home.trust.instincts': 'Confie nos seus instintos, mamãe. Você conhece seu bebê melhor que qualquer outra pessoa.',
      'app.home.weekly.guidance': 'Orientação semana a semana',
      'app.biblioteca.title': 'Biblioteca',
      'app.biblioteca.categories': 'Categorias',
      'app.biblioteca.no.posts': 'Nenhum conteúdo disponível para esta categoria ainda.',
      'app.categoria.gentle.rhythm': 'Ritmo Leve',
      'app.categoria.understanding.baby': 'Entendendo o Bebê',
      'app.categoria.first.bites': 'Primeiras Mordidas',
      'app.categoria.your.time': 'No Seu Tempo',
      'app.categoria.together.beginning': 'Juntas no Começo',
      'app.categoria.whole.mother': 'Mãe Inteira',
      'app.categoria.between.mothers': 'Entre Mães',
      'app.categoria.natural.hygiene': 'Higiene Natural',
      'app.breastfeeding.title': 'Jornada da Amamentação',
      'app.breastfeeding.tracking': 'Acompanhar Mamadas',
      'app.breastfeeding.left.breast.selector': 'Mama Esquerda',
      'app.breastfeeding.right.breast.selector': 'Mama Direita',
      'app.breastfeeding.both': 'Ambos',
      'app.breastfeeding.optional.notes': 'Notas opcionais:',
      'app.breastfeeding.notes.placeholder': 'O bebê estava calmo? Chorando? Fez pausa?',
      'app.breastfeeding.save.feeding': 'Salvar mamada',
      'app.breastfeeding.cancel': 'Cancelar',
      'app.breastfeeding.today': 'Hoje',
      'app.breastfeeding.frequent.questions': 'Biblioteca de dúvidas frequentes',
      'app.breastfeeding.see.more': 'Ver mais',
      'app.breastfeeding.between.mothers': 'Entre Mães – Amamentação',
      'app.breastfeeding.community.focused': 'Comunidade focada no tema "amamentação"',
      'app.breastfeeding.share.experience': 'Compartilhar experiência',
      'app.breastfeeding.talk.specialist': 'Fale com uma especialista',
      'app.breastfeeding.talk.consultant': 'Falar com uma consultora de amamentação',
      'app.breastfeeding.videocall.description': 'Tire dúvidas por videochamada, quando uma especialista estiver online',
      'app.breastfeeding.specialists.online': 'especialistas online agora',
      'app.breastfeeding.start.conversation': 'Iniciar conversa',
      'app.breastfeeding.baby.age.months': 'Seu bebê tem {months} meses – aqui estão recomendações e ferramentas pensadas para esta fase.',
      
      // Biblioteca specific  
      'app.biblioteca.view.all': 'Ver todas',
      'app.biblioteca.explore.content': 'Explore conteúdos organizados por categoria',
      'app.biblioteca.no.content': 'Nenhum conteúdo encontrado nesta categoria',
      'app.biblioteca.by.author': 'Por {author}',
      'app.biblioteca.audio': 'Áudio',
      'app.biblioteca.articles': 'artigos',
      'app.biblioteca.article': 'artigo',
      
      // Profile Setup
      'profile.setup.step1.title': 'Sobre você',
      'profile.setup.step1.description': 'Vamos nos conhecer melhor',
      'profile.setup.step2.title': 'Sobre seu bebê',
      'profile.setup.step2.description': 'Conte sobre seu pequeno',
      'profile.setup.step3.title': 'Seus interesses',
      'profile.setup.step3.description': 'O que mais faz sentido agora',
      'profile.setup.step4.title': 'Seu estilo',
      'profile.setup.step4.description': 'Como você prefere aprender',
      'profile.setup.age.label': 'Qual sua idade? (opcional)',
      'profile.setup.age.placeholder': 'Selecione sua idade',
      'profile.setup.age.years': 'anos'
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