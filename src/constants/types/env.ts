export interface IEnvironment {
  APP_ENV: 'development' | 'staging' | 'production';
  isDev?: boolean;
  isStaging?: boolean;
  isProduction?: boolean;
  [key: string]: any;
}
