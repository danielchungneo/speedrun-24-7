import Block from '@/components/Block';
import Button from '@/components/Buttons/Button';
import Divider from '@/components/Divider';
import Text from '@/components/Text';
import useTheme from '@/utils/hooks/context/useTheme';
import { IButtonProps, ITextProps } from 'types';

const UiTestingText = () => {
  const { sizes } = useTheme();

  return (
    <Block flex={0} width='100%'>
      <Block flex={0}>
        {[
          ['h1', 'Headline 1'],
          ['s1', 'Subheader 1'],
          ['h2', 'Headline 2'],
          ['s2', 'Subheader 2'],
          ['h3', 'Headline 3'],
          ['s3', 'Subheader 3'],
          ['h4', 'Headline 4'],
          ['s4', 'Subheader 4'],
          ['h5', 'Headline 5'],
          ['s5', 'Subheader 5'],
          ['i1', 'Input Label 1'],
          ['i2', 'Input Label 2'],
          ['p', 'Paragraph'],
        ].map(([size, text], index: number) => {
          const addTopMargin = !!index && !(index % 2);

          return (
            <Text
              //
              key={`text-${size}`}
              size={size as ITextProps['size']}
              marginTop={addTopMargin ? sizes.sm : 0}
            >
              {text}
            </Text>
          );
        })}
      </Block>

      <Divider />

      <Block flex={0}>
        {[
          ['h4', 'default'],
          ['h4', 'alternative', 'alternative'],
          ['h4', 'primary'],
          ['h4', 'secondary'],
          ['h4', 'tertiary'],
          ['h4', 'success'],
          ['h4', 'danger'],
          ['h4', 'warning'],
          ['h4', 'info'],
          ['h4', 'white', 'alternative'],
          ['h4', 'black'],
          ['h4', 'light', 'alternative'],
          ['h4', 'dark'],
          ['h4', 'neutral'],
        ].map(([size, textVariant, blockVariant], index: number) => {
          const text = (textVariant[0].toUpperCase() +
            textVariant.slice(1)) as IButtonProps['variant'];

          return (
            <Block flex={0} key={`block-${text}`} variant={blockVariant}>
              <Text
                //
                // key={`text-${size}`}
                size={size as ITextProps['size']}
                variant={textVariant as ITextProps['variant']}
              >
                {text}
              </Text>
            </Block>
          );
        })}
      </Block>
    </Block>
  );
};

export default UiTestingText;
