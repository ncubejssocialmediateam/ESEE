import { defineData } from '@aws-amplify/backend';
import { readFileSync } from 'fs';
import { join } from 'path';

const schema = readFileSync(join(__dirname, 'schema.graphql'), 'utf8');

export const data = defineData({
  name: 'esee-data',
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'apiKey',
    apiKeyAuthorizationMode: {
      expiresInDays: 30
    }
  }
});
