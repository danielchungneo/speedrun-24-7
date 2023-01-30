import React, { useCallback, useEffect, useState, useContext } from 'react';
import { Linking, Platform, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/core';

import * as Updates from 'expo-updates';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import useTheme from '@/utils/hooks/context/useTheme';
import Image from '@/components/Image';
import Block from '@/components/Block';
import Text from '@/components/Text';
import Button from '@/components/Buttons/Button';
import WallBackground from '@/assets/images/wall-background.jpeg';
import LogoImage from '@/assets/images/logo.png';

interface ILogin {
  email: string;
  password: string;
}
interface ILoginValidation {
  email: boolean;
  password: boolean;
}

const LoginScreen = () => {
  const navigation = useNavigation();

  const [loginFailure, setLoginFailure] = useState(false);
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [isRememberMe, setIsRememberMe] = useState(false);
  const [loginDone, setLoginDone] = useState(false);

  const [isValid, setIsValid] = useState<ILoginValidation>({
    email: false,
    password: false,
  });
  const [loginForm, setLoginForm] = useState<ILogin>({
    // email: 'jeff.kavlick@morelandconnect.com',
    // password: 'M0r3l4nd!',
    email: 'sd@gmail.com',
    password: 'Wren2022!',
    // email: 'demo@mc.com',
    // password: 'Warren123!',
    // email: 'daniel.chung@morelandconnect.com',
    // password: 'Carmella1!',
    // email: '',
    // password: '',
    // email: 'trevor@warrenroofing.com',
    // password: 'Wren2022!',
  });

  const { assets, colors, gradients, sizes } = useTheme();

  // const { handleLoginSuccess } = useContext(AuthContext);

  // const onLoginSuccess = async (data: any) => {
  //   setIsLoginLoading(true);
  //   await handleLoginSuccess(data);
  //   setIsLoginLoading(false);
  //   setLoginDone(true);
  // };

  // const onLoginFailure = (response: any) => {
  //   setLoginFailure(true);
  // };

  // const handleChange = useCallback(
  //   (value) => {
  //     setLoginForm((state) => ({ ...state, ...value }));
  //   },
  //   [setLoginForm]
  // );

  // const handleSignIn = useCallback(() => {
  //   /** send/save registration data */
  //   setLoginFailure(false);
  //   submitForm(loginForm);
  // }, [loginForm]);

  // const {
  //   data,
  //   loading,
  //   errors,
  //   submitRequest: submitForm,
  // } = useCrudRequest(api.session.login(), {
  //   onSuccess: onLoginSuccess,
  //   onError: onLoginFailure,
  // });

  // useEffect(() => {
  //   setIsValid((state) => ({
  //     ...state,
  //     email: regex.email.test(loginForm.email),
  //     password: regex.password.test(loginForm.password),
  //   }));
  // }, [loginForm, setIsValid]);

  // const isLoading = [loading, isLoginLoading].some((x) => x);

  // const checkForUpdates = async () => {
  //   const isUpdateDownloaded = await Updates.checkForUpdateAsync();
  //   setShowUpdateModal(isUpdateDownloaded.isAvailable);
  // };

  // const getCredentials = async () => {
  //   const jsonCredentials = await AsyncStorage.getItem('loginCredentials');
  //   const credentials = await JSON.parse(jsonCredentials);
  //   if (credentials) {
  //     const { email, password } = credentials;
  //     setLoginForm({ email, password });
  //     setIsRememberMe(true);
  //   }
  // };

  // async function storeLoginCredentials(credentials = null) {
  //   try {
  //     if (credentials) {
  //       const jsonCredentials = JSON.stringify(credentials);
  //       await AsyncStorage.setItem('loginCredentials', jsonCredentials);
  //     } else {
  //       await AsyncStorage.removeItem('loginCredentials');
  //     }
  //   } catch (error: any) {
  //     console.log('error');
  //     console.log({ error });
  //   }
  // }

  // useEffect(() => {
  //   checkForUpdates();
  //   getCredentials();
  // }, []);

  // useEffect(() => {
  //   if (loginDone) {
  //     isRememberMe ? storeLoginCredentials(loginForm) : storeLoginCredentials();
  //   }
  // }, [loginDone]);

  const handleLoginTemp = () => {
    navigation.navigate('CT');
  };

  return (
    <>
      {/* <UpdateModal
        showModal={showUpdateModal}
        onCloseModal={() => setShowUpdateModal(false)}
      /> */}
      <Image
        background
        resizeMode="cover"
        source={WallBackground}
        height={sizes.height}
      >
        <Block safe>
          <Block
            keyboard
            contentContainerStyle={[
              {
                flex: 1,
                justifyContent: 'center',
              },
            ]}
            paddingHorizontal={sizes.s}
          >
            {/* login form */}
            <Block flex={0} radius={sizes.sm} marginHorizontal="4%">
              <Block
                flex={0}
                white
                radius={sizes.cardRadius}
                overflow="hidden"
                justify="space-evenly"
                paddingVertical={sizes.l}
                paddingHorizontal={sizes.m}
              >
                <Block flex={0}>
                  <Text center h4 bold>
                    Climb On Innovations
                  </Text>
                </Block>
                <Block flex={0} row center>
                  <Image
                    background
                    resizeMode="cover"
                    source={LogoImage}
                    width={500}
                    height={300}
                  />
                </Block>

                {/* form inputs */}
                <Block flex={0}>
                  {/* <TextField
                    value={loginForm.email}
                    label={t('common.email')}
                    autoCapitalize="none"
                    marginBottom={sizes.m}
                    keyboardType="email-address"
                    placeholder={t('common.emailPlaceholder')}
                    success={Boolean(loginForm.email && isValid.email)}
                    danger={Boolean(loginForm.email && !isValid.email)}
                    onChangeText={(value) => handleChange({ email: value })}
                    marginVertical={sizes.sm}
                  />
                  <TextField
                    value={loginForm.password}
                    togglePasswordMask={true}
                    label={t('common.password')}
                    autoCapitalize="none"
                    marginBottom={sizes.m}
                    placeholder={t('common.passwordPlaceholder')}
                    onChangeText={(value) => handleChange({ password: value })}
                    success={Boolean(loginForm.password && isValid.password)}
                    danger={Boolean(loginForm.password && !isValid.password)}
                    marginVertical={sizes.sm}
                  /> */}

                  {loginFailure && (
                    <Block flex={0} marginTop={sizes.sm}>
                      <Text center color={colors.danger}>
                        Login Failed: Incorrect Credentials
                      </Text>
                    </Block>
                  )}
                </Block>
                {/* <Block
                  row
                  justify="center"
                  align="center"
                  marginTop={sizes.m}
                  flex={0}
                >
                  <Block marginRight={sizes.s} flex={0}>
                    <Checkbox
                      checked={isRememberMe}
                      onPress={() => setIsRememberMe(!isRememberMe)}
                    />
                  </Block>
                  <Block flex={0}>
                    <Text p>Remember Me</Text>
                  </Block>
                </Block> */}
                <Button
                  onPress={handleLoginTemp}
                  marginTop={sizes.m}
                  marginBottom={sizes.s}
                  primary
                  // disabled={loading || Object.values(isValid).includes(false)}
                  // loading={loading}
                >
                  <Text bold white transform="uppercase">
                    Continue
                  </Text>
                </Button>
              </Block>
            </Block>
          </Block>
        </Block>
      </Image>
    </>
  );
};

export default LoginScreen;
