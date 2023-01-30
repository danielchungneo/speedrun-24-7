import React, { useCallback, useEffect, useState } from 'react';
import { Platform, Pressable } from 'react-native';

import * as Haptics from 'expo-haptics';

import useTheme from '@/utils/hooks/context/useTheme';
import Block from '@/components/Block';
import Image from '@/components/Image';
import { ICheckboxProps } from '@/constants/types';
import Text from '@/components/Text';

const Checkbox = ({
  id = 'Checkbox',
  checked,
  onPress,
  haptic = true,
  style,
  label,
  labelPosition = 'right',
  disabled = false,
  ...props
}: ICheckboxProps) => {
  const [isChecked, setChecked] = useState(checked);
  const { colors, icons, sizes, styles } = useTheme();

  const handleToggle = useCallback(() => {
    onPress?.(!isChecked);
    setChecked(!isChecked);

    /* haptic feedback onPress */
    if (haptic) {
      Haptics.selectionAsync();
    }
  }, [isChecked, haptic, setChecked, onPress]);

  /* update local state for isChecked when checked prop is updated */
  useEffect(() => {
    if (isChecked !== checked) {
      setChecked(checked);
    }
  }, [isChecked, checked]);

  // generate component testID or accessibilityLabel based on Platform.OS
  const checkboxID =
    Platform.OS === 'android' ? { accessibilityLabel: id } : { testID: id };
  const placeLabelOnRight = labelPosition === 'right';

  return (
    <Block
      flex={0}
      justify="flex-start"
      align="flex-start"
      style={style}
      {...props}
    >
      <Pressable
        //
        {...checkboxID}
        hitSlop={sizes.s}
        onPress={handleToggle}
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
          align="center"
          justify="center"
          color={isChecked ? undefined : colors.darkGray}
          outlined={!isChecked}
          width={sizes.checkboxWidth}
          height={sizes.checkboxHeight}
          radius={sizes.checkboxRadius}
          gradient={isChecked ? colors.checkbox : undefined}
        >
          {isChecked && (
            <Image
              source={icons.check}
              color={colors.checkboxIcon}
              width={sizes.checkboxIconWidth}
              height={sizes.checkboxIconHeight}
            />
          )}
        </Block>

        {!!label && (
          <Text
            semibold
            marginRight={placeLabelOnRight ? 0 : sizes.s}
            marginLeft={placeLabelOnRight ? sizes.s : 0}
          >
            {label}
          </Text>
        )}
      </Pressable>
    </Block>
  );
};

export default React.memo(Checkbox);
