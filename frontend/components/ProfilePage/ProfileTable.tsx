import User from "@/types/User";
import formatDateJoined from "@/utils/formatDate";
import { observer } from "mobx-react-lite";
import UniversalItemRow from "../UniversalItemRow";

interface ProfileTableProps {
  user: User;
  setEditMode: (value: boolean) => void;
}

const ProfileTable = observer(({ user, setEditMode }: ProfileTableProps) => {
  const profileTableData = [
    { name: "Username", value: user.username },
    { name: "Email", value: user.email },
    { name: "Join date", value: formatDateJoined(user.date_joined) },
    { name: "Collections amount", value: user.collections.length },
    {
      name: "Items amount",
      value: user.collections.reduce((prev, collection) => {
        return prev + collection.items.length;
      }, 0),
    },
    {
      name: "Likes",
      value: user.collections.reduce((prev, collection) => {
        return (
          prev +
          collection.items.reduce((prevLikes, item) => {
            return prevLikes + item.likes.length;
          }, 0)
        );
      }, 0),
    },
  ];

  return (
    <div className="flex-grow flex flex-col gap-4">
      <h3 className="text-2xl font-semibold">PROFILE</h3>
      <div className="flex flex-col">
        {profileTableData.map((item) => (
          <UniversalItemRow key={item.name} name={item.name} value={item.value} />
        ))}
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
