import i18n from 'i18n-js';
import * as Localization from 'expo-localization';
import Storage from '@react-native-async-storage/async-storage';
import React, {
  FunctionComponent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import translations from '@/constants/translations/';
import { ITranslate } from 'types';

export const TranslationContext = React.createContext({});

const TranslationProvider: FunctionComponent = ({ children }) => {
  const [locale, setLocale] = useState<string>();

  if (locale) {
    // Set the locale once at the beginning of your app.
    i18n.locale = locale;
    // Set the key-value pairs for the different languages you want to support.
    i18n.translations = translations;
    // When a value is missing from a language it'll fallback to another language with the key present.
    i18n.fallbacks = true;
  }

  const t = useCallback(
    (scope: i18n.Scope, options?: i18n.TranslateOptions) => {
      return i18n.t(scope, { ...options, locale });
    },
    [locale]
  );

  // get locale from storage
  const getLocale = useCallback(async () => {
    // get preference from storage
    const localeJSON = await Storage.getItem('locale');

    const newLocale = localeJSON !== null ? localeJSON : Localization.locale; //.split('-')[0];

    // await Storage.removeItem('locale');
    setLocale(newLocale);
  }, [setLocale]);

  useEffect(() => {
    getLocale();
  }, [getLocale]);

  useEffect(() => {
    // save preferance to storage
    if (locale) {
      Storage.setItem('locale', locale);
    }
  }, [locale]);

  const contextValue = {
    locale,
    setLocale,
    translate: t,
    t,
  };

  return (
    <TranslationContext.Provider value={contextValue}>
      {children}
    </TranslationContext.Provider>
  );
};

export default TranslationProvider;
