import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useTabScreenOptions } from '@/utils/hooks/useScreenOptions';
import useTranslation from '@/utils/hooks/context/useTranslation';
import SCREENS from '@/constants/screens';
import SettingsScreen from '@/screens/Main/Settings/SettingsScreen';
import AboutScreen from '@/screens/Main/Settings/AboutScreen';
import AgreementScreen from '@/screens/Main/Settings/AgreementScreen';
import PrivacyScreen from '@/screens/Main/Settings/PrivacyScreen';

const Stack = createStackNavigator();

const SettingsTabsNavigator = () => {
  const { t } = useTranslation();
  const screenOptions = useTabScreenOptions();

  return (
    <>
      <Stack.Navigator initialRouteName={SCREENS.SETTINGS}>
        <Stack.Screen
          name={SCREENS.SETTINGS}
          component={SettingsScreen}
          options={screenOptions.settingsScreen}
        />
        <Stack.Screen
          name={SCREENS.ABOUT}
          component={AboutScreen}
          options={screenOptions.settingsAboutScreen}
        />
        <Stack.Screen
          name={SCREENS.AGREEMENT}
          component={AgreementScreen}
          options={screenOptions.settingsAgreementScreen}
        />
        <Stack.Screen
          name={SCREENS.PRIVACY}
          component={PrivacyScreen}
          options={screenOptions.settingsPrivacyScreen}
        />
      </Stack.Navigator>
    </>
  );
};

export default SettingsTabsNavigator;
