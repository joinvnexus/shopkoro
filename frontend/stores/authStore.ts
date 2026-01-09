import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface UserInfo {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  token: string;
}

interface AuthState {
  userInfo: UserInfo | null;
  login: (userInfo: UserInfo) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        userInfo: null,
        login: (userInfo) => set({ userInfo }),
        logout: () => set({ userInfo: null }),
      }),
      {
        name: 'auth-storage', // name of the item in the storage (must be unique)
        getStorage: () => localStorage, // specify localStorage
      }
    )
  )
);

// Initialize state from localStorage on load
if (typeof window !== "undefined") {
  const storedState = localStorage.getItem("auth-storage");
  if (storedState) {
    const { state } = JSON.parse(storedState);
    if (state.userInfo) {
      useAuthStore.setState({ userInfo: state.userInfo });
    }
  }
}

export default useAuthStore;
