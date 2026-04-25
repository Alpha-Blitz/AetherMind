// Auto-generated types from Supabase schema — run `supabase gen types typescript` to regenerate.
// Until Sprint 1 Supabase setup is complete, this is a manual stub.

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          timezone: string;
          archetype: 'analytical' | 'emotional' | 'action' | null;
          is_premium: boolean;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['users']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['users']['Insert']>;
      };
      identity_profiles: {
        Row: {
          id: string;
          user_id: string;
          origin_statement: string;
          desired_self: string;
          transition_type: string;
          key_vocabulary: Json;
          chapter: number;
        };
        Insert: Omit<Database['public']['Tables']['identity_profiles']['Row'], 'id'>;
        Update: Partial<Database['public']['Tables']['identity_profiles']['Insert']>;
      };
      beliefs: {
        Row: {
          id: string;
          user_id: string;
          old_belief: string;
          new_story: string;
          baseline_score: number;
          current_score: number;
          score_history: Json;
          trigger_patterns: Json;
          breakthrough_days: Json;
          status: 'active' | 'resolved' | 'surfaced';
          resolved_at: string | null;
        };
        Insert: Omit<Database['public']['Tables']['beliefs']['Row'], 'id'>;
        Update: Partial<Database['public']['Tables']['beliefs']['Insert']>;
      };
      journal_entries: {
        Row: {
          id: string;
          user_id: string;
          belief_id: string;
          raw_content: string;
          rewrite: string | null;
          insight: string | null;
          identity_tag: string | null;
          emotion_tags: Json;
          intensity_rating: number | null;
          tone_score: number | null;
          truth_score: number | null;
          processing_direction: number | null;
          is_compressed: boolean;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['journal_entries']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['journal_entries']['Insert']>;
      };
      weekly_summaries: {
        Row: {
          id: string;
          user_id: string;
          summary_text: string;
          stats: Json;
          breakthroughs: Json;
          patterns: Json;
          week_number: number;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['weekly_summaries']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['weekly_summaries']['Insert']>;
      };
      aether_events: {
        Row: {
          id: string;
          user_id: string;
          trigger_type: 'PATTERN_DETECTED' | 'SPIKE_DETECTED' | 'MILESTONE_REACHED';
          message: string;
          score_at_trigger: number;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['aether_events']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['aether_events']['Insert']>;
      };
      subscriptions: {
        Row: {
          id: string;
          user_id: string;
          razorpay_customer_id: string;
          razorpay_subscription_id: string;
          status: 'active' | 'trialing' | 'past_due' | 'canceled';
          current_period_end: string;
        };
        Insert: Omit<Database['public']['Tables']['subscriptions']['Row'], 'id'>;
        Update: Partial<Database['public']['Tables']['subscriptions']['Insert']>;
      };
    };
  };
};
