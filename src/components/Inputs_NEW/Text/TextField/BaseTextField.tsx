import Block from '@/components/Block';
import BorderGroup from '@/components/BorderGroup';
import Text from '@/components/Text';
import { isAndroid } from '@/constants/platform';
import useTheme from '@/utils/hooks/context/useTheme';
import React, { forwardRef, Ref } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TextInput,
  TextStyle,
  ViewStyle,
} from 'react-native';
import { IColorVariant } from 'types/components/common';
import { ITextField } from 'types/components/inputComponents';
import InputDecorator, {
  renderDecoratorsInline,
} from '../../InputDecorator/InputDecorator';
import { Feather } from '@expo/vector-icons';
import InputError from '../../InputError';

const BaseTextField = (
  {
    variant,
    loading = false,
    type = 'text',
    disabled = false,
    readOnly,
    size = 'md',
    prepend,
    append,
    labelClassName,
    containerClassName,
    inputContainerClassName,
    inputControlsContainerClassName,
    label,
    srOnly,
    name,
    error,
    className,
    children,
    defaultChecked,

    id = 'Input',
    style,
    // componentWrapperStyle,
    inputWrapperStyle,

    containerStyle,
    inputContainerStyle,
    inputControlsContainerStyle,
    labelStyle,

    color,
    textColor: textColorProp,
    textVariant,
    dropdown = false,
    iconSize = 20,

    // icon,
    // iconSize = 16,
    // iconPosition = 'left',
    // iconColor,
    marginBottom,
    marginTop,
    marginHorizontal,
    marginVertical,
    marginRight,
    marginLeft,
    onFocus,
    onBlur,
    onChange,
    onChangeText,
    // type = 'text',
    // dropdown = false,
    // keyboardType,
    returnKeyType = 'done',
    // value,
    // format,
    // ...props
    icon,

    ...inputProps
  }: ITextField,
  ref: Ref<HTMLInputElement>
) => {
  // #region STATE
  // #endregion

  // #region HOOKS
  const { sizes, colors } = useTheme();

  // #endregion

  // #region COMPUTED
  const isDisabled = readOnly || disabled || loading;
  const inputColor =
    colors[variant as IColorVariant] || color || colors.neutral;
  const textColor =
    colors[textVariant as IColorVariant] || textColorProp || colors.text;

  // generate component testID or accessibilityLabel based on Platform.OS
  const inputID = isAndroid ? { accessibilityLabel: id } : { testID: id };

  const containerStyles = StyleSheet.flatten([
    {
      minHeight: sizes.inputHeight,
      ...(marginBottom && { marginBottom: marginBottom }),
      ...(marginTop && { marginTop: marginTop }),
      ...(marginHorizontal && { marginHorizontal: marginHorizontal }),
      ...(marginVertical && { marginVertical: marginVertical }),
      ...(marginRight && { marginRight: marginRight }),
      ...(marginLeft && { marginLeft: marginLeft }),
      ...(disabled && { opacity: 0.5 }),
    },
    containerStyle,
  ]) as ViewStyle;

  const labelStyles = StyleSheet.flatten([
    !!error && {
      color: colors.danger,
    },
    labelStyle,
  ]) as TextStyle;

  const inputControlsContainerStyles = StyleSheet.flatten([
    {
      marginTop: sizes.xs,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },

    inputControlsContainerStyle,

    !!error && {
      borderColor: colors.danger,
    },
    {
      borderColor: colors.danger,
    },
  ]);

  const inputContainerStyles = StyleSheet.flatten([
    {
      minHeight: sizes.inputHeight,
      flex: 1,
    },
    inputContainerStyle,
  ]) as ViewStyle;

  const inputStyles = StyleSheet.flatten([
    {
      flex: 1,
      zIndex: 2,
      height: '100%',
      fontSize: sizes.p,
      color: textColor,
      paddingHorizontal: sizes.inputPadding,
    },
    type === 'textarea' && {
      paddingTop: 10,
      paddingBottom: 10,
    },
    style,
  ]) as TextStyle;
  // #endregion

  // #region FUNCTIONS

  // #endregion

  return (
    <Block flex={0} style={containerStyles}>
      {label && (
        <Text size='i1' style={labelStyles}>
          {label}
        </Text>
      )}

      <BorderGroup
        style={inputControlsContainerStyles}
        borderColor={!!error ? colors.danger : inputColor}
      >
        {renderDecoratorsInline(prepend)}

        <Block flex={0} style={inputContainerStyles} row align='center'>
          <TextInput
            {...inputID}
            {...inputProps}
            // secureTextEntry={type === 'password'}
            clearButtonMode='while-editing'
            returnKeyType={returnKeyType}
            style={inputStyles}
            editable={!disabled}
            placeholderTextColor={inputColor}
            onChange={e => {
              e.target = e.nativeEvent;
              e.target.value = e.target.text;
              onChange?.(e);
            }}
            onChangeText={onChangeText}
            {...(type === 'textarea'
              ? {
                  multiline: true,
                  textAlignVertical: 'top', // for Android
                }
              : null)}
          />

          {loading && (
            <Block
              flex={0}
              position='absolute'
              justify='center'
              right={sizes.s}
              top={0}
              bottom={0}
            >
              <ActivityIndicator />
            </Block>
          )}

          {!!icon ? (
            typeof icon === 'string' ? (
              <Feather
                name={icon as never}
                size={iconSize}
                style={{
                  marginHorizontal: sizes.s,
                }}
              />
            ) : (
              icon
            )
          ) : null}

          {dropdown && (
            <Feather
              name='chevron-down'
              size={iconSize}
              style={{
                marginHorizontal: sizes.s,
              }}
            />
          )}
        </Block>

        {renderDecoratorsInline(append)}
      </BorderGroup>

      <InputError>{error}</InputError>
    </Block>
  );
};

export default forwardRef(BaseTextField);
