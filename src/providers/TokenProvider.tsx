import React, {
  createContext,
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { getSessionToken, setSessionToken } from '@/utils/session';

interface ITokenProviderActions {
  updateToken: (token: string) => void;
}

interface ITokenProviderState {
  token: string | null;
}

export interface ITokenContext {
  state: ITokenProviderState;
  actions: ITokenProviderActions;
}

export const TokenContext = createContext<ITokenContext>({} as any);

const TokenProvider: FunctionComponent = ({ children }: any) => {
  const [token, setToken] = useState<ITokenProviderState['token']>(null);
  const [initTokenReadComplete, setInitTokenReadComplete] =
    useState<boolean>(false);

  const updateToken = useCallback(async (token: string | null) => {
    if (!!token) {
      await setSessionToken(token);
    }

    setToken(token);
  }, []);

  // #region COMPUTED
  const state: ITokenProviderState = {
    token,
  };

  const actions: ITokenProviderActions = {
    updateToken,
  };

  // #endregion

  // #region EFFECTS
  useEffect(() => {
    (async () => {
      const tokenFromStorage = await getSessionToken();
      updateToken(tokenFromStorage);
      setInitTokenReadComplete(true);
    })();
  }, []);

  if (!initTokenReadComplete) {
    return null;
  }

  return (
    <TokenContext.Provider
      value={{
        state,
        actions,
      }}
    >
      {children}
    </TokenContext.Provider>
  );
};

export default TokenProvider;
