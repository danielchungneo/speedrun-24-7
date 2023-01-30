import React from 'react';
import useTheme from '@/utils/hooks/context/useTheme';
import Block from '@/components/Block';
import { useNavigation } from '@react-navigation/native';
import screens from '@/constants/screens';
import { StatusBar } from 'expo-status-bar';
import EntityTemplateForm from '@/components/Entities/_ENTITY_TEMPLATE/EntityTemplateForm';

const _EntityTemplateEditScreen = ({ route }) => {
  const { styles, colors, sizes } = useTheme();
  const navigation = useNavigation();

  const entity = route?.params?.entity;
  const entityId = entity?.id || 'create';

  function closeForm(refetch?: boolean) {
    navigation.navigate(screens.ENTITY_TEMPLATE_LIST, {
      refetch,
    });
  }

  return (
    <>
      <StatusBar style="light" />

      <Block paddingHorizontal={sizes.padding}>
        <EntityTemplateForm
          activeObject={entity}
          id={entityId}
          onCloseForm={closeForm}
          title="Entity"
        />
      </Block>
    </>
  );
};

export default _EntityTemplateEditScreen;
