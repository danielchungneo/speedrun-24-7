import useSession from '@/utils/hooks/context/useSession'

export default function useRole(role: string) {
  const {
    state: { user },
  } = useSession();

  return user?.roles?.includes(role);
}
