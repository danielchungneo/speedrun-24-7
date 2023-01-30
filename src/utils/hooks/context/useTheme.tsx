import { ITheme } from '@/constants/types';
import useApp from '@/utils/hooks/context/useApp';

export default function useTheme() {
  const {
    state: { theme },
  } = useApp();

  return theme as ITheme;
}
