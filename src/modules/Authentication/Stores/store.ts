import { create } from "zustand";
import { UserType } from "../types";

type UserState = {
  user: UserType | null;
  setUser: (user: UserType | null) => void;
  clearUser: () => void;
  getUser: () => UserType | null;
};

const useUserStore = create<UserState>((set, get) => ({
  user: {
    id: "",
    first_name: "",
    last_name: "",
    phone: "",
    country_code: "",
    email: "",
    email_verified_at: null,
    joined_at: "",
    avatar: null,
  },
  setUser: (newUser: UserType | null) => set({ user: newUser }),
  getUser: () => get().user,
  clearUser: () => set({ user: null }),

}));

export default useUserStore;