import { TokenContext } from '@/providers/TokenProvider';
import { useContext } from 'react';

export default function useToken () {
  const token = useContext(TokenContext);

  return token;
}
