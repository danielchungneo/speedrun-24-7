import React from 'react';
import { Platform, StyleSheet, Text, TextStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ITextProps, ITheme } from 'types';
import useTheme from '@/utils/hooks/context/useTheme';
import { isWeb } from '@/constants/platform';
import TextGradient from './TextGradient';
import useSession from '@/utils/hooks/context/useSession';
import { IFontSizeVariant } from 'types/components/common';

const getFontStyle = (theme: ITheme, fontSize: IFontSizeVariant) => {
  return {
    fontSize: theme.sizes[fontSize],
    lineHeight: theme.lines[fontSize],
    fontWeight: theme.weights[fontSize],
    fontFamily: theme.fonts[fontSize],
  };
};

const Typography = ({
  id = 'Text',
  children,
  style,
  center,
  gradient,
  color,
  opacity,
  variant,
  size,
  bold,
  semibold,
  weight,
  font,
  align,
  transform,
  lineHeight,
  position,
  right,
  left,
  top,
  bottom,
  start,
  end,
  marginBottom,
  marginTop,
  marginHorizontal,
  marginVertical,
  marginRight,
  marginLeft,
  paddingBottom,
  paddingTop,
  paddingHorizontal,
  paddingVertical,
  paddingRight,
  paddingLeft,
  ...rest
}: ITextProps) => {
  const {
    state: { theme, altTheme },
  } = useSession();
  const { colors, sizes, lines, weights, fonts } = useTheme();

  const textColor = color
    ? color
    : !!variant
    ? variant === 'alternative'
      ? altTheme.colors.text
      : colors?.[variant]
    : undefined;

  const textStyles = StyleSheet.flatten([
    {
      color: textColor || colors.text,

      // @ts-ignore
      fontSize: sizes.text,
      // @ts-ignore
      lineHeight: lines.text,
      // @ts-ignore
      fontWeight: weights.text,
      // @ts-ignore
      fontFamily: fonts.text,

      ...(typeof size === 'string'
        ? getFontStyle(theme, size as IFontSizeVariant)
        : { fontSize: size || sizes.text }),

      ...(marginBottom && { marginBottom }),
      ...(marginTop && { marginTop }),
      ...(marginHorizontal && { marginHorizontal }),
      ...(marginVertical && { marginVertical }),
      ...(marginRight && { marginRight }),
      ...(marginLeft && { marginLeft }),
      ...(paddingBottom && { paddingBottom }),
      ...(paddingTop && { paddingTop }),
      ...(paddingHorizontal && { paddingHorizontal }),
      ...(paddingVertical && { paddingVertical }),
      ...(paddingRight && { paddingRight }),
      ...(paddingLeft && { paddingLeft }),
      ...(center && { textAlign: 'center' }),
      ...(align && { textAlign: align }),
      ...(bold && { fontFamily: fonts.bold }),
      ...(semibold && { fontFamily: fonts.semibold }),
      ...(weight && { fontWeight: weight }),
      ...(transform && { textTransform: transform }),
      ...(font && { fontFamily: font }),
      ...(color && { color }),
      ...(opacity && { opacity }),
      ...(lineHeight && { lineHeight }),
      ...(position && { position }),
      ...(right !== undefined && { right }),
      ...(left !== undefined && { left }),
      ...(top !== undefined && { top }),
      ...(bottom !== undefined && { bottom }),
    },
    style,
  ]) as TextStyle;

  /*
   * Calculate gradient height container based on text lineHeight or fontSize
   * add an extra value from marginVertical or marginTop or marginBottom
   */
  const gradientHeight =
    Number(textStyles?.lineHeight || textStyles?.fontSize || 0) +
    Number(
      textStyles?.marginVertical ||
        textStyles?.marginTop ||
        textStyles?.marginBottom ||
        0
    );

  // generate component testID or accessibilityLabel based on Platform.OS
  const textID =
    Platform.OS === 'android' ? { accessibilityLabel: id } : { testID: id };

  const content = (
    <Text
      //
      {...textID}
      {...rest}
      style={textStyles}
    >
      {children}
    </Text>
  );

  if (gradient && !isWeb) {
    return (
      <TextGradient content={content}>
        <LinearGradient
          colors={gradient}
          end={end || [0.2, 0]}
          start={start || [0, 0]}
          style={[
            StyleSheet.absoluteFill,
            {
              // flex: 1,
              // alignSelf: 'stretch',
              height: gradientHeight,
              flexWrap: 'wrap',
            },
          ]}
        />
      </TextGradient>
    );
  }

  return content;
};

export default React.memo(Typography);
