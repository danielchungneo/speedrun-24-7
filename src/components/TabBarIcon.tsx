import { Ionicons } from '@expo/vector-icons';
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';

const TabBarIcon =
  ({
    name,
    focusedName,
    unfocusedName,
    color: colorOverride,
    family,
  }: {
    name: string;
    focusedName?: string;
    unfocusedName?: string;
    color?: string;
    family?: any;
  }): BottomTabNavigationOptions['tabBarIcon'] =>
  ({ focused, size, color }) => {
    const Family = family || Ionicons;
    const iconName = focused
      ? focusedName
        ? focusedName
        : name
      : unfocusedName
      ? unfocusedName
      : name + '-outline';

    return (
      <Family
        name={iconName}
        color={colorOverride || color}
        size={size}
        style={{ marginBottom: -3 }}
      />
    );
  };

export default TabBarIcon;
