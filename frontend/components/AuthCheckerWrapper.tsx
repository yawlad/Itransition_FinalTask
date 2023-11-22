"use client";

import sessionStore from "@/stores/SessionStore";
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
  return <>{loading ? <div>LOADING...</div> : children}</>;
};

export default AuthCheckerWrapper;
