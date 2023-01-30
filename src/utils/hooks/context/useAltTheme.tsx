import { ITheme } from 'types';
import useSession from './useSession';

export default function useAltTheme () {
  const {
    state: { altTheme },
  } = useSession();

  return altTheme as ITheme;
}
