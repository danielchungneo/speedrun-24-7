import Accordion from '@/components/Accordion/Accordion';
import Block from '@/components/Block';
import Divider from '@/components/Divider';
import FormFieldArray from '@/components/Inputs_NEW/FormFieldArray';
import Text from '@/components/Text';
import useTheme from '@/utils/hooks/context/useTheme';

const options = [
  {
    name: 'React',
  },
  {
    name: 'React Native',
  },
  {
    name: 'Flutter',
  },
  {
    name: 'VueJS',
  },
];

const UiTestingAccordions = () => {
  const { sizes } = useTheme();

  return (
    <Block width='100%'>
      <Block flex={0}>
        <Accordion
          items={options}
          renderTitle={({ name }) => <Text semibold>{name}</Text>}
          renderItem={item => (
            <Block flex={0} width='100%'>
              <Text size='p'>{item.name}</Text>
            </Block>
          )}
        />

        <Divider />

        <Accordion
          title='Appendable'
          items={options}
          renderTitle={({ name }) => <Text semibold>{name}</Text>}
          renderItem={item => (
            <Block flex={0} width='100%'>
              <Text size='p'>{item.name}</Text>
            </Block>
          )}
          onAppend={() => null}
          // appendDisabled
        />

        <Divider />

        <Accordion
          title='Append Disabled'
          items={options}
          renderTitle={({ name }) => <Text semibold>{name}</Text>}
          renderItem={item => (
            <Block flex={0} width='100%'>
              <Text size='p'>{item.name}</Text>
            </Block>
          )}
          onAppend={() => null}
          appendDisabled
        />
      </Block>
    </Block>
  );
};

export default UiTestingAccordions;
