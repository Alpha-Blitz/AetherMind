import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import Anthropic from 'npm:@anthropic-ai/sdk';

// Weekly Mirror Edge Function — Sunday night batch job (pg_cron).
// Premium users: Sonnet 4.6 via Batch API (50% discount).
// Free users: Haiku 4.5, synchronous, truncated output.
// Sprint 4: full implementation. Sprint 2: scaffold only.
serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Verify cron secret or user auth
    const cronSecret = req.headers.get('X-Cron-Secret');
    const authHeader = req.headers.get('Authorization');
    const isCronJob = cronSecret === Deno.env.get('CRON_SECRET');

    if (!isCronJob && !authHeader) return unauthorized();

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    if (isCronJob) {
      // Batch mode: process all premium users
      const { data: premiumUsers } = await supabase
        .from('users')
        .select('id')
        .eq('is_premium', true);

      // TODO Sprint 4: submit Anthropic Batch API job for all premium users
      // const batchRequests = premiumUsers.map(u => buildBatchRequest(u.id));
      // const batch = await anthropic.messages.batches.create({ requests: batchRequests });
      // Store batch_id and poll for completion

      return jsonResponse({ queued: premiumUsers?.length ?? 0, status: 'batch_submitted' });
    }

    // Single user mode (user requests their mirror on demand)
    const { data: { user } } = await supabase.auth.getUser(authHeader!.replace('Bearer ', ''));
    if (!user) return unauthorized();

    // TODO Sprint 4: return latest weekly_summaries row for this user
    return jsonResponse({ status: 'not_yet_generated', next_mirror: 'Sunday' });
  } catch (err) {
    console.error('weekly-mirror error:', err);
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
