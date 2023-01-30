import useTheme from '@/utils/hooks/context/useTheme';
import Block from './Block';

const Divider = props => {
  const { sizes, colors } = useTheme();

  return (
    <Block
      //
      flex={0}
      height={1}
      // variant='neutral'
      color={String(colors.black) + '40'}
      marginVertical={sizes.m}
      {...props}
    />
  );
};

export default Divider;
