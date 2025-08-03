import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { 
  Play, 
  Headphones, 
  BookOpen, 
  Target, 
  Lightbulb, 
  FileText,
  Heart,
  Moon,
  Baby,
  Users,
  Briefcase,
  Sparkles,
  HandHeart,
  UserCheck
} from 'lucide-react';

export interface CalendarContent {
  id: string;
  title: string;
  description: string;
  content_type: 'video' | 'audio' | 'article' | 'activity' | 'tip';
  content_url?: string;
  content_data?: any;
  thumbnail_url?: string;
  duration_minutes?: number;
  category: string;
  is_premium: boolean;
}

export const usePersonalizedCalendar = (babyBirthDate?: Date) => {
  const [weeklyContent, setWeeklyContent] = useState<Record<string, CalendarContent | null>>({});
  const [loading, setLoading] = useState(false);

  // Get baby birth date from props, localStorage, or use default
  const getBabyBirthDate = (): Date | null => {
    if (babyBirthDate) return babyBirthDate;
    
    try {
      // Try to get from localStorage
      const localProfile = localStorage.getItem('profile_data');
      if (localProfile) {
        const parsedProfile = JSON.parse(localProfile);
        if (parsedProfile.baby_birth_date) {
          return new Date(parsedProfile.baby_birth_date);
        }
      }
      
      // Default: use test date for demonstration (1 month old baby)
      const testDate = new Date();
      testDate.setMonth(testDate.getMonth() - 1);
      return testDate;
    } catch {
      // If all fails, return test date
      const testDate = new Date();
      testDate.setMonth(testDate.getMonth() - 1);
      return testDate;
    }
  };

  const getContentForDate = async (date: Date): Promise<CalendarContent | null> => {
    const effectiveBabyBirthDate = getBabyBirthDate();
    
    if (!effectiveBabyBirthDate) {
      console.log('❌ No baby birth date available for calendar content');
      return null;
    }

    const birthDateStr = effectiveBabyBirthDate.toISOString().split('T')[0];
    const targetDateStr = date.toISOString().split('T')[0];
    
    console.log('🔍 Calendar Debug - Baby birth date:', birthDateStr);
    console.log('🔍 Calendar Debug - Target date:', targetDateStr);
    
    // Calculate baby age for debug
    const ageInDays = Math.ceil((date.getTime() - effectiveBabyBirthDate.getTime()) / (1000 * 60 * 60 * 24));
    console.log('🔍 Calendar Debug - Baby age on target date:', ageInDays, 'days');

    try {
      console.log('🔍 Calendar Debug - Calling RPC function...');
      const { data, error } = await supabase.rpc('get_personalized_calendar_content', {
        user_baby_birth_date: birthDateStr,
        target_date: targetDateStr
      });

      console.log('🔍 Calendar Debug - RPC response data:', data);
      console.log('🔍 Calendar Debug - RPC response error:', error);

      if (error) {
        console.error('❌ Erro ao buscar conteúdo do calendário:', error);
        return null;
      }

      const result = data && data.length > 0 ? data[0] : null;
      console.log('🔍 Calendar Debug - Final result:', result);
      
      return result;
    } catch (error) {
      console.error('❌ Erro ao buscar conteúdo do calendário:', error);
      return null;
    }
  };

  const fetchWeekContent = async (weekDates: Date[]) => {
    setLoading(true);
    
    try {
      const contentPromises = weekDates.map(async (date) => {
        const content = await getContentForDate(date);
        return {
          dateKey: date.toISOString().split('T')[0],
          content
        };
      });

      const results = await Promise.all(contentPromises);
      
      const newWeeklyContent: Record<string, CalendarContent | null> = {};
      results.forEach(({ dateKey, content }) => {
        newWeeklyContent[dateKey] = content;
      });

      setWeeklyContent(newWeeklyContent);
    } catch (error) {
      console.error('Erro ao buscar conteúdos da semana:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Amamentação e alimentação':
        return Heart;
      case 'Puerpério emocional':
        return Sparkles;
      case 'Desenvolvimento do bebê':
        return Baby;
      case 'Sono e rotina':
      case 'Sono do Bebê':
        return Moon;
      case 'Trabalho e maternidade':
        return Briefcase;
      case 'Autocuidado e identidade':
        return UserCheck;
      case 'Relações e rede de apoio':
        return Users;
      case 'Parto e gestação':
        return HandHeart;
      default:
        return BookOpen;
    }
  };

  const getContentTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return Play;
      case 'audio':
        return Headphones;
      case 'article':
        return BookOpen;
      case 'activity':
        return Target;
      case 'tip':
        return Lightbulb;
      default:
        return FileText;
    }
  };

  const getContentTypeColor = (type: string) => {
    switch (type) {
      case 'video':
        return 'text-red-600';
      case 'audio':
        return 'text-orange-600';
      case 'article':
        return 'text-blue-600';
      case 'activity':
        return 'text-green-600';
      case 'tip':
        return 'text-purple-600';
      default:
        return 'text-gray-600';
    }
  };

  return {
    weeklyContent,
    loading,
    fetchWeekContent,
    getContentForDate,
    getContentTypeIcon,
    getContentTypeColor,
    getCategoryIcon
  };
};