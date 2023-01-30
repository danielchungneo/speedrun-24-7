import { SessionContext } from "@/providers/SessionProvider";
import { useContext } from "react";

export default function usePermission(permission: string) {
  const {
    state: { user },
  } = useContext(SessionContext);

  return user?.claims?.includes(permission);
}
