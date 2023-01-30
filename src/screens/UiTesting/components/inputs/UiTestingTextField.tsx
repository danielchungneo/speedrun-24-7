import Block from '@/components/Block';
import Divider from '@/components/Divider';
import TextField from '@/components/Inputs_NEW/Text/TextField';
import Text from '@/components/Text';
import useTheme from '@/utils/hooks/context/useTheme';
import { ITextField } from 'types/components/inputComponents';

const UiTestingTextField = () => {
  const { sizes } = useTheme();

  return (
    <Block flex={0} width='100%'>
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
            <Block key={`block-${variant}`} marginTop={!!index ? sizes.s : 0}>
              <TextField
                form={false}
                label={variant}
                variant={variant as ITextField['variant']}
              />
            </Block>
          );
        })}
      </Block>

      <Divider />

      <Block flex={0}>
        <Text size='h4' align='center'>
          Decorators
        </Text>

        {[
          ['http://', null],
          [null, '.com'],
          ['http://', '.com'],
          ['http://', ['.com', '.org']],
        ].map(([prepend, append], index: number) => {
          return (
            <Block
              key={`block-${prepend}-${append}`}
              marginTop={!!index ? sizes.s : 0}
            >
              <TextField
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
              <TextField form={false} label={label} {...props} />
            </Block>
          );
        })}
      </Block>
    </Block>
  );
};

export default UiTestingTextField;
