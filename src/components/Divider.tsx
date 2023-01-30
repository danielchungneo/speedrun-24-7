import useTheme from '@/utils/hooks/context/useTheme';
import Block from './Block';

const Divider = (props) => {
  const { sizes } = useTheme();

  return (
    <Block
      //
      flex={0}
      height={2}
      secondary
      marginVertical={sizes.m}
      {...props}
    />
  );
};

export default Divider;
