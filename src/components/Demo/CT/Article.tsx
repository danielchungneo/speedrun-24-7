import React from 'react';
import dayjs from 'dayjs';
import { TouchableWithoutFeedback } from 'react-native';

import Text from '../../Text';
import Block from '../../Block';
import Image from '../../Image';
import useTheme from '@/utils/hooks/context/useTheme';
import { IArticle } from 'types';
import useTranslation from '@/utils/hooks/context/useTranslation';

const Article = ({
  title,
  description,
  image,
  category,
  rating,
  location,
  timestamp,
  user,
  onPress,
}: IArticle) => {
  const { t } = useTranslation();
  const { colors, gradients, icons, sizes } = useTheme();

  // render card for Newest & Fashion
  if (category?.id !== 1) {
    return (
      <TouchableWithoutFeedback onPress={onPress}>
        <Block card padding={sizes.sm} marginTop={sizes.sm}>
          <Image height={170} resizeMode='cover' source={{ uri: image }} />
          {/* article category */}
          {category?.name && (
            <Text
              bold
              size={13}
              marginTop={sizes.s}
              transform='uppercase'
              marginLeft={sizes.xs}
              gradient={gradients.primary}
            >
              {category?.name}
            </Text>
          )}

          {/* article description */}
          {description && (
            <Text
              size='p'
              marginTop={sizes.s}
              marginLeft={sizes.xs}
              marginBottom={sizes.sm}
            >
              {description}
            </Text>
          )}

          {/* user details */}
          {user?.name && (
            <Block row marginLeft={sizes.xs} marginBottom={sizes.xs}>
              <Image
                radius={sizes.s}
                width={sizes.xl}
                height={sizes.xl}
                source={{ uri: user?.avatar }}
                style={{ backgroundColor: colors.white }}
              />
              <Block justify='center' marginLeft={sizes.s}>
                <Text size='p' semibold>
                  {user?.name}
                </Text>
                <Text size='p' variant='neutral'>
                  {t('common.posted', {
                    date: dayjs(timestamp).format('DD MMMM') || '-',
                  })}
                </Text>
              </Block>
            </Block>
          )}

          {/* location & rating */}
          {(Boolean(location) || Boolean(rating)) && (
            <Block row align='center'>
              <Image source={icons.location} marginRight={sizes.s} />
              <Text size={12} semibold>
                {location?.city}, {location?.country}
              </Text>
              <Text size='p' bold marginHorizontal={sizes.s}>
                ???
              </Text>
              <Image source={icons.star} marginRight={sizes.s} />
              <Text size={12} semibold>
                {rating}/5
              </Text>
            </Block>
          )}
        </Block>
      </TouchableWithoutFeedback>
    );
  }

  // render card for Popular
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Block card variant='white' padding={0} marginTop={sizes.sm}>
        <Image
          background
          resizeMode='cover'
          radius={sizes.cardRadius}
          source={{ uri: image }}
        >
          <Block color={colors.overlay} padding={sizes.padding}>
            <Text size='h4' variant='white' marginBottom={sizes.sm}>
              {title}
            </Text>
            <Text size='p' variant='white'>
              {description}
            </Text>
            {/* user details */}
            <Block row marginTop={sizes.xxl}>
              <Image
                radius={sizes.s}
                width={sizes.xl}
                height={sizes.xl}
                source={{ uri: user?.avatar }}
                style={{ backgroundColor: colors.white }}
              />
              <Block justify='center' marginLeft={sizes.s}>
                <Text size='p' variant='white' semibold>
                  {user?.name}
                </Text>
                <Text size='p' variant='white'>
                  {user?.department}
                </Text>
              </Block>
            </Block>
          </Block>
        </Image>
      </Block>
    </TouchableWithoutFeedback>
  );
};

export default Article;
