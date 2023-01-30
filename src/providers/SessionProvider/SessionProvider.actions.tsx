import {
  CREATE_SESSION,
  LOGOUT,
  RESTORE_SESSION,
  SET_CURRENT_ROUTE,
  SET_NAVIGATION_READY,
  SET_NAVIGATION_REF,
} from './SessionProvider.constants';

export function createSession(data: any) {
  return {
    type: CREATE_SESSION,
    data,
  };
}
export function restoreSession(data: any) {
  return {
    type: RESTORE_SESSION,
    data,
  };
}

export function logout() {
  return {
    type: LOGOUT,
  };
}

export function setNavigationRef(data: any) {
  return {
    type: SET_NAVIGATION_REF,
    data,
  };
}

export function setNavigationReady(data: any) {
  return {
    type: SET_NAVIGATION_READY,
    data,
  };
}

export function setCurrentRoute(data: any) {
  return {
    type: SET_CURRENT_ROUTE,
    data,
  };
}
