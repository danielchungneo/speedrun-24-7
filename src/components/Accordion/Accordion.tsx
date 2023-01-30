import useTheme from '@/utils/hooks/context/useTheme';
import { useState } from 'react';
import { Pressable, TouchableOpacity } from 'react-native';
import { IAccordion } from 'types/components/displayComponents';
import Block from '../Block';
import Text from '../Text';
import { Feather } from '@expo/vector-icons';
import Button from '../Buttons/Button';

const LineNumber = ({
  index,
  borderColor,
}: {
  index: number;
  borderColor: string;
}) => {
  const { colors, sizes } = useTheme();

  return (
    <Block
      flex={0}
      style={{
        borderWidth: 2,
        borderColor,
        width: 30,
        height: 30,
      }}
      marginRight={sizes.cardPadding}
      radius={30}
      row
      justify='center'
      align='center'
    >
      <Text size='p' bold variant='neutral'>
        {index + 1}
      </Text>
    </Block>
  );
};

const Accordion = ({
  title,
  items = [],
  renderItem,
  renderTitle,
  keyExtractor,
  style,
  appendTitle = 'Add Item',
  appendDisabled = false,
  onAppend,
}: IAccordion) => {
  // #region STATE
  const [openedLineItemIds, setOpenedLineItemIds] = useState<
    number[] | string[]
  >([]);
  // #endregion

  // #region HOOKS
  const { sizes, colors } = useTheme();
  // #endregion

  // #region COMPUTED
  const accentColor = String(colors.neutral) + '50';
  const activeColor = '#00000010';
  // #endregion

  // #region FUNCTIONS
  const buildDefaultKey = (index: number) => `accordion-item-${index}`;
  // #endregion

  return (
    <Block flex={0}>
      {!!title && (
        <Text bold marginBottom={sizes.xs}>
          {title}
        </Text>
      )}
      {items.length === 0 && <Text size='s5'>None</Text>}

      <Block
        flex={0}
        style={[
          {
            borderWidth: 2,
            borderColor: accentColor,
            borderRadius: sizes.s,
            overflow: 'hidden',
          },
          style,
        ]}
      >
        {items.map((item, index) => {
          const key = keyExtractor?.(item, index) ?? buildDefaultKey(index);
          const isActive = openedLineItemIds.includes(key as never);

          return (
            <Block
              key={key}
              flex={0}
              style={{
                borderTopWidth: index === 0 ? 0 : 2,
                borderColor: accentColor,
              }}
            >
              <Block
                flex={0}
                padding={sizes.cardPadding}
                color={isActive ? activeColor : 'transparent'}
              >
                <Pressable
                  onPress={() => {
                    const updatedOpenedLineItemIds = isActive
                      ? openedLineItemIds.filter(id => id !== key)
                      : [...openedLineItemIds, key];

                    setOpenedLineItemIds(updatedOpenedLineItemIds);
                  }}
                >
                  <Block flex={0} row align='center'>
                    <LineNumber index={index} borderColor={accentColor} />
                    {renderTitle?.(item, index)}

                    <Block />

                    <Feather
                      name='chevron-down'
                      size={24}
                      color={accentColor}
                      style={{ marginLeft: sizes.cardPadding }}
                    />
                  </Block>
                </Pressable>

                {isActive && (
                  <Block
                    //
                    flex={0}
                    marginTop={sizes.cardPadding}
                  >
                    {renderItem?.(item, index)}
                  </Block>
                )}
              </Block>
            </Block>
          );
        })}

        {!!onAppend && (
          <TouchableOpacity
            activeOpacity={0.5}
            disabled={appendDisabled}
            style={{
              padding: sizes.cardPadding,
              backgroundColor: activeColor,
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              borderTopWidth: !!items.length ? 2 : 0,
              borderColor: accentColor,
              opacity: appendDisabled ? 0.5 : 1,
            }}
            onPress={onAppend}
          >
            <Feather name='plus' size={sizes.p} />
            <Text marginLeft={sizes.cardPadding}>{appendTitle}</Text>
          </TouchableOpacity>
        )}
      </Block>

      {!!onAppend && (
        <Button
          variant='dark'
          onPress={onAppend}
          disabled={appendDisabled}
          marginTop={sizes.cardPadding}
        >
          <Text variant='white'>{appendTitle}</Text>
        </Button>
      )}
    </Block>
  );
};

export default Accordion;
