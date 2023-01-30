import env from '@/utils/env';

const endpoints = {
  // development: 'https://wren-backend-dev.azurewebsites.net/api/v1',
  // staging: 'https://wren-backend.azurewebsites.net/api/v1',
  // production: 'https://wren-backend.azurewebsites.net/api/v1',
  development: 'https://morelandconnect-api-dev.azurewebsites.net/api/v1',
  staging: 'https://morelandconnect-api-staging.azurewebsites.net/api/v1',
  production: 'https://morelandconnect-api.azurewebsites.net/api/v1',
  
  babyjay: 'https://babyjay.ngrok.io/api/v1',
};

/**
 * if the environment is not DEV, make sure the endpoint is built properly (either for staging or for prod)
 * if it is DEV, manually specify the endpoint for debugging
 *  */
export const DEFAULT_API_CONFIG = {
  url: !__DEV__ ? endpoints[env?.APP_ENV] : endpoints.production,

  timeout: 10000,
};
