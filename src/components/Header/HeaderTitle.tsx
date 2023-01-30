import useTheme from '@/utils/hooks/context/useTheme';
import { StackHeaderTitleProps } from '@react-navigation/stack';
import { ColorValue } from 'react-native';
import Block from '../Block';
import Text from '../Text';

interface IHeaderTitleProps extends StackHeaderTitleProps {
  title?: string;
  color?: ColorValue;
  onLayout?: StackHeaderTitleProps['onLayout'];
}

const HeaderTitle = ({ title, color }: IHeaderTitleProps) => {
  const { styles, colors, sizes } = useTheme();

  return (
    <Block flex={0}>
      <Text h5 color={color || colors.black}>
        {title}
      </Text>
    </Block>
  );
};

export default HeaderTitle;
