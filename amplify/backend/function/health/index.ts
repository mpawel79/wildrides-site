import { AmplifyGraphQLOperation } from '@aws-amplify/api';
import { S3Client, ListBucketsCommand } from '@aws-sdk/client-s3';

const s3Client = new S3Client({});

console.log('Initializing health check lambda function');

export const handler = async (event: AmplifyGraphQLOperation) => {
  console.log('Health check endpoint called', { event });
  
  try {
    // Test S3 connectivity
    const listBucketsResponse = await s3Client.send(new ListBucketsCommand({}));
    console.log('S3 connection test successful', { buckets: listBucketsResponse.Buckets?.length });

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({
        status: "healthy",
        timestamp: new Date().toISOString(),
        s3Status: "connected",
        bucketsCount: listBucketsResponse.Buckets?.length || 0
      })
    };
  } catch (error) {
    console.error('Error in health check:', error);
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({
        status: "unhealthy",
        timestamp: new Date().toISOString(),
        error: error.message
      })
    };
  }
}; 