export type BedrockChatPrompt = Array<BedrockChatMessage>;

export type BedrockChatMessage =
  | BedrockSystemMessage
  | BedrockUserMessage
  | BedrockAssistantMessage
  | BedrockToolMessage;

export interface BedrockSystemMessage {
  role: 'system';
  content: string;
}

export interface BedrockUserMessage {
  role: 'user';
  content: string;
}

export interface BedrockAssistantMessage {
  role: 'assistant';
  content: string;
  tool_calls?: Array<{
    id: string;
    type: 'function';
    function: { name: string; arguments: string };
  }>;
}

export interface BedrockToolMessage {
  role: 'tool';
  name: string;
  content: string;
}
