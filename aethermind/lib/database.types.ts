// Manual stub — replace with `supabase gen types typescript` once project is linked.

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Views: Record<string, never>;
    Functions: Record<string, never>;
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
        Insert: {
          id?: string;
          email: string;
          timezone?: string;
          archetype?: 'analytical' | 'emotional' | 'action' | null;
          is_premium?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          timezone?: string;
          archetype?: 'analytical' | 'emotional' | 'action' | null;
          is_premium?: boolean;
          created_at?: string;
        };
        Relationships: [];
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
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          origin_statement?: string;
          desired_self?: string;
          transition_type?: string;
          key_vocabulary?: Json;
          chapter?: number;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          origin_statement?: string;
          desired_self?: string;
          transition_type?: string;
          key_vocabulary?: Json;
          chapter?: number;
          updated_at?: string;
        };
        Relationships: [];
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
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          old_belief: string;
          new_story: string;
          baseline_score?: number;
          current_score?: number;
          score_history?: Json;
          trigger_patterns?: Json;
          breakthrough_days?: Json;
          status?: 'active' | 'resolved' | 'surfaced';
          resolved_at?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          old_belief?: string;
          new_story?: string;
          baseline_score?: number;
          current_score?: number;
          score_history?: Json;
          trigger_patterns?: Json;
          breakthrough_days?: Json;
          status?: 'active' | 'resolved' | 'surfaced';
          resolved_at?: string | null;
          created_at?: string;
        };
        Relationships: [];
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
        Insert: {
          id?: string;
          user_id: string;
          belief_id: string;
          raw_content: string;
          rewrite?: string | null;
          insight?: string | null;
          identity_tag?: string | null;
          emotion_tags?: Json;
          intensity_rating?: number | null;
          tone_score?: number | null;
          truth_score?: number | null;
          processing_direction?: number | null;
          is_compressed?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          belief_id?: string;
          raw_content?: string;
          rewrite?: string | null;
          insight?: string | null;
          identity_tag?: string | null;
          emotion_tags?: Json;
          intensity_rating?: number | null;
          tone_score?: number | null;
          truth_score?: number | null;
          processing_direction?: number | null;
          is_compressed?: boolean;
          created_at?: string;
        };
        Relationships: [];
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
        Insert: {
          id?: string;
          user_id: string;
          summary_text: string;
          stats?: Json;
          breakthroughs?: Json;
          patterns?: Json;
          week_number: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          summary_text?: string;
          stats?: Json;
          breakthroughs?: Json;
          patterns?: Json;
          week_number?: number;
          created_at?: string;
        };
        Relationships: [];
      };
      aether_events: {
        Row: {
          id: string;
          user_id: string;
          trigger_type: 'PATTERN_DETECTED' | 'SPIKE_DETECTED' | 'MILESTONE_REACHED';
          message: string;
          score_at_trigger: number | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          trigger_type: 'PATTERN_DETECTED' | 'SPIKE_DETECTED' | 'MILESTONE_REACHED';
          message: string;
          score_at_trigger?: number | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          trigger_type?: 'PATTERN_DETECTED' | 'SPIKE_DETECTED' | 'MILESTONE_REACHED';
          message?: string;
          score_at_trigger?: number | null;
          created_at?: string;
        };
        Relationships: [];
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
        Insert: {
          id?: string;
          user_id: string;
          razorpay_customer_id: string;
          razorpay_subscription_id: string;
          status: 'active' | 'trialing' | 'past_due' | 'canceled';
          current_period_end: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          razorpay_customer_id?: string;
          razorpay_subscription_id?: string;
          status?: 'active' | 'trialing' | 'past_due' | 'canceled';
          current_period_end?: string;
        };
        Relationships: [];
      };
    };
  };
};
