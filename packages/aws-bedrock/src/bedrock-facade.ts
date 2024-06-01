import {
  generateId,
  loadApiKey,
  withoutTrailingSlash,
} from '@ai-sdk/provider-utils';
import { BedrockChatLanguageModel } from './aws-bedrock-chat-language-model';
import {
  BedrockChatModelId,
  BedrockChatSettings,
} from './aws-bedrock-chat-settings';
import { BedrockProviderSettings } from './aws-bedrock-provider';

/**
 * @deprecated Use `createBedrock` instead.
 */
export class Bedrock {
  /**
   * Base URL for the Bedrock API calls.
   */
  readonly baseURL: string;

  readonly apiKey?: string;

  readonly headers?: Record<string, string>;

  private readonly generateId: () => string;

  /**
   * Creates a new Bedrock provider instance.
   */
  constructor(options: BedrockProviderSettings = {}) {
    this.baseURL =
      withoutTrailingSlash(options.baseURL ?? options.baseUrl) ??
      'https://api.mistral.ai/v1';

    this.apiKey = options.apiKey;
    this.headers = options.headers;
    this.generateId = options.generateId ?? generateId;
  }

  private get baseConfig() {
    return {
      baseURL: this.baseURL,
      headers: () => ({
        Authorization: `Bearer ${loadApiKey({
          apiKey: this.apiKey,
          environmentVariableName: 'MISTRAL_API_KEY',
          description: 'Bedrock',
        })}`,
        ...this.headers,
      }),
    };
  }

  chat(modelId: BedrockChatModelId, settings: BedrockChatSettings = {}) {
    return new BedrockChatLanguageModel(modelId, settings, {
      provider: 'mistral.chat',
      ...this.baseConfig,
      generateId: this.generateId,
    });
  }
}
