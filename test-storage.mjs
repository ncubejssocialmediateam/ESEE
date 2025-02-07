import { Amplify } from 'aws-amplify';
import { uploadFile, getFileUrl, listFiles } from './src/utils/storage.js';

// Configure Amplify
Amplify.configure({
  Auth: {
    region: 'eu-west-1',
    identityPoolId: 'eu-west-1:esee-bucket'
  },
  Storage: {
    AWSS3: {
      bucket: 'esee-bucket',
      region: 'eu-west-1'
    }
  }
});

async function testStorage() {
  try {
    // Create a test file
    const content = 'Hello, this is a test file';
    const blob = new Blob([content], { type: 'text/plain' });
    const file = new File([blob], 'test.txt', { type: 'text/plain' });

    console.log('1. Uploading test file...');
    const key = await uploadFile(file, 'test.txt');
    console.log('File uploaded successfully with key:', key);

    console.log('\n2. Getting file URL...');
    const url = await getFileUrl(key);
    console.log('File URL:', url);

    console.log('\n3. Listing files in bucket...');
    const files = await listFiles();
    console.log('Files in bucket:', files);

  } catch (error) {
    console.error('Test failed:', error);
  }
}

testStorage();
