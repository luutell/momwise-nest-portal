import { Button } from './ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { Globe } from 'lucide-react';

const LanguageSwitcher = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="fixed top-6 right-6 z-50">
      <div className="flex items-center gap-2 bg-background/80 backdrop-blur-sm border border-sage/20 rounded-full p-1 shadow-lg">
        <Globe className="h-4 w-4 text-sage ml-2" />
        <Button
          variant={language === 'en' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setLanguage('en')}
          className="rounded-full text-xs h-8 px-3"
        >
          {t('language.english')}
        </Button>
        <Button
          variant={language === 'pt' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setLanguage('pt')}
          className="rounded-full text-xs h-8 px-3"
        >
          {t('language.portuguese')}
        </Button>
      </div>
    </div>
  );
};

export default LanguageSwitcher;