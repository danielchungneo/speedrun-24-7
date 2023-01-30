import React, { useCallback, useEffect, useState } from 'react';
import { Linking, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import useTheme from '@/utils/hooks/context/useTheme';
import useTranslation from '@/utils/hooks/context/useTranslation';
import Block from '@/components/Block';
import Text from '@/components/Text';
import Image from '@/components/Image';
import Button from '@/components/Buttons/Button';
import SCREENS from '@/constants/screens';
import { StatusBar } from 'expo-status-bar';
import { isAndroid } from '@/constants/platform';
import { REGEX_PATTERNS } from '@/constants/regex';
import useSession from '@/utils/hooks/context/useSession';
import TextField from '@/components/Inputs_NEW/Text/TextField';
import Checkbox from '@/components/Inputs_NEW/Select/Checkbox';

interface IRegistration {
  name: string;
  email: string;
  password: string;
  agreed: boolean;
}
interface IRegistrationValidation {
  name: boolean;
  email: boolean;
  password: boolean;
  agreed: boolean;
}

const RegistrationScreen = () => {
  const {
    state: { isDark },
  } = useSession();
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [isValid, setIsValid] = useState<IRegistrationValidation>({
    name: false,
    email: false,
    password: false,
    agreed: false,
  });
  const [registration, setRegistration] = useState<IRegistration>({
    name: '',
    email: '',
    password: '',
    agreed: false,
  });
  const { assets, colors, gradients, sizes } = useTheme();

  const handleChange = useCallback(
    value => {
      setRegistration(state => ({ ...state, ...value }));
    },
    [setRegistration]
  );

  const handleSignUp = useCallback(() => {
    if (!Object.values(isValid).includes(false)) {
      /** send/save registratin data */
      console.log('handleSignUp', registration);
    }
  }, [isValid, registration]);

  useEffect(() => {
    setIsValid(state => ({
      ...state,
      name: REGEX_PATTERNS.name.test(registration.name),
      email: REGEX_PATTERNS.email.test(registration.email),
      password: REGEX_PATTERNS.password.test(registration.password),
      agreed: registration.agreed,
    }));
  }, [registration, setIsValid]);

  return (
    <>
      <StatusBar />

      <Block safe edges={['top', 'left', 'right']}>
        <Block keyboard paddingHorizontal={sizes.s}>
          <Block flex={0} style={{ zIndex: 0 }}>
            <Image
              background
              resizeMode='cover'
              padding={sizes.sm}
              radius={sizes.cardRadius}
              source={assets.background}
              height={sizes.height * 0.3}
            >
              <Button
                row
                flex={0}
                justify='flex-start'
                onPress={() => navigation.goBack()}
              >
                <Image
                  radius={0}
                  width={10}
                  height={18}
                  color={colors.white}
                  source={assets.arrow}
                  transform={[{ rotate: '180deg' }]}
                />
                <Text size='p' variant='white' marginLeft={sizes.s}>
                  {t('common.goBack')}
                </Text>
              </Button>

              <Text size='h4' center variant='white' marginBottom={sizes.md}>
                {t('register.title')}
              </Text>
            </Image>
          </Block>

          {/* register form */}
          <Block marginTop={-(sizes.height * 0.2 - sizes.l)}>
            <Block
              flex={0}
              radius={sizes.sm}
              marginHorizontal='4%'
              shadow={!isAndroid} // disabled shadow on Android due to blur overlay + elevation issue
            >
              <Block
                blur
                flex={0}
                intensity={90}
                radius={sizes.sm}
                overflow='hidden'
                justify='space-evenly'
                tint={colors.blurTint}
                paddingVertical={sizes.sm}
              >
                <Text size='p' semibold center>
                  {t('register.subtitle')}
                </Text>
                {/* social buttons */}
                <Block
                  row
                  center
                  justify='space-evenly'
                  marginVertical={sizes.m}
                >
                  <Button outlined variant='neutral' shadow={!isAndroid}>
                    <Image
                      source={assets.facebook}
                      height={sizes.m}
                      width={sizes.m}
                      color={isDark ? colors.icon : undefined}
                    />
                  </Button>
                  <Button outlined variant='neutral' shadow={!isAndroid}>
                    <Image
                      source={assets.apple}
                      height={sizes.m}
                      width={sizes.m}
                      color={isDark ? colors.icon : undefined}
                    />
                  </Button>
                  <Button outlined variant='neutral' shadow={!isAndroid}>
                    <Image
                      source={assets.google}
                      height={sizes.m}
                      width={sizes.m}
                      color={isDark ? colors.icon : undefined}
                    />
                  </Button>
                </Block>
                <Block
                  row
                  flex={0}
                  align='center'
                  justify='center'
                  marginBottom={sizes.sm}
                  paddingHorizontal={sizes.xxl}
                >
                  <Block
                    flex={0}
                    height={1}
                    width='50%'
                    start={[0, 1]}
                    end={[1, 0]}
                    gradient={gradients.divider}
                  />
                  <Text center marginHorizontal={sizes.s}>
                    {t('common.or')}
                  </Text>
                  <Block
                    flex={0}
                    height={1}
                    width='50%'
                    start={[1, 0]}
                    end={[0, 1]}
                    gradient={gradients.divider}
                  />
                </Block>
                {/* form inputs */}
                <Block paddingHorizontal={sizes.sm}>
                  <TextField
                    form={false}
                    autoCapitalize='none'
                    marginBottom={sizes.m}
                    label={t('common.name')}
                    placeholder={t('common.namePlaceholder')}
                    variant={
                      Boolean(registration.name && isValid.name)
                        ? 'success'
                        : Boolean(registration.name && !isValid.name)
                        ? 'danger'
                        : undefined
                    }
                    onChangeText={value => handleChange({ name: value })}
                  />
                  <TextField
                    form={false}
                    autoCapitalize='none'
                    marginBottom={sizes.m}
                    label={t('common.email')}
                    keyboardType='email-address'
                    placeholder={t('common.emailPlaceholder')}
                    variant={
                      Boolean(registration.email && isValid.email)
                        ? 'success'
                        : Boolean(registration.email && !isValid.email)
                        ? 'danger'
                        : undefined
                    }
                    onChangeText={value => handleChange({ email: value })}
                  />
                  <TextField
                    form={false}
                    secureTextEntry
                    autoCapitalize='none'
                    marginBottom={sizes.m}
                    label={t('common.password')}
                    placeholder={t('common.passwordPlaceholder')}
                    onChangeText={value => handleChange({ password: value })}
                    variant={
                      Boolean(registration.password && isValid.password)
                        ? 'success'
                        : Boolean(registration.password && !isValid.password)
                        ? 'danger'
                        : undefined
                    }
                  />
                </Block>
                {/* checkbox terms */}
                <Block row flex={0} align='center' paddingHorizontal={sizes.sm}>
                  <Checkbox
                    form={false}
                    marginRight={sizes.sm}
                    value={registration?.agreed}
                    onChange={evt => {
                      handleChange({ agreed: evt.target.checked });
                    }}
                    label={
                      <Text paddingRight={sizes.s}>
                        {t('common.agree')}
                        <Text
                          semibold
                          onPress={() => {
                            Linking.openURL('https://morelandconnect.com');
                          }}
                        >
                          {t('common.terms')}
                        </Text>
                      </Text>
                    }
                  />
                </Block>

                <Button
                  onPress={handleSignUp}
                  marginVertical={sizes.s}
                  marginHorizontal={sizes.sm}
                  gradient={gradients.primary}
                  disabled={Object.values(isValid).includes(false)}
                >
                  <Text bold variant='white' transform='uppercase'>
                    {t('common.signup')}
                  </Text>
                </Button>

                {/* button to refirect to login instead of a link */}
                {/* <Button
                primary
                outlined
                shadow={!isAndroid}
                marginVertical={sizes.s}
                marginHorizontal={sizes.sm}
                onPress={() => navigation.navigate('Login')}
              >
                <Text bold primary transform="uppercase">
                  {t('common.or')} {t('common.signin')}
                </Text>
              </Button> */}

                <Block row justify='center' align='center'>
                  <Text center size={12} paddingRight={sizes.s}>
                    Already have an account?{' '}
                  </Text>
                  <Pressable onPress={() => navigation.navigate(SCREENS.LOGIN)}>
                    <Text
                      bold
                      size={13}
                      marginLeft={sizes.xs}
                      transform='uppercase'
                      variant='primary'
                      style={{
                        textDecorationLine: 'underline',
                      }}
                    >
                      Login here!
                    </Text>
                  </Pressable>
                </Block>
              </Block>
            </Block>
          </Block>
        </Block>
      </Block>
    </>
  );
};

export default RegistrationScreen;
