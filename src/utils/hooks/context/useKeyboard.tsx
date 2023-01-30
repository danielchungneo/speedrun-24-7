import useApp from '@/utils/hooks/context/useApp'

export const useKeyboard = () => {
  const {
    state: { keyboardIsOpen },
  } = useApp();

  return { keyboardIsOpen };
};
