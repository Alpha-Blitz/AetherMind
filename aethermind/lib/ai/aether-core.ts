import Anthropic from '@anthropic-ai/sdk';
import { AETHER_CORE_SYSTEM_PROMPT } from '@/constants/aether-prompts';
import type { AssembledContext } from '@/lib/memory';

export type AetherTrigger = 'PATTERN_DETECTED' | 'SPIKE_DETECTED' | 'MILESTONE_REACHED';

export interface AetherCoreResult {
  message: string; // 1–3 sentences, reflective, no advice
  trigger_type: AetherTrigger;
  score_at_trigger: number;
}

// Aether Core — Sonnet 4.6, event-driven, never polled.
// Hard output constraint: 1–3 sentences. Reflective tone. Zero advice. Slightly abstract.
// Called only when a trigger event is enqueued by the Scoring Engine.
export async function generateAetherResponse(
  trigger: AetherTrigger,
  context: AssembledContext,
  triggerDetail: string,
): Promise<AetherCoreResult> {
  const client = new Anthropic();

  const response = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 80,
    system: AETHER_CORE_SYSTEM_PROMPT,
    messages: [
      {
        role: 'user',
        content: buildAetherPrompt(trigger, context, triggerDetail),
      },
    ],
  });

  const message = response.content[0].type === 'text' ? response.content[0].text.trim() : '';

  return {
    message,
    trigger_type: trigger,
    score_at_trigger: context.activeBelief.currentScore,
  };
}

function buildAetherPrompt(trigger: AetherTrigger, context: AssembledContext, detail: string): string {
  const triggerDescriptions: Record<AetherTrigger, string> = {
    PATTERN_DETECTED: `Pattern detected: "${detail}" has appeared 3+ times in 7 days.`,
    SPIKE_DETECTED: `Breakthrough detected: belief score dropped ${detail} points today.`,
    MILESTONE_REACHED: `Milestone: ${detail}`,
  };

  return `${triggerDescriptions[trigger]}

User's old belief: ${context.activeBelief.oldBelief}
New story: ${context.activeBelief.newStory}
Current score: ${context.activeBelief.currentScore}

Recent entries summary: ${context.recentEntries.map((e) => e.insight).filter(Boolean).join(' | ')}

Respond in 1–3 sentences only. Be Aether.`;
}
