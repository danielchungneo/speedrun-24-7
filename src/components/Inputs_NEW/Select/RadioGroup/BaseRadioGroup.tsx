import Block from '@/components/Block';
import Text from '@/components/Text';
import useTheme from '@/utils/hooks/context/useTheme';
import React, { forwardRef, Ref } from 'react';
import { Platform, Pressable } from 'react-native';
import { IRadioGroup } from 'types/components/inputComponents';
import * as Haptics from 'expo-haptics';
import InputError from '../../InputError';

const BaseRadioGroup = (
  {
    id = 'radio',
    variant = 'primary',
    size = 'md',
    loading = false,
    options = [],
    valueField = 'value',
    labelField = 'label',
    disabled = false,
    readOnly,
    label,
    subLabel,
    srOnly,
    containerClassName,
    labelClassName,
    subLabelClassName,
    value,
    name,
    error,
    type,
    className,
    children,
    onChange,
    style,
    labelPosition = 'right',
    haptic = true,

    ...inputProps
  }: IRadioGroup,
  ref: Ref<HTMLInputElement>
) => {
  // #region STATE
  // const [checked, setChecked] = useState<boolean>(value);
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

  const computedClasses = [
    // 'radio-group-input',
    // size,
    // variant,
    // isDisabled && 'input--disabled',
    // // isDisabled && "input--disabled-checkbox-and-radio",
    // className
  ];
  // #endregion

  const internalOnChange = (optionValue: any) => {
    const eventOverride = {
      target: {
        name,
        value: optionValue,
      },
    };

    /* haptic feedback onPress */
    if (haptic) {
      Haptics.selectionAsync();
    }

    onChange?.(eventOverride as any);
  };

  return (
    <Block
      flex={0}
      justify='flex-start'
      align='flex-start'
      style={style}
      {...inputProps}
    >
      <Block
        flex={0}
        // marginRight={placeLabelOnRight ? 0 : sizes.s}
        // marginLeft={placeLabelOnRight ? sizes.s : 0}
      >
        {!!label && (
          <Text semibold size='i1' color={!!error ? colors.danger : undefined}>
            {label}
          </Text>
        )}
        {!!subLabel && (
          <Text semibold size='i2'>
            {subLabel}
          </Text>
        )}
      </Block>

      {options.map((option, optionIndex) => {
        const optionValue = option[valueField];
        const optionLabel = option[labelField];
        const optionId = `${name}-${optionIndex}`;
        const isChecked = optionValue == value;

        return (
          <Pressable
            //
            key={optionValue}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: sizes.sm,
              opacity: disabled ? 0.5 : 1,
            }}
            onPress={() => internalOnChange(optionValue)}
            disabled={disabled}
          >
            <Block
              flex={0}
              height={24}
              width={24}
              radius={12}
              justify='center'
              align='center'
              style={[
                {
                  borderWidth: 2,
                  borderColor: !!error ? colors.danger : '#000',
                },
                // style,
              ]}
            >
              {isChecked && (
                <Block
                  flex={0}
                  height={12}
                  width={12}
                  radius={6}
                  color={!!error ? colors.danger : '#000'}
                />
              )}
            </Block>

            <Text
              size='i1'
              marginLeft={sizes.sm}
              color={!!error ? colors.danger : undefined}
            >
              {optionLabel}
            </Text>
          </Pressable>
        );
      })}

      <InputError style={{ marginTop: sizes.sm }}>{error}</InputError>
    </Block>
  );
};

export default forwardRef(BaseRadioGroup);
