// https://docs.mistral.ai/platform/endpoints/
export type BedrockChatModelId =
  | 'open-mistral-7b'
  | 'open-mixtral-8x7b'
  | 'open-mixtral-8x22b'
  | 'anthropic.claude-3-haiku-20240307-v1:0'
  | 'mistral-medium-latest'
  | 'mistral-large-latest'
  | (string & {});

export interface BedrockChatSettings {
  /**
Whether to inject a safety prompt before all conversations.

Defaults to `false`.
   */
  safePrompt?: boolean;
}
