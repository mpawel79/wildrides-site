import { defineFunction } from '@aws-amplify/backend';
import { PolicyStatement } from 'aws-cdk-lib/aws-iam';

console.log('Configuring health check lambda function resources');

export const healthFunction = defineFunction({
  entry: './health/index.ts',
  timeout: 30,
  memory: 256,
  permissions: [
    // Add S3 list buckets permission
    new PolicyStatement({
      actions: ['s3:ListAllMyBuckets'],
      resources: ['*']
    })
  ],
  environment: {
    REGION: process.env.AWS_REGION || 'us-east-1'
  }
}); 