"use client";
import { useState } from "react";
import InputBlock from "../InputBlock";
import AuthService from "@/services/AuthService";
import sessionStore from "@/stores/SessionStore";

export default function LoginPage() {
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleInputChange = (name: string, value: string) => {
    setUserData({ ...userData, [name]: value });
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    AuthService.login(userData).then((user) => {
      sessionStore.setUser(user);
    });
  };

  return (
    <div className="container flex justify-center items-center m-auto">
      <form
        onSubmit={handleSubmit}
        className="p-10 m-auto mt-10 rounded-md flex flex-col gap-3 justify-center items-center relative border"
      >
        <h3 className="text-3xl text-center font-semibold">Sign In</h3>
        <hr className="border border-secondary w-full mb-4" />
        <InputBlock
          header="Email"
          placeholder="Email"
          type="text"
          onChange={(val) => handleInputChange("username", val)}
        />
        <InputBlock
          header="Password"
          placeholder="Password"
          type="password"
          onChange={(val) => handleInputChange("password", val)}
        />
        <span className="text-red-500">{error}</span>
        <button type="submit" className="button-standart">
          Sign In
        </button>
      </form>
    </div>
  );
}
