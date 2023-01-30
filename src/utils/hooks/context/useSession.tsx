import { ISessionContext, SessionContext } from '@/providers/SessionProvider';
import { useContext } from 'react';

export default function useSession() {
  const session = useContext(SessionContext);

  return session as ISessionContext;
}
