import Block from '@/components/Block';
import Button from '@/components/Buttons/Button';
import Divider from '@/components/Divider';
import Text from '@/components/Text';
import useTheme from '@/utils/hooks/context/useTheme';
import { IButtonProps } from 'types';
import Feather from 'react-native-vector-icons/Feather';

const UiTestingButtons = () => {
  const { sizes } = useTheme();

  return (
    <Block flex={0} width='100%'>
      <Block flex={0}>
        {[
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
          const textVariant = [
            'white',
            'light',
            // 'neutral'
          ].includes(variant)
            ? 'black'
            : 'white';

          return (
            <Button
              key={`button-${variant}`}
              variant={variant as IButtonProps['variant']}
              marginTop={!!index ? sizes.s : 0}
            >
              <Text variant={textVariant} size='h5'>
                {variant}
              </Text>
            </Button>
          );
        })}
      </Block>

      <Divider />

      <Block flex={0}>
        {['center', 'space-between'].map((justify, index) => {
          return (
            <Button
              key={`button-${justify}`}
              variant='primary'
              row
              justify={justify as IButtonProps['justify']}
              marginTop={!!index ? sizes.sm : 0}
            >
              <Text size='p' variant='white'>
                Submit Form
              </Text>

              <Feather
                name='arrow-right'
                size={sizes.p}
                color='white'
                style={{
                  marginLeft: sizes.sm,
                }}
              />
            </Button>
          );
        })}
      </Block>
    </Block>
  );
};

export default UiTestingButtons;
