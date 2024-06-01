import { createJsonErrorResponseHandler } from '@ai-sdk/provider-utils';
import { z } from 'zod';

const bedrockErrorDataSchema = z.object({
  object: z.literal('error'),
  message: z.string(),
  type: z.string(),
  param: z.string().nullable(),
  code: z.string().nullable(),
});

export type BedrockErrorData = z.infer<typeof bedrockErrorDataSchema>;

export const bedrockFailedResponseHandler = createJsonErrorResponseHandler({
  errorSchema: bedrockErrorDataSchema,
  errorToMessage: data => data.message,
});
