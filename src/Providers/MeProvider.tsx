"use client"
import useAuthStore from "@/modules/Authentication/Stores/store";
import { UserType } from "@/modules/Authentication/types";
import { useEffect } from "react";

export default function MeProvider({ children, userData }: { children: React.ReactNode; userData: UserType | null }) {
    const setUser = useAuthStore((store) => store.setUser);
    const clearUser = useAuthStore((store) => store.clearUser);
    const id = useAuthStore((store) => store.user?.id);

  useEffect(() => {
    if (userData) {
      if (id !== userData.id) setUser(userData);
    } else if (id) {
      clearUser();
    }
  }, [userData, id, setUser, clearUser]);

  return <>{children}</>;
}