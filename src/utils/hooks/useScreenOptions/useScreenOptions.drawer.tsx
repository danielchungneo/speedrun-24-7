import React from 'react';
import { Pressable, StyleSheet, TouchableOpacity } from 'react-native';
import {
  StackHeaderTitleProps,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/core';
import { DrawerActions } from '@react-navigation/native';
import {
  StackHeaderOptions,
  StackNavigationOptions,
} from '@react-navigation/stack/lib/typescript/src/types';
import useTranslation from '@/utils/hooks/context/useTranslation';
import Image from '@/components/Image';
import Text from '@/components/Text';
import useTheme from '@/utils/hooks/context/useTheme';
import Block from '@/components/Block';
import SCREENS from '@/constants/screens';
import { BlurView } from 'expo-blur';
import DrawerToggleButton from '@/components/Buttons/DrawerToggleButton';
import GoBackButton from '@/components/Buttons/GoBackButton';
import ProfileButton from '@/components/Buttons/ProfileButton';
import CreateButton from '@/components/Buttons/CreateButton';
import HeaderRightWrapper from '@/components/Header/HeaderRightWrapper';
import HeaderLeftWrapper from '@/components/Header/HeaderLeftWrapper';
import HeaderTitle from '@/components/Header/HeaderTitle';

export default () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { icons, colors, gradients, sizes, styles } = useTheme();

  const defaultHeaderBackground = {
    // headerTransparent: true,
    // headerBackground: () => (
    //   <BlurView tint="light" intensity={90} style={StyleSheet.absoluteFill} />
    // ),
  };

  const defaultDrawerToggle = {
    ...defaultHeaderBackground,
    headerStyle: { elevation: 0 },
    headerTitleAlign: 'center',
    headerTitleContainerStyle: {},
    headerLeftContainerStyle: { paddingLeft: sizes.padding },
    headerRightContainerStyle: { paddingRight: sizes.padding },
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    headerTitle: ({ children }: StackHeaderTitleProps) => (
      <HeaderTitle title={children}></HeaderTitle>
    ),
    headerLeft: () => <DrawerToggleButton />,
    headerRight: undefined,
    gestureEnabled: false,
  } as StackHeaderOptions;

  const defaultBackOption = {
    ...defaultDrawerToggle,
    title: '',
    headerRight: () => null,
    headerLeft: () => <GoBackButton />,
  } as StackNavigationOptions;

  /**
   *
   *
   *
   *
   *
   * COMMON
   */
  const commonOptions = {
    defaultDrawerToggle,
    defaultBackOption,
  };

  /**
   *
   *
   *
   *
   *
   * AUTH
   */
  const authOptions = {
    //
  };

  /**
   *
   *
   *
   *
   *
   * MAIN
   */
  const mainOptions = {
    loginScreen: {
      headerShown: false,
    } as StackNavigationOptions,
    runDashboardScreen: {
      headerShown: false,
    } as StackNavigationOptions,
    resetPasswordScreen: {
      headerShown: false,
    } as StackNavigationOptions,
    resetPasswordRequestScreen: {
      headerShown: false,
    } as StackNavigationOptions,
    registerScreen: {
      headerShown: false,
    } as StackNavigationOptions,

    settingsScreen: {
      ...defaultDrawerToggle,
      title: '',
      headerRight: () => <ProfileButton />,
    } as StackNavigationOptions,
    settingsAgreementScreen: {
      ...defaultBackOption,
      title: t('navigation.agreement'),
    } as StackNavigationOptions,
    settingsAboutScreen: {
      ...defaultBackOption,
      title: t('navigation.about'),
    } as StackNavigationOptions,
    settingsPrivacyScreen: {
      ...defaultBackOption,
      title: t('navigation.privacy'),
    } as StackNavigationOptions,
    settingsProfileScreen: {
      headerShown: false,
    } as StackNavigationOptions,

    landingScreen: {
      headerShown: false,
    } as StackNavigationOptions,

    // TODO: REMOVE_START (template code)
    entityTemplateListScreen: {
      headerStyle: {
        backgroundColor: colors.primary,
      },
      headerLeft: () => <DrawerToggleButton color={colors.white} />,
      headerTitle: () => <HeaderTitle title='Entity' color={colors.white} />,
      headerRight: () => <CreateButton route={SCREENS.ENTITY_TEMPLATE_EDIT} />,
    } as StackNavigationOptions,

    entityTemplateEditScreen: {
      headerStyle: {
        backgroundColor: colors.primary,
      },
      headerLeft: () => <GoBackButton color={colors.white} />,
      headerTitle: () => (
        <HeaderTitle title='Edit Entity' color={colors.white} />
      ),
    } as StackNavigationOptions,
    // TODO: REMOVE_END
  };

  /**
   *
   *
   *
   *
   *
   * MC-APP DEMO
   * TODO: REMOVE_START
   */
  const mcAppDemoOptions = {
    mcDashboardScreen: {
      ...defaultDrawerToggle,
      title: '',
      headerLeft: () => <DrawerToggleButton color={colors.white} />,
      headerRight: () => (
        <HeaderRightWrapper>
          <ProfileButton textColor={colors.white} iconColor={colors.white} />
        </HeaderRightWrapper>
      ),
      headerStyle: {
        backgroundColor: colors.primary,
      },
    } as StackNavigationOptions,

    mcCustomerListScreen: {
      headerStyle: {
        backgroundColor: colors.primary,
      },
      headerLeft: () => <DrawerToggleButton color={colors.white} />,
      headerTitle: () => <HeaderTitle title='Customers' color={colors.white} />,
      headerRight: () => <CreateButton route={SCREENS.MC_CUSTOMER_EDIT} />,
    } as StackNavigationOptions,

    mcCustomerEditScreen: {
      headerStyle: {
        backgroundColor: colors.primary,
      },
      headerLeft: () => <GoBackButton color={colors.white} />,
      headerTitle: () => (
        <HeaderTitle title='Edit Customer' color={colors.white} />
      ),
    } as StackNavigationOptions,
  };
  // TODO: REMOVE_END

  return {
    ...commonOptions,
    ...authOptions,
    ...mainOptions,
    ...mcAppDemoOptions, // TODO: REMOVE_ME
  };
};
