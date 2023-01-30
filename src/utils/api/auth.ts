import { HTTP_REQUEST_METHODS } from "@/constants/http";
import { IBuildUrlOptions } from "@/constants/types";
import { generateCrudRoutes } from "@/utils/http";

const session = {
  get: (options?: IBuildUrlOptions) => {
    return {
      url: "/auth/session/me",
      method: HTTP_REQUEST_METHODS.GET,
      options,
    };
  },
  login: (options?: IBuildUrlOptions) => {
    return {
      url: "/auth/session/login",
      method: HTTP_REQUEST_METHODS.POST,
      options,
    };
  },
};

const roles = {
  getAll: (options?: IBuildUrlOptions) => {
    return {
      url: "/auth/roles",
      method: HTTP_REQUEST_METHODS.GET,
      options,
    };
  },
};

const users = {
  ...generateCrudRoutes("auth/users"),
  resetPasswordRequest: (options?: IBuildUrlOptions) => {
    return {
      url: "/auth/users/requestResetPassword",
      method: HTTP_REQUEST_METHODS.POST,
      options,
    };
  },
  resetPassword: (options?: IBuildUrlOptions) => {
    return {
      url: "/auth/users/resetPassword/:token",
      method: HTTP_REQUEST_METHODS.POST,
      options,
    };
  },
};

const auth = {
  roles,
  session,
  users,
};

export default auth;
