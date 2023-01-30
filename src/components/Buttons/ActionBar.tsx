import useTheme from '@/utils/hooks/context/useTheme';
import { BlurView } from 'expo-blur';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Block from '../Block';

const ActionBar = ({
  children,
  addSpacers = true,
  makeChildrenEqualWidth = true,
  useBottomInset = true,
  style,
}: any) => {
  const { styles, sizes } = useTheme();
  const insets = useSafeAreaInsets();

  const renderedChildren = addSpacers
    ? (Array.isArray(children) ? children : [children])
        .map((child: any, childIndex: number, self: any[]) => {
          const isLastChild = childIndex === self.length - 1;

          const modifiedChild = makeChildrenEqualWidth ? (
            <Block flex={1} key={`action_wrapper_${childIndex}`}>
              {child}
            </Block>
          ) : (
            child
          );

          if (isLastChild) {
            return modifiedChild;
          }

          return [
            modifiedChild,
            <Block
              key={`action_spacer_${childIndex}`}
              flex={0}
              width={sizes.sm}
            />,
          ];
        })
        .flat()
    : children;

  return (
    <>
      <BlurView
        intensity={15}
        style={[
          {
            position: 'absolute',
            bottom: 0,
            paddingBottom:
              !!insets.bottom && useBottomInset ? insets.bottom : sizes.s,
            left: 0,
            right: 0,
            paddingHorizontal: sizes.padding,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          },
          style,
        ]}
      >
        {renderedChildren}
      </BlurView>
    </>
  );
};

export default ActionBar;
