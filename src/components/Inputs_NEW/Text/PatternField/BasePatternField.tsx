import React, { forwardRef, Ref, useMemo } from 'react';
import { INumberField } from 'types/components/inputComponents';
import BaseTextField from '../TextField/BaseTextField';
import { createNumberMask, useMaskedInputProps } from 'react-native-mask-input';

const BaseNumberField = (props: INumberField, ref: Ref<HTMLInputElement>) => {
  const {
    value,
    onChangeText,
    // keyboardType,
    // returnKeyType,
    mask,
    maskPrefix,
    maskDelimiter,
    maskSeparator,
    maskPrecision,
    ...inputProps
  } = props;

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
    mask: mask
      ? mask
      : [maskPrefix, maskDelimiter, maskSeparator, maskPrecision].some(Boolean)
      ? createNumberMask({
          prefix: maskPrefix,
          delimiter: maskDelimiter,
          separator: maskSeparator,
          precision: maskPrecision,
        })
      : undefined,
  });

  return (
    <BaseTextField
      //
      {...inputProps}
      {...maskedInputProps}
      ref={ref}
    />
  );
};

export default forwardRef(BaseNumberField);
