import { useNavigation } from '@react-navigation/core';
import React from 'react';
import useTranslation from '@/utils/hooks/context/useTranslation';
import useTheme from '@/utils/hooks/context/useTheme';
import Block from '@/components/Block';
import Text from '@/components/Text';
import Image from '@/components/Image';
import Button from '@/components/Buttons/Button';
import { Ionicons } from '@expo/vector-icons';
import useSession from '@/utils/hooks/context/useSession';
import SCREENS from '@/constants/screens';
import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import Switch from '@/components/Inputs_NEW/Select/Switch';

const SettingsScreen = () => {
  const [useFaceId, setUseFaceId] = useState<boolean>(true);

  const navigation = useNavigation();
  const {
    state: { isDark, navigationType },
    actions: { updateTheme, setNavigationType },
  } = useSession();
  const { t, locale, setLocale } = useTranslation();
  const { assets, colors, gradients, sizes } = useTheme();
  const {
    actions: { logout },
  } = useSession();

  const isEN = locale.includes('en');

  const handleLogout = () => {
    logout();
  };

  {
    /* TODO: REMOVE_ME */
  }
  const toggleNavigationType = () => {
    setNavigationType(navigationType === 'drawer' ? 'tabs' : 'drawer');
  };

  return (
    <>
      <StatusBar />

      <Block
        scroll
        padding={sizes.padding}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: sizes.xxl }}
      >
        <Block flex={0} marginBottom={sizes.m}>
          <Button onPress={handleLogout} row variant='primary'>
            <Text
              bold
              variant='white'
              transform='uppercase'
              marginRight={sizes.sm}
            >
              Sign out
            </Text>
            <Text variant='white'>
              <Ionicons name='log-out-outline' size={sizes.m} />
            </Text>
          </Button>

          {/* TODO: REMOVE_ME */}
          <Button
            onPress={toggleNavigationType}
            marginTop={sizes.sm}
            row
            variant='primary'
          >
            <Text
              bold
              variant='white'
              transform='uppercase'
              marginRight={sizes.sm}
            >
              Switch to {navigationType === 'drawer' ? 'tabs' : 'drawer'}
            </Text>
            <Text variant='white'>
              <Ionicons name='menu' size={sizes.m} />
            </Text>
          </Button>
        </Block>

        {/* settings */}
        <Block card padding={sizes.sm} marginBottom={sizes.sm}>
          <Block row align='center' marginBottom={sizes.m}>
            <Block
              flex={0}
              align='center'
              justify='center'
              radius={sizes.s}
              width={sizes.md}
              height={sizes.md}
              marginRight={sizes.s}
              gradient={gradients.primary}
            >
              <Image
                source={assets?.settings}
                color={colors.white}
                radius={0}
              />
            </Block>

            <Block>
              <Text semibold>{t('settings.recommended.title')}</Text>
              <Text size={12}>{t('settings.recommended.subtitle')}</Text>
            </Block>
          </Block>

          <Block
            row
            align='center'
            justify='space-between'
            marginBottom={sizes.sm}
          >
            <Text>{t('settings.recommended.darkmode')}</Text>
            <Switch
              form={false}
              value={isDark}
              onChange={e => updateTheme(e.target.value)}
            />
          </Block>

          <Block
            row
            align='center'
            justify='space-between'
            marginBottom={sizes.sm}
          >
            <Text>{t('settings.recommended.language')} EN/FR</Text>
            <Switch
              form={false}
              value={!isEN}
              onChange={e => setLocale(e.target.value ? 'fr' : 'en')}
            />
          </Block>

          <Block
            row
            align='center'
            justify='space-between'
            marginBottom={sizes.sm}
          >
            <Text>{t('settings.recommended.faceid')}</Text>
            <Switch
              form={false}
              value={useFaceId}
              onChange={e => setUseFaceId(e.target.value)}
            />
          </Block>
        </Block>
        {/* payment */}
        <Block card padding={sizes.sm} marginBottom={sizes.sm}>
          <Block row align='center' marginBottom={sizes.s}>
            <Block
              flex={0}
              align='center'
              justify='center'
              radius={sizes.s}
              width={sizes.md}
              height={sizes.md}
              marginRight={sizes.s}
              gradient={gradients.primary}
            >
              <Image source={assets?.payment} color={colors.white} radius={0} />
            </Block>
            <Block>
              <Text semibold>{t('settings.payment.title')}</Text>
              <Text size={12}>{t('settings.payment.subtitle')}</Text>
            </Block>
          </Block>
          <Button row align='center' justify='space-between'>
            <Text>{t('settings.payment.options')}</Text>
            <Image
              source={assets.arrow}
              color={colors.icon}
              radius={0}
              height={18}
              width={10}
            />
          </Button>
          <Button row align='center' justify='space-between'>
            <Text>{t('settings.payment.giftcards')}</Text>
            <Image
              source={assets.arrow}
              color={colors.icon}
              radius={0}
              height={18}
              width={10}
            />
          </Button>
        </Block>

        {/* privacy */}
        <Block card padding={sizes.sm} marginBottom={sizes.sm}>
          <Block row align='center' marginBottom={sizes.s}>
            <Block
              flex={0}
              align='center'
              justify='center'
              radius={sizes.s}
              width={sizes.md}
              height={sizes.md}
              marginRight={sizes.s}
              gradient={gradients.primary}
            >
              <Image
                source={assets?.document}
                color={colors.white}
                radius={0}
              />
            </Block>
            <Block>
              <Text semibold>{t('settings.privacy.title')}</Text>
              <Text size={12}>{t('settings.privacy.subtitle')}</Text>
            </Block>
          </Block>
          <Button
            row
            align='center'
            justify='space-between'
            onPress={() => navigation.navigate(SCREENS.AGREEMENT)}
          >
            <Text>{t('settings.privacy.agreement')}</Text>
            <Image
              source={assets.arrow}
              color={colors.icon}
              radius={0}
              height={18}
              width={10}
            />
          </Button>
          <Button
            row
            align='center'
            justify='space-between'
            onPress={() => navigation.navigate(SCREENS.PRIVACY)}
          >
            <Text>{t('settings.privacy.privacy')}</Text>
            <Image
              source={assets.arrow}
              color={colors.icon}
              radius={0}
              height={18}
              width={10}
            />
          </Button>
          <Button
            row
            align='center'
            justify='space-between'
            onPress={() => navigation.navigate(SCREENS.ABOUT)}
          >
            <Text>{t('settings.privacy.about')}</Text>
            <Image
              source={assets.arrow}
              color={colors.icon}
              radius={0}
              height={18}
              width={10}
            />
          </Button>
        </Block>
      </Block>
    </>
  );
};

export default SettingsScreen;
