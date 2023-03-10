import React, { useEffect, useState } from 'react';
import useTheme from '@/utils/hooks/context/useTheme';
import api from '@/utils/api';
import useRequest from '@/utils/hooks/useRequest';
import { Feather } from '@expo/vector-icons';
import { Pressable, RefreshControl } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import SCREENS from '@/constants/screens';
import { FlatList } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Block from '@/components/Block';
import Text from '@/components/Text';
import { IFilterParams, ISortParams } from 'types';
import useSession from '@/utils/hooks/context/useSession';
import SelectBox from '@/components/Inputs_NEW/Select/SelectBox';

const sortOptions: {
  value: number;
  label: string;
  params: ISortParams[];
}[] = [
  {
    label: 'None',
    params: [] as ISortParams[],
  },
  {
    label: 'Name A-Z',
    params: [
      {
        field: 'name',
        direction: 'asc',
      },
    ] as ISortParams[],
  },
  {
    label: 'Name Z-A',
    params: [
      {
        field: 'name',
        direction: 'desc',
      },
    ] as ISortParams[],
  },
].map((option, index) => ({ ...option, value: index }));

const filterOptions: {
  label: string;
  params: IFilterParams[];
}[] = [
  {
    label: 'None',
    params: [] as IFilterParams[],
  },
  {
    label: '"Bob" in name',
    params: [
      {
        field: 'name',
        value: 'Bob',
        opperand: 'contains',
      },
    ] as IFilterParams[],
  },
].map((option, index) => ({ ...option, value: index }));

const EntityTemplateList = () => {
  const [selectedSortOptionIndex, setSelectedSortOptionIndex] = useState(0);
  const [selectedFilterOptionIndex, setSelectedFilterOptionIndex] = useState(0);

  const [showListAsCards, setShowListAsCards] = useState(false);
  const [duplicateData, setDuplicateData] = useState(false);

  const navigation = useNavigation();
  const route: any = useRoute();
  const insets = useSafeAreaInsets();
  const { styles, assets, colors, fonts, gradients, sizes } = useTheme();
  const {
    state: { navigationType },
  } = useSession();

  const isUsingTabs = navigationType === 'tabs';

  /**
   * API
   */
  const {
    data: entities,
    loading,
    errors,
    revalidateCache,
    submitRequest,
  } = useRequest(
    api.entities.customers.getAll({
      query: {
        sort: sortOptions[selectedSortOptionIndex].params,
        filter: filterOptions[selectedFilterOptionIndex].params,
      },
    })
  );

  /**
   * COMPUTED
   */
  const flatlistData = entities?.results;

  /**
   * FUNCTIONS
   */
  function openEditScreen (entity: any) {
    return () => {
      navigation.navigate(SCREENS.ENTITY_TEMPLATE_EDIT, {
        entity,
      });
    };
  }

  const renderSortAndFilterPanel = () => {
    return (
      <Block
        flex={0}
        variant={isUsingTabs ? 'white' : undefined}
        style={{
          borderTopWidth: 2,
          borderTopColor: colors.secondary,

          ...(isUsingTabs
            ? {
                borderTopWidth: 1,
                borderBottomWidth: 1,
                borderBottomColor: colors.secondary,
              }
            : {}),
        }}
      >
        <Block
          flex={0}
          row
          paddingHorizontal={sizes.padding}
          paddingTop={sizes.sm}
          paddingBottom={isUsingTabs ? sizes.sm : 0}
        >
          <Block>
            <SelectBox
              form={false}
              label='Sort'
              labelField='label'
              valueField='value'
              options={sortOptions}
              value={sortOptions[selectedSortOptionIndex].value}
              onChange={(value, item, index) =>
                setSelectedSortOptionIndex(index)
              }
            />
          </Block>

          <Block flex={0} width={sizes.s} />

          <Block>
            <SelectBox
              form={false}
              label='Filter'
              labelField='label'
              valueField='value'
              options={filterOptions}
              value={filterOptions[selectedFilterOptionIndex].value}
              onChange={(value, item, index) =>
                setSelectedFilterOptionIndex(index)
              }
            />
          </Block>
        </Block>
      </Block>
    );
  };

  function renderEntity ({ item, index, separators }, ...rest) {
    const isLast = index === flatlistData.length - 1;

    const content = (
      <>
        <Block>
          <Text size='h5' bold>
            {item.name}
          </Text>
          <Text size='p' variant='secondary' marginTop={sizes.xs}>
            {item.description}
          </Text>
        </Block>

        <Block flex={0} justify='center' align='center'>
          <Feather name='chevron-right' size={sizes.h4} />
        </Block>
      </>
    );

    return (
      <Pressable onPress={openEditScreen(item)}>
        <Block
          row
          color={!!(index % 2) ? colors.white : colors.background}
          padding={sizes.sm}
          style={{
            borderBottomColor: colors.white,
            borderBottomWidth: isLast ? 1 : 0,
          }}
        >
          {content}
        </Block>
      </Pressable>
    );
  }

  /**
   * EFFECTS
   */
  useEffect(() => {
    if (route.params?.refetch) {
      revalidateCache?.();
    }
  }, [route.params]);

  useEffect(() => {
    revalidateCache?.();
  }, [selectedSortOptionIndex, selectedFilterOptionIndex]);

  return (
    <Block
    // safe
    // edges={['bottom']}
    >
      <FlatList
        data={flatlistData}
        ListEmptyComponent={
          <Block align='center' marginTop={sizes.m}>
            <Text size='h4' variant='secondary'>
              No entities found
            </Text>
            <Text variant='secondary'>(pull down to refresh)</Text>
          </Block>
        }
        keyExtractor={(item, index) => `${index}:${item.id}`}
        renderItem={renderEntity}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={revalidateCache} />
        }
        contentContainerStyle={{
          paddingBottom: sizes.sm,
        }}
        showsVerticalScrollIndicator={false}
      />

      {renderSortAndFilterPanel()}
    </Block>
  );
};

export default EntityTemplateList;
