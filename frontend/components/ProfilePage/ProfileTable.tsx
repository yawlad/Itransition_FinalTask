"use client";
import User from "@/types/User";
import { observer } from "mobx-react-lite";
import UniversalItemRow from "../UniversalItemRow";
import formatDate from "@/utils/formatDate";

interface ProfileTableProps {
  user: User;
  setEditMode: (value: boolean) => void;
}

const ProfileTable = observer(({ user, setEditMode }: ProfileTableProps) => {
  return (
    <div className="flex-grow flex flex-col gap-4">
      <h3 className="text-2xl font-semibold">PROFILE</h3>
      <div className="flex flex-col">
        <UniversalItemRow name="Username" value={user.username} />
        <UniversalItemRow name="Email" value={user.email} />
        <UniversalItemRow
          name="Join date"
          value={formatDate(user.date_joined)}
        />
      </div>
      <div
        className="button-standart text-center"
        onClick={() => setEditMode(true)}
      >
        EDIT
      </div>
    </div>
  );
});

export default ProfileTable;
