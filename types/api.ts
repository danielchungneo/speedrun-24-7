import { IAuthApi } from './apis/auth';
import { IComponentsApi } from './apis/components';
import { IEntitiesApi } from './apis/entities';
import { IServicesApi } from './apis/services';
import { GenericObject } from './data';

export type ApiActionSetup = (options?: IBuildUrlOptions) => IAction;

export interface IBaseCrudRoutes {
  getAll: ApiActionSetup;
  get: ApiActionSetup;
  save: ApiActionSetup;
  delete: ApiActionSetup;
}

export interface IApi {
  auth: IAuthApi;
  components: IComponentsApi;
  entities: IEntitiesApi;
  services: IServicesApi;
}

export interface IApiData {
  [key: string]: any;
}

export interface IApiError {
  code?: number;
  message?: string;
}

export interface IApiResponse {
  data: IApiData | IApiData[];
  errors: IApiError[];
}

export interface IUseGetRequest {
  data: any;
  loading: boolean;
  errors: any[];
  mutate: () => void;
}

export interface IUseCrudRequest {
  onComplete?: (data: any, errors: any) => void;
  onError?: (errors: any) => void;
  onSuccess?: (data: any) => void;
  onSuccessRedirectUrl?: string;
  revalidateCache?: () => void;
}

export interface ISortParams {
  field: string;
  direction: 'asc' | 'desc';
}

export interface IFilterParams {
  field: string;
  opperand: string;
  value: string | number | boolean;
}

export interface IBuildUrlOptions {
  path?: {
    id?: string | number;
    [key: string]: any;
  };
  query?: {
    sort?: ISortParams | ISortParams[];
    filter?: IFilterParams | IFilterParams[];
    [key: string]: any;
  };
}

export interface IAction {
  method: string;
  options?: IBuildUrlOptions;
  url: string;
  headers?: GenericObject;
}
