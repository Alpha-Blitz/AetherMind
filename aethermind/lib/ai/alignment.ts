import Anthropic from '@anthropic-ai/sdk';
import { ALIGNMENT_SYSTEM_PROMPT } from '@/constants/aether-prompts';
import type { AssembledContext } from '@/lib/memory';

export interface AlignmentProtocol {
  actions: [string, string, string];
  mindset_frame: string;
  reflection_question: string;
}

// Alignment Engine — Sonnet 4.6, fully cached system prompt (identical structure per user).
// Runs once daily at morning check-in or via 8am pg_cron scheduled job.
export async function generateAlignmentProtocol(context: AssembledContext, scoreHistory: number[]): Promise<AlignmentProtocol> {
  const client = new Anthropic();

  const response = await client.messages.create({
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
        content: buildAlignmentPrompt(context, scoreHistory),
      },
    ],
  });

  const text = response.content[0].type === 'text' ? response.content[0].text : '';
  return parseAlignmentResponse(text);
}

function buildAlignmentPrompt(context: AssembledContext, scoreHistory: number[]): string {
  const last3 = scoreHistory.slice(-3);
  return `Profile: ${context.userProfile.desiredSelf}
Old belief: ${context.activeBelief.oldBelief}
New story: ${context.activeBelief.newStory}
Last 3 days scores: ${last3.join(', ')}

Return JSON: { "actions": ["...", "...", "..."], "mindset_frame": "...", "reflection_question": "..." }`;
}

function parseAlignmentResponse(text: string): AlignmentProtocol {
  try {
    const json = JSON.parse(text.match(/\{[\s\S]*\}/)?.[0] ?? '{}');
    return {
      actions: json.actions ?? ['—', '—', '—'],
      mindset_frame: json.mindset_frame ?? '',
      reflection_question: json.reflection_question ?? '',
    };
  } catch {
    return { actions: ['—', '—', '—'], mindset_frame: '', reflection_question: '' };
  }
}
