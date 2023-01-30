import { DrawerActions, useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import Image from '../Image';
import Button from './Button';
import useTheme from '@/utils/hooks/context/useTheme';

const DrawerToggleButton = ({ style, color, size = 35 }: any) => {
  const { sizes, styles, colors, icons } = useTheme();
  const navigation = useNavigation();

  const mainColor = color || colors.text;

  const handlePress = () => {
    navigation.dispatch(DrawerActions.toggleDrawer());
  };

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
      <Image source={icons.menu} radius={0} color={mainColor} />
    </TouchableOpacity>
  );
};

export default DrawerToggleButton;
