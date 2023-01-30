import { HTTP_REQUEST_METHODS } from '@/constants/http';
import { IBuildUrlOptions } from 'types';
import {
  IAuthApi,
  IRolesApi,
  ISessionApi,
  IUsersApi,
} from 'types/apis/auth';
import { generateCrudRoutes } from '@/utils/http';

const session: ISessionApi = {
  get: (options?: IBuildUrlOptions) => {
    return {
      url: '/auth/session/me', // change back to /auth/session/login when backend is ready
      method: HTTP_REQUEST_METHODS.GET,
      options,
    };
  },
  login: (options?: IBuildUrlOptions) => {
    return {
      url: '/auth/session/login', // change back to /auth/session/login when backend is ready
      method: HTTP_REQUEST_METHODS.POST,
      options,
    };
  },
};

const roles: IRolesApi = {
  getAll: (options?: IBuildUrlOptions) => {
    return {
      url: '/auth/roles',
      method: HTTP_REQUEST_METHODS.GET,
      options,
    };
  },
};

const users: IUsersApi = {
  ...generateCrudRoutes('auth/users'),
  resetPasswordRequest: (options?: IBuildUrlOptions) => {
    return {
      url: '/auth/users/requestResetPassword',
      method: HTTP_REQUEST_METHODS.POST,
      options,
    };
  },
  resetPassword: (options?: IBuildUrlOptions) => {
    return {
      url: '/auth/users/resetPassword/:token',
      method: HTTP_REQUEST_METHODS.POST,
      options,
    };
  },
  register: (options?: IBuildUrlOptions) => {
    return {
      url: '/auth/users/register',
      method: HTTP_REQUEST_METHODS.POST,
      options,
    };
  },
};

const auth: IAuthApi = {
  roles,
  session,
  users,
};

export default auth;
