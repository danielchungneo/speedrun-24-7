import React from 'react';
import { Ionicons } from '@expo/vector-icons';

// STACKS
import MainNavigator from './Main.tabs';
import AuthNavigator from './Auth.tabs';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import useTheme from '@/utils/hooks/context/useTheme';
import SCREENS from '@/constants/screens';
import { useTabScreenOptions } from '@/utils/hooks/useScreenOptions';
import useSession from '@/utils/hooks/context/useSession';
import UITestingTabsNavigator from './UITesting.tabs';

export default () => {
  const {
    state: { user },
  } = useSession();

  const signedIn = !!user.id;

  /**
   * ! UNCOMMENT THIS TO VIEW STORYBOOK
   */
  // return <UITestingTabsNavigator />;

  return signedIn ? <MainNavigator /> : <AuthNavigator />;
};
