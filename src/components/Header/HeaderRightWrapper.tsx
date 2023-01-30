import useTheme from '@/utils/hooks/context/useTheme';
import Block from '../Block';

interface IHeaderRightWrapperProps {
  children: React.ReactNode;
  style?: any;
}

const HeaderRightWrapper = ({ children, style }: IHeaderRightWrapperProps) => {
  const { styles, sizes } = useTheme();

  return (
    <Block flex={0} row align="center" style={style}>
      {children}
    </Block>
  );
};

export default HeaderRightWrapper;
