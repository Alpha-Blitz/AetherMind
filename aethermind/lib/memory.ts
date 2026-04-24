// Memory Engine — assembles context before every AI call.
// No AI calls here — retrieval only. The most critical performance component.

export interface AssembledContext {
  userProfile: {
    originStatement: string;
    desiredSelf: string;
    transitionType: string;
    keyVocabulary: string[];
    chapter: number;
  };
  activeBelief: {
    oldBelief: string;
    newStory: string;
    currentScore: number;
    scoreHistory: number[];  // last 30 days
    triggerPatterns: string[];
    breakthroughDays: string[];
  };
  recentEntries: Array<{
    raw_content: string;
    rewrite: string | null;
    insight: string | null;
    created_at: string;
  }>;
  semanticRecall: Array<{
    raw_content: string;
    rewrite: string | null;
    insight: string | null;
    similarity: number;
  }>;
  weeklySummaries: Array<{
    summary_text: string;
    week_number: number;
  }>;
}

// Called by Edge Functions before every AI call — never from client directly.
// Returns a pre-assembled context object ready to pass to any AI module.
// Implementation lives in supabase/functions/entry-submit/context-assembly.ts
export type ContextAssembler = (userId: string, currentEntryEmbedding?: number[]) => Promise<AssembledContext>;
