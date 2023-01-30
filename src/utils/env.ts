import Constants from 'expo-constants';
import * as Updates from 'expo-updates';
import { IEnvironment } from 'types';

const getEnvironment = (): IEnvironment => {
  let releaseChannel =
    Constants?.manifest?.releaseChannel || Updates.releaseChannel;

  if (
    releaseChannel === undefined ||
    releaseChannel === 'default' ||
    releaseChannel.indexOf('development') !== -1
  ) {
    // no releaseChannel (is undefined) in dev
    return {
      ...process.env,
      APP_ENV: 'development',
      isDev: true,
      isStaging: false,
      isProduction: false,
    } as IEnvironment; // dev env settings
  }

  if (releaseChannel.indexOf('prod') !== -1) {
    return {
      ...process.env,
      APP_ENV: 'production',
      isDev: false,
      isStaging: false,
      isProduction: true,
    } as IEnvironment;
  }

  if (releaseChannel.indexOf('staging') !== -1) {
    return {
      ...process.env,
      APP_ENV: 'staging',
      isDev: false,
      isStaging: true,
      isProduction: false,
    } as IEnvironment;
  }

  return {
    APP_ENV: 'development',
    ...process.env,
  } as IEnvironment;
};

const env = getEnvironment();
export default env;
