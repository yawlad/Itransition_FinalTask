"use client";

import { observer } from "mobx-react-lite";
import sessionStore from "@/stores/SessionStore";
import { useRouter } from "next/navigation";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = observer(({ children }: LayoutProps) => {
  const router = useRouter();
  if (!sessionStore.isLoggedIn() || !sessionStore.isSuperUser()) {
    router.replace("/");
    return;
  }
  return <div>{children}</div>;
});

export default Layout;
