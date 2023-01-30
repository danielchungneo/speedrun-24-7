import useTheme from '@/utils/hooks/context/useTheme';
import Block from '../Block';

interface IHeaderLeftWrapperProps {
  children: React.ReactNode;
  style?: any;
}

const HeaderLeftWrapper = ({ children, style }: IHeaderLeftWrapperProps) => {
  const { styles, sizes } = useTheme();

  return (
    <Block flex={0} row align="center" style={style}>
      {children}
    </Block>
  );
};

export default HeaderLeftWrapper;
