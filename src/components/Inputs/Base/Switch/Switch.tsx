import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Animated,
  Pressable,
  Platform,
  ViewStyle,
  StyleSheet,
} from 'react-native';
import * as Haptics from 'expo-haptics';

import { ISwitchProps } from '@/constants/types';
import useTheme from '@/utils/hooks/context/useTheme';
import Block from '../../../Block';
import Text from '../../../Text';

const Switch = ({
  id = 'Switch',
  checked = false,
  thumbColor = 'white',
  activeFillColor,
  inactiveFillColor,
  duration = 250,
  thumbStyle,
  switchStyle,
  style,
  onPress,
  haptic = true,
  label,
  labelPosition = 'top',
  pressableProps,
  disabled = false,
  ...props
}: ISwitchProps) => {
  const [isChecked, setChecked] = useState(checked);
  const { colors, sizes } = useTheme();
  const activeColor = activeFillColor || colors.switchOn;
  const inactiveColor = inactiveFillColor || colors.switchOff;

  const animation = useRef(new Animated.Value(isChecked ? 28 : 2)).current;

  // generate component testID or accessibilityLabel based on Platform.OS
  const switchID =
    Platform.OS === 'android' ? { accessibilityLabel: id } : { testID: id };

  const labelOnLeft = labelPosition === 'left';

  const handleToggle = useCallback(() => {
    setChecked(!isChecked);
    onPress?.(!isChecked);

    /* haptic feedback onPress */
    if (haptic) {
      Haptics.selectionAsync();
    }
  }, [isChecked, haptic, setChecked, onPress]);

  useEffect(() => {
    Animated.timing(animation, {
      duration,
      useNativeDriver: false,
      toValue: isChecked ? 28 : 2,
    }).start();
  }, [isChecked, animation, duration]);

  /* update local state for isChecked when checked prop is updated */
  useEffect(() => {
    if (isChecked !== checked) {
      setChecked(checked);
    }
  }, [isChecked, checked]);

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
    style,
    {
      marginLeft: labelOnLeft ? sizes.s : 0,
      overflow: 'hidden',
      width: sizes.switchWidth,
      height: sizes.switchHeight,
      borderRadius: sizes.switchHeight,
    },
  ]) as ViewStyle;

  return (
    <Block
      flex={0}
      row={labelOnLeft}
      {...props}
      style={{
        opacity: disabled ? 0.5 : 1,
      }}
    >
      {!!label && (
        <Text bold marginBottom={sizes.xs}>
          {label}
        </Text>
      )}
      <Pressable
        {...switchID}
        hitSlop={sizes.s}
        onPress={handleToggle}
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

export default React.memo(Switch);
