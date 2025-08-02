import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { BuildConfig } from "./types/buildConfig";
import { lambdaStack } from "./stacks/lambda-stack";
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class AwsBedrockLlmStack extends cdk.Stack {
  constructor(
    scope: Construct,
    id: string,
    props: cdk.StackProps,
    buildConfig: BuildConfig
  ) {
    super(scope, id, props);

    const lambda = lambdaStack(this, buildConfig);

    new cdk.CfnOutput(this, "Lambda", {
      value: lambda.functionName,
    });
  }
}
