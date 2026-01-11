"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import useAuthStore from "@/stores/authStore";

interface AdminProfileLayoutProps {
  children: React.ReactNode;
}

const AdminProfileLayout: React.FC<AdminProfileLayoutProps> = ({ children }) => {
  const { userInfo } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in and is admin
    if (!userInfo) {
      router.push("/login");
      return;
    }

    if (!userInfo.isAdmin) {
      router.push("/");
    }
  }, [userInfo, router]);

  // If not admin, don't render
  if (!userInfo || !userInfo.isAdmin) {
    return null;
  }

  return <>{children}</>;
};

export default AdminProfileLayout;