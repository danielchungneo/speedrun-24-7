import Block from '@/components/Block';
import Button from '@/components/Buttons/Button';
import Text from '@/components/Text';
import React, { forwardRef, memo, useRef, useState } from 'react';
import { IPhotoPicker } from 'types/components/inputComponents';
import InputError from '../../InputError';
import * as ImagePicker from 'expo-image-picker';
import useTheme from '@/utils/hooks/context/useTheme';
import Image from '@/components/Image';
import { Feather } from '@expo/vector-icons';
import { Pressable, Touchable, TouchableOpacity } from 'react-native';

const PhotoPicker = (
  {
    variant = 'primary',
    size = 'sm',
    type = 'button',
    disabled = false,
    readOnly,
    loading = false,
    label,
    multiple,
    name,
    className,
    children,
    value,
    onChange,
    error,
    height = 60,
    style,

    ...inputProps
  }: IPhotoPicker,
  ref: any
) => {
  // #region STATE
  const [imageUris, setImageUris] = useState<any>([]);
  // #endregion

  // #region HOOKS
  const inputRef = useRef<HTMLInputElement>(null);
  const { colors, sizes } = useTheme();
  // #endregion

  // #region COMPUTED
  const isDisabled = readOnly || disabled || loading;
  // #endregion

  // #region FUNCTIONS
  // #endregion

  // #region EFFECTS
  // #endregion

  // #region FUNCTIONS
  const openLibrary = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: multiple,
      base64: true,

      // allowsEditing: true,
      // aspect: [4, 3],
      // quality: 1,
    });

    // console.log(result);

    if (result.canceled) return;

    const blobs = result.assets.map(asset => asset.base64);

    if (multiple) {
      onChange?.({
        target: {
          name,
          value: blobs,
        },
      } as never);
    } else {
      onChange?.({
        target: {
          name,
          value: blobs[0],
        },
      } as never);
    }
  };

  const renderImage = ({ src, uri }) => {
    return (
      <TouchableOpacity
        key={src}
        disabled={isDisabled}
        style={[
          {
            marginRight: sizes.s,
          },
        ]}
      >
        <Image
          source={{ uri }}
          height='100%'
          style={[
            {
              aspectRatio: 1,
            },
            !!error && {
              borderWidth: 2,
              borderColor: colors.danger,
            },
          ]}
        />
      </TouchableOpacity>
    );
  };

  // #endregion

  return (
    <Block flex={0} style={style as any}>
      <Text size='i1' color={!!error ? colors.danger : undefined}>
        {label}
      </Text>

      <Block
        scroll
        horizontal
        showsHorizontalScrollIndicator={false}
        flex={0}
        row
        marginTop={sizes.xs}
        height={height}
        style={{
          opacity: isDisabled ? 0.5 : 1,
        }}
      >
        {!value
          ? null
          : Array.isArray(value)
          ? value.map((val: any) =>
              renderImage({ src: val, uri: `data:image/png;base64,${val}` })
            )
          : renderImage({ src: value, uri: `data:image/png;base64,${value}` })}

        <TouchableOpacity
          onPress={openLibrary}
          disabled={isDisabled}
          style={{
            borderWidth: 3,
            borderColor: colors.neutral,
            aspectRatio: 1,
            borderRadius: sizes.imageRadius,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Feather name='plus' size={24} color={colors.neutral} />
        </TouchableOpacity>
      </Block>

      <InputError>{error}</InputError>
    </Block>
  );
};

export default memo(forwardRef(PhotoPicker));
