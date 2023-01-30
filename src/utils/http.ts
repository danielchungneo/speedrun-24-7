import { DEFAULT_API_CONFIG } from '@/constants/api';
import { HTTP_REQUEST_METHODS } from '@/constants/http';
import {
  GenericObject,
  IAction,
  IApiResponse,
  IBuildUrlOptions,
} from 'types';
import { getSessionToken } from './session';

export const fetcherWithToken = async (url: string, token: string) =>
  fetch(url, {
    method: HTTP_REQUEST_METHODS.GET,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    mode: 'cors',
  }).then((res: any) => res.json());

export const fetcher = (...args: any[]) =>
  // @ts-ignore
  fetch(...args).then((res: any) => res.json());

export const getHeaders = async (optionalHeaders: any = {}) => {
  const token = await getSessionToken();

  let defaultHeaders: any = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
  if (token) {
    defaultHeaders.Authorization = `Bearer ${token}`;
  }

  let headers: Headers = new Headers();
  const tempHeaders = Object.assign({}, defaultHeaders, optionalHeaders);

  Object.keys(tempHeaders).forEach((headerKey) => {
    headers.append(headerKey, tempHeaders[headerKey]);
  });

  return headers;
};

export const buildUrl = (url: string, options?: IBuildUrlOptions) => {
  return `${DEFAULT_API_CONFIG.url}${fillUrlParams(url, options?.path)}${
    options?.query ? formatQueryParams(options?.query) : ''
  }`;
};

export const fillUrlParams = (url: string, variables: any = {}): string => {
  return url
    .split('/')
    .map((section: string) =>
      section[0] === ':' ? variables[section.slice(1)] : section
    )
    .join('/');
};

export const flattenOptions = (options: any): any => {
  if (!options) return [];

  let args: any[] = [];

  Object.keys(options).forEach((key: string) => {
    const option = options[key];
    if (option instanceof Array && ['filter', 'sort'].includes(key)) {
      option.forEach((k: any) => {
        args = args.concat(
          flattenOptions(k).map((opt) => ({
            [`${key}.${Object.keys(opt)[0]}`]: Object.values(opt)[0],
          }))
        );
      });
    } else if (option instanceof Array) {
      option.forEach((o: any) => {
        args.push({ [key]: o });
      });
    } else {
      args.push({ [key]: option });
    }
  });
  return args;
};

export const objectToEqualsString = (obj: object): string =>
  `${Object.keys(obj)[0]}=${Object.values(obj)[0]}`;

export function formatQueryParams(options: any): string {
  try {
    let flattenedOptions = flattenOptions(options);

    if (flattenedOptions && flattenedOptions.length) {
      return `?${flattenedOptions
        .map((option) => objectToEqualsString(option))
        .join('&')}`;
    }
    return '';
  } catch (e) {
    return 'query params malformed';
  }
}
export async function createRequest(action: IAction, body?: GenericObject) {
  const requestOptions = {
    method: action.method,
    headers: await getHeaders(action.headers),
    mode: 'cors',
  } as any;

  // if the body is formData, we don't want to stringify it
  if (body) {
    requestOptions.body =
      body instanceof FormData ? body : JSON.stringify(body);
  }

  // if the body is formData, we don't want to use the default headers
  if (body instanceof FormData) {
    requestOptions.headers.delete('Accept');
    requestOptions.headers.delete('Content-Type');
  }

  const request = await fetch(
    buildUrl(action.url, action.options),
    requestOptions
  );

  let response;
  try {
    response = await request.json();

    if (!('data' in response)) {
      if ([400, 401, 403, 404, 500].includes(response.status)) {
        response = {
          data: {},
          errors: [{ code: response.status, message: response.title }],
        };
      } else {
        response = { data: response, errors: [] };
      }
    }
  } catch (e) {
    response = {
      data: {},
      errors: [{ code: request.status, message: request.statusText }],
    };
  }

  return response;
}

export function generateCrudRoutes(entity: string) {
  return {
    getAll: (options?: IBuildUrlOptions) => {
      return {
        url: `/${entity}`,
        method: HTTP_REQUEST_METHODS.GET,
        options,
      };
    },
    get: (options?: IBuildUrlOptions) => {
      return {
        url: `/${entity}/:id`,
        method: HTTP_REQUEST_METHODS.GET,
        options,
      };
    },
    save: (options?: IBuildUrlOptions) => {
      if (options?.path?.id === 'create') {
        return {
          url: `/${entity}`,
          method: HTTP_REQUEST_METHODS.POST,
        };
      }
      return {
        url: `/${entity}/:id`,
        method: HTTP_REQUEST_METHODS.PUT,
        options,
      };
    },
    create: (options?: IBuildUrlOptions) => {
      return {
        url: `/${entity}`,
        method: HTTP_REQUEST_METHODS.POST,
        options,
      };
    },
    update: (options?: IBuildUrlOptions) => {
      return {
        url: `/${entity}/:id`,
        method: HTTP_REQUEST_METHODS.PUT,
        options,
      };
    },
    delete: (options?: IBuildUrlOptions) => {
      return {
        url: `/${entity}/:id`,
        method: HTTP_REQUEST_METHODS.DELETE,
        options,
      };
    },
  };
}
