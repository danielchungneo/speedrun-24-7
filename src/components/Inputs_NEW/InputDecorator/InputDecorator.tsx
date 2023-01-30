import Block from '@/components/Block';
import Text from '@/components/Text';
import useTheme from '@/utils/hooks/context/useTheme';
import { StyleSheet, ViewStyle } from 'react-native';
import { IDecorators, IInput } from 'types/components/inputComponents';

interface IInputDecorator {
  children?: any;
  style?: ViewStyle;
}

const InputDecorator = (props: IInputDecorator) => {
  const { children, style, ...rest } = props;

  const { sizes, colors } = useTheme();

  const isArray = Array.isArray(children);
  const decoratorArray = (isArray ? children : [children]).filter(Boolean);

  const styles = StyleSheet.flatten([
    {
      // borderRadius: sizes.inputBorder,
      // borderWidth: sizes.inputBorder,
      height: '100%',
    },
    style,
  ]);

  if (!decoratorArray.length) return null;

  return (
    <>
      {decoratorArray.map((decorator, decoratorIndex) => {
        return (
          <Block
            flex={0}
            key={`input-decorator-${decoratorIndex}`}
            // className={clsx("text-input-decorator", className)}
            style={styles}
            paddingHorizontal={sizes.s}
            justify='center'
            align='center'
            {...rest}
          >
            {['string', 'number'].includes(typeof decorator) ? (
              <Text color={colors.text}>{decorator}</Text>
            ) : (
              decorator
            )}
          </Block>
        );
      })}
    </>
  );
};

export const renderDecoratorsInline = (
  decorators: IDecorators['prepend'] | IDecorators['append']
) => {
  if (!decorators) return null;

  return (Array.isArray(decorators) ? decorators : [decorators]).map(
    (decorator, index) => {
      return (
        <InputDecorator key={`append-decorator-${index}`}>
          {decorator}
        </InputDecorator>
      );
    }
  );
};

export default InputDecorator;
