import useTheme from '@/utils/hooks/context/useTheme';
import api from '@/utils/api';
import useRequest from '@/utils/hooks/useRequest';
import React, {
  createContext,
  FunctionComponent,
  useEffect,
  useReducer,
  useRef,
} from 'react';
import { ActivityIndicator, View } from 'react-native';
import {
  createSession,
  logout,
  restoreSession,
  setCurrentRoute,
  setNavigationReady,
} from './SessionProvider.actions';
import SessionProviderReducer from './SessionProvider.reducer';
import { useContext } from 'react';
import { CommonActions } from '@react-navigation/native';
import screens from '@/constants/screens';
import useApp from '@/utils/hooks/context/useApp';

interface ISessionActions {
  createSession: (data: any) => void;
  restoreSession: (data: any) => void;
  logout: () => void;
}

interface ISessionState {
  user: any;
  shouldShowLoadingOverlay: boolean;
}

export interface ISessionContext {
  state: ISessionState;
  actions: ISessionActions;
}

export const SessionContext = createContext<ISessionContext>({} as any);

const initialState: any = {
  shouldShowLoadingOverlay: true,
  user: {},
};

const SessionProvider: FunctionComponent = ({ children }) => {
  /**
   * REDUCERS
   */
  const [state, dispatch]: [ISessionState, any] = useReducer(
    SessionProviderReducer,
    initialState
  );

  /**
   * HOOKS
   */
  const {
    data: userData,
    errors: userErrors,
    loading,
    submitRequest,
  } = useRequest(api.auth.session.get()); // Check for an existing session

  const { styles, colors } = useTheme();
  const {
    state: { navigationReady, currentStack },
    actions: { setToken, removeToken },
    refs: { navigationRef },
  } = useApp();

  /**
   * STATE
   */
  //

  /**
   * REFS
   */

  /**
   * COMPUTED
   */

  const isUserSessionValid = Boolean(userData?.id);
  const userSessionExists = state.user?.id;
  const inAuthStack = currentStack === screens.AUTH_STACK;
  const shouldShowLoadingOverlay =
    (!userSessionExists && loading) ||
    (!isUserSessionValid && !loading && !inAuthStack) ||
    ((isUserSessionValid || userSessionExists) && inAuthStack);

  // console.log(
  //   '------------------------------------------------\n\nSessionProvider: render'
  // );

  // console.log({
  //   navigationReady,
  //   isUserSessionValid,
  //   userSessionExists,
  //   inAuthStack,
  //   shouldShowLoadingOverlay,
  //   userErrors,
  //   userData,
  //   // state,
  //   loading,
  //   currentStack,
  // });

  // console.log('\n------------------------------------------------');

  const actions: ISessionActions = {
    createSession: (data: any) => {
      !!data.token && setToken(data.token);
      dispatch(createSession(data));
    },
    restoreSession: (data: any) => {
      !!data.token && setToken(data.token);
      dispatch(restoreSession(data));
    },
    logout: () => {
      removeToken();
      dispatch(logout());
    },
  };

  /**
   * FUNCTIONS
   */
  function checkUserSession() {
    if (!navigationReady) {
      return;
    }

    const sessionNotValidWhileInsideApp =
      (userErrors.length || !isUserSessionValid) && !loading && !inAuthStack;

    // console.log({
    //   navigationReady,
    //   isUserSessionValid,
    //   userSessionExists,
    //   inAuthStack,
    //   shouldShowLoadingOverlay,
    //   userErrors,
    //   userData,
    //   loading,
    //   sessionNotValidWhileInsideApp,
    // });

    // If the session isn't valid, redirect to login
    if (sessionNotValidWhileInsideApp) {
      actions.logout();

      const resetAction = CommonActions.reset({
        index: 0,
        routes: [{ name: screens.AUTH_STACK }],
      });

      navigationRef.current?.dispatch?.(resetAction);

      return;
    }

    // If there is a valid user session, restore the session
    if (isUserSessionValid) {
      actions.restoreSession(userData);

      // If there is a valid session and user is on login page, redirect to home
      if (inAuthStack) {
        const resetAction = CommonActions.reset({
          index: 0,
          routes: [{ name: screens.MAIN_STACK }],
        });

        navigationRef.current?.dispatch?.(resetAction);
        return;
      }
    }
    // else {
    //   console.log('SessionProvider: redirecting to login');

    //   const resetAction = CommonActions.reset({
    //     index: 0,
    //     routes: [{ name: screens.AUTH_STACK }],
    //   });

    //   navigationRef.current?.dispatch?.(resetAction);
    //   return;
    // }
  }

  /**
   * EFFECTS
   */
  useEffect(() => {
    checkUserSession();
  }, [isUserSessionValid, userErrors.length, loading, navigationReady]);

  return (
    <SessionContext.Provider
      value={{
        state,
        actions,
      }}
    >
      {children}

      {/* must use condition rendering; 
          can't use `display: none` and `position: absolute` together:
          LINK: https://github.com/facebook/react-native/issues/18415
      */}
      {shouldShowLoadingOverlay && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: colors.background,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ActivityIndicator size="large" />
        </View>
      )}
    </SessionContext.Provider>
  );
};

export default SessionProvider;
