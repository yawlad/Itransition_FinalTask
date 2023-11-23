"use client";

import AuthService from "@/services/AuthService";
import sessionStore from "@/stores/SessionStore";
import Link from "next/link";
import { useState } from "react";

interface AuthorizedHeaderPartData {
  username: string;
}

const AuthorizedHeaderPart = ({ username }: AuthorizedHeaderPartData) => {
  const [showMenu, setShowMenu] = useState(false);
  const handleLogout = () => {
    AuthService.logout().finally(() => sessionStore.setUser(null));
  };
  return (
    <div
      className="cursor-pointer flex items-center justify-center gap-2 relative"
      onClick={(event) => setShowMenu(!showMenu)}
    >
      <span className="font-bold text-xl">{username}</span>
      <div
        className={`duration-200 relative w-4 bg-slate-600 ${
          showMenu ? "rotate-90" : "-rotate-90"
        }  rounded-sm`}
      >
        <div className="w-3/4 border-b-[2px] border-[#333] absolute left-1/2 -translate-x-1/2 -translate-y-1/2 top-0 rotate-45 origin-top-left"></div>
        <div className="w-3/4 border-b-[2px] border-[#333] absolute left-1/2 -translate-x-1/2 -translate-y-1/2 top-0 -rotate-45 origin-bottom-left"></div>
      </div>
      <div
        className={`absolute bg-white z-50 top-0 right-2 duration-300 flex flex-col gap-1 p-4 shadow-md rounded-md rounded-t-none origin-top-right ${
          showMenu ? "opacity-100 top-full" : "opacity-0 top-1/2 scale-0 "
        }`}
      >
        <Link className="mb-2" href={"/profile/"}>
          Profile
        </Link>
        <hr />
        <div onClick={handleLogout}>Logout</div>
      </div>
    </div>
  );
};

export default AuthorizedHeaderPart;
