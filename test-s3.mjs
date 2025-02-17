import { uploadFile, listFiles, getSignedFileUrl, deleteFile } from './src/utils/s3-storage.js';

async function testS3Operations() {
  try {
    // Test 1: List files
    console.log('1. Listing files in bucket...');
    const files = await listFiles();
    console.log('Files in bucket:', files);

    // Test 2: Upload a test file
    console.log('\n2. Uploading test file...');
    const testContent = 'Hello, this is a test file from ESEE website';
    const key = 'test/test-file.txt';
    await uploadFile(testContent, key, 'text/plain');
    console.log('File uploaded successfully with key:', key);

    // Test 3: Get signed URL
    console.log('\n3. Getting signed URL for the uploaded file...');
    const url = await getSignedFileUrl(key);
    console.log('Signed URL:', url);

    // Test 4: List files again to verify upload
    console.log('\n4. Listing files again to verify upload...');
    const updatedFiles = await listFiles();
    console.log('Updated files in bucket:', updatedFiles);

    // Test 5: Delete test file
    console.log('\n5. Cleaning up - deleting test file...');
    await deleteFile(key);
    console.log('Test file deleted successfully');

  } catch (error) {
    console.error('Test failed:', error);
  }
}

testS3Operations();
