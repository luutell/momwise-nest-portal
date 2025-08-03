import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface ProfileData {
  id?: string;
  user_id?: string;
  name: string;
  age?: number;
  birth_date?: string;
  first_maternity?: boolean;
  previous_experience?: string;
  other_experience?: string;
  join_groups?: string;
  baby_name?: string;
  baby_birth_date?: string;
  baby_avatar?: string;
  interests?: string[];
  content_preference?: string[];
  specialist_access?: string;
  onboarding_completed?: boolean;
}

export const useProfile = () => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchProfile = async () => {
    try {
      setLoading(true);
      
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      if (!session?.user) {
        setProfile(null);
        return;
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', session.user.id)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
        throw error;
      }

      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast({
        title: "Erro ao carregar perfil",
        description: "Não foi possível carregar suas informações.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<ProfileData>) => {
    try {
      console.log('1. Starting updateProfile with updates:', updates);
      
      // Get session instead of user for better reliability
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      console.log('2. Got session:', session?.user?.id, 'sessionError:', sessionError);
      
      if (!session?.user) {
        throw new Error('User not authenticated - no active session');
      }

      const dataToUpsert = {
        user_id: session.user.id,
        ...updates
      };
      console.log('3. Data to upsert:', dataToUpsert);

      const { data, error } = await supabase
        .from('profiles')
        .upsert(dataToUpsert)
        .select()
        .single();

      console.log('4. Supabase response - data:', data, 'error:', error);

      if (error) {
        console.error('5. Supabase error details:', error);
        throw error;
      }

      setProfile(data);
      
      toast({
        title: "Perfil atualizado",
        description: "Suas informações foram salvas com sucesso.",
      });

      return data;
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Erro ao salvar",
        description: "Não foi possível salvar suas informações.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const completeOnboarding = async (profileData: ProfileData) => {
    try {
      const completeData = {
        ...profileData,
        onboarding_completed: true
      };

      return await updateProfile(completeData);
    } catch (error) {
      console.error('Error completing onboarding:', error);
      throw error;
    }
  };

  useEffect(() => {
    fetchProfile();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          fetchProfile();
        } else if (event === 'SIGNED_OUT') {
          setProfile(null);
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return {
    profile,
    loading,
    updateProfile,
    completeOnboarding,
    refetch: fetchProfile
  };
};