import Block from '@/components/Block';
import useTheme from '@/utils/hooks/context/useTheme';
import { cloneDeep } from 'lodash';
import React, { forwardRef, Ref, useEffect, useRef, useState } from 'react';
import {
  Animated,
  Platform,
  Pressable,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { ICheckbox } from 'types/components/inputComponents';
import * as Haptics from 'expo-haptics';
import Image from '@/components/Image';
import Text from '@/components/Text';
import InputError from '../../InputError';
import { ISwitchProps } from 'types';

const BaseSwitch = (
  {
    id = 'switch',
    size = 'md',
    variant = 'primary',
    loading = false,
    disabled = false,
    readOnly,
    label,
    subLabel,
    subLabelClassName,
    name,
    error,
    type,
    className,
    children,
    defaultChecked,
    value = false,
    onChange,
    haptic = true,
    style,
    containerStyle,
    labelPosition = 'top',

    thumbColor = 'white',
    activeFillColor,
    inactiveFillColor,
    duration = 250,
    thumbStyle,
    switchStyle,
    pressableProps,

    ...props
  }: ISwitchProps,
  ref: any
) => {
  // #region STATE
  const [checked, setChecked] = useState<boolean>(value);
  // #endregion

  // #region HOOKS
  const { sizes, colors, icons } = useTheme();
  const animation = useRef(new Animated.Value(checked ? 28 : 2)).current;
  // #endregion

  // #region COMPUTED
  const isDisabled = readOnly || disabled || loading;

  // generate component testID or accessibilityLabel based on Platform.OS
  // generate component testID or accessibilityLabel based on Platform.OS
  const switchID =
    Platform.OS === 'android' ? { accessibilityLabel: id } : { testID: id };

  const placeLabelOnLeft = labelPosition === 'left';

  const activeColor = activeFillColor || colors.switchOn;
  const inactiveColor = inactiveFillColor || colors.switchOff;

  const bgColor = animation.interpolate({
    inputRange: [2, 28],
    outputRange: [String(inactiveColor), String(activeColor)],
  });

  const switchStyles = StyleSheet.flatten([
    {
      justifyContent: 'center',
      alignContent: 'center',
      backgroundColor: bgColor,
      height: sizes.switchHeight,
    },
    switchStyle,
  ]) as ViewStyle;

  const thumbStyles = StyleSheet.flatten([
    thumbStyle,
    {
      width: sizes.switchThumb,
      height: sizes.switchThumb,
      backgroundColor: thumbColor,
      shadowColor: colors.shadow,
      shadowOffset: {
        width: sizes.shadowOffsetWidth,
        height: sizes.shadowOffsetHeight,
      },
      shadowOpacity: sizes.shadowOpacity,
      shadowRadius: sizes.shadowRadius,
      elevation: sizes.elevation,
      borderRadius: sizes.switchThumb / 2,
      transform: [{ translateX: animation }],
    },
  ]) as ViewStyle;

  const containerStyles = StyleSheet.flatten([
    containerStyle,
    {
      marginLeft: placeLabelOnLeft ? sizes.s : 0,
      marginTop: placeLabelOnLeft ? 0 : sizes.xs,
      overflow: 'hidden',
      width: sizes.switchWidth,
      height: sizes.switchHeight,
      borderRadius: sizes.switchHeight,
    },
  ]) as ViewStyle;

  // #endregion

  // #region FUNCTIONS
  const internalOnChange = () => {
    const eventOverride = {
      target: {
        name,
        value: !checked,
        checked: !checked,
      },
    };

    /* haptic feedback onPress */
    if (haptic) {
      Haptics.selectionAsync();
    }

    onChange?.(eventOverride as any);
  };
  // #endregion

  // #region EFFECTS
  useEffect(() => {
    /* update local state when external value is updated */
    if (value !== checked) {
      console.log({
        value,
      });

      setChecked(value);
    }
  }, [value]);

  useEffect(() => {
    Animated.timing(animation, {
      duration,
      useNativeDriver: false,
      toValue: checked ? 28 : 2,
    }).start();
  }, [checked, animation, duration]);

  // #endregion

  return (
    <Block
      flex={0}
      row={placeLabelOnLeft}
      align={placeLabelOnLeft ? 'center' : 'flex-start'}
      {...props}
      style={[
        {
          opacity: disabled ? 0.5 : 1,
        },
        style,
      ]}
    >
      {!!label && (
        <Text bold marginBottom={sizes.xs}>
          {label}
        </Text>
      )}
      {!!subLabel && (
        <Text semibold size='i2'>
          {subLabel}
        </Text>
      )}
      <Pressable
        {...switchID}
        hitSlop={sizes.s}
        onPress={internalOnChange}
        style={containerStyles}
        disabled={disabled}
        {...pressableProps}
      >
        <Animated.View style={switchStyles}>
          <Animated.View style={thumbStyles} />
        </Animated.View>
      </Pressable>
    </Block>
  );
};

export default forwardRef(BaseSwitch);
