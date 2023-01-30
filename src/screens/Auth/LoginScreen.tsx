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
  const [customError, setCustomError] = useState<{ message: string } | null>(
    null
  );

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
  const handleResetPassword = () => {
    navigation.navigate(SCREENS.RESET_PASSWORD_REQUEST);
  };

  const handleChange = useCallback(
    value => {
      setLoginForm(state => ({ ...state, ...value }));
    },
    [setLoginForm]
  );

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

    setLoginForm(state => ({
      ...state,
      ...formUpdates,
    }));
  };

  const handleSignInSuccess = async (user: any) => {
    await SecureStore.setItemAsync(USERNAME_STORAGE_KEY, loginForm.email);
    // await SecureStore.setItemAsync(PASSWORD_STORAGE_KEY, loginForm.password);

    await createSession(user);
  };

  const handleSignIn = useCallback(async () => {
    /** send/save registration data */

    await submitForm?.(loginForm);

    // if (data.token) {
    //   authenticateWithToken(data.token);
    // }
  }, [loginForm]);

  const onBackgroundImageFinishedLoading = () => {
    setBackgroundImageLoaded(true);
  };

  const {
    data,
    loading,
    errors,
    submitRequest: submitForm,
  } = useRequest(api.auth.session.login(), {
    onSuccess: handleSignInSuccess,
  });

  /**
   * EFFECTS
   */
  useEffect(() => {
    setIsValid(state => ({
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
    <>
      <StatusBar style='light' />

      <Image
        background
        resizeMode='cover'
        source={{
          uri: 'https://images.unsplash.com/photo-1483354483454-4cd359948304?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3000&q=80',
          // 'https://images.unsplash.com/photo-1513760870-d12407065ae4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1286&q=80',
        }}
        height={sizes.height}
        onLoad={onBackgroundImageFinishedLoading}
      >
        {backgroundImageLoaded && (
          <Block safe>
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
                marginHorizontal='4%'
                // shadow={!isAndroid} // disabled shadow on Android due to blur overlay + elevation issue
                radius={sizes.sm}
              >
                <Block
                  flex={0}
                  tint='light'
                  intensity={40}
                  blur
                  radius={sizes.cardRadius}
                  overflow='hidden'
                  justify='space-evenly'
                  paddingVertical={sizes.l}
                  paddingHorizontal={sizes.m}
                >
                  <Block flex={0} row center>
                    <MultiTap
                      onDoubleTap={() => setShowApiDetails(prev => !prev)}
                    >
                      <Image
                        background
                        resizeMode='contain'
                        source={mcLogo}
                        width={190}
                        height={150}
                      />
                    </MultiTap>
                  </Block>

                  {/* form inputs */}
                  <Block flex={0} marginTop={sizes.l}>
                    <TextField
                      form={false}
                      value={loginForm.email}
                      label={t('common.email')}
                      // labelStyle={{ color: colors.white }}
                      // color={colors.white}
                      // textColor={colors.white}
                      autoCapitalize='none'
                      marginBottom={sizes.m}
                      inputControlsContainerStyle={{
                        borderColor: colors.white,
                      }}
                      keyboardType='email-address'
                      placeholder={t('common.emailPlaceholder')}
                      onChangeText={value => handleChange({ email: value })}
                    />

                    <TextField
                      form={false}
                      value={loginForm.password}
                      secureTextEntry
                      label={t('common.password')}
                      autoCapitalize='none'
                      marginBottom={sizes.m}
                      placeholder={t('common.passwordPlaceholder')}
                      onChangeText={value => handleChange({ password: value })}
                    />
                  </Block>

                  <Button
                    onPress={handleSignIn}
                    marginTop={sizes.sm}
                    marginBottom={sizes.s}
                    variant='primary'
                    disabled={loading || Object.values(isValid).includes(false)}
                    loading={loading}
                  >
                    <Text bold variant='white' transform='uppercase'>
                      Continue
                    </Text>
                  </Button>

                  <Errors
                    errors={customError ? [customError] : errors}
                    marginTop={sizes.sm}
                  />

                  <Block flex={0} marginTop={sizes.sm}>
                    <Pressable onPress={handleResetPassword}>
                      <Text bold marginLeft={sizes.xs} center>
                        Forgot Password?
                      </Text>
                    </Pressable>
                  </Block>
                </Block>
              </Block>
            </Block>

            {showApiDetails && (
              <Pressable onPress={() => setShowApiDetails(false)}>
                <Block
                  flex={0}
                  variant='white'
                  marginHorizontal={sizes.padding}
                  radius={sizes.cardRadius}
                  padding={sizes.padding}
                >
                  <Text size='p' center>
                    API Endpoint:
                  </Text>
                  <Text size='p' semibold center>
                    {DEFAULT_API_CONFIG.url}
                  </Text>
                </Block>
              </Pressable>
            )}
          </Block>
        )}
      </Image>
    </>
  );
};

export default LoginScreen;
