export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      breastfeeding_sessions: {
        Row: {
          created_at: string
          duration_seconds: number
          end_time: string | null
          id: string
          notes: string | null
          side: string
          start_time: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          duration_seconds: number
          end_time?: string | null
          id?: string
          notes?: string | null
          side: string
          start_time?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          duration_seconds?: number
          end_time?: string | null
          id?: string
          notes?: string | null
          side?: string
          start_time?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      calendar_contents: {
        Row: {
          baby_age_max_days: number | null
          baby_age_min_days: number | null
          category: string
          content_data: Json | null
          content_type: string
          content_url: string | null
          created_at: string
          day_of_week: number | null
          description: string | null
          duration_minutes: number | null
          id: string
          is_premium: boolean | null
          maternity_phase: string
          thumbnail_url: string | null
          title: string
          updated_at: string
          week_offset: number | null
        }
        Insert: {
          baby_age_max_days?: number | null
          baby_age_min_days?: number | null
          category: string
          content_data?: Json | null
          content_type: string
          content_url?: string | null
          created_at?: string
          day_of_week?: number | null
          description?: string | null
          duration_minutes?: number | null
          id?: string
          is_premium?: boolean | null
          maternity_phase: string
          thumbnail_url?: string | null
          title: string
          updated_at?: string
          week_offset?: number | null
        }
        Update: {
          baby_age_max_days?: number | null
          baby_age_min_days?: number | null
          category?: string
          content_data?: Json | null
          content_type?: string
          content_url?: string | null
          created_at?: string
          day_of_week?: number | null
          description?: string | null
          duration_minutes?: number | null
          id?: string
          is_premium?: boolean | null
          maternity_phase?: string
          thumbnail_url?: string | null
          title?: string
          updated_at?: string
          week_offset?: number | null
        }
        Relationships: []
      }
      community_comments: {
        Row: {
          content: string
          created_at: string
          id: string
          is_anonymous: boolean | null
          post_id: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          is_anonymous?: boolean | null
          post_id?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          is_anonymous?: boolean | null
          post_id?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "community_comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "community_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      community_posts: {
        Row: {
          allow_private_messages: boolean | null
          category: string
          content: string
          created_at: string
          id: string
          is_anonymous: boolean | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          allow_private_messages?: boolean | null
          category: string
          content: string
          created_at?: string
          id?: string
          is_anonymous?: boolean | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          allow_private_messages?: boolean | null
          category?: string
          content?: string
          created_at?: string
          id?: string
          is_anonymous?: boolean | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      community_reactions: {
        Row: {
          created_at: string
          id: string
          post_id: string | null
          reaction_type: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          post_id?: string | null
          reaction_type?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          post_id?: string | null
          reaction_type?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "community_reactions_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "community_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      post_feedback: {
        Row: {
          created_at: string
          id: string
          is_helpful: boolean
          post_id: string
          suggestion: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          is_helpful: boolean
          post_id: string
          suggestion?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          is_helpful?: boolean
          post_id?: string
          suggestion?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "post_feedback_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
        ]
      }
      posts: {
        Row: {
          audio_url: string | null
          author: string
          category: string
          content: string
          created_at: string
          id: string
          image_url: string | null
          introduction: string | null
          language: string | null
          practical_tip: string | null
          published: boolean | null
          title: string
          updated_at: string
        }
        Insert: {
          audio_url?: string | null
          author: string
          category: string
          content: string
          created_at?: string
          id?: string
          image_url?: string | null
          introduction?: string | null
          language?: string | null
          practical_tip?: string | null
          published?: boolean | null
          title: string
          updated_at?: string
        }
        Update: {
          audio_url?: string | null
          author?: string
          category?: string
          content?: string
          created_at?: string
          id?: string
          image_url?: string | null
          introduction?: string | null
          language?: string | null
          practical_tip?: string | null
          published?: boolean | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          age: number | null
          baby_avatar: string | null
          baby_birth_date: string | null
          baby_name: string | null
          birth_date: string | null
          content_preference: Json | null
          created_at: string
          first_maternity: boolean | null
          id: string
          interests: Json | null
          join_groups: string | null
          name: string
          onboarding_completed: boolean | null
          other_experience: string | null
          previous_experience: string | null
          specialist_access: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          age?: number | null
          baby_avatar?: string | null
          baby_birth_date?: string | null
          baby_name?: string | null
          birth_date?: string | null
          content_preference?: Json | null
          created_at?: string
          first_maternity?: boolean | null
          id?: string
          interests?: Json | null
          join_groups?: string | null
          name: string
          onboarding_completed?: boolean | null
          other_experience?: string | null
          previous_experience?: string | null
          specialist_access?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          age?: number | null
          baby_avatar?: string | null
          baby_birth_date?: string | null
          baby_name?: string | null
          birth_date?: string | null
          content_preference?: Json | null
          created_at?: string
          first_maternity?: boolean | null
          id?: string
          interests?: Json | null
          join_groups?: string | null
          name?: string
          onboarding_completed?: boolean | null
          other_experience?: string | null
          previous_experience?: string | null
          specialist_access?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      referral_rewards: {
        Row: {
          applied: boolean | null
          created_at: string
          id: string
          months_earned: number | null
          referral_count: number
          reward_type: string | null
          user_id: string
        }
        Insert: {
          applied?: boolean | null
          created_at?: string
          id?: string
          months_earned?: number | null
          referral_count: number
          reward_type?: string | null
          user_id: string
        }
        Update: {
          applied?: boolean | null
          created_at?: string
          id?: string
          months_earned?: number | null
          referral_count?: number
          reward_type?: string | null
          user_id?: string
        }
        Relationships: []
      }
      referrals: {
        Row: {
          created_at: string
          id: string
          referred_email: string
          referred_user_id: string | null
          referrer_id: string
          rewarded: boolean | null
          subscribed: boolean | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          referred_email: string
          referred_user_id?: string | null
          referrer_id: string
          rewarded?: boolean | null
          subscribed?: boolean | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          referred_email?: string
          referred_user_id?: string | null
          referrer_id?: string
          rewarded?: boolean | null
          subscribed?: boolean | null
          updated_at?: string
        }
        Relationships: []
      }
      saved_posts: {
        Row: {
          created_at: string
          id: string
          post_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          post_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          post_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "saved_posts_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "community_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      subscribers: {
        Row: {
          created_at: string
          email: string
          free_months_remaining: number | null
          id: string
          payment_currency: string | null
          stripe_customer_id: string | null
          subscribed: boolean
          subscription_end: string | null
          subscription_tier: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          email: string
          free_months_remaining?: number | null
          id?: string
          payment_currency?: string | null
          stripe_customer_id?: string | null
          subscribed?: boolean
          subscription_end?: string | null
          subscription_tier?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          free_months_remaining?: number | null
          id?: string
          payment_currency?: string | null
          stripe_customer_id?: string | null
          subscribed?: boolean
          subscription_end?: string | null
          subscription_tier?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      waitlist_emails: {
        Row: {
          created_at: string
          email: string | null
          id: number
        }
        Insert: {
          created_at?: string
          email?: string | null
          id?: number
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_maternity_phase: {
        Args: { baby_birth_date: string }
        Returns: string
      }
      get_personalized_calendar_content: {
        Args: { target_date: string; user_baby_birth_date: string }
        Returns: {
          category: string
          content_data: Json
          content_type: string
          content_url: string
          description: string
          duration_minutes: number
          id: string
          is_premium: boolean
          thumbnail_url: string
          title: string
        }[]
      }
      get_post_feedback_stats: {
        Args: { post_uuid: string }
        Returns: {
          helpful_percentage: number
          total_feedback: number
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
