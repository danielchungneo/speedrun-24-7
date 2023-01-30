import Block from '@/components/Block';
import Divider from '@/components/Divider';
import SelectBox from '@/components/Inputs_NEW/Select/SelectBox';
import Text from '@/components/Text';
import useTheme from '@/utils/hooks/context/useTheme';
import { useState } from 'react';

const options = [
  {
    value: 1,
    label: 'React',
  },
  {
    value: 2,
    label: 'React Native',
  },
  {
    value: 3,
    label: 'Flutter',
  },
];

const UiTestingSelect = () => {
  const { sizes } = useTheme();
  const [value, setValue] = useState<any>();

  return (
    <Block flex={0} width='100%'>
      <Block flex={0}>
        <Text size='h4' align='center'>
          Generic
        </Text>

        <SelectBox
          //
          form={false}
          label='What is your favorite framework?'
          value={value}
          onChange={e => setValue(e.target.value)}
          options={options}
          style={[{ marginTop: sizes.sm }]}
        />

        <SelectBox
          //
          form={false}
          label='Autocomplete'
          value={value}
          onChange={e => setValue(e.target.value)}
          options={options}
          style={[{ marginTop: sizes.sm }]}
          enableSearchBox
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
              <SelectBox
                //
                form={false}
                label={`What is your favorite framework? ${label}`}
                value={value}
                onChange={e => setValue(e.target.value)}
                options={options}
                style={[{ marginTop: sizes.sm }]}
                {...props}
              />
            </Block>
          );
        })}
      </Block>
    </Block>
  );
};

export default UiTestingSelect;
