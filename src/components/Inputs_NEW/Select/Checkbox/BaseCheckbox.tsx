import Block from '@/components/Block';
import useTheme from '@/utils/hooks/context/useTheme';
import { cloneDeep } from 'lodash';
import React, { forwardRef, Ref, useEffect, useState } from 'react';
import { Platform, Pressable } from 'react-native';
import { ICheckbox } from 'types/components/inputComponents';
import * as Haptics from 'expo-haptics';
import Image from '@/components/Image';
import Text from '@/components/Text';
import InputError from '../../InputError';

const BaseCheckbox = (
  {
    id = 'checkbox',
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
    labelPosition = 'right',

    ...inputProps
  }: ICheckbox,
  ref: any
) => {
  // #region STATE
  const [checked, setChecked] = useState<boolean>(value);
  // #endregion

  // #region HOOKS
  const { sizes, colors, icons } = useTheme();
  // #endregion

  // #region COMPUTED
  const isDisabled = readOnly || disabled || loading;

  // generate component testID or accessibilityLabel based on Platform.OS
  const checkboxID =
    Platform.OS === 'android' ? { accessibilityLabel: id } : { testID: id };
  const placeLabelOnRight = labelPosition === 'right';
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
      setChecked(value);
    }
  }, [value, checked]);
  // #endregion

  return (
    <Block
      flex={0}
      justify='flex-start'
      align='flex-start'
      style={style}
      {...inputProps}
    >
      <Pressable
        //
        {...checkboxID}
        hitSlop={sizes.s}
        onPress={internalOnChange}
        disabled={disabled}
        style={[
          {
            minWidth: 0,
            flexDirection: placeLabelOnRight ? 'row' : 'row-reverse',
            alignItems: 'center',
            opacity: disabled ? 0.5 : 1,
          },
        ]}
      >
        <Block
          flex={0}
          align='center'
          justify='center'
          color={error ? colors.danger : checked ? undefined : colors.neutral}
          outlined={!checked}
          width={sizes.checkboxWidth}
          height={sizes.checkboxHeight}
          radius={sizes.checkboxRadius}
          gradient={checked ? colors.checkbox : undefined}
        >
          {checked && (
            <Image
              source={icons.check}
              color={colors.checkboxIcon}
              width={sizes.checkboxIconWidth}
              height={sizes.checkboxIconHeight}
            />
          )}
        </Block>

        <Block
          flex={0}
          marginRight={placeLabelOnRight ? 0 : sizes.s}
          marginLeft={placeLabelOnRight ? sizes.s : 0}
        >
          {!!label && (
            <Text
              semibold
              size='i1'
              color={!!error ? colors.danger : undefined}
            >
              {label}
            </Text>
          )}
          {!!subLabel && (
            <Text semibold size='i2'>
              {subLabel}
            </Text>
          )}
        </Block>
      </Pressable>

      <InputError>{error}</InputError>
    </Block>
  );
};

export default forwardRef(BaseCheckbox);
