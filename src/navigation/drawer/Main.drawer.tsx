import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useDrawerScreenOptions } from '@/utils/hooks/useScreenOptions';
import useTranslation from '@/utils/hooks/context/useTranslation';
import screens from '@/constants/screens';

/**
 * CT
 * TODO: REMOVE_ME
 */
import CTHomeScreen from '@/screens/Main/Demo/CT/CTHomeScreen';
import CTComponentsScreen from '@/screens/Main/Demo/CT/CTComponentsScreen';
import CTArticlesScreen from '@/screens/Main/Demo/CT/CTArticlesScreen';
import CTRentalScreen from '@/screens/Main/Demo/CT/CTRentalScreen';
import CTRentalsScreen from '@/screens/Main/Demo/CT/CTRentalsScreen';
import CTBookingScreen from '@/screens/Main/Demo/CT/CTBookingScreen';
import CTChatScreen from '@/screens/Main/Demo/CT/CTChatScreen';
import CTNotificationsSettingsScreen from '@/screens/Main/Demo/CT/CTNotificationsSettingsScreen';
import CTNotificationsScreen from '@/screens/Main/Demo/CT/CTNotificationsScreen/index.native';
import CTAutomotiveScreen from '@/screens/Main/Demo/CT/CTAutomotiveScreen';
import CTShoppingScreen from '@/screens/Main/Demo/CT/CTShoppingScreen';

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
      initialRouteName={screens.MC_DASHBOARD}
    >
      {/* MAIN SCREENS */}

      <Stack.Screen
        name={screens.LANDING}
        component={LandingScreen}
        options={screenOptions.landingScreen}
      />
      <Stack.Screen
        name={screens.SETTINGS}
        component={SettingsScreen}
        options={screenOptions.settingsScreen}
      />
      <Stack.Screen
        name={screens.AGREEMENT}
        component={AgreementScreen}
        options={screenOptions.settingsAgreementScreen}
      />
      <Stack.Screen
        name={screens.ABOUT}
        component={AboutScreen}
        options={screenOptions.settingsAboutScreen}
      />
      <Stack.Screen
        name={screens.PRIVACY}
        component={PrivacyScreen}
        options={screenOptions.settingsPrivacyScreen}
      />
      <Stack.Screen
        name={screens.PROFILE}
        component={ProfileScreen}
        options={screenOptions.settingsProfileScreen}
      />

      {/* TEMPLATE: REMOVE_START */}
      <Stack.Screen
        name={screens.ENTITY_TEMPLATE_LIST}
        component={_EntityTemplateListScreen}
        options={screenOptions.entityTemplateListScreen}
      />
      <Stack.Screen
        name={screens.ENTITY_TEMPLATE_EDIT}
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
        name={screens.MC_DASHBOARD}
        component={DashboardScreen}
        options={screenOptions.mcDashboardScreen}
      />
      <Stack.Screen
        name={screens.MC_CUSTOMER_LIST}
        component={CustomerListScreen}
        options={screenOptions.mcCustomerListScreen}
      />
      <Stack.Screen
        name={screens.MC_CUSTOMER_EDIT}
        component={CustomerEditScreen}
        options={screenOptions.mcCustomerEditScreen}
      />

      {/* MC-APP SCREENS: REMOVE_END */}

      {/* ---------------------------------------- */}
      {/* ---------------------------------------- */}
      {/* ---------------------------------------- */}
      {/* ---------------------------------------- */}
      {/* ---------------------------------------- */}

      {/* CT SCREENS: REMOVE_START */}

      <Stack.Screen
        name={screens.CT_HOME}
        component={CTHomeScreen}
        options={screenOptions.ctHomeScreen}
      />
      <Stack.Screen
        name={screens.CT_COMPONENTS}
        component={CTComponentsScreen}
        options={screenOptions.ctComponentsScreen}
      />

      <Stack.Screen
        name={screens.CT_ARTICLES}
        component={CTArticlesScreen}
        options={screenOptions.ctArticlesScreen}
      />

      <Stack.Screen
        name={screens.CT_RENTAL}
        component={CTRentalScreen}
        options={screenOptions.ctRentalScreen}
      />
      <Stack.Screen
        name={screens.CT_RENTALS}
        component={CTRentalsScreen}
        options={screenOptions.ctRentalsScreen}
      />
      <Stack.Screen
        name={screens.CT_BOOKING}
        component={CTBookingScreen}
        options={screenOptions.ctBookingScreen}
      />
      <Stack.Screen
        name={screens.CT_CHAT}
        component={CTChatScreen}
        options={screenOptions.ctChatScreen}
      />

      <Stack.Screen
        name={screens.CT_NOTIFICATION_SETTINGS}
        component={CTNotificationsSettingsScreen}
        options={screenOptions.ctNotificationSettingsScreen}
      />
      <Stack.Screen
        name={screens.CT_NOTIFICATIONS}
        component={CTNotificationsScreen}
        options={screenOptions.ctNotificationsScreen}
      />

      <Stack.Screen
        name={screens.CT_AUTOMOTIVE}
        component={CTAutomotiveScreen}
        options={screenOptions.ctAutomotiveScreen}
      />

      <Stack.Screen
        name={screens.CT_SHOPPING}
        component={CTShoppingScreen}
        options={screenOptions.ctShoppingScreen}
      />

      {/* CT SCREENS: REMOVE_END */}
    </Stack.Navigator>
  );
};

export default MainNavigator;
