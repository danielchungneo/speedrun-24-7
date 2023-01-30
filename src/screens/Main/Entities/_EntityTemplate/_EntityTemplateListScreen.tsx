import React from 'react';
import useTheme from '@/utils/hooks/context/useTheme';
import Block from '@/components/Block';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import EntityTemplateList from '@/components/Entities/_ENTITY_TEMPLATE/EntityTemplateList';
import useSession from '@/utils/hooks/context/useSession';

const _EntityTemplateListScreen = ({ route }) => {
  const { styles, icons, colors, sizes } = useTheme();
  const {
    state: { navigationType },
  } = useSession();
  const insets = useSafeAreaInsets();

  const isUsingTabs = navigationType === 'tabs';

  return (
    <>
      <StatusBar style='light' />

      <Block safe={!isUsingTabs} edges={['bottom']}>
        <EntityTemplateList />
      </Block>
    </>
  );
};

export default _EntityTemplateListScreen;
