export type BedrockEmbeddingModelId =
  | 'amazon.titan-embed-text-v2:0'
  | (string & {});

export interface BedrockEmbeddingSettings {
  /**
Override the maximum number of embeddings per call.
   */
  maxEmbeddingsPerCall?: number;

  /**
Override the parallelism of embedding calls.
    */
  supportsParallelCalls?: boolean;
}
