import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { api } from './backend/api';

/**
 * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
 */
console.log('Initializing Amplify backend configuration');

export const backend = defineBackend({
  auth,
  data,
  api
});
