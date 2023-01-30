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
import Switch from '@/components/Inputs_NEW/Select/Switch';

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

const CustomersList = () => {
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
    data: customers,
    loading,
    errors,
    revalidateCache,
    submitRequest,
  } = useRequest(
    api.entities.customers.getAll({
      query: {
        sort: sortOptions[selectedSortOptionIndex].params,
        // sort: sortOptions[selectedSortOptionIndex].params,
        // filter: filterOptions[selectedFilterOptionIndex].params,
      },
    })
  );

  /**
   * COMPUTED
   */
  const flatlistData = duplicateData
    ? customers?.results
        .concat(customers?.results)
        .concat(customers?.results)
        .concat(customers?.results)
        .concat(customers?.results)
    : customers?.results;

  /**
   * FUNCTIONS
   */
  function openEditScreen (customer: any) {
    return () => {
      navigation.navigate(SCREENS.MC_CUSTOMER_EDIT, {
        customer,
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

        <Block
          flex={0}
          row
          justify='space-between'
          marginTop={sizes.sm}
          padding={sizes.padding}
        >
          <Switch
            form={false}
            label='Show as cards'
            labelPosition='left'
            value={showListAsCards}
            onChange={e => setShowListAsCards(e.target.value)}
          />

          <Switch
            form={false}
            label='Duplicate data'
            labelPosition='left'
            value={duplicateData}
            onChange={e => setDuplicateData(e.target.value)}
          />
        </Block>
      </Block>
    );
  };

  function renderCustomer ({ item: customer, index, separators }, ...rest) {
    const isLast = index === flatlistData.length - 1;

    const content = (
      <>
        <Block>
          <Text size='h5' bold>
            {customer.name}
          </Text>
          <Text size='p' variant='secondary' marginTop={sizes.xs}>
            {customer.description}
          </Text>
          <Text size='p' variant='secondary' marginTop={sizes.xs}>
            SOs: {customer.salesOrder?.length}
          </Text>
        </Block>

        <Block flex={0} justify='center' align='center'>
          <Feather name='chevron-right' size={sizes.h4} />
        </Block>
      </>
    );

    return showListAsCards ? (
      <Pressable
        onPress={openEditScreen(customer)}
        style={{
          marginTop: sizes.sm,
          marginHorizontal: sizes.padding,
        }}
      >
        <Block row card>
          {content}
        </Block>
      </Pressable>
    ) : (
      <Pressable onPress={openEditScreen(customer)}>
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
              No customers found
            </Text>
            <Text variant='secondary'>(pull down to refresh)</Text>
          </Block>
        }
        keyExtractor={(item, index) => `${index}:${item.id}`}
        renderItem={renderCustomer}
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

export default CustomersList;
