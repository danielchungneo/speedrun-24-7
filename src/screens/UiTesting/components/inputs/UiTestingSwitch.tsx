import Block from '@/components/Block';
import Divider from '@/components/Divider';
import Checkbox from '@/components/Inputs_NEW/Select/Checkbox';
import Switch from '@/components/Inputs_NEW/Select/Switch';
import PatternField from '@/components/Inputs_NEW/Text/PatternField';
import Text from '@/components/Text';
import useTheme from '@/utils/hooks/context/useTheme';
import { useState } from 'react';
import { Masks } from 'react-native-mask-input';

const UiTestingSwitch = () => {
  const { sizes } = useTheme();
  const [value, setValue] = useState<boolean>(false);

  return (
    <Block flex={0} width='100%'>
      <Block flex={0}>
        <Text size='h4' align='center'>
          Generic
        </Text>

        <Switch
          //
          form={false}
          label='Are you over the age of 21?'
          value={value}
          onChange={e => setValue(e.target.value)}
          style={[{ marginTop: sizes.sm }]}
        />

        <Switch
          //
          form={false}
          label='Are you over the age of 21?'
          subLabel='Are you sure?'
          value={value}
          onChange={e => {
            setValue(e.target.value as never);
          }}
          style={[{ marginTop: sizes.sm }]}
        />

        <Switch
          //
          form={false}
          label='Left Label'
          labelPosition='left'
          value={value}
          onChange={e => {
            setValue(e.target.value as never);
          }}
          style={[{ marginTop: sizes.sm }]}
        />
      </Block>

      <Divider />

      <Block flex={0}>
        <Text size='h4' align='center'>
          States
        </Text>

        {[
          ['Disabled', { disabled: true }],
          ['Error', { error: 'Error Message' }],
        ].map(([label, props], index: number) => {
          return (
            <Block
              key={`checkbox-state-${index}`}
              marginTop={!!index ? sizes.s : 0}
            >
              <Switch
                //
                form={false}
                label={label}
                value={value}
                onChange={e => setValue(e.target.value)}
                containerStyle={[{ marginTop: sizes.sm }]}
                {...props}
              />
            </Block>
          );
        })}
      </Block>
    </Block>
  );
};

export default UiTestingSwitch;
