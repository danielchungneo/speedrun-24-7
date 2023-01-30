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
import screens from '@/constants/screens';
import useApp from '@/utils/hooks/context/useApp';
import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import Switch from '@/components/Inputs/Base/Switch';

const SettingsScreen = () => {
  const [useFaceId, setUseFaceId] = useState<boolean>(true);

  const navigation = useNavigation();
  const {
    state: { isDark, navigationType },
    actions: { handleIsDark, setNavigationType },
  } = useApp();
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
          <Button onPress={handleLogout} row primary>
            <Text bold white transform="uppercase" marginRight={sizes.sm}>
              Sign out
            </Text>
            <Text white>
              <Ionicons name="log-out-outline" size={sizes.m} />
            </Text>
          </Button>

          {/* TODO: REMOVE_ME */}
          <Button
            onPress={toggleNavigationType}
            marginTop={sizes.sm}
            row
            primary
          >
            <Text bold white transform="uppercase" marginRight={sizes.sm}>
              Switch to {navigationType === 'drawer' ? 'tabs' : 'drawer'}
            </Text>
            <Text white>
              <Ionicons name="menu" size={sizes.m} />
            </Text>
          </Button>
        </Block>

        {/* settings */}
        <Block card padding={sizes.sm} marginBottom={sizes.sm}>
          <Block row align="center" marginBottom={sizes.m}>
            <Block
              flex={0}
              align="center"
              justify="center"
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
            align="center"
            justify="space-between"
            marginBottom={sizes.sm}
          >
            <Text>{t('settings.recommended.darkmode')}</Text>
            <Switch
              checked={isDark}
              onPress={(checked) => handleIsDark(checked)}
            />
          </Block>

          <Block
            row
            align="center"
            justify="space-between"
            marginBottom={sizes.sm}
          >
            <Text>{t('settings.recommended.language')} EN/FR</Text>
            <Switch
              checked={!isEN}
              onPress={(checked) => setLocale(checked ? 'fr' : 'en')}
            />
          </Block>

          <Block
            row
            align="center"
            justify="space-between"
            marginBottom={sizes.sm}
          >
            <Text>{t('settings.recommended.faceid')}</Text>
            <Switch checked={useFaceId} onPress={setUseFaceId} />
          </Block>
        </Block>
        {/* payment */}
        <Block card padding={sizes.sm} marginBottom={sizes.sm}>
          <Block row align="center" marginBottom={sizes.s}>
            <Block
              flex={0}
              align="center"
              justify="center"
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
          <Button row align="center" justify="space-between">
            <Text>{t('settings.payment.options')}</Text>
            <Image
              source={assets.arrow}
              color={colors.icon}
              radius={0}
              height={18}
              width={10}
            />
          </Button>
          <Button row align="center" justify="space-between">
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
          <Block row align="center" marginBottom={sizes.s}>
            <Block
              flex={0}
              align="center"
              justify="center"
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
            align="center"
            justify="space-between"
            onPress={() => navigation.navigate(screens.AGREEMENT)}
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
            align="center"
            justify="space-between"
            onPress={() => navigation.navigate(screens.PRIVACY)}
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
            align="center"
            justify="space-between"
            onPress={() => navigation.navigate(screens.ABOUT)}
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
