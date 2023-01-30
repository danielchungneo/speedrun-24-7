import { ITheme } from 'types';
import useSession from './useSession';

export default function useTheme () {
  const {
    state: { theme },
  } = useSession();

  return theme as ITheme;
}
