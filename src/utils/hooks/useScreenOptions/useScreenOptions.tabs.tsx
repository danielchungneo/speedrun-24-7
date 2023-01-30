import React from 'react';
import { CardStyleInterpolators } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/core';
import { StackNavigationOptions } from '@react-navigation/stack/lib/typescript/src/types';
import useTranslation from '@/utils/hooks/context/useTranslation';
import Text from '@/components/Text';
import useTheme from '@/utils/hooks/context/useTheme';
import Button from '@/components/Buttons/Button';
import screens from '@/constants/screens';
import GoBackButton from '@/components/Buttons/GoBackButton';
import HeaderTitle from '@/components/Header/HeaderTitle';
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import HeaderRightWrapper from '@/components/Header/HeaderRightWrapper';
import ProfileButton from '@/components/Buttons/ProfileButton';
import CreateButton from '@/components/Buttons/CreateButton';
import { MaterialTopTabNavigationOptions } from '@react-navigation/material-top-tabs';
import HeaderLeftWrapper from '@/components/Header/HeaderLeftWrapper';
import useApp from '../context/useApp';

// TODO: REMOVE_ME
import useDemo from '../context/useDemo';
import TabBarIcon from '@/components/TabBarIcon';

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

  const defaultBottomTabOptions = {
    ...defaultHeaderBackground,
    headerShown: true,
    headerStyle: { elevation: 0 },
    headerTitleAlign: 'center',
    headerTitleContainerStyle: {},
    headerLeftContainerStyle: {
      paddingLeft: sizes.padding,
    },
    headerRightContainerStyle: {
      paddingRight: sizes.padding,
    },
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,

    headerTitle: ({ children }) => <HeaderTitle title={children} />,

    tabBarActiveTintColor: String(colors.text),
    tabBarInactiveTintColor: String(colors.icon),
  } as StackNavigationOptions;

  const defaultStackScreenOptions = {
    ...defaultBottomTabOptions,
  } as StackNavigationOptions;

  const defaultBackOption = {
    ...defaultBottomTabOptions,
    // title: '',
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
    defaultBottomTabOptions,
    defaultStackScreenOptions,
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
    authStack: {
      headerShown: false,
    },
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
    resetPasswordScreen: {
      // headerShown: false,
    } as StackNavigationOptions,
    resetPasswordRequestScreen: {
      headerShown: false,
      title: '',
      headerLeft: () => <GoBackButton />,
    } as StackNavigationOptions,

    registerScreen: {
      headerShown: false,
    } as StackNavigationOptions,

    settingsTab: {
      headerShown: false,
      tabBarLabel: 'Settings',
      tabBarIcon: TabBarIcon({ name: 'cog' }),
    } as BottomTabNavigationOptions,

    settingsScreen: {
      ...defaultBottomTabOptions,
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

    // TODO: REMOVE_START
    entityTemplateTab: {
      headerShown: false,
      tabBarLabel: 'Entity Template',
      tabBarIcon: TabBarIcon({ name: 'copy' }),
    } as BottomTabNavigationOptions,

    entityTemplateListScreen: {
      ...defaultStackScreenOptions,
      headerStyle: {
        backgroundColor: colors.primary,
      },
      headerTitle: () => <HeaderTitle title="Entity" color={colors.white} />,
      headerRight: () => <CreateButton route={screens.ENTITY_TEMPLATE_EDIT} />,
    } as StackNavigationOptions,

    entityTemplateEditScreen: {
      ...defaultStackScreenOptions,
      headerStyle: {
        backgroundColor: colors.primary,
      },
      headerLeft: () => <GoBackButton color={colors.white} title="Back" />,
      headerTitle: () => (
        <HeaderTitle title="Edit Entity" color={colors.white} />
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
    mcDashboardTab: {
      ...defaultBottomTabOptions,
      title: '',
      tabBarLabel: 'Dashboard',
      tabBarIcon: TabBarIcon({ name: 'home' }),
      headerLeft: () => {
        const {
          actions: { setNavigationType },
        } = useApp();

        return (
          <HeaderLeftWrapper>
            <Button onPress={() => setNavigationType('drawer')}>
              <Text white>Switch to Drawer</Text>
            </Button>
          </HeaderLeftWrapper>
        );
      },
      headerRight: () => (
        <HeaderRightWrapper>
          <ProfileButton textColor={colors.white} iconColor={colors.white} />
        </HeaderRightWrapper>
      ),
      headerStyle: {
        backgroundColor: colors.primary,
      },
    } as BottomTabNavigationOptions,

    mcCustomerTab: {
      headerShown: false,
      tabBarIcon: TabBarIcon({ name: 'people' }),
      tabBarLabel: 'Customers',
    } as BottomTabNavigationOptions,

    mcCustomersScreen: {
      ...defaultStackScreenOptions,
      headerStyle: {
        backgroundColor: colors.primary,
      },
      // headerLeft: () => <DrawerToggleButton color={colors.white} />,
      headerTitle: () => <HeaderTitle title="Customers" color={colors.white} />,
      headerRight: () => <CreateButton route={screens.MC_CUSTOMER_EDIT} />,
    } as StackNavigationOptions,

    mcCustomerEditScreen: {
      ...defaultStackScreenOptions,
      headerStyle: {
        backgroundColor: colors.primary,
      },
      headerLeft: () => <GoBackButton color={colors.white} title="Back" />,
      headerTitle: () => (
        <HeaderTitle title="Edit Customer" color={colors.white} />
      ),
    } as StackNavigationOptions,
  };
  // TODO: REMOVE_END

  /**
   *
   *
   *
   *
   *
   * CT DEMO
   * TODO: REMOVE_START
   */
  const { user, basket } = useDemo();
  const ctAppDemoOptions = {
    ctTab: {
      headerShown: false,
      tabBarLabel: 'CT Demo',
      tabBarIcon: TabBarIcon({ name: 'ios-information-circle' }),
    } as BottomTabNavigationOptions,

    ctHomeScreen: {
      tabBarLabel: 'Home',
    } as MaterialTopTabNavigationOptions,
    ctNotificationSettingsScreen: {
      tabBarLabel: 'Notif. Settings',
    } as MaterialTopTabNavigationOptions,
    ctNotificationsScreen: {
      tabBarLabel: 'Notifications',
    } as MaterialTopTabNavigationOptions,
    ctShoppingScreen: {
      tabBarLabel: 'Shopping',
    } as MaterialTopTabNavigationOptions,
    ctComponentsScreen: {
      tabBarLabel: 'Components',
    } as MaterialTopTabNavigationOptions,
    ctArticlesScreen: {
      tabBarLabel: 'Articles',
    } as MaterialTopTabNavigationOptions,
    ctRentalsScreen: {
      tabBarLabel: 'Rentals',
    } as MaterialTopTabNavigationOptions,
    ctRentalScreen: {
      tabBarLabel: 'Rental',
    } as MaterialTopTabNavigationOptions,
    ctBookingScreen: {
      tabBarLabel: 'Booking',
    } as MaterialTopTabNavigationOptions,
    ctChatScreen: {
      tabBarLabel: 'Chat',
    } as MaterialTopTabNavigationOptions,
    ctProfileScreen: {
      tabBarLabel: 'Profile',
    } as MaterialTopTabNavigationOptions,
    ctAutomotiveScreen: {
      tabBarLabel: 'Automotive',
    } as MaterialTopTabNavigationOptions,
  };
  // TODO: REMOVE_END

  return {
    ...commonOptions,
    ...authOptions,
    ...mainOptions,
    ...mcAppDemoOptions, // TODO: REMOVE_ME
    ...ctAppDemoOptions, // TODO: REMOVE_ME
  };
};
