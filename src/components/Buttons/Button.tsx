import React, { useCallback } from 'react';
import {
  ViewStyle,
  Vibration,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

import useTheme from '@/utils/hooks/context/useTheme';
import { IButtonProps } from 'types';

const Button = ({
  id = 'Button',
  children,
  style,
  color,
  gradient,
  variant,
  flex,
  radius,
  round,
  rounded,
  disabled,
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
  align,
  justify,
  height,
  width,
  row,
  outlined,
  social,
  activeOpacity = 0.7,
  shadow = true,
  position,
  right,
  left,
  top,
  bottom,
  haptic = true,
  vibrate,
  vibrateRepeat,
  onPress,
  loading = false,
  ...props
}: IButtonProps) => {
  const { colors, sizes } = useTheme();

  const buttonColor = color
    ? color
    : !!variant
    ? colors?.[variant as keyof typeof colors]
    : 'transparent';

  const buttonStyles = StyleSheet.flatten([
    {
      // minHeight: sizes.xl,
      // minWidth: sizes.xl,
      paddingHorizontal: sizes.sm,
      paddingVertical: sizes.s,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: buttonColor,
      borderRadius: rounded ? sizes.s : sizes.buttonRadius,
      ...(shadow &&
        buttonColor !== 'transparent' &&
        !outlined && {
          // fixes bad shadow on Android
          shadowColor: colors.shadow,
          shadowOffset: {
            width: sizes.shadowOffsetWidth,
            height: sizes.shadowOffsetHeight,
          },
          shadowOpacity: sizes.shadowOpacity,
          shadowRadius: sizes.shadowRadius,
          elevation: sizes.elevation,
        }),
      ...(row && { flexDirection: 'row' }),
      ...(radius && { borderRadius: radius }),
      ...(flex !== undefined && { flex }),
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
      ...(align && { alignItems: align }),
      ...(justify && { justifyContent: justify }),
      ...(height && { height }),
      ...(width && { width }),
      ...(typeof outlined === 'boolean' && {
        borderWidth: sizes.buttonBorder,
        borderColor: buttonColor,
        backgroundColor: 'transparent',
      }),
      ...(typeof outlined === 'string' && {
        borderWidth: sizes.buttonBorder,
        borderColor: outlined,
      }),
      ...(social && {
        backgroundColor: colors?.[social],
        width: sizes.socialSize,
        height: sizes.socialSize,
        borderRadius: sizes.socialRadius,
      }),
      ...(disabled && { opacity: 0.5 }),
      ...(position && { position }),
      ...(right !== undefined && { right }),
      ...(left !== undefined && { left }),
      ...(top !== undefined && { top }),
      ...(bottom !== undefined && { bottom }),
    },
    style,
  ]) as ViewStyle;

  /* handle onPress event */
  const handlePress = useCallback(
    event => {
      onPress?.(event);

      /* vibrate onPress */
      if (vibrate) {
        Vibration.vibrate(vibrate, vibrateRepeat);
      }

      /* haptic feedback onPress */
      if (haptic) {
        Haptics.selectionAsync();
      }
    },
    [haptic, vibrate, vibrateRepeat, onPress]
  );

  if (round) {
    const maxSize = Math.max(
      Number(buttonStyles.width || 0),
      Number(buttonStyles.minWidth || 0),
      Number(buttonStyles.maxWidth || 0),
      Number(buttonStyles.height || 0),
      Number(buttonStyles.minHeight || 0),
      Number(buttonStyles.maxHeight || 0)
    );
    buttonStyles.maxWidth = maxSize;
    buttonStyles.maxHeight = maxSize;
    buttonStyles.borderRadius = maxSize / 2;
  }

  const gradientStyles = StyleSheet.flatten([
    buttonStyles,
    {
      flex: 1,
      width: '100%',
      ...(round && { maxWidth: buttonStyles.maxWidth }),
    },
  ]) as ViewStyle;

  // generate component testID or accessibilityLabel based on Platform.OS
  const buttonID =
    Platform.OS === 'android' ? { accessibilityLabel: id } : { testID: id };

  const loader = <ActivityIndicator color={colors.white} />;

  if (gradient) {
    return (
      <TouchableOpacity
        {...buttonID}
        activeOpacity={activeOpacity}
        onPress={handlePress}
        disabled={disabled}
        {...props}
        style={buttonStyles}
      >
        <LinearGradient
          style={gradientStyles}
          colors={gradient}
          start={[0, 1]}
          end={[1, 0]}
        >
          {loading ? loader : children}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  if (social) {
    const socialIcon =
      social === 'facebook'
        ? 'logo-facebook'
        : social === 'twitter'
        ? 'logo-twitter'
        : 'logo-dribbble';

    return (
      <TouchableOpacity
        {...buttonID}
        activeOpacity={activeOpacity}
        onPress={handlePress}
        disabled={disabled}
        {...props}
        style={buttonStyles}
      >
        {loading ? (
          loader
        ) : (
          <Ionicons
            name={socialIcon}
            size={sizes.socialIconSize}
            color={colors.white}
          />
        )}
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      {...buttonID}
      activeOpacity={activeOpacity}
      onPress={handlePress}
      disabled={disabled}
      {...props}
      style={buttonStyles}
    >
      {loading ? loader : children}
    </TouchableOpacity>
  );
};

export default React.memo(Button);
