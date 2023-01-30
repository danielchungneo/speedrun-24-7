import React from 'react';
import useTheme from '@/utils/hooks/context/useTheme';
import Block from '@/components/Block';
import CustomersList from '@/components/Entities/Demo/MC/Customer/CustomerList';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import useSession from '@/utils/hooks/context/useSession';

const CustomerListScreen = ({ route }) => {
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
        <CustomersList />
      </Block>
    </>
  );
};

export default CustomerListScreen;
