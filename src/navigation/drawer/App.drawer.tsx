import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import useTranslation from '@/utils/hooks/context/useTranslation';
import SCREENS from '@/constants/screens';
import { useDrawerScreenOptions } from '@/utils/hooks/useScreenOptions';
import HomeScreen from '@/screens/App Screens/HomeScreen';
import LoginScreen from '@/screens/Auth/LoginScreen';
import RunDashboard from '@/screens/App Screens/RunDashboard';
import RunDetailsScreen from '@/screens/App Screens/RunDetailsScreen';
import RunTrackerScreen from '@/screens/App Screens/RunTrackingScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const { t } = useTranslation();
  const screenOptions = useDrawerScreenOptions();

  return (
    <Stack.Navigator initialRouteName={SCREENS.HOME}>
      <Stack.Screen
        name={SCREENS.HOME}
        component={LoginScreen}
        options={screenOptions.loginScreen}
      />
      <Stack.Screen
        name={SCREENS.RUN_DASHBOARD}
        component={RunDashboard}
        options={screenOptions.runDashboardScreen}
      />
      <Stack.Screen
        name={SCREENS.RUN_DETAILS}
        component={RunDetailsScreen}
        options={screenOptions.runDashboardScreen}
      />
      <Stack.Screen
        name={SCREENS.RUN_TRACKING}
        component={RunTrackerScreen}
        options={screenOptions.runDashboardScreen}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
