import React, { useCallback, useState, useMemo, useRef } from 'react';
import {
  Image,
  TextInput,
  TextStyle,
  ViewStyle,
  StyleSheet,
  Platform,
} from 'react-native';
import Block from '@/components/Block';
import Text from '@/components/Text';
import useTheme from '@/utils/hooks/context/useTheme';
import { IInputProps } from '@/constants/types';
import { Feather } from '@expo/vector-icons';
import * as regex from '@/constants/regex';
import { formatNumberWithCommas, parseNumberInputValue } from '@/utils/number';
import useApp from '@/utils/hooks/context/useApp';

const TextField = (
  {
    id = 'Input',
    style,
    componentWrapperStyle,
    inputWrapperStyle,
    color,
    primary,
    secondary,
    tertiary,
    black,
    white,
    gray,
    danger,
    warning,
    success,
    info,
    search,
    disabled,
    label,
    icon,
    iconSize = 16,
    iconPosition = 'left',
    iconColor,
    marginBottom,
    marginTop,
    marginHorizontal,
    marginVertical,
    marginRight,
    marginLeft,
    onFocus,
    onBlur,
    onChangeText,
    type = 'text',
    dropdown = false,
    keyboardType,
    returnKeyType,
    value,
    format,
    ...props
  }: IInputProps & {
    dropdown?: boolean;
  },
  ref: any
) => {
  const { assets, colors, sizes, styles } = useTheme();
  const {
    state: { isDark },
  } = useApp();

  const [isFocused, setFocused] = useState(false);

  const inputRef = useRef(null);

  const internalValue = useMemo(() => {
    switch (type) {
      case 'number':
      case 'decimal': {
        if (format === 'commas') {
          const converted = formatNumberWithCommas(value);

          return converted;
        }

        return value?.toString() ?? '';
      }
      case 'text':
      case 'textarea':
      case 'password':
      default:
        return value;
    }
  }, [value]);

  const keyboard = useMemo(() => {
    if (keyboardType) {
      return keyboardType;
    }

    switch (type) {
      case 'text':
      case 'textarea':
      case 'password':
        return 'default';
      case 'number':
        return 'number-pad';
      case 'decimal':
        return 'decimal-pad';
      default:
        return 'default';
    }
  }, [type, keyboardType]);

  const returnKey = useMemo(() => {
    if (returnKeyType) {
      return returnKeyType;
    }

    switch (type) {
      case 'text':
      case 'textarea':
      case 'password':
      case 'number':
      case 'decimal':
      default:
        return 'done';
    }
  }, [type, returnKeyType]);

  const handleChangeText = (text: string) => {
    // if the input was cleared, call onChangeText with the empty variable
    if (!text) {
      return onChangeText?.(text);
    }

    // blur the input on the 'Return' key (mainly used for textarea, but works on other text fields as well)
    if (text?.slice(-1)[0] === '\n') {
      inputRef.current?.blur();
      return;
    }

    switch (type) {
      case 'textarea':

      case 'text':
      case 'password':
        onChangeText?.(text);
        break;
      case 'number': {
        const sanitized = text.replaceAll(',', '');
        const match = sanitized.match(regex.number);
        const numberIsValid = match?.length === 1 && match[0] === sanitized;

        if (numberIsValid) {
          onChangeText?.(sanitized);
        }
        break;
      }
      case 'decimal': {
        const sanitized = text.replaceAll(',', '');
        const match = sanitized.match(regex.decimal);
        const decimalIsValid = match?.length === 1 && match[0] === sanitized;

        // console.log({
        //   decimalIsValid,
        //   match,
        //   text,
        //   sanitized,
        // });

        if (decimalIsValid) {
          onChangeText?.(sanitized);
        }
        break;
      }
      default:
        onChangeText?.(text);
        break;
    }
  };

  const handleFocus = useCallback(
    (event, focus) => {
      setFocused(focus);
      focus && onFocus?.(event);
      !focus && onBlur?.(event);
    },
    [setFocused, onFocus, onBlur]
  );

  const colorIndex = primary
    ? 'primary'
    : secondary
    ? 'secondary'
    : tertiary
    ? 'tertiary'
    : black
    ? 'black'
    : white
    ? 'white'
    : gray
    ? 'gray'
    : danger
    ? 'danger'
    : warning
    ? 'warning'
    : success
    ? 'success'
    : info
    ? 'info'
    : null;
  const inputColor = color
    ? color
    : colorIndex
    ? colors?.[colorIndex]
    : isDark
    ? colors.white
    : colors.black;

  const mergedComponentWrapperStyles = StyleSheet.flatten([
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
    componentWrapperStyle,
  ]) as ViewStyle;

  const mergedInputWrapperStyles = StyleSheet.flatten([
    {
      minHeight: sizes.inputHeight,
      borderRadius: sizes.inputRadius,
      borderWidth: isFocused ? 2 : sizes.inputBorder,
      borderColor: isFocused ? colors.focus : inputColor,
    },
    inputWrapperStyle,
  ]) as ViewStyle;

  const inputStyles = StyleSheet.flatten([
    {
      flex: 1,
      zIndex: 2,
      height: '100%',
      fontSize: sizes.p,
      color: colors.input,
      paddingHorizontal: sizes.inputPadding,
    },
    type === 'textarea' && {
      paddingTop: 10,
      paddingBottom: 10,
    },
    style,
  ]) as TextStyle;

  // generate component testID or accessibilityLabel based on Platform.OS
  const inputID =
    Platform.OS === 'android' ? { accessibilityLabel: id } : { testID: id };

  const iconStyle = {
    maxHeight: iconSize,
    maxWidth: iconSize,

    ...(iconPosition === 'left'
      ? {
          marginLeft: sizes.inputPadding,
        }
      : {
          marginRight: sizes.inputPadding,
        }),
  };

  const renderedIcon = !!icon && (
    <>
      {typeof icon === 'string' ? (
        <Image
          source={assets?.[icon]}
          style={[
            {
              tintColor: iconColor || colors.icon,
            },
            iconStyle,
          ]}
        />
      ) : (
        React.cloneElement(icon, {
          style: [
            {
              color: iconColor || colors.icon,
            },
            iconStyle,
          ],
          size: iconSize,
        })
      )}
    </>
  );

  return (
    <>
      <Block flex={0} style={mergedComponentWrapperStyles}>
        {label && (
          <Text bold marginBottom={sizes.xs}>
            {label}
          </Text>
        )}
        <Block
          flex={0}
          row
          align="center"
          justify="flex-end"
          style={mergedInputWrapperStyles}
        >
          {search && assets.search && (
            <Image
              source={assets.search}
              style={{ marginLeft: sizes.inputPadding, tintColor: colors.icon }}
            />
          )}

          {iconPosition === 'left' && renderedIcon}

          <TextInput
            {...inputID}
            {...props}
            value={internalValue}
            ref={inputRef}
            clearButtonMode="while-editing"
            keyboardType={keyboard}
            returnKeyType={returnKey}
            style={inputStyles}
            editable={!disabled}
            placeholderTextColor={inputColor}
            onFocus={(event) => handleFocus(event, true)}
            onBlur={(event) => handleFocus(event, false)}
            onChangeText={handleChangeText}
            //
            {...(type === 'textarea'
              ? {
                  multiline: true,
                  textAlignVertical: 'top', // for Android
                }
              : null)}
          />

          {iconPosition === 'right' && renderedIcon}

          {danger && assets.warning && (
            <Image
              source={assets.warning}
              style={{
                marginRight: sizes.s,
                tintColor: colors.danger,
              }}
            />
          )}
          {success && assets.check && (
            <Image
              source={assets.check}
              style={{
                width: 12,
                height: 9,
                marginRight: sizes.s,
                tintColor: colors.success,
              }}
            />
          )}

          {dropdown && (
            <Text marginRight={sizes.s}>
              <Feather name="chevron-down" size={iconSize} />
            </Text>
          )}
        </Block>
      </Block>
    </>
  );
};

export default React.memo(React.forwardRef(TextField));
