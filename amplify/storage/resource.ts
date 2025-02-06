import { defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
  name: 'esee-storage',
  permissions: {
    authenticated: {
      actions: ['read', 'write'],
    },
    public: {
      actions: ['read'],
    },
  },
});
