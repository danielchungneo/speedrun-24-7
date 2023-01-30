import Block from '@/components/Block';
import Divider from '@/components/Divider';
import DateTime from '@/components/Inputs_NEW/DateTime';
import TextField from '@/components/Inputs_NEW/Text/TextField';
import Text from '@/components/Text';
import useTheme from '@/utils/hooks/context/useTheme';
import { useState } from 'react';
import { ITextField } from 'types/components/inputComponents';

const UiTestingDateTime = () => {
  const [variantInputValue, setVariantInputValue] = useState(new Date());
  const [dateValue, setDateValue] = useState();
  const [dateTimeValue, setDateTimeValue] = useState();
  const [timeValue, setTimeValue] = useState();
  const { sizes } = useTheme();

  return (
    <Block flex={0} width='100%' marginTop={sizes.m}>
      <Block flex={0}>
        <Text size='h4' align='center'>
          Variants
        </Text>

        {[
          'default (neutral)',
          'primary',
          'secondary',
          'success',
          'danger',
          'warning',
          'info',
          'white',
          'black',
          'light',
          'dark',
          'neutral',
        ].map((variant, index: number) => {
          return (
            <Block key={`block-${variant}`} marginTop={sizes.m}>
              <DateTime
                form={false}
                value={variantInputValue}
                label={variant}
                variant={variant as ITextField['variant']}
                onChange={e => {
                  setVariantInputValue(e.target.value);
                }}
              />
            </Block>
          );
        })}
      </Block>

      <Divider />

      <Block flex={0}>
        <Text size='h4' align='center'>
          Input Modes
        </Text>

        {['date', 'datetime', 'time'].map((inputMode, index: number) => {
          return (
            <Block key={`block-${inputMode}`} marginTop={sizes.m}>
              <DateTime
                //
                form={false}
                label={`Input Mode: ${inputMode}`}
                mode={inputMode as never}
                value={
                  (inputMode === 'date'
                    ? dateValue
                    : inputMode === 'datetime'
                    ? dateTimeValue
                    : inputMode === 'time'
                    ? timeValue
                    : undefined) as never
                }
                onChange={e => {
                  const value = e.target.value;

                  if (inputMode === 'date') {
                    setDateValue(value);
                  } else if (inputMode === 'datetime') {
                    setDateTimeValue(value);
                  } else if (inputMode === 'time') {
                    setTimeValue(value);
                  }
                }}
              />
            </Block>
          );
        })}
      </Block>

      <Divider />

      <Block flex={0}>
        <Text size='h4' align='center'>
          States
        </Text>

        {[
          //
          ['Disabled', { disabled: true }],
          ['Error', { error: 'Error Message' }],
        ].map(([label, props], index: number) => {
          return (
            <Block key={`block-state-${index}`} marginTop={sizes.m}>
              <DateTime
                //
                form={false}
                label={label}
                {...props}
              />
            </Block>
          );
        })}
      </Block>
    </Block>
  );
};

export default UiTestingDateTime;
