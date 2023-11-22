"use client";

import UserService from "@/services/UserService";
import User from "@/types/User";
import { useEffect, useState } from "react";
import UniversalItemRow from "../UniversalItemRow";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashCan,
  faLock,
  faLockOpen,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import sessionStore from "@/stores/SessionStore";

const AdminPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const router = useRouter();

  useEffect(() => {
    UserService.getUsers().then((users) => setUsers(users));
  }, []);

  const handleSuperuserButton = (user: User) => {
    UserService.patchUser(user.id, { is_superuser: !user.is_superuser }).then(
      (userRes) => {
        const updatedUsers = users.map((u) =>
          u.id === userRes.id ? userRes : u
        );
        setUsers(updatedUsers);
        if (user.id == sessionStore.getUser().id) router.replace("/");
      }
    );
  };

  const handleBlockButton = (user: User) => {
    UserService.patchUser(user.id, { is_blocked: !user.is_blocked }).then(
      (userRes) => {
        const updatedUsers = users.map((u) =>
          u.id === userRes.id ? userRes : u
        );
        setUsers(updatedUsers);
        if (user.id == sessionStore.getUser().id) router.replace("/");
      }
    );
  };

  const handleDeleteButton = (user: User) => {
    UserService.deleteUser(user.id).then(() => {
      const updatedUsers = users.filter((u) => u.id !== user.id);
      setUsers(updatedUsers);
      if (user.id == sessionStore.getUser().id) router.replace("/");
    });
  };

  return (
    <div className="container m-auto flex flex-col flex-wrap gap-2 p-10 pt-0 justify-center">
      <h2 className="text-4xl font-semibold border-b-4 p-4">Users:</h2>
      <div className="flex flex-col gap-2 ">
        {users.map((user) => (
          <div key={user.id} className="border-b-2 mt-4">
            <UniversalItemRow name="ID" value={user.id} />
            <UniversalItemRow name="Name" value={user.username} />
            <UniversalItemRow name="Email" value={user.email} />
            <UniversalItemRow
              name="Collections amount"
              value={user.collections.length}
            />
            <UniversalItemRow
              name="Is blocked"
              value={user.is_blocked ? "+" : "-"}
            />
            <UniversalItemRow
              name="Is superuser"
              value={user.is_superuser ? "+" : "-"}
            />
            <div className="flex p-2 gap-8">
              {!user.is_blocked ? (
                <button
                  className="button-red flex-grow"
                  onClick={() => handleBlockButton(user)}
                >
                  Block <FontAwesomeIcon icon={faLock} />
                </button>
              ) : (
                <button
                  className="button-green flex-grow"
                  onClick={() => handleBlockButton(user)}
                >
                  UnBlock <FontAwesomeIcon icon={faLockOpen} />
                </button>
              )}
              {!user.is_superuser ? (
                <button
                  className="button-green flex-grow"
                  onClick={() => handleSuperuserButton(user)}
                >
                  Add superuser rights
                </button>
              ) : (
                <button
                  className="button-red flex-grow"
                  onClick={() => handleSuperuserButton(user)}
                >
                  Remove superuser rights
                </button>
              )}

              <button
                className="button-red flex-grow"
                onClick={() => handleDeleteButton(user)}
              >
                Delete <FontAwesomeIcon icon={faTrashCan} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPage;
