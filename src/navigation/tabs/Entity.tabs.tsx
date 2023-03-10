import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useTabScreenOptions } from '@/utils/hooks/useScreenOptions';
import useTranslation from '@/utils/hooks/context/useTranslation';
import SCREENS from '@/constants/screens';
import _EntityTemplateListScreen from '@/screens/Main/Entities/_EntityTemplate/_EntityTemplateListScreen';
import _EntityTemplateEditScreen from '@/screens/Main/Entities/_EntityTemplate/_EntityTemplateEditScreen';

const Stack = createStackNavigator();

const EntityTabsNavigator = () => {
  const { t } = useTranslation();
  const screenOptions = useTabScreenOptions();

  return (
    <>
      <Stack.Navigator initialRouteName={SCREENS.ENTITY_TEMPLATE_LIST}>
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
      </Stack.Navigator>
    </>
  );
};

export default EntityTabsNavigator;
