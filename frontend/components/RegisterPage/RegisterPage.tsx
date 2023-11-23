"use client";
import { useState } from "react";
import InputBlock from "../InputBlock";
import Link from "next/link";
import RegisterData from "@/types/RegisterData";
import AuthService from "@/services/AuthService";
import sessionStore from "@/stores/SessionStore";
import validateEmail from "@/utils/validateEmail";
import { AxiosError } from "axios";

const RegisterPage = () => {
  const [userData, setUserData] = useState<RegisterData>({
    email: "",
    username: "",
    password: "",
    password_repeat: "",
  });

  const [validationErrors, setValidationErrors] = useState<RegisterData>({
    email: "",
    username: "",
    password: "",
    password_repeat: "",
  });

  const handleInputChange = (name: string, value: string) => {
    setUserData({ ...userData, [name]: value });
    setValidationErrors({ ...validationErrors, [name]: "" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newValidationErrors = {
      email: validateEmail(userData.email) ? "" : "Enter correct email",
      password: userData.password ? "" : "Enter password",
      password_repeat:
        userData.password === userData.password_repeat
          ? ""
          : "Passwords don't match",
      username: userData.username ? "" : "Enter your username",
    };

    setValidationErrors(newValidationErrors);
    if (Object.values(newValidationErrors).some((error) => error !== ""))
      return;

    AuthService.register(userData)
      .then((user) => {
        AuthService.login(userData).then((user) => {
          sessionStore.setUser(user);
        });
      })
      .catch((error: AxiosError) => {
        const errorData = error.response?.data as {
          username?: string;
          email?: string;
        };
        const registerErrors = {
          username: "",
          email: "",
          password: "",
          password_repeat: "",
        };
        console.log(errorData);
        if (errorData.username)
          registerErrors.username = "This username is already in use";
        if (
          (error.response?.data as { username?: string; email?: string }).email
        )
          registerErrors.email = "This email is already in use";
        setValidationErrors(registerErrors);
        return;
      });
  };

  return (
    <div className="container flex justify-center items-center m-auto">
      <form
        className="p-10 m-auto mt-16 rounded-md flex flex-col gap-3 justify-center items-center relative border"
        onSubmit={handleSubmit}
      >
        <h3 className="text-3xl text-center font-semibold animated-gradient">
          Create Account
        </h3>
        <hr className="border border-secondary w-full mb-4" />
        <InputBlock
          header="Username"
          placeholder="Username"
          type="text"
          onChange={(value) => handleInputChange("username", value)}
          error={validationErrors.username}
        />
        <InputBlock
          header="Email"
          placeholder="Email"
          type="text"
          onChange={(value) => handleInputChange("email", value)}
          error={validationErrors.email}
        />
        <InputBlock
          header="Password"
          placeholder="Password"
          type="password"
          onChange={(value) => handleInputChange("password", value)}
          error={validationErrors.password}
        />
        <InputBlock
          header="Repeat password"
          placeholder="Password"
          type="password"
          onChange={(value) => handleInputChange("password_repeat", value)}
          error={validationErrors.password_repeat}
        />
        <button type="submit" className="button-standart">
          SIGN UP
        </button>
        <div className="text-xs text-gray-400">
          or{" "}
          <Link
            className="font-extrabold underline text-black"
            href={"/login/"}
          >
            LOGIN
          </Link>
          , if youve already got an account
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
