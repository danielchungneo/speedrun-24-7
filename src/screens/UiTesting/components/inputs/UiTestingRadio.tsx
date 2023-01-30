import Block from '@/components/Block';
import Divider from '@/components/Divider';
import RadioGroup from '@/components/Inputs_NEW/Select/RadioGroup';
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

const UiTestingRadio = () => {
  const { sizes } = useTheme();
  const [value, setValue] = useState<boolean>(false);

  return (
    <Block flex={0} width='100%'>
      <Block flex={0}>
        <Text size='h4' align='center'>
          Generic
        </Text>

        <RadioGroup
          //
          form={false}
          label='What is your favorite framework?'
          value={value}
          onChange={e => setValue(e.target.value)}
          style={[{ marginTop: sizes.sm }]}
          options={options}
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
              <RadioGroup
                //
                form={false}
                label={`What is your favorite framework? (${label})`}
                value={value}
                onChange={e => setValue(e.target.value)}
                style={[{ marginTop: sizes.sm }]}
                options={options}
                {...props}
              />
            </Block>
          );
        })}
      </Block>
    </Block>
  );
};

export default UiTestingRadio;
