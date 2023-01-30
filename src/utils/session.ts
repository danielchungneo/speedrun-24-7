import Storage from '@react-native-async-storage/async-storage';
import { TOKEN_STORAGE_KEY } from '@/constants/storage';

export const getSessionToken = async () => {
  return Storage.getItem(TOKEN_STORAGE_KEY);
};

export const setSessionToken = async (token: string) => {
  return await Storage.setItem(TOKEN_STORAGE_KEY, token);
};

export const removeSessionToken = async () => {
  return await Storage.removeItem(TOKEN_STORAGE_KEY);
};
