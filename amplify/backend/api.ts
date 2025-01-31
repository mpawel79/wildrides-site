import { defineAPI } from '@aws-amplify/backend';
import { health } from './function/health';

console.log('Configuring API Gateway endpoints');

export const api = defineAPI({
  // ... existing code ...
  routes: {
    '/health': {
      get: {
        function: health,
        authorizer: 'none',
        timeoutSeconds: 30,
        cors: {
          allowOrigins: ['*'],
          allowMethods: ['GET'],
          allowHeaders: ['Content-Type', 'Authorization']
        }
      }
    }
  }
}); 