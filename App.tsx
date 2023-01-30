import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { Platform, StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SWRConfig } from 'swr';
import Toast from 'react-native-toast-message';
import { useFonts } from 'expo-font';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import * as Sentry from 'sentry-expo';
import * as SplashScreen from 'expo-splash-screen';
import DrawerNavigation from '@/navigation/drawer/Navigation.drawer';
import TabNavigation from '@/navigation/tabs/Navigation.tabs';
import { SENTRY_DSN } from '@/constants/sentry';
import TranslationProvider from '@/providers/TranslationProvider';
import SessionProvider from '@/providers/SessionProvider';
import { PortalProvider } from '@gorhom/portal';
import Block from '@/components/Block';
import useSession from '@/utils/hooks/context/useSession';
import MainTabsNavigator from '@/navigation/tabs/Main.tabs';
import AuthTabsNavigator from '@/navigation/tabs/Auth.tabs';
import * as Notifications from 'expo-notifications';
import { Notification } from 'expo-notifications';
import TokenProvider from '@/providers/TokenProvider';
import UITestingTabsNavigator from '@/navigation/tabs/UITesting.tabs';

!!SENTRY_DSN &&
  Sentry.init({
    dsn: SENTRY_DSN,
    enableInExpoDevelopment: true,
    debug: true,
  });

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

Notifications.setNotificationHandler({
  handleNotification: async (notification: Notification) => {
    return {
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    };
  },
});

/**
 * ! SET THIS TO TRUE THIS TO VIEW STORYBOOK
 */
const VIEW_UI_TESTING_SCREEN = __DEV__ && false;

const App: FunctionComponent = () => {
  /**
   * STATE
   */
  // TODO: REMOVE_ME
  const [devResetNavigationKey, setDevResetNavigationKey] = useState<number>(
    new Date().getTime()
  );

  /**
   * HOOKS
   */
  const {
    state: { user, navigationReady, isDark, theme, navigationType },
    actions: { onNavigationReady, onNavigationStateChange, resetNavigationRef },
    refs: { navigationRef },
  } = useSession();

  // load custom fonts
  const [fontsLoaded] = useFonts({
    'OpenSans-Light': theme.assets.OpenSansLight,
    'OpenSans-Regular': theme.assets.OpenSansRegular,
    'OpenSans-SemiBold': theme.assets.OpenSansSemiBold,
    'OpenSans-ExtraBold': theme.assets.OpenSansExtraBold,
    'OpenSans-Bold': theme.assets.OpenSansBold,
  });
  const appIsReady = fontsLoaded && navigationReady;
  const signedIn = !!user?.id;

  /**
   * COMPUTED
   */

  /**
   * FUNCTIONS
   */
  const onUnhandledAction = event => {
    // console.warn(event);
  };

  /**
   * EFFECTS
   */
  useEffect(() => {
    /* set the status bar based on isDark constant */
    Platform.OS === 'android' && StatusBar.setTranslucent(true);
    StatusBar.setBarStyle(isDark ? 'light-content' : 'dark-content');
    return () => {
      StatusBar.setBarStyle('default');
    };
  }, [isDark]);

  // TODO: REMOVE_ME
  useEffect(() => {
    // used to force a complete app remount and reinitialize the navigation ref
    if (navigationReady && !navigationRef.current) {
      resetNavigationRef();
      setDevResetNavigationKey(new Date().getTime());
    }
  }, [navigationReady]);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!fontsLoaded) {
    return null;
  }

  const navigationTheme = {
    ...DefaultTheme,
    dark: isDark,
    colors: {
      ...DefaultTheme.colors,
      border: 'rgba(0,0,0,0)',
      text: String(theme.colors.text),
      card: String(theme.colors.card),
      primary: String(theme.colors.primary),
      notification: String(theme.colors.primary),
      background: String(theme.colors.background),
    },
  };

  return (
    <NavigationContainer
      key={__DEV__ ? devResetNavigationKey : null} // TODO: REMOVE_ME
      theme={navigationTheme}
      ref={navigationRef}
      onReady={onNavigationReady}
      onStateChange={onNavigationStateChange}
      onUnhandledAction={onUnhandledAction}
    >
      <Block onLayout={onLayoutRootView}>
        {/* TODO: REMOVE_ME (remove whichever navigator is not needed and remove the import from above) */}
        {VIEW_UI_TESTING_SCREEN ? (
          <UITestingTabsNavigator />
        ) : navigationType === 'tabs' ? (
          signedIn ? (
            <MainTabsNavigator />
          ) : (
            <AuthTabsNavigator />
          )
        ) : (
          <DrawerNavigation />
        )}
      </Block>
    </NavigationContainer>
  );
};

export default function AppWithProviders () {
  return (
    <SafeAreaProvider>
      <SWRConfig
        value={{
          shouldRetryOnError: false,
        }}
      >
        <TranslationProvider>
          <TokenProvider>
            <SessionProvider>
              <PortalProvider>
                <App />
              </PortalProvider>
            </SessionProvider>
          </TokenProvider>
        </TranslationProvider>
      </SWRConfig>

      <Toast
        ref={ref => Toast.setRef(ref)}
        topOffset={40}
        bottomOffset={20}
        position='bottom'
      />
    </SafeAreaProvider>
  );
}
