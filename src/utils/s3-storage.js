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
 * Get a pre-signed URL for uploading a file to S3
 * @param {string} key - The key (path) where the file will be stored in S3
 * @param {string} contentType - The content type of the file
 * @returns {Promise<{uploadUrl: string, downloadUrl: string}>} - URLs for uploading and downloading
 */
export const getPresignedUrls = async (key, contentType) => {
  try {
    // Get pre-signed URL for upload
    const putCommand = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
      ContentType: contentType
    });
    const uploadUrl = await getSignedUrl(s3Client, putCommand, { expiresIn: 3600 }); // 1 hour

    // Get pre-signed URL for download
    const getCommand = new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key
    });
    const downloadUrl = await getSignedUrl(s3Client, getCommand, { expiresIn: 3600 * 24 * 7 }); // 7 days

    return { uploadUrl, downloadUrl };
  } catch (error) {
    console.error('Error generating pre-signed URLs:', error);
    throw new Error('Failed to generate upload/download URLs');
  }
};

/**
 * Upload a file to S3 using pre-signed URL
 * @param {File} file - The file to upload
 * @param {string} key - The key (path) where the file will be stored in S3
 * @returns {Promise<string>} - The URL for downloading the file
 */
export const uploadFile = async (file, key) => {
  try {
    const { uploadUrl, downloadUrl } = await getPresignedUrls(key, file.type);

    // Upload using pre-signed URL
    const response = await fetch(uploadUrl, {
      method: 'PUT',
      body: file,
      headers: {
        'Content-Type': file.type
      }
    });

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.statusText}`);
    }

    return downloadUrl;
  } catch (error) {
    console.error('Error in uploadFile:', error);
    throw new Error('Failed to upload file. Please try again.');
  }
};
