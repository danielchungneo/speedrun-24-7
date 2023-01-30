import React, {
  createContext,
  FunctionComponent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  getSessionToken,
  removeSessionToken,
  setSessionToken,
} from '@/utils/session';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ActivityIndicator, Keyboard, View } from 'react-native';
import { ITheme } from '@/constants/types';
import { dark, light } from '@/constants';
import Storage from '@react-native-async-storage/async-storage';
import { USER_SET_DARK_MODE } from '@/constants/config';
import { getActiveRoute } from '@/utils/navigation';

interface IAppActions {
  setToken: any;
  removeToken: any;
  onNavigationReady: () => void;
  resetNavigationRef: () => void;
  onNavigationStateChange: () => void;
  handleIsDark: (payload: boolean) => void;
  setTheme: (theme: ITheme) => void;
  setNavigationType: (navType: IAppState['navigationType']) => void;
}

interface IAppState {
  token: string | undefined;
  navigationReady: boolean;
  navigationRef: React.Ref<any>;
  currentRoute: any;
  currentStack: any;
  isDark: boolean;
  theme: ITheme;
  altTheme: ITheme;
  keyboardIsOpen: boolean;
  navigationType: 'tabs' | 'drawer';
}

interface IAppRefs {
  navigationRef: React.Ref<any>;
}

export interface IAppContext {
  state: IAppState;
  actions: IAppActions;
  refs: IAppRefs;
}

export const AppContext = createContext<IAppContext>({} as any);

const AppProvider: FunctionComponent = ({ children }) => {
  /**
   * STATE
   */
  const [token, updateToken] = useState<string>();
  const [initCheckComplete, setInitCheckComplete] = useState<boolean>(false);
  const [navigationReady, setNavigationReady] = useState<boolean>(false);
  const [currentRoute, setCurrentRoute] = useState<any>();
  const [currentStack, setCurrentStack] = useState<any>();
  const [isDark, setIsDark] = useState(false);
  const [theme, setTheme] = useState<ITheme>(light);
  const [altTheme, setAltTheme] = useState<ITheme>(dark);
  const [keyboardIsOpen, setKeyboardIsOpen] = useState<boolean>(false);
  const [navigationType, setNavigationType] =
    useState<IAppState['navigationType']>('tabs');

  /**
   * REFS
   */
  const navigationRef = useRef();

  /**
   * FUNCTIONS
   */
  async function onNavigationReady() {
    setNavigationReady(true);
    updateCurrentRoute();
  }
  async function resetNavigationRef() {
    navigationRef.current = null;
    setNavigationReady(false);
  }

  async function updateCurrentRoute() {
    const rootState = navigationRef.current.getRootState();
    const newStack =
      navigationType === 'tabs'
        ? rootState.routes[rootState.index]?.name
        : rootState.routeNames[rootState.index];

    // const newRoute = navigationRef.current.getCurrentRoute()
    const newRoute = getActiveRoute(rootState);
    // const previousRoute = getPreviousRoute({ state: rootState });

    // console.log({
    //   rootState,
    //   newRoute,
    //   previousRoute,
    // });

    setCurrentRoute(newRoute);
    setCurrentStack(newStack);
  }
  async function onNavigationStateChange(...stuff) {
    updateCurrentRoute();
  }

  async function setToken(data: string) {
    await setSessionToken(data);
    updateToken(data);
  }

  async function removeToken() {
    await removeSessionToken();
    updateToken(undefined);
  }

  async function checkForStoredToken() {
    //
    const tokenFromStorage = await getSessionToken();

    if (tokenFromStorage) {
      updateToken(tokenFromStorage);
    }

    setInitCheckComplete(true);
  }

  // get isDark mode from storage
  const getIsDark = useCallback(async () => {
    // get preferance gtom storage
    const isDarkJSON = await Storage.getItem(USER_SET_DARK_MODE);

    if (isDarkJSON !== null) {
      // set isDark / compare if has updated
      setIsDark(JSON.parse(isDarkJSON));
    }
  }, [setIsDark]);

  // handle isDark mode
  const handleIsDark = useCallback(
    (payload: boolean) => {
      // set isDark / compare if has updated
      setIsDark(payload);
      // save preferance to storage
      Storage.setItem(USER_SET_DARK_MODE, JSON.stringify(payload));
    },
    [setIsDark]
  );

  /**
   * COMPUTED
   */
  const state: IAppState = {
    token,
    navigationRef,
    navigationReady,
    currentRoute,
    currentStack,
    //
    isDark,
    theme,
    altTheme,
    keyboardIsOpen,
    navigationType,
  };
  const actions: IAppActions = {
    setToken,
    removeToken,
    onNavigationReady,
    resetNavigationRef,
    onNavigationStateChange,
    handleIsDark,
    setTheme,
    setNavigationType,
  };
  const refs: IAppRefs = {
    navigationRef,
  };

  /**
   * EFFECTS
   */
  useEffect(() => {
    checkForStoredToken();
  }, []);

  // get initial data for: isDark & language
  useEffect(() => {
    getIsDark();
  }, [getIsDark]);

  // change theme based on isDark updates
  useEffect(() => {
    setTheme(isDark ? dark : light);
    setAltTheme(isDark ? light : dark);
  }, [isDark]);

  // watch for keyboard changes
  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardIsOpen(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardIsOpen(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  if (!initCheckComplete) {
    return (
      <SafeAreaView style={[{ flex: 1, justifyContent: 'center' }]}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  return (
    <AppContext.Provider
      value={{
        state,
        actions,
        refs,
      }}
    >
      {/* key on navigation type to cause a full re-render when switching to help clear current states and reset the app */}
      <View key={navigationType} style={{ flex: 1 }}>
        {children}
      </View>
    </AppContext.Provider>
  );
};

export default AppProvider;
