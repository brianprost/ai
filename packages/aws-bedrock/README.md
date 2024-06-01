# Vercel AI SDK - AWS Bedrock Provider

The **[AWS Bedrock provider](https://sdk.vercel.ai/providers/ai-sdk-providers/aws-bedrock)** for the [Vercel AI SDK](https://sdk.vercel.ai/docs) contains language model support for the AWS Bedrock chat API.

## Setup

The AWS Bedrock provider is available in the `@ai-sdk/aws-bedrock` module. You can install it with

```bash
npm i @ai-sdk/aws-bedrock
```

## Provider Instance

You can import the default provider instance `AWS Bedrock` from `@ai-sdk/aws-bedrock`:

```ts
import { bedrock } from '@ai-sdk/aws-bedrock';
```

## Example

```ts
import { bedrock } from '@ai-sdk/aws-bedrock';
import { generateText } from 'ai';

const { text } = await generateText({
  model: bedrock('anthropic.claude-3-haiku-20240307-v1:0'),
  prompt: 'Write a vegetarian lasagna recipe for 4 people.',
});
```

## Documentation

Please check out the **[AWS Bedrock provider](https://sdk.vercel.ai/providers/ai-sdk-providers/aws-bedrock)** for more information.
