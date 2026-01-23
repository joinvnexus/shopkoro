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
  dashboardAccessGranted: boolean;
  login: (userInfo: UserInfo) => void;
  logout: () => void;
  grantDashboardAccess: () => void;
  revokeDashboardAccess: () => void;
}

const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        userInfo: null,
        dashboardAccessGranted: false,
        login: (userInfo) => set({ userInfo, dashboardAccessGranted: false }),
        logout: () => set({ userInfo: null, dashboardAccessGranted: false }),
        grantDashboardAccess: () => set({ dashboardAccessGranted: true }),
        revokeDashboardAccess: () => set({ dashboardAccessGranted: false }),
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
