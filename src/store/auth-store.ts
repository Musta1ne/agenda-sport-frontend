import {create} from "zustand";

type AuthState = {
    token: string | null;
    userId: string | null;
    setToken: (token: string) => void;
    setUserId: (userId: string) => void;
};

export const useAuth = create<AuthState>((set) => ({
    token: null,
    userId: null,
    setToken: (token: string) => set({token}),
    setUserId: (userId: string) => set({userId}),
}));
