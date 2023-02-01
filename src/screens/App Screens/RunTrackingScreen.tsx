import Block from '@/components/Block';
import Text from '@/components/Text';
import { COLORS } from '@/constants/colors';
import useTheme from '@/utils/hooks/context/useTheme';

const RunTrackerScreen = ({ route }) => {
  const { styles, sizes } = useTheme();

  return (
    <Block safe scroll color={COLORS.DARK_BLUE}>
      <Block padding={sizes.sm}>
        <Text size={sizes.h3}>Tracking Screen</Text>
      </Block>
    </Block>
  );
};

export default RunTrackerScreen;
