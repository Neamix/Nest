"use client"

import useAuthStore from "@/modules/Authentication/Stores/store";

export default function PersonAvatar() {
  const { user, setUser, getUser } = useAuthStore();

    return (
       <>
        {user.first_name} {user.last_name}
       </>
    )
}