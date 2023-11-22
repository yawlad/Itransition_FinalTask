"use client";
import sessionStore from "@/stores/SessionStore";
import ProfileTable from "./ProfileTable";
import ProfileEditTable from "./ProfileEditTable";
import { useState } from "react";
import ProfileCollectionTable from "./ProfileCollectionTable";

const ProfilePage = () => {
  const user = sessionStore.getUser();
  const [editMode, setEditMode] = useState(false);
  return (
    <main>
      <div className="container m-auto flex flex-col flex-wrap gap-8 p-10 justify-center">
        <div className="">
          {editMode ? (
            <ProfileEditTable user={user} setEditMode={setEditMode} />
          ) : (
            <ProfileTable user={user} setEditMode={setEditMode} />
          )}
        </div>
        <div className="w">
          <ProfileCollectionTable />
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
