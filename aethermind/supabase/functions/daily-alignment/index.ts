import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import Anthropic from 'npm:@anthropic-ai/sdk';
import { ALIGNMENT_SYSTEM_PROMPT } from '../../_shared/prompts.ts';

// Daily Alignment Edge Function.
// Called at morning check-in OR via pg_cron at 8am user local time.
// Returns: 3 actions + 1 mindset frame + 1 reflection question.
// System prompt is fully cached — identical structure for all users.
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

    const { user_id } = await req.json().catch(() => ({ user_id: user.id }));

    // Fetch identity context + last 3 days scoring data
    const [profileResult, beliefResult] = await Promise.all([
      supabase.from('identity_profiles').select('*').eq('user_id', user_id).single(),
      supabase.from('beliefs').select('*').eq('user_id', user_id).eq('status', 'active').single(),
    ]);

    if (!profileResult.data || !beliefResult.data) {
      return jsonResponse({ error: 'Identity context not found' }, 404);
    }

    const scoreHistory: number[] = beliefResult.data.score_history ?? [];
    const last3Days = scoreHistory.slice(-3);

    const anthropic = new Anthropic({ apiKey: Deno.env.get('ANTHROPIC_API_KEY') });

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 300,
      system: [
        {
          type: 'text',
          text: ALIGNMENT_SYSTEM_PROMPT,
          cache_control: { type: 'ephemeral' },
        },
      ],
      messages: [
        {
          role: 'user',
          content: `Profile: ${profileResult.data.desired_self}
Old belief: ${beliefResult.data.old_belief}
New story: ${beliefResult.data.new_story}
Last 3 days scores: ${last3Days.join(', ')}

Return JSON: { "actions": ["...", "...", "..."], "mindset_frame": "...", "reflection_question": "..." }`,
        },
      ],
    });

    const text = response.content[0].type === 'text' ? response.content[0].text : '';
    let protocol;
    try {
      protocol = JSON.parse(text.match(/\{[\s\S]*\}/)?.[0] ?? '{}');
    } catch {
      protocol = { actions: [], mindset_frame: '', reflection_question: '' };
    }

    return jsonResponse({ protocol, cache_hit: response.usage?.cache_read_input_tokens > 0 });
  } catch (err) {
    console.error('daily-alignment error:', err);
    return jsonResponse({ error: 'Internal server error' }, 500);
  }
});

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
