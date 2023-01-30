import Block from '@/components/Block';
import { StatusBar } from 'expo-status-bar';
import useTheme from '@/utils/hooks/context/useTheme';
import Text from '@/components/Text';

type HomeScreenProps = {
  //
};

const HomeScreen = (props: HomeScreenProps) => {
  const { styles, sizes } = useTheme();

  return (
    <>
      <StatusBar />

      <Block safe edges={['top', 'left', 'right']}>
        <Block
          keyboard
          // paddingHorizontal={sizes.s}
        >
          <Text>Hi</Text>
        </Block>
      </Block>
    </>
  );
};

export default HomeScreen;
