import useTheme from '@/utils/hooks/context/useTheme';
import { getPreviousRoute } from '@/utils/navigation';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { ColorValue, TouchableOpacity } from 'react-native';
import Image from '../Image';
import Text from '../Text';

interface IGoBackButtonProps {
  onPress?: () => void;
  color?: ColorValue;
  title?: string;
  hideTitle?: boolean;
  usePreviousRouteName?: boolean;
  style?: any;
}

const GoBackButton = ({
  onPress,
  color,
  title,
  hideTitle = false,
  usePreviousRouteName = false,
  style,
}: IGoBackButtonProps) => {
  const { styles, sizes, colors, icons } = useTheme();
  const navigation = useNavigation();
  const previousRoute = getPreviousRoute({ state: navigation.getState() });

  const routeName = hideTitle
    ? null
    : title
    ? title
    : usePreviousRouteName
    ? previousRoute?.name
    : 'Back';

  const mainColor = color || colors.text;

  const handlePress = () => {
    onPress?.() || navigation.goBack();
  };

  return (
    <TouchableOpacity
      style={[
        {
          minWidth: 0,
          minHeight: 0,
          // height: size,
          // width: size,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'flex-start',
        },
        // styles.tb,
        style,
      ]}
      onPress={handlePress}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
    >
      <Image
        radius={0}
        width={10}
        height={18}
        color={mainColor}
        source={icons.arrow}
        transform={[{ rotate: '180deg' }]}
        // style={{ marginLeft: -10 }}
      />

      {!!routeName && (
        <Text p color={mainColor} marginLeft={sizes.s} onPress={handlePress}>
          {routeName}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default GoBackButton;
