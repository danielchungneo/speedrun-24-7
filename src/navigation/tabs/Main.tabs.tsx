import React, { memo, useEffect } from 'react';
import SCREENS from '@/constants/screens';
import useTheme from '@/utils/hooks/context/useTheme';
import useApp from '@/utils/hooks/context/useApp';
import { useTabScreenOptions } from '@/utils/hooks/useScreenOptions';
import useTranslation from '@/utils/hooks/context/useTranslation';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// MC
import CustomerTabs from './Demo/MC/Customer.tabs';
import DashboardScreen from '@/screens/Main/Demo/MC/DashboardScreen';
import EntityTabs from './Entity.tabs';
import SettingsTabs from './Settings.tabs';

const Tab = createBottomTabNavigator();

const MainTabsNavigator = () => {
  const { t } = useTranslation();
  const screenOptions = useTabScreenOptions();
  const { gradients, colors, styles } = useTheme();

  return (
    <Tab.Navigator screenOptions={screenOptions.defaultBottomTabOptions}>
      {/* TODO: REMOVE_START */}
      <Tab.Screen
        //
        name={SCREENS.MC_DASHBOARD}
        component={DashboardScreen}
        options={screenOptions.mcDashboardTab}
      />

      <Tab.Screen
        //
        name={SCREENS.MC_CUSTOMER_TAB}
        component={CustomerTabs}
        options={screenOptions.mcCustomerTab}
      />

      <Tab.Screen
        //
        name={SCREENS.ENTITY_TEMPLATE_TAB}
        component={EntityTabs}
        options={screenOptions.entityTemplateTab}
      />

      <Tab.Screen
        //
        name={SCREENS.SETTINGS_TAB}
        component={SettingsTabs}
        options={screenOptions.settingsTab}
      />

      {/* TODO: REMOVE_END */}
    </Tab.Navigator>
  );
};

export default MainTabsNavigator;
