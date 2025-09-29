import { create } from "zustand";
import { UserStateType } from "../types";

const useAuthStore = create<UserStateType>((set) => ({
    first_name: "",
    last_name: "",
    phone: "",
    country_code: "",
    email: "",
    email_verified_at: null,
    joined_at: "",
    token: "",
    avatar: null,
    setUser: (userData: Partial<UserStateType>) => set((state) => ({ ...state, ...userData })),
    getUser: () => set((state) => ({ ...state })),
}));

export default useAuthStore;