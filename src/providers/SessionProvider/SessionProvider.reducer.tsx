import { removeSessionToken, setSessionToken } from '@/utils/session';
import {
  CREATE_SESSION,
  LOGOUT,
  RESTORE_SESSION,
  SET_CURRENT_ROUTE,
  SET_NAVIGATION_READY,
  SET_NAVIGATION_REF,
} from './SessionProvider.constants';

export default function SessionProviderReducer(state: any, action: any): any {
  const { type, data, ...sanitized } = action;

  switch (type) {
    case CREATE_SESSION:
    case RESTORE_SESSION: {
      return { ...state, user: data };
    }

    case LOGOUT: {
      return {
        ...state,
        token: null,
        user: null,
      };
    }

    case SET_NAVIGATION_REF: {
      return { ...state, navigationRef: data };
    }

    case SET_NAVIGATION_READY: {
      return { ...state, navigationReady: data };
    }

    case SET_CURRENT_ROUTE: {
      return { ...state, currentRoute: data };
    }

    default: {
      return state;
    }
  }
}
