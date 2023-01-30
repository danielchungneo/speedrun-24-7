import useSession from './useSession';

export const useKeyboard = () => {
  const {
    state: { keyboardIsOpen },
  } = useSession();

  return { keyboardIsOpen };
};
