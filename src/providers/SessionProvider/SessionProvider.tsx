import api from '@/utils/api';
import useRequest from '@/utils/hooks/useRequest';
import React, {
  createContext,
  FunctionComponent,
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react';
import SessionProviderReducer from './SessionProvider.reducer';
import { ITheme } from 'types';
import Storage from '@react-native-async-storage/async-storage';
import { removeSessionToken } from '@/utils/session';
import { getActiveRoute } from '@/utils/navigation';
import { Keyboard } from 'react-native';
import {
  CREATE_SESSION,
  KEYBOARD_IS_OPEN,
  LOGOUT,
  ON_NAVIGATION_READY,
  ON_NAVIGATION_STATE_CHANGE,
  RESET_NAVIGATION_REF,
  RESTORE_SESSION,
  SET_NAVIGATION_TYPE,
  UPDATE_THEME,
} from './SessionProvider.constants';
import { USER_SET_DARK_MODE } from '@/constants/config';
import useToken from '@/utils/hooks/context/useToken';
import { LIGHT_THEME } from '@/constants/theme/light';
import { DARK_THEME } from '@/constants/theme/dark';

interface ISessionActions {
  createSession: (data: any) => void;
  restoreSession: (data: any) => void;
  logout: () => void;

  onNavigationReady: () => void;
  onNavigationStateChange: () => void;
  resetNavigationRef: () => void;
  updateTheme: (isDark: boolean) => void;
  setNavigationType: (navType: ISessionState['navigationType']) => void;
}

interface ISessionState {
  user: any;
  token: string | undefined;
  navigationReady: boolean;
  currentRoute: any;
  currentStack: any;
  isDark: boolean;
  theme: ITheme;
  altTheme: ITheme;
  keyboardIsOpen: boolean;
  navigationType: 'tabs' | 'drawer';
}

interface ISessionRefs {
  navigationRef: React.Ref<any>;
}

export interface ISessionContext {
  state: ISessionState;
  actions: ISessionActions;
  refs: ISessionRefs;
}

export const SessionContext = createContext<ISessionContext>({} as any);

const initialState: any = {
  user: null,
  token: null,
  navigationReady: false,
  currentRoute: null,
  currentStack: null,
  isDark: false,
  theme: LIGHT_THEME,
  altTheme: DARK_THEME,
  keyboardIsOpen: false,
  navigationType: 'tabs',
};

const SessionProvider: FunctionComponent = ({
  children,
  initialToken,
}: any) => {
  // #region STATE
  const [initializationComplete, setInitializationComplete] =
    useState<boolean>(false);
  const [sessionReady, setSessionReady] = useState(false);

  // #endregion

  // #region HOOKS
  const [state, dispatch]: [ISessionState, any] = useReducer(
    SessionProviderReducer,
    initialState
  );
  const navigationRef = useRef();

  const {
    data: userData,
    errors: userErrors,
    loading,
    submitRequest,
  } = useRequest(api.auth.session.get(), {
    swr: false,
    onSuccess: onFetchMeSuccess,
    onError: onFetchMeError,
    onComplete: onFetchMeComplete,
  });
  const {
    actions: { updateToken },
  } = useToken();
  //  #endregion

  // #region FUNCTIONS
  const createSession: ISessionActions['createSession'] = useCallback(
    async data => {
      const newToken = data.token;

      if (newToken) {
        console.log({
          newToken: newToken.slice(-5),
        });

        updateToken(newToken);
      }

      dispatch({
        type: CREATE_SESSION,
        data,
      });
    },
    []
  );

  const restoreSession: ISessionActions['restoreSession'] = useCallback(
    async data => {
      const newToken = data.token;

      if (newToken) {
        updateToken(newToken);
      }

      dispatch({
        type: RESTORE_SESSION,
        data,
      });
    },
    []
  );

  const logout: ISessionActions['logout'] = useCallback(async () => {
    await removeSessionToken();
    dispatch({
      type: LOGOUT,
    });
  }, []);

  const onNavigationReady: ISessionActions['onNavigationReady'] =
    useCallback(async () => {
      const { currentRoute, currentStack } = getCurrentRouteAndStack();

      dispatch({
        type: ON_NAVIGATION_READY,
        currentRoute,
        currentStack,
      });
    }, []);

  const resetNavigationRef: ISessionActions['resetNavigationRef'] =
    useCallback(async () => {
      const { currentRoute, currentStack } = getCurrentRouteAndStack();

      navigationRef.current = null;

      dispatch({
        type: RESET_NAVIGATION_REF,
        currentRoute,
        currentStack,
      });
    }, []);

  const onNavigationStateChange: ISessionActions['onNavigationStateChange'] =
    useCallback(async () => {
      const { currentRoute, currentStack } = getCurrentRouteAndStack();

      dispatch({
        type: ON_NAVIGATION_STATE_CHANGE,
        currentRoute,
        currentStack,
      });
    }, []);

  const updateTheme: ISessionActions['updateTheme'] = useCallback(
    async isDark => {
      await Storage.setItem(USER_SET_DARK_MODE, JSON.stringify(isDark));

      dispatch({
        type: UPDATE_THEME,
        isDark,
      });
    },
    []
  );

  const setNavigationType: ISessionActions['setNavigationType'] = useCallback(
    async navigationType => {
      dispatch({
        type: SET_NAVIGATION_TYPE,
        navigationType,
      });
    },
    []
  );

  const updateKeyboardState = useCallback(async (keyboardIsOpen: boolean) => {
    dispatch({
      type: KEYBOARD_IS_OPEN,
      keyboardIsOpen,
    });
  }, []);

  async function initializeSession () {
    const isDarkValue = await Storage.getItem(USER_SET_DARK_MODE);
    updateTheme(isDarkValue === 'true');

    setInitializationComplete(true);
  }

  function getCurrentRouteAndStack (): { currentRoute: any; currentStack: any } {
    const rootState = navigationRef.current?.getRootState?.();
    const newStack =
      state.navigationType === 'tabs'
        ? rootState.routes[rootState.index]?.name
        : rootState.routeNames[rootState.index];

    // const newRoute = navigationRef.current.getCurrentRoute()
    const newRoute = getActiveRoute(rootState);
    // const previousRoute = getPreviousRoute({ state: rootState });

    return {
      currentRoute: newRoute,
      currentStack: newStack,
    };
  }

  async function onFetchMeSuccess (user: any) {
    createSession(user);
  }

  async function onFetchMeError (error: any) {
    //
    console.log('onFetchMeError', error);
  }

  async function onFetchMeComplete () {
    setSessionReady(true);
  }

  // #endregion

  // #region COMPUTED
  const actions: ISessionActions = {
    createSession,
    restoreSession,
    logout,
    onNavigationReady,
    onNavigationStateChange,
    resetNavigationRef,
    updateTheme,
    setNavigationType,
  };
  const refs: ISessionRefs = {
    navigationRef,
  };
  // #endregion

  // #region EFFECTS
  useEffect(() => {
    if (!initializationComplete || sessionReady) {
      return;
    }

    if (state.token) {
      submitRequest?.();
    } else {
      setSessionReady(true);
    }
  }, [state.token, initializationComplete]);

  useEffect(() => {
    initializeSession();
  }, []);

  // watch for keyboard changes
  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      updateKeyboardState(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      updateKeyboardState(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);
  // #endregion

  if (!sessionReady) {
    return null;
  }

  return (
    <SessionContext.Provider
      value={{
        state,
        actions,
        refs,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export default SessionProvider;
