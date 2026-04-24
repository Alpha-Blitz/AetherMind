import Anthropic from '@anthropic-ai/sdk';
import { SIGNALS_SYSTEM_PROMPT } from '@/constants/aether-prompts';
import type { AssembledContext } from '@/lib/memory';

export interface SignalsResult {
  emotion_tags: string[];
  tone_score: number;       // -1 (self-critical) to +1 (integrating)
  truth_score: number;      // 0–1 alignment between claimed identity and emotional tone
  processing_direction: number; // -1 (stuck) to +1 (integrating)
}

// Signal extraction — Haiku 4.5, runs parallel to Rewrite Engine via Promise.all.
// Output feeds directly into the Scoring Engine's nightly background job.
export async function extractSignals(rawContent: string, context: AssembledContext): Promise<SignalsResult> {
  const client = new Anthropic();

  const response = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 150,
    system: [
      {
        type: 'text',
        text: SIGNALS_SYSTEM_PROMPT,
        cache_control: { type: 'ephemeral' },
      },
    ],
    messages: [
      {
        role: 'user',
        content: `New story: ${context.activeBelief.newStory}\n\nEntry: ${rawContent}\n\nReturn JSON only.`,
      },
    ],
  });

  const text = response.content[0].type === 'text' ? response.content[0].text : '';
  return parseSignalsResponse(text);
}

function parseSignalsResponse(text: string): SignalsResult {
  try {
    const json = JSON.parse(text.match(/\{[\s\S]*\}/)?.[0] ?? '{}');
    return {
      emotion_tags: json.emotion_tags ?? [],
      tone_score: json.tone_score ?? 0,
      truth_score: json.truth_score ?? 0.5,
      processing_direction: json.processing_direction ?? 0,
    };
  } catch {
    return { emotion_tags: [], tone_score: 0, truth_score: 0.5, processing_direction: 0 };
  }
}
