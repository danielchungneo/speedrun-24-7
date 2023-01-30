import Block from '@/components/Block';
import Divider from '@/components/Divider';
import PhotoPicker from '@/components/Inputs_NEW/File/PhotoPicker';
import Text from '@/components/Text';
import useTheme from '@/utils/hooks/context/useTheme';
import { useState } from 'react';

const UiTestingPhotoPicker = () => {
  // #region STATE
  const [images, setImages] = useState(null);
  // #endregion

  // #region HOOKS
  const { sizes } = useTheme();
  // #endregion

  // #region COMPUTED
  // #endregion

  // #region FUNCTIONS
  // #endregion

  // #region EFFECTS
  // #endregion

  return (
    <Block flex={0} width='100%'>
      <Block flex={0}>
        <PhotoPicker
          //
          form={false}
          label='Single Image Picker'
          value={images as never}
          onChange={e => setImages(e.target.value)}
        />

        <PhotoPicker
          //
          form={false}
          label='Multi Image Picker'
          value={images as never}
          multiple
          onChange={e => setImages(e.target.value)}
          style={{ marginTop: sizes.m }}
        />
      </Block>

      <Divider />

      <Block flex={0}>
        <Text size='h4' align='center'>
          States
        </Text>

        {[
          ['Disabled', { disabled: true }],
          ['Error', { error: 'Images are invalid... please try again' }],
        ].map(([label, props], index: number) => {
          return (
            <Block
              key={`block-state-${index}`}
              marginTop={!!index ? sizes.m : 0}
            >
              <PhotoPicker
                //
                form={false}
                label='Avatar Picker'
                value={images as never}
                {...(props as any)}
              />
            </Block>
          );
        })}
      </Block>
    </Block>
  );
};

export default UiTestingPhotoPicker;
