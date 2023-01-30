import Block from '@/components/Block';
import Divider from '@/components/Divider';
import NumberField from '@/components/Inputs_NEW/Text/NumberField';
import Text from '@/components/Text';
import useTheme from '@/utils/hooks/context/useTheme';
import { useState } from 'react';

const UiTestingNumberField = () => {
  const { sizes } = useTheme();
  const [value, setValue] = useState();

  return (
    <Block flex={0} width='100%'>
      <Block flex={0}>
        <Text size='h4' align='center'>
          Generic
        </Text>

        <NumberField
          //
          form={false}
          label='Base'
          value={value}
          onChangeText={setValue}
        />

        <NumberField
          //
          form={false}
          label='With Decimal'
          value={value}
          onChangeText={setValue}
          marginTop={sizes.s}
          decimalSeparator
          // maskSeparator='.'
          // delimiter=','
        />

        <NumberField
          //
          form={false}
          label='With Dollar'
          value={value}
          onChangeText={setValue}
          useDollarMask
          prepend='$'
          marginTop={sizes.s}
        />

        <NumberField
          //
          form={false}
          label='Market Price'
          value={value}
          onChangeText={setValue}
          useDollarMask
          prepend='$'
          append='per apple'
          marginTop={sizes.s}
        />
      </Block>

      <Divider />

      <Block flex={0}>
        <Text size='h4' align='center'>
          Decorators
        </Text>

        {[
          ['$', null],
          [null, 'USD'],
          ['$', 'USD'],
        ].map(([prepend, append], index: number) => {
          return (
            <Block
              key={`block-${prepend}-${append}`}
              marginTop={!!index ? sizes.s : 0}
            >
              <NumberField
                //
                form={false}
                label={
                  prepend && append ? 'Both' : prepend ? 'Prepend' : 'Append'
                }
                prepend={prepend}
                append={append}
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
          ['Disabled', { disabled: true }],
          ['Error', { error: 'Error Message' }],
        ].map(([label, props], index: number) => {
          return (
            <Block
              key={`block-state-${index}`}
              marginTop={!!index ? sizes.s : 0}
            >
              <NumberField
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

export default UiTestingNumberField;
