import { DARK_THEME } from '@/constants/theme/dark';
import { LIGHT_THEME } from '@/constants/theme/light';
import {
  CREATE_SESSION,
  LOGOUT,
  ON_NAVIGATION_READY,
  ON_NAVIGATION_STATE_CHANGE,
  RESET_NAVIGATION_REF,
  RESTORE_SESSION,
  SET_NAVIGATION_TYPE,
  UPDATE_THEME,
} from './SessionProvider.constants';

export default function SessionProviderReducer (state: any, action: any): any {
  const { type, data, token, currentRoute, currentStack, ...sanitized } =
    action;

  switch (type) {
    case CREATE_SESSION:
    case RESTORE_SESSION: {
      const update: any = {
        user: data,
        token: token || state.token,
      };

      return { ...state, ...update };
    }

    case LOGOUT: {
      return {
        ...state,
        token: null,
        user: null,
      };
    }

    case UPDATE_THEME: {
      const { isDark } = action;

      return {
        ...state,
        isDark,
        theme: isDark ? DARK_THEME : LIGHT_THEME,
        altTheme: isDark ? LIGHT_THEME : DARK_THEME,
      };
    }

    case ON_NAVIGATION_STATE_CHANGE: {
      return { ...state, currentRoute, currentStack };
    }

    case ON_NAVIGATION_READY: {
      return { ...state, navigationReady: true, currentRoute, currentStack };
    }

    case RESET_NAVIGATION_REF: {
      return { ...state, navigationReady: false, currentRoute, currentStack };
    }

    case SET_NAVIGATION_TYPE: {
      const { navigationType } = action;
      return { ...state, navigationType };
    }

    default: {
      return state;
    }
  }
}
