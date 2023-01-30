import { GenericObject } from './data';

export interface IApi {
  auth: any;
  components: any;
  entities: any;
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

export interface IBuildUrlOptions {
  path?: GenericObject;
  query?: GenericObject;
}

export interface IAction {
  method: string;
  options?: IBuildUrlOptions;
  url: string;
  headers?: GenericObject;
}
