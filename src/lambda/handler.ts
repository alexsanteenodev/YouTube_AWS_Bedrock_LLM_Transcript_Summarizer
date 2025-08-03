import {
  BedrockRuntimeClient,
  ConverseCommand,
} from "@aws-sdk/client-bedrock-runtime";
import { fromEnv } from "@aws-sdk/credential-provider-env";

const modelId = process.env.MODEL_ID!;
const region = process.env.AWS_REGION || process.env.REGION || "us-east-1";

const client = new BedrockRuntimeClient({
  region,
  credentials: fromEnv(),
});

const PROMPT = `
You are a structured summarizer. Summarise the following meeting transcript into strict. Start with "This video is about...". Compact JSON with this exact key:
- summary (string)

Respond with *only valid JSON*, no markdown, no preamble, no explanation.
<transcript>
{{content}}
</transcript>
`;

export const handler = async (event: any) => {
  console.log("Received Event", { event });

  const transcript = event.transcript;
  if (!transcript) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "No 'transcript' in request" }),
    };
  }

  const cmd = new ConverseCommand({
    modelId,
    messages: [
      {
        role: "user",
        content: [{ text: PROMPT.replace("{{content}}", transcript) }],
      },
    ],
    inferenceConfig: { maxTokens: 2048, temperature: 0.2 },
  });

  const resp = await client.send(cmd);
  const raw = resp.output?.message?.content?.[0]?.text?.trim();

  return {
    statusCode: 200,
    body: raw,
  };
};
