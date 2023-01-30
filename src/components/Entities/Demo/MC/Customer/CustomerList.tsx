import React, { useEffect, useState } from 'react';
import useTheme from '@/utils/hooks/context/useTheme';
import api from '@/utils/api';
import useRequest from '@/utils/hooks/useRequest';
import { Feather } from '@expo/vector-icons';
import { Pressable, RefreshControl } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import screens from '@/constants/screens';
import { FlatList } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Switch from '@/components/Inputs/Base/Switch';
import useApp from '@/utils/hooks/context/useApp';
import Select from '@/components/Inputs/Base/Select';
import Block from '@/components/Block';
import Text from '@/components/Text';

const sortOptions = [
  {
    label: 'None',
    params: [],
  },
  {
    label: 'Name A-Z',
    params: [
      {
        field: 'name',
        direction: 'asc',
      },
    ],
  },
  {
    label: 'Name Z-A',
    params: [
      {
        field: 'name',
        direction: 'desc',
      },
    ],
  },
].map((option, index) => ({ ...option, value: index }));

const filterOptions = [
  {
    label: 'None',
    params: [],
  },
  {
    label: '"Bob" in name',
    params: [
      {
        field: 'name',
        value: 'Bob',
        opperand: 'contains',
      },
    ],
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
  } = useApp();

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
        filter: filterOptions[selectedFilterOptionIndex].params,
      },
    })
  );

  console.log(customers?.results);
  

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
  function openEditScreen(customer: any) {
    return () => {
      navigation.navigate(screens.MC_CUSTOMER_EDIT, {
        customer,
      });
    };
  }

  const renderSortAndFilterPanel = () => {
    return (
      <Block
        flex={0}
        white={isUsingTabs}
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
            <Select
              label="Sort"
              labelField="label"
              valueField="value"
              options={sortOptions}
              value={sortOptions[selectedSortOptionIndex].value}
              onChange={(value, item, index) =>
                setSelectedSortOptionIndex(index)
              }
            />
          </Block>

          <Block flex={0} width={sizes.s} />

          <Block>
            <Select
              label="Filter"
              labelField="label"
              valueField="value"
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
          justify="space-between"
          marginTop={sizes.sm}
          padding={sizes.padding}
        >
          <Switch
            label="Show as cards"
            labelPosition="left"
            checked={showListAsCards}
            onPress={setShowListAsCards}
          />

          <Switch
            label="Duplicate data"
            labelPosition="left"
            checked={duplicateData}
            onPress={setDuplicateData}
          />
        </Block>
      </Block>
    );
  };

  function renderCustomer({ item: customer, index, separators }, ...rest) {
    const isLast = index === flatlistData.length - 1;

    const content = (
      <>
        <Block>
          <Text h5 bold>
            {customer.name}
          </Text>
          <Text p secondary marginTop={sizes.xs}>
            {customer.description}
          </Text>
          <Text p secondary marginTop={sizes.xs}>
            SOs: {customer.salesOrder.length}
          </Text>
        </Block>

        <Block flex={0} justify="center" align="center">
          <Feather name="chevron-right" size={sizes.h4} />
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
          <Block align="center" marginTop={sizes.m}>
            <Text h4 secondary>
              No customers found
            </Text>
            <Text secondary>(pull down to refresh)</Text>
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
