import { ITranslate } from 'types';
import { TranslationContext } from '@/providers/TranslationProvider';
import { useContext } from 'react';

/*
 * useTranslation hook based on i18n-js
 * Source: https://github.com/fnando/i18n-js
 */
export default function useTranslation() {
  const translation = useContext(TranslationContext);

  return translation as ITranslate;
}
