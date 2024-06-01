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
import {
  BedrockEmbeddingModelId,
  BedrockEmbeddingSettings,
} from './aws-bedrock-embedding-settings';
import { BedrockEmbeddingModel } from './aws-bedrock-embedding-model';

export interface BedrockProvider {
  (
    modelId: BedrockChatModelId,
    settings?: BedrockChatSettings,
  ): BedrockChatLanguageModel;

  /**
Creates a model for text generation.
*/
  chat(
    modelId: BedrockChatModelId,
    settings?: BedrockChatSettings,
  ): BedrockChatLanguageModel;

  /**
Creates a model for text embeddings.
   */
  embedding(
    modelId: BedrockEmbeddingModelId,
    settings?: BedrockEmbeddingSettings,
  ): BedrockEmbeddingModel;
}

export interface BedrockProviderSettings {
  /**
Use a different URL prefix for API calls, e.g. to use proxy servers.
The default prefix is `https://api.mistral.ai/v1`.
   */
  baseURL?: string;

  /**
@deprecated Use `baseURL` instead.
   */
  baseUrl?: string;

  /**
API key that is being send using the `Authorization` header.
It defaults to the `MISTRAL_API_KEY` environment variable.
   */
  apiKey?: string;

  /**
Custom headers to include in the requests.
     */
  headers?: Record<string, string>;

  generateId?: () => string;
}

/**
Create a Bedrock AI provider instance.
 */
export function createBedrock(
  options: BedrockProviderSettings = {},
): BedrockProvider {
  const baseURL =
    withoutTrailingSlash(options.baseURL ?? options.baseUrl) ??
    'https://api.mistral.ai/v1';

  const getHeaders = () => ({
    Authorization: `Bearer ${loadApiKey({
      apiKey: options.apiKey,
      environmentVariableName: 'MISTRAL_API_KEY',
      description: 'Bedrock',
    })}`,
    ...options.headers,
  });

  const createChatModel = (
    modelId: BedrockChatModelId,
    settings: BedrockChatSettings = {},
  ) =>
    new BedrockChatLanguageModel(modelId, settings, {
      provider: 'mistral.chat',
      baseURL,
      headers: getHeaders,
      generateId: options.generateId ?? generateId,
    });

  const createEmbeddingModel = (
    modelId: BedrockEmbeddingModelId,
    settings: BedrockEmbeddingSettings = {},
  ) =>
    new BedrockEmbeddingModel(modelId, settings, {
      provider: 'mistral.embedding',
      baseURL,
      headers: getHeaders,
    });

  const provider = function (
    modelId: BedrockChatModelId,
    settings?: BedrockChatSettings,
  ) {
    if (new.target) {
      throw new Error(
        'The Bedrock model function cannot be called with the new keyword.',
      );
    }

    return createChatModel(modelId, settings);
  };

  provider.chat = createChatModel;
  provider.embedding = createEmbeddingModel;

  return provider as BedrockProvider;
}

/**
Default Bedrock provider instance.
 */
export const bedrock = createBedrock();
