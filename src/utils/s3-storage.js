import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const s3Client = new S3Client({
  region: import.meta.env.VITE_AWS_REGION || 'eu-west-1',
  credentials: {
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY
  }
});

const BUCKET_NAME = import.meta.env.VITE_AWS_BUCKET_NAME || 'esee-bucket';

/**
 * Upload a file to S3
 * @param {Buffer|Blob|string} fileContent - The file content to upload
 * @param {string} key - The key (path) where the file will be stored in S3
 * @param {string} contentType - The content type of the file
 * @returns {Promise<string>} - The URL of the uploaded file
 */
export const uploadFile = async (fileContent, key, contentType) => {
  try {
    // Upload the file
    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
      Body: fileContent,
      ContentType: contentType
    });

    await s3Client.send(command);

    // Generate a signed URL for the uploaded file
    const getCommand = new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key
    });

    const url = await getSignedUrl(s3Client, getCommand, { expiresIn: 3600 * 24 * 7 }); // URL valid for 7 days
    return url;
  } catch (error) {
    console.error('Error in uploadFile:', error);
    throw error;
  }
};
