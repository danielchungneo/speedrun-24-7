import React from 'react';
import { Ionicons } from '@expo/vector-icons';

// STACKS
import MainStack from './Main.tabs';
import AuthStack from './Auth.tabs';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import useTheme from '@/utils/hooks/context/useTheme';
import screens from '@/constants/screens';
import { useTabScreenOptions } from '@/utils/hooks/useScreenOptions';

const Stack = createStackNavigator();

/* drawer menu navigation */
export default () => {
  const { gradients, colors, styles } = useTheme();
  // const screenOptions = useTabScreenOptions();

  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          //
          name={screens.AUTH_STACK}
          component={AuthStack}
        />
        <Stack.Screen
          //
          name={screens.MAIN_STACK}
          component={MainStack}
        />
      </Stack.Navigator>
    </>
  );
};
