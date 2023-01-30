import Block from '@/components/Block';
import Text from '@/components/Text';
import useTheme from '@/utils/hooks/context/useTheme';
import { Ionicons } from '@expo/vector-icons';

const InputError = ({
  children,
  style,
}: {
  children?: React.ReactNode;
  style?: any;
}) => {
  const { colors, sizes } = useTheme();

  if (!children || !children?.length) return null;

  return (
    <Block
      flex={0}
      row
      justify='flex-start'
      align='center'
      marginTop={sizes.xs}
      style={style}
    >
      <Ionicons name='ios-close' size={22} color={colors.danger} />

      <Text
        color={colors.danger}
        size={sizes.sm}
        marginLeft={sizes.s}
        // lineHeight={16}
        align='center'
        // semibold
      >
        {children}
      </Text>
    </Block>
  );
};

export default InputError;
