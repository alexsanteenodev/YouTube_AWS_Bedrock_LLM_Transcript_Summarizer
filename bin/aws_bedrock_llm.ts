#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { AwsBedrockLlmStack } from "../lib/aws_bedrock_llm-stack";
import { BuildConfig, buildConfigSchema } from "../lib/types/buildConfig";

const app = new cdk.App();
const buildConfig = getBuildConfig(app);

new AwsBedrockLlmStack(
  app,
  "AwsBedrockLlmStack",
  {
    env: {
      region: buildConfig.AWSProfileRegion,
      account: buildConfig.AWSAccountID,
    },
  },
  buildConfig
);

function getBuildConfig(app: cdk.App): BuildConfig {
  const env = app.node.tryGetContext("config") as string;
  if (!env)
    throw new Error(
      "Context variable missing on CDK command. Pass in as `-c config=dev`"
    );
  const envConfig = app.node.tryGetContext(env) as unknown;
  return buildConfigSchema.parse(envConfig);
}
