import { defineSchema, CreateTableOptions } from '@aws-amplify/backend-graphql';

export const schema = defineSchema({
  version: '1',
  config: {
    database: {
      type: 'postgresql',
      host: 'database-esee-instance-1.eu-west-1.rds.amazonaws.com',
      port: 5432,
      name: 'esee',
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
    },
  },
  tables: {
    users: {
      primaryKey: { name: 'id', type: 'uuid' },
      fields: {
        email: { type: 'string', required: true, unique: true },
        name: { type: 'string' },
        created_at: { type: 'timestamp', defaultFn: 'now()' }
      }
    }
  }
});
