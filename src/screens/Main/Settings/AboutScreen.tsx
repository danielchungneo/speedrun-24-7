import React, { useCallback } from 'react';
import { Linking } from 'react-native';
import Constants from 'expo-constants';
import app from '@/../app.json';

import useTheme from '@/utils/hooks/context/useTheme';
import useTranslation from '@/utils/hooks/context/useTranslation';
import { StatusBar } from 'expo-status-bar';
import Button from '@/components/Buttons/Button';
import Text from '@/components/Text';
import Block from '@/components/Block';

const AboutScreen = () => {
  const { t } = useTranslation();
  const { gradients, sizes } = useTheme();

  const handleWebLink = useCallback((url) => Linking.openURL(url), []);

  return (
    <>
      <StatusBar />

      <Block
        scroll
        padding={sizes.padding}
        contentContainerStyle={{ paddingBottom: sizes.padding * 1.5 }}
      >
        <Block card flex={0} padding={sizes.sm} marginBottom={sizes.sm}>
          <Text p semibold marginBottom={sizes.sm}>
            About MC-APP
          </Text>
          <Text align="justify" marginBottom={sizes.s}>
            Speed up development with
            <Text primary semibold>
              &nbsp;MC-APP
            </Text>
            , a powerful template that allows quick iterations to build full
            enterprise apps.
          </Text>
          <Text align="justify" marginBottom={sizes.s}>
            The product is loaded with lots of components (like buttons, icons,
            cards, sections, example pages, and many more) that will assist in
            the initial build.
          </Text>

          <Button
            gradient={gradients.primary}
            onPress={() => handleWebLink('https://morelandconnect.com')}
          >
            <Text white semibold>
              Visit MorelandConnect
            </Text>
          </Button>
        </Block>
        <Block card flex={0} padding={sizes.sm}>
          <Text p semibold>
            {t('common.appDetails')}
          </Text>
          <Block flex={0} row justify="space-between" marginTop={sizes.sm}>
            <Text>App name</Text>
            <Text semibold>MC-APP</Text>
          </Block>

          <Block flex={0} row justify="space-between" marginTop={sizes.sm}>
            <Text>{t('common.appVersion')}</Text>
            <Text semibold>{app.expo.version}</Text>
          </Block>
          <Block flex={0} row justify="space-between" marginTop={sizes.sm}>
            <Text>{t('common.buildVersion')}</Text>
            <Text semibold>{Constants.nativeBuildVersion}</Text>
          </Block>
          <Block flex={0} row justify="space-between" marginTop={sizes.sm}>
            <Text>{t('common.expoVersion')}</Text>
            <Text semibold>{Constants.expoVersion}</Text>
          </Block>
        </Block>
      </Block>
    </>
  );
};

export default AboutScreen;
