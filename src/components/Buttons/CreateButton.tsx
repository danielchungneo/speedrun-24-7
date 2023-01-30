import useTheme from '@/utils/hooks/context/useTheme';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Feather } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

const CreateButton = ({
  route,
  routeParams,
  onPress,
  color,
  style,
  size = 35,
}: any) => {
  const { sizes, styles, colors, icons } = useTheme();
  const navigation = useNavigation();

  const mainColor = color || colors.white;

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else if (route) {
      navigation.navigate(route, routeParams);
    }
  };

  const iconSize = size - 8;

  return (
    <TouchableOpacity
      style={[
        {
          minWidth: 0,
          minHeight: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        },
        // styles.tb,
        style,
      ]}
      onPress={handlePress}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
    >
      <Feather name="plus-circle" size={iconSize} color={mainColor} />
    </TouchableOpacity>
  );
};

export default CreateButton;
