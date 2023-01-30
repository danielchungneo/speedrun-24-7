import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useTabScreenOptions } from '@/utils/hooks/useScreenOptions';
import useTranslation from '@/utils/hooks/context/useTranslation';
import screens from '@/constants/screens';
import CustomerListScreen from '@/screens/Main/Demo/MC/Customers/CustomerListScreen';
import CustomerEditScreen from '@/screens/Main/Demo/MC/Customers/CustomerEditScreen';

const Stack = createStackNavigator();

export default () => {
  const { t } = useTranslation();
  const screenOptions = useTabScreenOptions();

  return (
    <>
      <Stack.Navigator initialRouteName={screens.MC_CUSTOMER_LIST}>
        <Stack.Screen
          name={screens.MC_CUSTOMER_LIST}
          component={CustomerListScreen}
          options={screenOptions.mcCustomersScreen}
        />
        <Stack.Screen
          name={screens.MC_CUSTOMER_EDIT}
          component={CustomerEditScreen}
          options={screenOptions.mcCustomerEditScreen}
        />
      </Stack.Navigator>
    </>
  );
};
