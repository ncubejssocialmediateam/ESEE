import { defineData } from '@aws-amplify/backend';
import { schema } from './schema';

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'API_KEY',
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});
