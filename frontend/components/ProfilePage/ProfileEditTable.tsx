"use client"
import { useState } from "react";
import User, { PutUserData } from "@/types/User";
import validateEmail from "@/utils/validateEmail";
import UserService from "@/services/UserService";
import sessionStore from "@/stores/SessionStore";
import UniversalItemInputRow from "../UniversalItemInputRow";
import { AxiosError } from "axios";

interface ProfileEditTableProps {
  user: User;
  setEditMode: (value: boolean) => void;
}

const ProfileEditTable = ({ user, setEditMode }: ProfileEditTableProps) => {
  const [editData, setEditData] = useState<PutUserData>({
    username: user.username,
    email: user.email,
    new_password: "",
  });

  const [validationErrors, setValidationErrors] = useState<PutUserData>({
    username: "",
    email: "",
    new_password: "",
  });

  const handleInputChange = (name: string, value: string) => {
    setEditData({ ...editData, [name]: value });
    setValidationErrors({ ...validationErrors, [name]: "" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newValidationErrors = {
      username: editData.username ? "" : "Enter your username",
      email: validateEmail(editData.email) ? "" : "Enter correct email",
      new_password: "",
    };

    setValidationErrors(newValidationErrors);
    if (Object.values(newValidationErrors).some((error) => error !== "")) {
      console.log(validationErrors);
      return;
    }

    UserService.patchMe(editData)
      .then((user) => {
        sessionStore.setUser(user);
        setEditMode(false);
      })
      .catch((error: AxiosError) => {
        const errorData = error.response?.data as {
          username?: string;
          email?: string;
        };
        const registerErrors = {
          username: "",
          email: "",
          new_password: "",
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
    <form className="flex-grow flex flex-col gap-4" onSubmit={handleSubmit}>
      <h3 className="text-2xl font-semibold">PROFILE</h3>
      <div className="flex flex-col">
        <UniversalItemInputRow
          name={"Username"}
          value={editData.username}
          type="text"
          onChange={(value) => handleInputChange("username", value)}
        />
        <UniversalItemInputRow
          name={"Email"}
          value={editData.email}
          type="text"
          onChange={(value) => handleInputChange("email", value)}
        />
        <UniversalItemInputRow
          name={"New password"}
          value={editData.new_password}
          type="text"
          onChange={(value) => handleInputChange("new_password", value)}
        />
      </div>
      <div className="text-center text-red-400 flex flex-col">
        {Object.entries(validationErrors).map(([errorKey, error]) => (
          <div key={errorKey}>{error}</div>
        ))}
      </div>
      <div className="flex gap-8">
        <button type="submit" className="button-green text-center flex-grow">
          SAVE
        </button>
        <button
          className="button-red text-center flex-grow"
          onClick={() => setEditMode(false)}
        >
          CANCEL
        </button>
      </div>
    </form>
  );
};

export default ProfileEditTable;
