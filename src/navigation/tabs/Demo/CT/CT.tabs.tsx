/**
 * TODO: REMOVE_ME
 * ! remove this entire file to delete all CT data
 */

import React from 'react';
import { useTabScreenOptions } from '@/utils/hooks/useScreenOptions';
import useTranslation from '@/utils/hooks/context/useTranslation';
import screens from '@/constants/screens';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ProfileScreen from '@/screens/Main/ProfileScreen';

/**
 * CT
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

const Tab = createMaterialTopTabNavigator();

export default () => {
  const { t } = useTranslation();
  const screenOptions = useTabScreenOptions();
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      initialRouteName={screens.CT_HOME}
      screenOptions={{
        tabBarScrollEnabled: true,
        tabBarStyle: {
          marginTop: insets.top,
        },
      }}
    >
      <Tab.Screen
        name={screens.CT_HOME}
        component={CTHomeScreen}
        options={screenOptions.ctHomeScreen}
      />

      <Tab.Screen
        name={screens.CT_COMPONENTS}
        component={CTComponentsScreen}
        options={screenOptions.ctComponentsScreen}
      />

      <Tab.Screen
        name={screens.CT_ARTICLES}
        component={CTArticlesScreen}
        options={screenOptions.ctArticlesScreen}
      />

      <Tab.Screen
        name={screens.CT_RENTALS}
        component={CTRentalsScreen}
        options={screenOptions.ctRentalsScreen}
      />
      <Tab.Screen
        name={screens.CT_RENTAL}
        component={CTRentalScreen}
        options={screenOptions.ctRentalScreen}
      />
      <Tab.Screen
        name={screens.CT_BOOKING}
        component={CTBookingScreen}
        options={screenOptions.ctBookingScreen}
      />

      <Tab.Screen
        name={screens.CT_AUTOMOTIVE}
        component={CTAutomotiveScreen}
        options={screenOptions.ctAutomotiveScreen}
      />

      <Tab.Screen
        name={screens.CT_NOTIFICATION_SETTINGS}
        component={CTNotificationsSettingsScreen}
        options={screenOptions.ctNotificationSettingsScreen}
      />
      <Tab.Screen
        name={screens.CT_NOTIFICATIONS}
        component={CTNotificationsScreen}
        options={screenOptions.ctNotificationsScreen}
      />

      <Tab.Screen
        name={screens.CT_SHOPPING}
        component={CTShoppingScreen}
        options={screenOptions.ctShoppingScreen}
      />

      <Tab.Screen
        name={screens.CT_CHAT}
        component={CTChatScreen}
        options={screenOptions.ctChatScreen}
      />

      <Tab.Screen
        name={screens.CT_PROFILE}
        component={ProfileScreen}
        options={screenOptions.ctProfileScreen}
      />
    </Tab.Navigator>
  );
};
