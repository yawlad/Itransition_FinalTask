"use client";

import { observer } from "mobx-react-lite";
import sessionStore from "@/stores/SessionStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import UserService from "@/services/UserService";

interface AuthCheckerWrapperProps {
  children: React.ReactNode;
}

const AuthCheckerWrapper = ({ children }: AuthCheckerWrapperProps) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    UserService.getMe()
      .then((user) => {
        sessionStore.setUser(user);
      })
      .catch((reason) => {
        sessionStore.setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return <>{loading ? "" : children}</>;
};

export default AuthCheckerWrapper;
