import React from 'react';
import useTheme from '@/utils/hooks/context/useTheme';
import Block from '@/components/Block';
import CustomerForm from '@/components/Entities/Demo/MC/Customer/CustomerForm';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import SCREENS from '@/constants/screens';

const CustomerEditScreen = ({ route }) => {
  const { styles, colors, sizes } = useTheme();
  const navigation = useNavigation();

  const customer = route?.params?.customer;
  const customerId = customer?.id || 'create';

  function closeForm (refetch?: boolean) {
    navigation.navigate(SCREENS.MC_CUSTOMER_LIST, {
      refetch,
    });
  }

  return (
    <>
      <StatusBar style='light' />

      <Block>
        <Block paddingHorizontal={sizes.padding}>
          <CustomerForm
            activeObject={customer}
            id={customerId}
            onCloseForm={closeForm}
            title='Customer'
          />
        </Block>
      </Block>
    </>
  );
};

export default CustomerEditScreen;
