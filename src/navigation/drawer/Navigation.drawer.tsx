import React, { useCallback, useMemo, useState } from 'react';
import { Pressable, StyleSheet, Animated } from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentScrollView,
  useDrawerStatus,
} from '@react-navigation/drawer';
import Main from './Main.drawer';
import Auth from './Auth.drawer';
import Block from '@/components/Block';
import Text from '@/components/Text';
import Image from '@/components/Image';
import Button from '@/components/Buttons/Button';
import useTheme from '@/utils/hooks/context/useTheme';
import useTranslation from '@/utils/hooks/context/useTranslation';
import { Feather } from '@expo/vector-icons';
import SCREENS from '@/constants/screens';
import useSession from '@/utils/hooks/context/useSession';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CommonActions } from '@react-navigation/native';
import Switch from '@/components/Inputs_NEW/Select/Switch';

const Drawer = createDrawerNavigator();

/* drawer menu navigation */
const CustomStack = ({ Stack }) => {
  const { colors } = useTheme();
  const drawerStatus = useDrawerStatus();
  const isDrawerOpen = drawerStatus === 'open';

  // const animation = useRef(new Animated.Value(0)).current;

  // const scale = animation.interpolate({
  //   inputRange: [0, 1],
  //   outputRange: [1, 0.88],
  // });

  // const borderRadius = animation.interpolate({
  //   inputRange: [0, 1],
  //   outputRange: [0, 16],
  // });

  // const animatedStyle = {
  //   borderRadius: borderRadius,
  //   transform: [{ scale: scale }],
  // };

  // useEffect(() => {
  //   Animated.timing(animation, {
  //     duration: 200,
  //     useNativeDriver: true,
  //     toValue: drawerStatus === 'open' ? 1 : 0,
  //   }).start();
  // }, [isDrawerOpen, animation]);

  return (
    <Animated.View
      style={StyleSheet.flatten([
        // animatedStyle,
        {
          flex: 1,
          overflow: 'hidden',
          borderColor: colors.card,
          // borderWidth: isDrawerOpen ? 1 : 0,
        },
      ])}
    >
      <Stack />
    </Animated.View>
  );
};

const MainStack = () => <CustomStack Stack={Main} />;
const AuthStack = () => <CustomStack Stack={Auth} />;

