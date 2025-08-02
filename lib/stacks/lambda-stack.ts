import { Duration } from "aws-cdk-lib";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";
import { join } from "path";
import { BuildConfig } from "../types/buildConfig";
import { ManagedPolicy } from "aws-cdk-lib/aws-iam";

export const lambdaStack = (stack: Construct, buildConfig: BuildConfig) => {
  const fn = new NodejsFunction(stack, "TranscriptSummarizer", {
    entry: join(__dirname, "../../src/lambda/handler.ts"),
    runtime: Runtime.NODEJS_LATEST,
    memorySize: 1024,
    timeout: Duration.seconds(60),
    functionName: "aws-bedrock-transcript-summarizer",
    environment: {
      MODEL_ID: "meta.llama3-8b-instruct-v1:0",
      REGION: buildConfig.AWSProfileRegion,
    },
    bundling: {
      minify: true,
      externalModules: ["aws-sdk"],
    },
  });
  fn.role?.addManagedPolicy(
    ManagedPolicy.fromAwsManagedPolicyName("AmazonBedrockFullAccess")
  );

  return fn;
};
