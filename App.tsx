import React, { FunctionComponent, useEffect, useState } from 'react';
import { Platform, StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SWRConfig } from 'swr';
import Toast from 'react-native-toast-message';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import * as Sentry from 'sentry-expo';
import DrawerNavigation from '@/navigation/drawer/Navigation.drawer';
import TabNavigation from '@/navigation/tabs/Navigation.tabs';
import { SENTRY_DSN } from '@/constants/sentry';
import AppProvider from '@/providers/AppProvider';
import TranslationProvider from '@/providers/TranslationProvider';
import SessionProvider from '@/providers/SessionProvider';
import DemoProvider from '@/providers/DemoProvider';
import useApp from '@/utils/hooks/context/useApp';
import { PortalProvider } from '@gorhom/portal';

!!SENTRY_DSN &&
  Sentry.init({
    dsn: SENTRY_DSN,
    enableInExpoDevelopment: true,
    debug: true,
  });

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
    state: { navigationReady, isDark, theme, navigationType },
    actions: { onNavigationReady, onNavigationStateChange, resetNavigationRef },
    refs: { navigationRef },
  } = useApp();

  // load custom fonts
  const [fontsLoaded] = useFonts({
    'OpenSans-Light': theme.assets.OpenSansLight,
    'OpenSans-Regular': theme.assets.OpenSansRegular,
    'OpenSans-SemiBold': theme.assets.OpenSansSemiBold,
    'OpenSans-ExtraBold': theme.assets.OpenSansExtraBold,
    'OpenSans-Bold': theme.assets.OpenSansBold,
  });

  /**
   * COMPUTED
   */

  /**
   * FUNCTIONS
   */
  const onUnhandledAction = (event) => {
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

  if (!fontsLoaded) {
    return <AppLoading />;
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
      {/* TODO: REMOVE_ME (remove whichever navigator is not needed and remove the import from above) */}
      {navigationType === 'tabs' ? <TabNavigation /> : <DrawerNavigation />}
    </NavigationContainer>
  );
};

export default function AppWithProviders() {
  return (
    <SafeAreaProvider>
      <SWRConfig
        value={{
          shouldRetryOnError: false,
        }}
      >
        <AppProvider>
          <PortalProvider>
            {/* TODO: REMOVE_ME (only remove DemoProvider) */}
            <DemoProvider>  
              <TranslationProvider>
                <SessionProvider>
                  <App />
                </SessionProvider>
              </TranslationProvider>
            </DemoProvider>
          </PortalProvider>
        </AppProvider>
      </SWRConfig>

      <Toast
        ref={(ref) => Toast.setRef(ref)}
        topOffset={40}
        bottomOffset={20}
        position="bottom"
      />
    </SafeAreaProvider>
  );
}
