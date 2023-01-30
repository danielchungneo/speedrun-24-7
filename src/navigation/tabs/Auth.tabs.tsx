import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import useTranslation from '@/utils/hooks/context/useTranslation';
import { useTabScreenOptions } from '@/utils/hooks/useScreenOptions';
import SCREENS from '@/constants/screens';
import LoginScreen from '@/screens/Auth/LoginScreen';
import RegistrationScreen from '@/screens/Auth/RegistrationScreen';
import ResetPasswordScreen from '@/screens/Auth/ResetPasswordScreen';
import ResetPasswordRequestScreen from '@/screens/Auth/ResetPasswordRequestScreen';

const Stack = createStackNavigator();

const AuthTabsNavigator = () => {
  const { t } = useTranslation();
  const screenOptions = useTabScreenOptions();

  return (
    <Stack.Navigator
      initialRouteName={SCREENS.LOGIN}
      screenOptions={screenOptions.defaultStackScreenOptions}
    >
      <Stack.Screen
        name={SCREENS.LOGIN}
        component={LoginScreen}
        options={screenOptions.loginScreen}
      />
      <Stack.Screen
        name={SCREENS.RESET_PASSWORD}
        component={ResetPasswordScreen}
        options={screenOptions.resetPasswordScreen}
      />
      <Stack.Screen
        name={SCREENS.RESET_PASSWORD_REQUEST}
        component={ResetPasswordRequestScreen}
        options={screenOptions.resetPasswordRequestScreen}
      />
      <Stack.Screen
        name={SCREENS.REGISTER}
        component={RegistrationScreen}
        options={screenOptions.registerScreen}
      />
    </Stack.Navigator>
  );
};

export default AuthTabsNavigator;
