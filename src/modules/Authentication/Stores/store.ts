import { create } from "zustand";
import { UserType } from "../types";

type UserState = {
  user: UserType;
  setUser: (user: Partial<UserType>) => void;
  getUser: () => UserType;
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
    token: "",
    avatar: null,
  },
  setUser: (newUser) => set((state) => ({
    user: { ...state.user, ...newUser }
  })),
  getUser: () => get().user,
}));

export default useUserStore;