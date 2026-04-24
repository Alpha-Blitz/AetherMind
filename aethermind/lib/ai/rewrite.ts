import Anthropic from '@anthropic-ai/sdk';
import { REWRITE_SYSTEM_PROMPT } from '@/constants/aether-prompts';
import type { AssembledContext } from '@/lib/memory';

export interface RewriteResult {
  rewrite: string;
  insight: string;
  identity_tag: string;
}

// Rewrite Engine — Sonnet 4.6, output capped at 200 tokens, system prompt cached.
// Called once per journal entry submission, parallel to signals extraction.
export async function rewriteEntry(rawContent: string, context: AssembledContext): Promise<RewriteResult> {
  const client = new Anthropic();

  const response = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 200,
    system: [
      {
        type: 'text',
        text: REWRITE_SYSTEM_PROMPT,
        cache_control: { type: 'ephemeral' },
      },
    ],
    messages: [
      {
        role: 'user',
        content: buildRewritePrompt(rawContent, context),
      },
    ],
  });

  const text = response.content[0].type === 'text' ? response.content[0].text : '';
  return parseRewriteResponse(text);
}

function buildRewritePrompt(rawContent: string, context: AssembledContext): string {
  return `IDENTITY CONTEXT:
Old belief: ${context.activeBelief.oldBelief}
New story: ${context.activeBelief.newStory}
Current score: ${context.activeBelief.currentScore}

USER ENTRY:
${rawContent}

Return JSON: { "rewrite": "...", "insight": "...", "identity_tag": "..." }`;
}

function parseRewriteResponse(text: string): RewriteResult {
  try {
    const json = JSON.parse(text.match(/\{[\s\S]*\}/)?.[0] ?? '{}');
    return {
      rewrite: json.rewrite ?? '',
      insight: json.insight ?? '',
      identity_tag: json.identity_tag ?? '',
    };
  } catch {
    return { rewrite: text, insight: '', identity_tag: '' };
  }
}
