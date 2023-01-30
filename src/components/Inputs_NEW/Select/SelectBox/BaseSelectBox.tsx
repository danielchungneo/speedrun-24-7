import React, { useState, useCallback, useEffect } from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  TextInput,
  ViewStyle,
} from 'react-native';
import Block from '@/components/Block';
import Text from '@/components/Text';
import Modal from '@/components/Modal';
import Button from '@/components/Buttons/Button';
import { ISpacing, ITextProps, ITheme } from 'types';
import useTheme from '@/utils/hooks/context/useTheme';
import TextField from '../../Text/TextField';

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
  // onChange?: (value: IOption['value'], option: IOption, index: number) => void;
  onChange?: (evt: any) => void;
  closeOnChange?: boolean;
  labelProps?: ITextProps;
  disabled?: boolean;
  style?: ViewStyle;
}

const BaseSelectBox = (
  {
    variant = 'primary',
    loading = false,
    options = [],
    valueField = 'value',
    labelField = 'label',
    clearable = false,
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

    prepend,
    append,
    error,
    name,
    multiple,

    minOptionsListHeight = 0,
    maxOptionsListHeight = 300,

    enableSearchBox = false,

    ...props
  }: ISelectInput,
  ref: any
) => {
  // #region STATE
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>('');
  const [optionsListHeight, setOptionsListHeight] = useState<number>();
  // #endregion

  // #region HOOKS
  const { assets, colors, sizes, styles } = useTheme();
  // #endregion

  // #region FUNCTIONS
  const openModal = useCallback(() => {
    setModalOpen(true);
  }, []);

  const handleOptionsListLayout = e => {
    console.log(e.nativeEvent.layout);

    if (
      !!minOptionsListHeight &&
      e.nativeEvent.layout.height < minOptionsListHeight
    ) {
      setOptionsListHeight(minOptionsListHeight);
    } else if (
      !!maxOptionsListHeight &&
      e.nativeEvent.layout.height > maxOptionsListHeight
    ) {
      setOptionsListHeight(maxOptionsListHeight);
    }
  };
  // #endregion

  // #region COMPUTED
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
  // #endregion

  // #region EFFECTS
  useEffect(() => {
    const index = options?.findIndex(opt => opt[valueField] === value);

    setSelectedIndex(index);
  }, [value, options]);
  // #endregion

  return (
    <>
      <Block flex={0} width='100%' style={mergedComponentWrapperStyles}>
        <Block flex={0} width='100%'>
          <TextField
            form={false}
            label={label}
            icon={icon}
            error={error}
            dropdown
            value={
              selectedIndex !== -1
                ? options?.[selectedIndex]?.[labelField]
                : 'Please choose one'
            }
          />

          <Pressable
            onPress={disabled ? undefined : openModal}
            style={[StyleSheet.absoluteFill]}
          />
        </Block>
      </Block>

      <Modal
        visible={modalOpen}
        onClose={() => setModalOpen(false)}
        viewMode='bottom-sheet'
        allowBackdropPress
        // animationType="slide"
        // animationType="none"
        // animationType="fade"
        // backdropBlur={15}
        // contentColor={'transparent'}
        headerContent={
          <Block row justify='flex-start' align='center'>
            <Text variant='secondary' semibold>
              {options.length} option{options.length === 1 ? '' : 's'}
            </Text>
          </Block>
        }
      >
        {/* <TextInput
          //
          value={searchText}
          onChange={evt => setSearchText(evt.target.value)}
          placeholder='TextInput: Filter options'
        /> */}

        {enableSearchBox && (
          <TextField
            //
            form={false}
            value={searchText}
            onChange={evt => setSearchText(evt.target.value)}
            marginBottom={sizes.sm}
            placeholder='Filter options'
          />
        )}

        <FlatList
          onLayout={handleOptionsListLayout}
          keyExtractor={(item, index) => `${item[valueField]}`}
          data={
            !!searchText
              ? options.filter(opt =>
                  opt[labelField]
                    ?.toLowerCase?.()
                    .includes(searchText.toLowerCase())
                )
              : options
          }
          bounces={false}
          showsVerticalScrollIndicator
          style={{
            minHeight: minOptionsListHeight,
            maxHeight: maxOptionsListHeight,
          }}
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
                    onChange?.({
                      target: {
                        name,
                        value: item[valueField],
                      },
                    });

                    if (closeOnChange) {
                      setModalOpen(false);
                    }
                  }}
                >
                  <Text
                    size='p'
                    semibold={!selected}
                    bold={selected}
                    variant={selected ? 'black' : 'secondary'}
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

export default React.forwardRef(BaseSelectBox);
