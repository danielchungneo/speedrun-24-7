import screens from '@/constants/screens';
import useApp from '@/utils/hooks/context/useApp';
import useTheme from '@/utils/hooks/context/useTheme';
import {
  DrawerActions,
  StackActions,
  useNavigation,
} from '@react-navigation/native';
import { ColorValue } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Text from '../Text';

interface IProfileButtonProps {
  textColor?: ColorValue;
  iconColor?: ColorValue;
  showUsername?: boolean;
}

const ProfileButton = ({
  textColor,
  iconColor,
  showUsername = true,
}: IProfileButtonProps) => {
  const { sizes, colors } = useTheme();
  const navigation = useNavigation();
  const {
    state: { navigationType },
  } = useApp();

  return (
    <>
      <TouchableOpacity
        onPress={() => {
          if (navigationType === 'drawer') {
            navigation.dispatch(
              DrawerActions.jumpTo(screens.MAIN_STACK, {
                screen: screens.PROFILE,
              })
            );
          } else {
            navigation.navigate(screens.CT_PROFILE);
          }
        }}
        style={{ display: 'flex', flexDirection: 'row' }}
      >
        {showUsername && (
          <Text color={textColor || colors.text} semibold marginRight={sizes.s}>
            Welcome, Jason
          </Text>
        )}
        <Feather name="user" size={24} color={iconColor || colors.text} />
        {/* <Image
          radius={6}
          width={24}
          height={24}
          source={{ uri: user.avatar }}
        /> */}
      </TouchableOpacity>
    </>
  );
};

export default ProfileButton;
