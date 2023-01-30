import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useTabScreenOptions } from '@/utils/hooks/useScreenOptions';
import useTranslation from '@/utils/hooks/context/useTranslation';
import screens from '@/constants/screens';
import SettingsScreen from '@/screens/Main/Settings/SettingsScreen';
import AboutScreen from '@/screens/Main/Settings/AboutScreen';
import AgreementScreen from '@/screens/Main/Settings/AgreementScreen';
import PrivacyScreen from '@/screens/Main/Settings/PrivacyScreen';

const Stack = createStackNavigator();

export default () => {
  const { t } = useTranslation();
  const screenOptions = useTabScreenOptions();

  return (
    <>
      <Stack.Navigator initialRouteName={screens.SETTINGS}>
        <Stack.Screen
          name={screens.SETTINGS}
          component={SettingsScreen}
          options={screenOptions.settingsScreen}
        />
        <Stack.Screen
          name={screens.ABOUT}
          component={AboutScreen}
          options={screenOptions.settingsAboutScreen}
        />
        <Stack.Screen
          name={screens.AGREEMENT}
          component={AgreementScreen}
          options={screenOptions.settingsAgreementScreen}
        />
        <Stack.Screen
          name={screens.PRIVACY}
          component={PrivacyScreen}
          options={screenOptions.settingsPrivacyScreen}
        />
      </Stack.Navigator>
    </>
  );
};
