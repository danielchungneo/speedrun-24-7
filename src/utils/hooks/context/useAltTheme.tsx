import { ITheme } from '@/constants/types';
import useApp from '@/utils/hooks/context/useApp';

export default function useAltTheme() {
  const {
    state: { altTheme },
  } = useApp();

  return altTheme as ITheme;
}
