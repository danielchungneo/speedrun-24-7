import Block from '@/components/Block';
import Text from '@/components/Text';
import useTheme from '@/utils/hooks/context/useTheme';
import { IButtonProps } from 'types';

const UiTestingBlocks = () => {
  const { sizes } = useTheme();

  return (
    <Block width='100%'>
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
            <Block
              key={`block-${variant}`}
              flex={0}
              variant={variant as IButtonProps['variant']}
              marginTop={!!index ? sizes.s : 0}
              padding={sizes.s}
              row
              justify='center'
            >
              <Text variant={textVariant} size='h5'>
                {variant}
              </Text>
            </Block>
          );
        })}
      </Block>
    </Block>
  );
};

export default UiTestingBlocks;
