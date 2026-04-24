import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import Anthropic from 'npm:@anthropic-ai/sdk';

// Entry submission Edge Function.
// Flow: auth → context assembly → parallel AI calls (Rewrite + Signals) → persist → score update → Aether trigger check
serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) return unauthorized();

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    const { data: { user }, error: authError } = await supabase.auth.getUser(
      authHeader.replace('Bearer ', ''),
    );
    if (authError || !user) return unauthorized();

    const { raw_content, belief_id, intensity_rating } = await req.json();
    if (!raw_content?.trim()) {
      return jsonResponse({ error: 'raw_content required' }, 400);
    }

    // Step 3: Context assembly
    const context = await assembleContext(supabase, user.id, belief_id);

    // Step 4: Parallel AI calls — Rewrite (Sonnet) + Signals (Haiku)
    const anthropic = new Anthropic({ apiKey: Deno.env.get('ANTHROPIC_API_KEY') });
    const [rewriteResult, signalsResult] = await Promise.all([
      callRewriteEngine(anthropic, raw_content, context),
      callSignalExtraction(anthropic, raw_content, context),
    ]);

    // Step 5: Persist to journal_entries
    const { data: entry, error: insertError } = await supabase
      .from('journal_entries')
      .insert({
        user_id: user.id,
        belief_id,
        raw_content,
        rewrite: rewriteResult.rewrite,
        insight: rewriteResult.insight,
        identity_tag: rewriteResult.identity_tag,
        emotion_tags: signalsResult.emotion_tags,
        intensity_rating: intensity_rating ?? null,
        tone_score: signalsResult.tone_score,
        truth_score: signalsResult.truth_score,
        processing_direction: signalsResult.processing_direction,
        is_compressed: false,
      })
      .select()
      .single();

    if (insertError) throw insertError;

    // Step 6: Enqueue scoring update (async — don't block response)
    // TODO Sprint 3: trigger Scoring Engine background job via Redis queue

    // Step 7: Aether trigger check
    // TODO Sprint 3: check pattern/spike/milestone conditions

    return jsonResponse({ entry, rewrite: rewriteResult, signals: signalsResult });
  } catch (err) {
    console.error('entry-submit error:', err);
    return jsonResponse({ error: 'Internal server error' }, 500);
  }
});

// --- Context assembly ---
async function assembleContext(supabase: ReturnType<typeof createClient>, userId: string, beliefId: string) {
  const [profileResult, beliefResult, recentResult, summariesResult] = await Promise.all([
    supabase.from('identity_profiles').select('*').eq('user_id', userId).single(),
    supabase.from('beliefs').select('*').eq('id', beliefId).single(),
    supabase.from('journal_entries')
      .select('raw_content, rewrite, insight, created_at')
      .eq('user_id', userId)
      .eq('is_compressed', false)
      .order('created_at', { ascending: false })
      .limit(5),
    supabase.from('weekly_summaries')
      .select('summary_text, week_number')
      .eq('user_id', userId)
      .order('week_number', { ascending: false })
      .limit(4),
  ]);

  return {
    userProfile: profileResult.data,
    activeBelief: beliefResult.data,
    recentEntries: recentResult.data ?? [],
    weeklySummaries: summariesResult.data ?? [],
    // TODO Sprint 3: add semanticRecall via pgvector search
    semanticRecall: [],
  };
}

// --- AI calls (stubs — full implementation in lib/ai/) ---
async function callRewriteEngine(anthropic: Anthropic, rawContent: string, context: unknown) {
  // TODO Sprint 2: wire to full rewrite.ts implementation
  return { rewrite: rawContent, insight: '', identity_tag: '' };
}

async function callSignalExtraction(anthropic: Anthropic, rawContent: string, context: unknown) {
  // TODO Sprint 2: wire to full signals.ts implementation
  return { emotion_tags: [], tone_score: 0, truth_score: 0.5, processing_direction: 0 };
}

// --- Helpers ---
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

function jsonResponse(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

function unauthorized() {
  return jsonResponse({ error: 'Unauthorized' }, 401);
}
