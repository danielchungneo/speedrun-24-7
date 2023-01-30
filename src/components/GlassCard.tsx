import useTheme from '@/utils/hooks/context/useTheme';
import Block from './Block';

const GlassCard = ({ children }) => {
  const { sizes, colors } = useTheme();

  return (
    <Block
      flex={0}
      intensity={20}
      blur
      radius={sizes.cardRadius}
      overflow="hidden"
      tint="light"
    >
      {children}
    </Block>
  );
};

export default GlassCard;
