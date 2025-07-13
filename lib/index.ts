// import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export interface AwsBedrockLlmProps {
  // Define construct properties here
}

export class AwsBedrockLlm extends Construct {

  constructor(scope: Construct, id: string, props: AwsBedrockLlmProps = {}) {
    super(scope, id);

    // Define construct contents here

    // example resource
    // const queue = new sqs.Queue(this, 'AwsBedrockLlmQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }
}
