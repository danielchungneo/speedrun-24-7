import React, { useCallback, useState } from 'react';
import { Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import Block from '@/components/Block';
import Text from '@/components/Text';
import Image from '@/components/Image';
import Button from '@/components/Buttons/Button';
import useTheme from '@/utils/hooks/context/useTheme';
import useTranslation from '@/utils/hooks/context/useTranslation';
import { isAndroid } from '@/constants/platform';
import GoBackButton from '@/components/Buttons/GoBackButton';
import { StatusBar } from 'expo-status-bar';

const ProfileScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { assets, colors, sizes, styles } = useTheme();

  const [user] = useState({
    id: 1,
    name: 'Devin Coldewey',
    department: 'Marketing Manager',
    stats: { posts: 323, followers: 53200, following: 749000 },
    social: { twitter: 'MorelandConnect', dribbble: '' },
    about:
      'Decisions: If you can’t decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term (pain avoidance is creating an illusion of equality).',
    avatar:
      'https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?fit=crop&w=80&q=80',
  });

  const IMAGE_SIZE = (sizes.width - (sizes.padding + sizes.sm) * 2) / 3;
  const IMAGE_VERTICAL_SIZE =
    (sizes.width - (sizes.padding + sizes.sm) * 2) / 2;
  const IMAGE_MARGIN = (sizes.width - IMAGE_SIZE * 3 - sizes.padding * 2) / 2;
  const IMAGE_VERTICAL_MARGIN =
    (sizes.width - (IMAGE_VERTICAL_SIZE + sizes.sm) * 2) / 2;

  const handleSocialLink = useCallback(
    (type: 'twitter' | 'dribbble') => {
      const url =
        type === 'twitter'
          ? `https://twitter.com/${user?.social?.twitter}`
          : `https://dribbble.com/${user?.social?.dribbble}`;

      try {
        Linking.openURL(url);
      } catch (error) {
        alert(`Cannot open URL: ${url}`);
      }
    },
    [user]
  );

  return (
    <>
      <StatusBar />

      <Block safe>
        <Block
          scroll
          paddingHorizontal={sizes.s}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: sizes.padding }}
        >
          <Block flex={0}>
            <Image
              background
              resizeMode='cover'
              padding={sizes.sm}
              paddingBottom={sizes.l}
              radius={sizes.cardRadius}
              source={assets.background}
            >
              <GoBackButton
                color={colors.white}
                style={{ padding: sizes.s, marginBottom: sizes.sm }}
              />

              <Block flex={0} align='center'>
                <Image
                  width={64}
                  height={64}
                  marginBottom={sizes.sm}
                  source={{ uri: user?.avatar }}
                />
                <Text size='h5' center variant='white'>
                  {user?.name}
                </Text>
                <Text size='p' center variant='white'>
                  {user?.department}
                </Text>

                <Block row marginVertical={sizes.m}>
                  <Button
                    variant='white'
                    outlined
                    shadow={false}
                    radius={sizes.m}
                    onPress={() => {
                      alert(`Follow ${user?.name}`);
                    }}
                  >
                    <Block
                      justify='center'
                      radius={sizes.m}
                      paddingHorizontal={sizes.m}
                      color='rgba(255,255,255,0.2)'
                    >
                      <Text variant='white' bold transform='uppercase'>
                        {t('common.follow')}
                      </Text>
                    </Block>
                  </Button>
                  <Button
                    shadow={false}
                    radius={sizes.m}
                    marginHorizontal={sizes.sm}
                    color='rgba(255,255,255,0.2)'
                    outlined={String(colors.white)}
                    onPress={() => handleSocialLink('twitter')}
                  >
                    <Ionicons
                      size={18}
                      name='logo-twitter'
                      color={colors.white}
                    />
                  </Button>
                  <Button
                    shadow={false}
                    radius={sizes.m}
                    color='rgba(255,255,255,0.2)'
                    outlined={String(colors.white)}
                    onPress={() => handleSocialLink('dribbble')}
                  >
                    <Ionicons
                      size={18}
                      name='logo-dribbble'
                      color={colors.white}
                    />
                  </Button>
                </Block>
              </Block>
            </Image>

            {/* profile: stats */}
            <Block
              flex={0}
              radius={sizes.sm}
              shadow={!isAndroid} // disabled shadow on Android due to blur overlay + elevation issue
              marginTop={-sizes.l}
              marginHorizontal='8%'
              color='rgba(255,255,255,0.2)'
            >
              <Block
                row
                blur
                flex={0}
                intensity={100}
                radius={sizes.sm}
                overflow='hidden'
                tint={colors.blurTint}
                justify='space-evenly'
                paddingVertical={sizes.sm}
                renderToHardwareTextureAndroid
              >
                <Block align='center'>
                  <Text size='h5'>{user?.stats?.posts}</Text>
                  <Text>{t('profile.posts')}</Text>
                </Block>
                <Block align='center'>
                  <Text size='h5'>{(user?.stats?.followers || 0) / 1000}k</Text>
                  <Text>{t('profile.followers')}</Text>
                </Block>
                <Block align='center'>
                  <Text size='h5'>{(user?.stats?.following || 0) / 1000}k</Text>
                  <Text>{t('profile.following')}</Text>
                </Block>
              </Block>
            </Block>

            {/* profile: about me */}
            <Block paddingHorizontal={sizes.sm}>
              <Text
                size='h5'
                semibold
                marginBottom={sizes.s}
                marginTop={sizes.sm}
              >
                {t('profile.aboutMe')}
              </Text>
              <Text size='p' lineHeight={26}>
                {user?.about}
              </Text>
            </Block>

            {/* profile: photo album */}
            <Block paddingHorizontal={sizes.sm} marginTop={sizes.s}>
              <Block row align='center' justify='space-between'>
                <Text size='h5' semibold>
                  {t('common.album')}
                </Text>
                <Button>
                  <Text size='p' variant='primary' semibold>
                    {t('common.viewall')}
                  </Text>
                </Button>
              </Block>
              <Block row justify='space-between' wrap='wrap'>
                <Image
                  resizeMode='cover'
                  source={assets?.photo1}
                  style={{
                    width: IMAGE_VERTICAL_SIZE + IMAGE_MARGIN / 2,
                    height: IMAGE_VERTICAL_SIZE * 2 + IMAGE_VERTICAL_MARGIN,
                  }}
                />
                <Block marginLeft={sizes.m}>
                  <Image
                    resizeMode='cover'
                    source={assets?.photo2}
                    marginBottom={IMAGE_VERTICAL_MARGIN}
                    style={{
                      height: IMAGE_VERTICAL_SIZE,
                      width: IMAGE_VERTICAL_SIZE,
                    }}
                  />
                  <Image
                    resizeMode='cover'
                    source={assets?.photo3}
                    style={{
                      height: IMAGE_VERTICAL_SIZE,
                      width: IMAGE_VERTICAL_SIZE,
                    }}
                  />
                </Block>
              </Block>
            </Block>
          </Block>
        </Block>
      </Block>
    </>
  );
};

export default ProfileScreen;
