import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { IBlockProps } from 'types';
import useTheme from '@/utils/hooks/context/useTheme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { isAndroid } from '@/constants/platform';
import useSession from '@/utils/hooks/context/useSession';

const Block = (
  {
    id = 'Block',
    children,
    style,
    shadow,
    card,
    center,
    outlined,
    overflow,
    row,
    safe,
    keyboard,
    keyboardView,
    scroll,
    color,
    gradient,
    variant,
    radius,
    height,
    width,
    margin,
    marginBottom,
    marginTop,
    marginHorizontal,
    marginVertical,
    marginRight,
    marginLeft,
    padding,
    paddingBottom,
    paddingTop,
    paddingHorizontal,
    paddingVertical,
    paddingRight,
    paddingLeft,
    justify,
    align,
    flex = 1,
    wrap,
    blur,
    intensity,
    tint,
    position,
    right,
    left,
    top,
    bottom,
    end,
    start,
    extraHeight = 0,
    ...rest
  }: IBlockProps,
  ref: any
) => {
  const {
    state: { altTheme },
  } = useSession();

  const { colors, sizes } = useTheme();

  const blockColor = color
    ? color
    : !!variant
    ? variant === 'alternative'
      ? altTheme.colors.background
      : colors?.[variant]
    : undefined;

  const blockStyles = StyleSheet.flatten([
    {
      ...(shadow && {
        shadowColor: colors.shadow,
        shadowOffset: {
          width: sizes.shadowOffsetWidth,
          height: sizes.shadowOffsetHeight,
        },
        shadowOpacity: sizes.shadowOpacity,
        shadowRadius: sizes.shadowRadius,
        elevation: sizes.elevation,
      }),
      ...(card && {
        backgroundColor: colors.card,
        borderRadius: sizes.cardRadius,
        padding: sizes.cardPadding,
        shadowColor: colors.shadow,
        shadowOffset: {
          width: sizes.shadowOffsetWidth,
          height: sizes.shadowOffsetHeight,
        },
        shadowOpacity: sizes.shadowOpacity,
        shadowRadius: sizes.shadowRadius,
        elevation: sizes.elevation,
      }),
      ...(margin !== undefined && { margin }),
      ...(marginBottom && { marginBottom }),
      ...(marginTop && { marginTop }),
      ...(marginHorizontal && { marginHorizontal }),
      ...(marginVertical && { marginVertical }),
      ...(marginRight && { marginRight }),
      ...(marginLeft && { marginLeft }),
      ...(padding !== undefined && { padding }),
      ...(paddingBottom && { paddingBottom }),
      ...(paddingTop && { paddingTop }),
      ...(paddingHorizontal && { paddingHorizontal }),
      ...(paddingVertical && { paddingVertical }),
      ...(paddingRight && { paddingRight }),
      ...(paddingLeft && { paddingLeft }),
      ...(radius && { borderRadius: radius }),
      ...(height && { height }),
      ...(width && { width }),
      ...(overflow && { overflow }),
      ...(flex !== undefined && { flex }),
      ...(row && { flexDirection: 'row' }),
      ...(align && { alignItems: align }),
      ...(center && { justifyContent: 'center' }),
      ...(justify && { justifyContent: justify }),
      ...(wrap && { flexWrap: wrap }),
      ...(blockColor && { backgroundColor: blockColor }),
      ...(outlined && {
        borderWidth: 1,
        borderColor: blockColor,
        backgroundColor: 'transparent',
      }),
      ...(position && { position }),
      ...(right !== undefined && { right }),
      ...(left !== undefined && { left }),
      ...(top !== undefined && { top }),
      ...(bottom !== undefined && { bottom }),
    },
    style,
  ]) as ViewStyle;

  // generate component testID or accessibilityLabel based on Platform.OS
  const blockID =
    Platform.OS === 'android' ? { accessibilityLabel: id } : { testID: id };

  if (safe) {
    return (
      <SafeAreaView ref={ref} {...blockID} {...rest} style={blockStyles}>
        {children}
      </SafeAreaView>
    );
  }

  if (keyboard) {
    return (
      <KeyboardAwareScrollView
        ref={ref}
        extraHeight={75 + extraHeight} // 75 is the default
        enableOnAndroid
        keyboardDismissMode='interactive'
        {...blockID}
        {...rest}
        style={blockStyles}
      >
        {children}
      </KeyboardAwareScrollView>
    );
  }

  if (keyboardView) {
    return (
      <KeyboardAvoidingView
        ref={ref}
        behavior={isAndroid ? 'height' : 'padding'}
        keyboardDismissMode='interactive'
        {...blockID}
        {...rest}
        style={blockStyles}
      >
        {children}
      </KeyboardAvoidingView>
    );
  }

  if (scroll) {
    return (
      <ScrollView ref={ref} {...blockID} {...rest} style={blockStyles}>
        {children}
      </ScrollView>
    );
  }

  if (gradient) {
    return (
      <LinearGradient
        ref={ref}
        {...blockID}
        colors={gradient}
        style={blockStyles}
        end={end || [1, 0]}
        start={start || [0, 0]}
        {...rest}
      >
        {children}
      </LinearGradient>
    );
  }

  if (blur) {
    return (
      <BlurView
        {...blockID}
        tint={tint}
        intensity={intensity}
        style={blockStyles}
      >
        {children}
      </BlurView>
    );
  }

  return (
    <View {...blockID} {...rest} style={blockStyles}>
      {children}
    </View>
  );
};

export default React.memo(React.forwardRef(Block));
