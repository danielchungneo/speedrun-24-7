import React, { useState, useCallback, useEffect } from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from 'react-native';
import Block from '@/components/Block';
import Text from '@/components/Text';
import Modal from '@/components/Modal';
import Button from '@/components/Buttons/Button';
import { ISpacing, ITextProps, ITheme } from '@/constants/types';
import useTheme from '@/utils/hooks/context/useTheme';
import TextField from '../TextField';

interface IOption {
  value?: any;
  label?: number | string;
  [key: string]: any;
}

interface ISelectInput extends ISpacing {
  options: IOption[];
  valueField?: string;
  labelField?: string;
  icon?: keyof ITheme['assets'];
  value?: IOption['value'];
  label?: IOption['label'];
  onChange?: (value: IOption['value'], option: IOption, index: number) => void;
  closeOnChange?: boolean;
  labelProps?: ITextProps;
  disabled?: boolean;
  style?: ViewStyle;
}

const Select = (
  {
    options = [],
    valueField = 'value',
    labelField = 'label',
    label,
    value,
    icon,
    onChange,
    closeOnChange = true,
    labelProps = {},
    disabled = false,
    style,
    marginBottom,
    marginTop,
    marginHorizontal,
    marginVertical,
    marginRight,
    marginLeft,

    ...props
  }: ISelectInput,
  ref: any
) => {
  /**
   * STATE
   */
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [modalOpen, setModalOpen] = useState(false);

  /**
   * HOOKS
   */
  const { assets, colors, sizes, styles } = useTheme();

  /**
   * FUNCTIONS
   */
  const openModal = useCallback(() => {
    setModalOpen(true);
  }, []);

  /**
   * COMPUTED
   */
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
    style,
  ]) as ViewStyle;

  /**
   * EFFECTS
   */
  useEffect(() => {
    const index = options?.findIndex((opt) => opt[valueField] === value);

    setSelectedIndex(index);
  }, [value, options]);

  return (
    <>
      <Block flex={0} width="100%" style={mergedComponentWrapperStyles}>
        {!!label && (
          <Text
            bold
            marginBottom={sizes.xs}
            style={[
              //
              { width: '100%' },
            ]}
            {...labelProps}
          >
            {label}
          </Text>
        )}

        <Block flex={0} width="100%">
          <TextField disabled icon={icon} dropdown>
            {selectedIndex !== -1 ? (
              options?.[selectedIndex]?.[labelField]
            ) : (
              <Text p>Please choose one</Text>
            )}
          </TextField>
          <Pressable
            onPress={disabled ? undefined : openModal}
            style={[StyleSheet.absoluteFill]}
          />
        </Block>
      </Block>

      <Modal
        visible={modalOpen}
        onClose={() => setModalOpen(false)}
        viewMode="bottom-sheet"
        allowBackdropPress
        // animationType="slide"
        // animationType="none"
        // animationType="fade"
        // backdropBlur={15}
        // contentColor={'transparent'}
        headerContent={
          <Block row justify="flex-start" align="center">
            <Text secondary semibold>
              {options.length} option{options.length === 1 ? '' : 's'}
            </Text>
          </Block>
        }
      >
        <FlatList
          keyExtractor={(item, index) => `${item[valueField]}`}
          data={options}
          // bounces={false}
          showsVerticalScrollIndicator
          style={{ maxHeight: sizes.height / 2 }}
          renderItem={({ item, index }: { item: IOption; index: number }) => {
            const selected = item[valueField] === value;

            return (
              <>
                <Button
                  marginBottom={sizes.xs}
                  // outlined
                  color={selected ? String(colors.black) + '20' : undefined}
                  shadow={false}
                  onPress={() => {
                    onChange?.(item[valueField], item, index);

                    if (closeOnChange) {
                      setModalOpen(false);
                    }
                  }}
                >
                  <Text
                    p
                    semibold={!selected}
                    bold={selected}
                    secondary={!selected}
                    black={selected}
                    // transform="uppercase"
                  >
                    {item[labelField]}
                  </Text>
                </Button>
              </>
            );
          }}
        />
      </Modal>
    </>
  );
};

export default React.memo(React.forwardRef(Select));
