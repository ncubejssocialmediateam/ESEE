import { S3Client, PutBucketPolicyCommand, PutBucketCorsCommand } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';

dotenv.config();

const s3Client = new S3Client({
  region: process.env.VITE_AWS_REGION,
  credentials: {
    accessKeyId: process.env.VITE_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.VITE_AWS_SECRET_ACCESS_KEY
  }
});

const bucketName = process.env.VITE_AWS_BUCKET_NAME;

// Bucket policy for secure access
const bucketPolicy = {
  Version: '2012-10-17',
  Statement: [
    {
      Sid: 'AllowIAMUserAccess',
      Effect: 'Allow',
      Principal: {
        AWS: process.env.VITE_AWS_USER_ARN
      },
      Action: ['s3:GetObject', 's3:PutObject', 's3:DeleteObject'],
      Resource: [`arn:aws:s3:::${bucketName}/*`]
    }
  ]
};

// CORS configuration to allow uploads from the website
const corsConfiguration = {
  CORSRules: [
    {
      AllowedHeaders: ['*'],
      AllowedMethods: ['GET', 'PUT', 'POST', 'DELETE', 'HEAD'],
      AllowedOrigins: [
        'http://localhost:5173',
        'http://192.168.1.23:5173',
        'https://esee.gr'
      ],
      ExposeHeaders: ['ETag']
    }
  ]
};

async function configureBucket() {
  try {
    // Set bucket policy if user ARN is provided
    if (process.env.VITE_AWS_USER_ARN) {
      const policyCommand = new PutBucketPolicyCommand({
        Bucket: bucketName,
        Policy: JSON.stringify(bucketPolicy)
      });
      await s3Client.send(policyCommand);
      console.log('Successfully set bucket policy');
    } else {
      console.log('Skipping bucket policy (no user ARN provided)');
    }

    // Set CORS configuration
    const corsCommand = new PutBucketCorsCommand({
      Bucket: bucketName,
      CORSConfiguration: corsConfiguration
    });
    await s3Client.send(corsCommand);
    console.log('Successfully set CORS configuration');

  } catch (error) {
    console.error('Error configuring bucket:', error);
    process.exit(1);
  }
}

configureBucket();
