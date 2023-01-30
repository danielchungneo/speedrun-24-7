import { REGEX_PATTERNS } from '@/constants/regex';
import { formatNumberWithCommas } from '@/utils/number';
import React, { forwardRef, Ref, useMemo } from 'react';
import { INumberField } from 'types/components/inputComponents';
import BaseTextField from '../TextField/BaseTextField';
import { createNumberMask, useMaskedInputProps } from 'react-native-mask-input';

const dollarMask = createNumberMask({
  // prefix: ['$'],
  delimiter: ',',
  separator: '.',
  precision: 2,
});
const BaseNumberField = (props: INumberField, ref: Ref<HTMLInputElement>) => {
  const {
    value,
    onChangeText,
    thousandSeparator,
    decimalSeparator,
    keyboardType,
    returnKeyType,
    mask,
    prefix,
    delimiter = ',',
    separator,
    precision,
    useDollarMask,
    ...inputProps
  } = props;

  const keyboard = useMemo(() => {
    if (keyboardType) {
      return keyboardType;
    }

    if (decimalSeparator || useDollarMask) {
      return 'decimal-pad';
    }

    return 'number-pad';
  }, [keyboardType, decimalSeparator]);

  const returnKey = useMemo(() => {
    if (returnKeyType) {
      return returnKeyType;
    }

    return 'done';
  }, [returnKeyType]);

  const internalOnChangeText = (
    masked: string,
    unmasked: string,
    obfuscated: string
  ) => {
    onChangeText?.(unmasked, masked, obfuscated);
  };

  const maskedInputProps = useMaskedInputProps({
    value: value as string,
    onChangeText: internalOnChangeText,
    mask: useDollarMask
      ? dollarMask
      : mask
      ? mask
      : [prefix, delimiter, separator, precision].some(Boolean)
      ? createNumberMask({
          prefix,
          delimiter,
          separator,
          precision,
        })
      : undefined,
  });

  return (
    <BaseTextField
      //
      {...inputProps}
      {...maskedInputProps}
      keyboardType={keyboard}
      returnKeyType={returnKey}
      ref={ref}
    />
  );
};

export default forwardRef(BaseNumberField);
