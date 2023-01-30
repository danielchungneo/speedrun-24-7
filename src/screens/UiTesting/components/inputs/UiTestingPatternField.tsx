import Block from '@/components/Block';
import Divider from '@/components/Divider';
import PatternField from '@/components/Inputs_NEW/Text/PatternField';
import Text from '@/components/Text';
import useTheme from '@/utils/hooks/context/useTheme';
import { useState } from 'react';
import { Masks } from 'react-native-mask-input';

const UiTestingPatternField = () => {
  const { sizes } = useTheme();
  const [value, setValue] = useState();

  return (
    <Block flex={0} width='100%'>
      <Block flex={0}>
        <Text size='h4' align='center'>
          Generic
        </Text>

        <PatternField
          //
          form={false}
          label='Base'
          value={value}
          onChangeText={setValue}
        />

        <PatternField
          //
          form={false}
          label='Telephone'
          value={value}
          onChangeText={setValue}
          mask={Masks.USA_PHONE}
          prepend='+1'
          keyboardType='phone-pad'
          // returnKeyType='done'
          marginTop={sizes.s}
        />
      </Block>

      <Divider />

      <Block flex={0}>
        <Text size='h4' align='center'>
          Decorators
        </Text>

        {[
          ['+1', null],
          [null, 'USD'],
        ].map(([prepend, append], index: number) => {
          return (
            <Block
              key={`block-${prepend}-${append}`}
              marginTop={!!index ? sizes.s : 0}
            >
              <PatternField
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
              <PatternField
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

export default UiTestingPatternField;
