import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import useTranslation from '@/utils/hooks/context/useTranslation';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTabScreenOptions } from '@/utils/hooks/useScreenOptions';
import screens from '@/constants/screens';
import LoginScreen from '@/screens/Auth/LoginScreen';
import RegistrationScreen from '@/screens/Auth/RegistrationScreen';
import ResetPasswordScreen from '@/screens/Auth/ResetPasswordScreen';
import ResetPasswordRequestScreen from '@/screens/Auth/ResetPasswordRequestScreen';

const Stack = createStackNavigator();

const AuthNavigator = () => {
  const { t } = useTranslation();
  const screenOptions = useTabScreenOptions();

  return (
    <Stack.Navigator
      initialRouteName={screens.LOGIN}
      screenOptions={screenOptions.defaultStackScreenOptions}
    >
      <Stack.Screen
        name={screens.LOGIN}
        component={LoginScreen}
        options={screenOptions.loginScreen}
      />
      <Stack.Screen
        name={screens.RESET_PASSWORD}
        component={ResetPasswordScreen}
        options={screenOptions.resetPasswordScreen}
      />
      <Stack.Screen
        name={screens.RESET_PASSWORD_REQUEST}
        component={ResetPasswordRequestScreen}
        options={screenOptions.resetPasswordRequestScreen}
      />
      <Stack.Screen
        name={screens.REGISTER}
        component={RegistrationScreen}
        options={screenOptions.registerScreen}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
