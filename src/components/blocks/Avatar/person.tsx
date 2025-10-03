"use client"

import useAuthStore from "@/modules/Authentication/Stores/store";

export default function PersonAvatar() {
  const user = useAuthStore((state) => state.user);
  if (!user) return null;
    return (
       <>
        {user.first_name} {user.last_name}
       </>
    )
}