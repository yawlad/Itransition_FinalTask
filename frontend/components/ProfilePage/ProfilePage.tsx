"use client";
import sessionStore from "@/stores/SessionStore";
import ProfileTable from "./ProfileTable";
import ProfileEditTable from "./ProfileEditTable";
import { useEffect, useState } from "react";
import ProfileCollectionTable from "./ProfileCollectionTable";
import User from "@/types/User";

const ProfilePage = () => {
  const [user, setUser] = useState<User>();
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    setUser(sessionStore.getUser());
  }, []);

  return (
    <main>
      <div className="container m-auto flex flex-col flex-wrap gap-8 p-10 justify-center">
        {user ? (
          <>
            <div className="">
              {editMode ? (
                <ProfileEditTable user={user} setEditMode={setEditMode} />
              ) : (
                <ProfileTable user={user} setEditMode={setEditMode} />
              )}
            </div>
            <div className="">
              <ProfileCollectionTable />
            </div>
          </>
        ) : (
          <>LOADING...</>
        )}
      </div>
    </main>
  );
};

export default ProfilePage;
