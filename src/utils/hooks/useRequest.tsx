import { HTTP_REQUEST_METHODS } from '@/constants/http';
import { IAction } from 'types';
import { GenericObject } from 'types/data';
import { buildUrl, createRequest, fetcherWithToken } from '@/utils/http';
import { cloneDeep } from 'lodash';
import { useState } from 'react';
import useSWR from 'swr';
import useToken from './context/useToken';

export interface IUseRequestOptions {
  onComplete?: (data: any, errors: any) => void;
  onError?: (errors: any) => void;
  onSuccess?: (data: any) => void;
  revalidateCache?: () => void;
  swrOptions?: any;
  swr?: boolean;
  tokenOverride?: string;
}

export default function useRequest (
  action: IAction,
  {
    onComplete,
    onError,
    onSuccess,
    revalidateCache,
    swrOptions = {},
    swr = true,
  }: IUseRequestOptions = {}
) {
  const shouldUseSWR = swr && action.method === HTTP_REQUEST_METHODS.GET;

  /**
   * SWR: If the action is a GET request and swr is enabled, use SWR
   */

  const {
    state: { token },
  } = useToken();

  const swrUrl = buildUrl(action.url, action.options);

  const swrKey = token ? [swrUrl, token] : swrUrl;
  const {
    data: swrData,
    error: swrError,
    mutate,
  } = useSWR(shouldUseSWR ? swrKey : null, fetcherWithToken, swrOptions);

  let swrDataToReturn = swrData;
  let swrErrors = swrError ? [swrError] : [];

  if (swrData && 'data' in swrData) {
    swrDataToReturn = swrData.data;
  }

  if (swrData && 'errors' in swrData) {
    swrErrors = swrErrors.concat(swrData.errors);
  }

  /**
   * CREATE REQUEST: If the action is a GET request and swr is false or the action is not a GET request, use createRequest
   */
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>({});
  const [errors, setErrors] = useState<any[]>([]);

  // IF shouldUseSWR is true, return. This has to be after the useState hooks so the hooks are not run conditionally
  if (shouldUseSWR) {
    return {
      data: swrDataToReturn,
      loading: !swrError && !swrDataToReturn,
      errors: swrErrors,
      revalidateCache: mutate,
    };
  }

  const submitRequest = async (body?: GenericObject) => {
    setLoading(true);

    const request = await createRequest(action, body);

    const requestData = cloneDeep(request.data);
    const requestErrors = cloneDeep(request.errors);

    setData(requestData);
    setErrors(requestErrors);
    setLoading(false);

    await onComplete?.(requestData, requestErrors);

    if (requestErrors.length) {
      await onError?.(requestErrors);
    }

    if (!requestErrors.length) {
      await onSuccess?.(requestData);
      await revalidateCache?.();
    }

    return {
      data: requestData,
      errors: requestErrors,
    };
  };

  const resetRequest = () => {
    setData({});
    setErrors([]);
    setLoading(false);
  };

  return {
    data,
    loading,
    errors,
    onSuccess,
    resetRequest,
    submitRequest,
  };
}
