import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useDrawerScreenOptions } from '@/utils/hooks/useScreenOptions';
import useTranslation from '@/utils/hooks/context/useTranslation';
import SCREENS from '@/constants/screens';

/**
 * MC
 * TODO: REMOVE_ME
 */
import CustomerEditScreen from '@/screens/Main/Demo/MC/Customers/CustomerEditScreen';
import CustomerListScreen from '@/screens/Main/Demo/MC/Customers/CustomerListScreen';
import DashboardScreen from '@/screens/Main/Demo/MC/DashboardScreen';

// SETTINGS
import SettingsScreen from '@/screens/Main/Settings/SettingsScreen';
import AboutScreen from '@/screens/Main/Settings/AboutScreen';
import AgreementScreen from '@/screens/Main/Settings/AgreementScreen';
import PrivacyScreen from '@/screens/Main/Settings/PrivacyScreen';

// MAIN
import LandingScreen from '@/screens/Main/LandingScreen';
import ProfileScreen from '@/screens/Main/ProfileScreen';
import _EntityTemplateListScreen from '@/screens/Main/Entities/_EntityTemplate/_EntityTemplateListScreen';
import _EntityTemplateEditScreen from '@/screens/Main/Entities/_EntityTemplate/_EntityTemplateEditScreen';

const Stack = createStackNavigator();

const MainNavigator = () => {
  const { t } = useTranslation();
  const screenOptions = useDrawerScreenOptions();

  return (
    <Stack.Navigator
      screenOptions={screenOptions.defaultDrawerToggle}
      initialRouteName={SCREENS.MC_DASHBOARD}
    >
      {/* MAIN SCREENS */}

      <Stack.Screen
        name={SCREENS.LANDING}
        component={LandingScreen}
        options={screenOptions.landingScreen}
      />
      <Stack.Screen
        name={SCREENS.SETTINGS}
        component={SettingsScreen}
        options={screenOptions.settingsScreen}
      />
      <Stack.Screen
        name={SCREENS.AGREEMENT}
        component={AgreementScreen}
        options={screenOptions.settingsAgreementScreen}
      />
      <Stack.Screen
        name={SCREENS.ABOUT}
        component={AboutScreen}
        options={screenOptions.settingsAboutScreen}
      />
      <Stack.Screen
        name={SCREENS.PRIVACY}
        component={PrivacyScreen}
        options={screenOptions.settingsPrivacyScreen}
      />
      <Stack.Screen
        name={SCREENS.PROFILE}
        component={ProfileScreen}
        options={screenOptions.settingsProfileScreen}
      />

      {/* TEMPLATE: REMOVE_START */}
      <Stack.Screen
        name={SCREENS.ENTITY_TEMPLATE_LIST}
        component={_EntityTemplateListScreen}
        options={screenOptions.entityTemplateListScreen}
      />
      <Stack.Screen
        name={SCREENS.ENTITY_TEMPLATE_EDIT}
        component={_EntityTemplateEditScreen}
        options={screenOptions.entityTemplateEditScreen}
      />
      {/* TEMPLATE: REMOVE_END */}

      {/* ---------------------------------------- */}
      {/* ---------------------------------------- */}
      {/* ---------------------------------------- */}
      {/* ---------------------------------------- */}
      {/* ---------------------------------------- */}

      {/* MC-APP SCREENS: REMOVE_START */}

      <Stack.Screen
        name={SCREENS.MC_DASHBOARD}
        component={DashboardScreen}
        options={screenOptions.mcDashboardScreen}
      />
      <Stack.Screen
        name={SCREENS.MC_CUSTOMER_LIST}
        component={CustomerListScreen}
        options={screenOptions.mcCustomerListScreen}
      />
      <Stack.Screen
        name={SCREENS.MC_CUSTOMER_EDIT}
        component={CustomerEditScreen}
        options={screenOptions.mcCustomerEditScreen}
      />

      {/* MC-APP SCREENS: REMOVE_END */}
    </Stack.Navigator>
  );
};

export default MainNavigator;
