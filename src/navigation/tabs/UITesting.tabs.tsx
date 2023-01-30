import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import useTranslation from '@/utils/hooks/context/useTranslation';
import { useTabScreenOptions } from '@/utils/hooks/useScreenOptions';
import SCREENS from '@/constants/screens';
import UiTestingHomeScreen from '@/screens/UiTesting/UiTestingHomeScreen';

const Stack = createStackNavigator();

const UITestingTabsNavigator = () => {
  const screenOptions = useTabScreenOptions();

  return (
    <Stack.Navigator
      initialRouteName={SCREENS.UI_TESTING_HOME}
      screenOptions={screenOptions.defaultStackScreenOptions}
    >
      <Stack.Screen
        //
        name={SCREENS.UI_TESTING_HOME}
        component={UiTestingHomeScreen}
        options={screenOptions.uiTestingHomeScreen}
      />
    </Stack.Navigator>
  );
};

export default UITestingTabsNavigator;
