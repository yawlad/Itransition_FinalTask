import { useState } from "react";
import User, { PutUserData } from "@/types/User";
import validateEmail from "@/utils/validateEmail";
import UserService from "@/services/UserService";
import sessionStore from "@/stores/SessionStore";
import { useRouter } from "next/navigation";

interface ProfileEditTableProps {
  user: User;
  setEditMode: (value: boolean) => void;
}

interface ProfileEditTableRowProps {
  name: string;
  value: string;
  onChange: (value: string) => void;
}

const ProfileTableRow = ({
  name,
  value,
  onChange,
}: ProfileEditTableRowProps) => {
  return (
    <div className="flex">
      <div className="w-1/2 border-b-2 bg-gray-50 p-2 hyphens-auto">
        {name}:
      </div>
      <input
        className="w-1/2 border-b-2 p-2 flex justify-end items-center break-all"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

const ProfileEditTable = ({ user, setEditMode }: ProfileEditTableProps) => {
  const router = useRouter();
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

    UserService.patchMe(editData).then((user) => {
      sessionStore.setUser(user);
      setEditMode(false);
    });
  };

  return (
    <form className="flex-grow flex flex-col gap-4" onSubmit={handleSubmit}>
      <h3 className="text-2xl font-semibold">PROFILE</h3>
      <div className="flex flex-col">
        <ProfileTableRow
          name={"Username"}
          value={editData.username}
          onChange={(value) => handleInputChange("username", value)}
        />
        <ProfileTableRow
          name={"Email"}
          value={editData.email}
          onChange={(value) => handleInputChange("email", value)}
        />
        <ProfileTableRow
          name={"New password"}
          value={editData.new_password}
          onChange={(value) => handleInputChange("new_password", value)}
        />
      </div>
      <div className="text-center text-red-400 flex flex-col">
        {Object.values(validationErrors).map((error) => (
          <div>{error}</div>
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