/* custom drawer menu */
const DrawerContent = (props: DrawerContentComponentProps) => {
  const { navigation } = props;

  /**
   * STATE
   */
  const [navScrollViewLayout, setNavScrollViewLayout] = useState<any>();

  /**
   * HOOKS
   */
  const {
    actions: { logout },
  } = useSession();
  const { t } = useTranslation();
  const { assets, colors, gradients, sizes, styles } = useTheme();
  const insets = useSafeAreaInsets();
  const {
    state: { currentRoute, isDark },
    actions: { setNavigationType, updateTheme },
  } = useSession();

  /**
   * COMPUTED
   */
  const scrollViewBottomBuffer = 15;
  const navScrollViewAtBottom = useMemo(() => {
    return !!navScrollViewLayout
      ? navScrollViewLayout.contentSize?.height -
          navScrollViewLayout.layoutMeasurement?.height -
          scrollViewBottomBuffer <
          navScrollViewLayout.contentOffset?.y
      : true;
  }, [navScrollViewLayout]);

  const mainScreens = useMemo(() => {
    return [
      { name: t('screens.home'), to: SCREENS.MC_DASHBOARD, icon: assets.home },
      // TODO: REMOVE_ME
      {
        name: 'Landing',
        to: SCREENS.LANDING,
        icon: assets.documentation,
      },
      {
        name: t('screens.settings'),
        to: SCREENS.SETTINGS,
        icon: assets.settings,
      },
      // TODO: REMOVE_ME
      {
        name: 'Customers',
        to: SCREENS.MC_CUSTOMER_LIST,
        icon: assets.users,
      },
      // TODO: REMOVE_ME
      {
        name: 'Entity Template',
        to: SCREENS.ENTITY_TEMPLATE_LIST,
        icon: assets.more,
      },
    ];
  }, []);

  /**
   * FUNCTIONS
   */
  const handleNavigation = useCallback(
    to => {
      if (currentRoute?.name !== to) {
        // reset history when changing to a different stack
        const resetAction = CommonActions.reset({
          index: 0,
          routes: [{ name: to }],
        });

        navigation.dispatch?.(resetAction);
      }

      navigation.closeDrawer();
    },
    [navigation, , currentRoute]
  );

  const handleLogout = () => {
    navigation.closeDrawer();
    logout();
  };

  const handleSwitchToTabs = () => {
    setNavigationType('tabs');
  };

  const handleNavScrollViewScroll = ({ nativeEvent }: any) => {
    setNavScrollViewLayout(nativeEvent);
  };

  const handleNavScrollViewContentSizeChange = (
    width: number,
    height: number
  ) => {
    setNavScrollViewLayout(prev => ({
      ...prev,
      contentSize: { width, height },
    }));
  };

  const handleNavScrollViewOnLayout = (e: any) => {
    const newLayout = e.nativeEvent.layout;

    setNavScrollViewLayout(prev => ({
      ...prev,
      layoutMeasurement: newLayout,
    }));
  };

  const renderScreenRouteLink = (screen, index) => {
    const isActive = currentRoute?.name === screen.to;

    return (
      <Button
        row
        justify='flex-start'
        marginBottom={sizes.s}
        key={`menu-screen-${screen.name}-${index}`}
        onPress={() => handleNavigation(screen.to)}
      >
        <Block
          flex={0}
          radius={6}
          align='center'
          justify='center'
          width={sizes.md}
          height={sizes.md}
          marginRight={sizes.s}
          gradient={gradients[isActive ? 'primary' : 'white']}
        >
          <Image
            radius={0}
            width={14}
            height={14}
            source={screen.icon}
            color={colors[isActive ? 'white' : 'black']}
          />
        </Block>
        <Text size='p' semibold={isActive}>
          {screen.name}
        </Text>
      </Button>
    );
  };

  return (
    <DrawerContentScrollView
      {...props}
      scrollEnabled
      bounces={false}
      showsVerticalScrollIndicator={false}
      nestedScrollEnabled
      removeClippedSubviews
      renderToHardwareTextureAndroid
      contentContainerStyle={{
        paddingBottom: sizes.padding,
        height: '100%',
      }}
    >
      <Block paddingHorizontal={sizes.padding}>
        <Block
          flex={0}
          row
          align='center'
          marginBottom={sizes.l}
          marginTop={sizes.sm}
          radius={sizes.m}
        >
          <Image
            radius={0}
            width={50}
            height={50}
            source={assets.logo}
            marginRight={sizes.sm}
          />
          <Block>
            <Text size={12} semibold>
              mc-app
            </Text>
            <Text size={12} semibold variant='secondary'>
              Moreland Connect
            </Text>
          </Block>
        </Block>

        <Block>
          <Block flex={0}>
            <Block
              flex={0}
              scroll
              showsVerticalScrollIndicator={false}
              bounces={false}
              onScroll={handleNavScrollViewScroll}
              onLayout={handleNavScrollViewOnLayout}
              onContentSizeChange={handleNavScrollViewContentSizeChange}
              scrollEventThrottle={16}
            >
              <Text variant='secondary' size='p' bold marginBottom={sizes.xs}>
                Main Screens
              </Text>
              {mainScreens?.map(renderScreenRouteLink)}
            </Block>

            {!navScrollViewAtBottom && (
              <Pressable
                style={[
                  {
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                  },
                ]}
              >
                <Feather
                  name='chevrons-down'
                  size={sizes.h4}
                  color={colors.secondary}
                />
              </Pressable>
            )}
          </Block>
          <Block />
        </Block>

        <Block
          flex={0}
          height={1}
          marginVertical={sizes.sm}
          variant='secondary'
        />

        {/* TODO: REMOVE_START */}
        <Block flex={0} row>
          <Button
            row
            justify='center'
            align='center'
            onPress={handleSwitchToTabs}
          >
            <Text size='p' marginRight={sizes.s}>
              Switch to tab navigator
            </Text>
            <Feather color={colors.text} name='chevron-right' size={sizes.h5} />
          </Button>
        </Block>
        {/* TODO: REMOVE_END */}

        {/* TODO: REMOVE_START (if dark mode isn't needed) */}
        <Block flex={0} row justify='space-between' marginTop={sizes.sm}>
          <Text size='p'>{t('darkMode')}</Text>
          <Switch
            form={false}
            value={isDark}
            onChange={e => updateTheme(e.target.value)}
          />
        </Block>
        {/* TODO: REMOVE_END */}

        <Block flex={0} marginTop={sizes.m} marginBottom={insets.bottom}>
          <Button onPress={handleLogout} variant='secondary' row>
            <Text
              bold
              variant='white'
              transform='uppercase'
              marginRight={sizes.sm}
            >
              Sign out
            </Text>
            <Text variant='white'>
              <Feather name='log-out' size={sizes.m} />
            </Text>
          </Button>
        </Block>
      </Block>
    </DrawerContentScrollView>
  );
};

/* drawer menu navigation */
export default () => {
  const { gradients } = useTheme();
  const {
    state: { currentRoute, isDark },
  } = useSession();

  return (
    <Block gradient={gradients[isDark ? 'dark' : 'light']}>
      <Drawer.Navigator
        initialRouteName={SCREENS.AUTH_STACK}
        drawerContent={DrawerContent}
        screenOptions={{
          headerShown: false,
          swipeEnabled: false,
          drawerType: 'slide',
          overlayColor: 'transparent',
          sceneContainerStyle: {
            backgroundColor: 'transparent',
          },
          drawerStyle: {
            flex: 1,
            width: '60%',
            borderRightWidth: 0,
            backgroundColor: 'transparent',
          },
        }}
      >
        <Drawer.Screen name={SCREENS.AUTH_STACK} component={AuthStack} />
        <Drawer.Screen
          name={SCREENS.MAIN_STACK}
          component={MainStack}
          options={(...stuff) => {
            const drawerLockedScreenNames: string[] = [
              SCREENS.ABOUT,
              SCREENS.PRIVACY,
              SCREENS.AGREEMENT,
              SCREENS.PROFILE,
              //
              // DEMO
              // TODO: REMOVE_ME
              SCREENS.MC_CUSTOMER_EDIT,
            ];
            const drawerLocked = drawerLockedScreenNames.includes(
              currentRoute?.name
            );

            return {
              headerShown: false,
              swipeEnabled: !drawerLocked,
            };
          }}
        />
      </Drawer.Navigator>
    </Block>
  );
};
