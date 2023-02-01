import React, { useCallback, useEffect, useState } from 'react';
import { Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import useTheme from '@/utils/hooks/context/useTheme';
import useTranslation from '@/utils/hooks/context/useTranslation';
import Block from '@/components/Block';
import Text from '@/components/Text';
import Image from '@/components/Image';
import Button from '@/components/Buttons/Button';
import { DEFAULT_API_CONFIG } from '@/constants/api';
import api from '@/utils/api';
import useRequest from '@/utils/hooks/useRequest';
import useSession from '@/utils/hooks/context/useSession';
import SCREENS from '@/constants/screens';
import * as SecureStore from 'expo-secure-store';
import {
  PASSWORD_STORAGE_KEY,
  USERNAME_STORAGE_KEY,
} from '@/constants/storage';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Errors from '@/components/Errors';
import MultiTap from '@/components/MultiTap';
import mcLogo from '@/assets/images/logo.png';
import { REGEX_PATTERNS } from '@/constants/regex';
import TextField from '@/components/Inputs_NEW/Text/TextField';

import lightBackground from '@/assets/images/white-background.jpg';
import darkBackground from '@/assets/images/dark-background.jpg';
import { COLORS } from '@/constants/colors';
import clockLogo from '@/assets/images/timer-logo.png';
import { roundToNearestMinutes } from 'date-fns/esm';

interface ILogin {
  email: string;
  password: string;
}
interface ILoginValidation {
  email: boolean;
  password: boolean;
}

const LoginScreen = () => {
  /**
   * STATE
   */
  const [backgroundImageLoaded, setBackgroundImageLoaded] =
    useState<boolean>(false);
  const [showApiDetails, setShowApiDetails] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<ILoginValidation>({
    email: false,
    password: true,
  });
  const [loginForm, setLoginForm] = useState<ILogin>({
    email: '',
    password: '',
  });

  /**
   * HOOKS
   */
  const {
    state: { currentRoute },
    actions: { createSession },
  } = useSession();
  const { t } = useTranslation();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const { assets, colors, gradients, sizes, styles } = useTheme();

  /**
   * FUNCTIONS
   */

  const checkForStoredUsername = async () => {
    let formUpdates = {
      email: 'jason.barnett@morelandconnect.com',
      password: 'M0r3l4nd!',
    };

    const storedUsername = await SecureStore.getItemAsync(USERNAME_STORAGE_KEY);
    const storedPassword = await SecureStore.getItemAsync(PASSWORD_STORAGE_KEY);

    console.log({
      storedUsername,
      storedPassword,
    });

    if (!!storedUsername) {
      formUpdates.email = storedUsername;
    }

    if (!!storedPassword) {
      formUpdates.password = storedPassword;
    }

    setLoginForm((state) => ({
      ...state,
      ...formUpdates,
    }));
  };

  console.log({ navigation });

  const handleContinue = () => {
    navigation.navigate(SCREENS.RUN_DASHBOARD);
  };

  const onBackgroundImageFinishedLoading = () => {
    setBackgroundImageLoaded(true);
  };

  /**
   * EFFECTS
   */
  useEffect(() => {
    setIsValid((state) => ({
      ...state,
      email: REGEX_PATTERNS.email.test(loginForm.email),
      password: !!loginForm.password,
    }));
  }, [loginForm, setIsValid]);

  useEffect(() => {
    if (currentRoute?.name === SCREENS.LOGIN) {
      checkForStoredUsername();
    }
  }, [currentRoute]);

  return (
    <Block safe color={COLORS.DARK_BLUE}>
      <Block
        keyboard
        bounces={false}
        paddingHorizontal={sizes.s}
        contentContainerStyle={[
          {
            flex: 1,
            justifyContent: 'center',
          },
        ]}
      >
        {/* login form */}
        <Block
          flex={0}
          // shadow={!isAndroid} // disabled shadow on Android due to blur overlay + elevation issue
          radius={sizes.sm}
          justify="center"
          align="center"
        >
          <Block
            flex={0}
            row
            center
            color="#C060A1"
            radius={10}
            width={100}
            marginBottom={50}
          >
            <MultiTap onDoubleTap={() => setShowApiDetails((prev) => !prev)}>
              <Image
                background
                resizeMode="contain"
                source={clockLogo}
                width={190}
                height={150}
              />
            </MultiTap>
          </Block>
          <Block flex={0} marginBottom={25}>
            <Text color="white" font="AudioWide-Regular" size={35}>
              Speedrun 24-7
            </Text>
            <Text center color="white" font="AudioWide-Regular" size={12}>
              Making the Mundane Competitive
            </Text>
          </Block>

          {/* form inputs */}
        </Block>
        <Block flex={0} padding={sizes.sm}>
          <Button
            onPress={() => handleContinue()}
            marginTop={sizes.sm}
            marginBottom={sizes.s}
            // variant="success"
            color="#34c85b"
          >
            <Text size={20} bold variant="white" transform="uppercase">
              Start Speeding
            </Text>
          </Button>
        </Block>
      </Block>

      {showApiDetails && (
        <Pressable onPress={() => setShowApiDetails(false)}>
          <Block
            flex={0}
            marginHorizontal={sizes.padding}
            radius={sizes.cardRadius}
            padding={sizes.padding}
          >
            <Text size="p" center>
              API Endpoint:
            </Text>
            <Text size="p" semibold center>
              {DEFAULT_API_CONFIG.url}
            </Text>
          </Block>
        </Pressable>
      )}
    </Block>
  );
};

export default LoginScreen;
