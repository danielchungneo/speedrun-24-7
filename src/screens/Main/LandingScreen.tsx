import React from 'react';
import useTheme from '@/utils/hooks/context/useTheme';
import Block from '@/components/Block';
import Text from '@/components/Text';
import Button from '@/components/Buttons/Button';
import AnimatedLottieView from 'lottie-react-native';
import { Assets } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import screens from '@/constants/screens';
import {
  useSafeAreaFrame,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

const devTeamKnownLanguages = [
  'C#',
  '.NET',
  '.NET Core',
  'JavaScript',
  'TypeScript',
  'React',
  'React Native',
  'Node.js',
  'PHP',
  'Python',
  'Ruby',
];

const LandingScreen = ({ route }) => {
  const { animations, styles, colors, sizes } = useTheme();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const handleGoToDashboard = () => {
    navigation.navigate(screens.MC_DASHBOARD);
  };

  return (
    <>
      <StatusBar />

      <Block
        paddingTop={insets.top}
        paddingBottom={insets.bottom || 15}
        paddingHorizontal={sizes.padding}
      >
        <Block>
          <Block flex={0} row justify="center" align="center">
            <AnimatedLottieView
              ref={(ref) => {
                ref?.play();
              }}
              style={{
                maxWidth: '100%',
                maxHeight: 200,
                height: '100%',
              }}
              loop
              source={animations.appBuild}
            />
          </Block>

          <Block flex={0}>
            <Text h5 bold center marginTop={sizes.padding}>
              Let us build your next mobile app, web app, web site, or cloud
              infrastructure and grow your business
            </Text>
          </Block>

          <Block flex={0} marginTop={sizes.xl}>
            <Text h5>
              Our team of engineers specialize in the following
              languages/frameworks:
            </Text>
          </Block>

          <Block flex={0} row wrap="wrap">
            {devTeamKnownLanguages.map((lang, langIndex) => {
              const isFirstInRow = langIndex % 2 === 0;

              return (
                <Block
                  key={lang}
                  flex={0}
                  width="50%"
                  align="center"
                  justify={'flex-start'}
                  marginTop={sizes.s}
                  style={{
                    flexDirection: isFirstInRow ? 'row' : 'row-reverse',
                  }}
                >
                  <Block
                    flex={0}
                    secondary
                    width={10}
                    height={10}
                    radius={10}
                  />
                  <Text
                    bold
                    style={
                      isFirstInRow
                        ? {
                            marginLeft: sizes.sm,
                          }
                        : {
                            marginRight: sizes.sm,
                          }
                    }
                  >
                    {lang}
                  </Text>
                </Block>
              );
            })}
          </Block>

          <Block />

          <Button success marginTop={sizes.l} onPress={handleGoToDashboard}>
            <Text p white bold>
              Let's Go!
            </Text>
          </Button>
        </Block>
      </Block>
    </>
  );
};

export default LandingScreen;
