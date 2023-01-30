import { AppContext, IAppContext } from '@/providers/AppProvider';
import { useContext } from 'react';

export default function useApp() {
  const app = useContext(AppContext);

  return app as IAppContext;
}
