import { Storage } from '@aws-amplify/storage';

/**
 * Upload a file to S3
 * @param {File} file - The file to upload
 * @param {string} key - The key (path) where the file will be stored in S3
 * @param {Object} [options] - Additional options for the upload
 * @returns {Promise<string>} - The URL of the uploaded file
 */
export const uploadFile = async (file, key, options = {}) => {
  try {
    const result = await Storage.put(key, file, {
      contentType: file.type,
      ...options
    });
    return result.key;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};

/**
 * Get a file from S3
 * @param {string} key - The key (path) of the file in S3
 * @param {Object} [options] - Additional options for the download
 * @returns {Promise<string>} - The URL of the file
 */
export const getFileUrl = async (key, options = {}) => {
  try {
    const url = await Storage.get(key, options);
    return url;
  } catch (error) {
    console.error('Error getting file URL:', error);
    throw error;
  }
};

/**
 * List files in S3
 * @param {string} [path] - The path to list files from
 * @param {Object} [options] - Additional options for listing
 * @returns {Promise<Array>} - Array of file objects
 */
export const listFiles = async (path = '', options = {}) => {
  try {
    const result = await Storage.list(path, options);
    return result.results;
  } catch (error) {
    console.error('Error listing files:', error);
    throw error;
  }
};

/**
 * Remove a file from S3
 * @param {string} key - The key (path) of the file to remove
 * @param {Object} [options] - Additional options for removal
 * @returns {Promise<void>}
 */
export const removeFile = async (key, options = {}) => {
  try {
    await Storage.remove(key, options);
  } catch (error) {
    console.error('Error removing file:', error);
    throw error;
  }
};

/**
 * Copy a file within S3
 * @param {string} sourceKey - The source file key
 * @param {string} targetKey - The target file key
 * @param {Object} [options] - Additional options for copying
 * @returns {Promise<void>}
 */
export const copyFile = async (sourceKey, targetKey, options = {}) => {
  try {
    await Storage.copy({
      key: sourceKey,
      copySource: sourceKey,
      ...options
    });
  } catch (error) {
    console.error('Error copying file:', error);
    throw error;
  }
};
