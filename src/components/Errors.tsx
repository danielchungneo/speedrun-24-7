import useTheme from '@/utils/hooks/context/useTheme';
import Block from './Block';
import Text from './Text';

const Errors = ({ defaultMessage, errors, ...blockProps }: any) => {
  const { sizes, colors } = useTheme();

  const renderError = (error: any, errorIndex: number) => {
    return (
      <Block
        flex={0}
        key={error.message || error.Message || `error_message_${errorIndex}`}
        color={String(colors.danger) + '27'}
        style={{
          borderWidth: 1,
          borderColor: colors.danger,
        }}
        padding={sizes.m}
        radius={sizes.cardRadius}
        {...blockProps}
      >
        <Text danger bold>
          {error.message ||
            error.Message ||
            defaultMessage ||
            'An error occurred. Please reload the page and try again.'}
        </Text>
      </Block>
    );
  };

  return (
    Boolean(errors?.length) &&
    (defaultMessage
      ? renderError({ message: defaultMessage }, 0)
      : errors.map(renderError))
  );
};

export default Errors;
