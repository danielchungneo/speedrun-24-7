import useTheme from '@/utils/hooks/context/useTheme';
import React from 'react';
import { ColorValue } from 'react-native';
import { IBlockProps } from 'types';
import Block from '../Block';

interface IBorderGroup extends IBlockProps {
  children?: any[];
  style?: any;
  wrapChildren?: boolean;
  borderRadius?: number;
  borderWidth?: number;
  borderColor?: ColorValue;
}

const BorderGroup = ({
  children,
  style,
  wrapChildren = false,
  borderRadius,
  borderWidth,
  borderColor,
  ...blockProps
}: IBorderGroup) => {
  const { sizes, colors } = useTheme();

  const radius = borderRadius || sizes.inputRadius;
  const width = borderWidth || sizes.inputBorder;
  const color = borderColor || colors.input;

  const renderedChildren = children?.flat()?.filter(Boolean) ?? [];

  return (
    <Block flex={0} style={style} {...blockProps}>
      {renderedChildren.map((child, index) => {
        const isFirst = index === 0;
        const isLast = index === renderedChildren.length - 1;

        return wrapChildren ? (
          <Block flex={0} row key={`border-group-${index}`}>
            {child}
          </Block>
        ) : (
          React.cloneElement(child, {
            key: `border-group-${index}`,
            style: {
              ...child.props?.style,
              borderColor: color,
              borderWidth: width,
              borderLeftWidth: isFirst ? width : 0,
              borderTopLeftRadius: isFirst ? radius : undefined,
              borderBottomLeftRadius: isFirst ? radius : undefined,
              borderTopRightRadius: isLast ? radius : undefined,
              borderBottomRightRadius: isLast ? radius : undefined,
            },
          })
        );
      })}
    </Block>
  );
};

export default BorderGroup;
