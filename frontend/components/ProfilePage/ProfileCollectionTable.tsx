"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import CollectionService from "@/services/CollectionService";
import sessionStore from "@/stores/SessionStore";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import UserService from "@/services/UserService";

const ProfileCollectionTable = observer(() => {
  const handleDeleteButton = (
    event: React.MouseEvent<HTMLButtonElement>,
    id: number
  ) => {
    event.preventDefault();

    CollectionService.deleteCollection(id).then(() => {
      sessionStore.deleteCollection(id);
    });
  };

  useEffect(() => {
    UserService.getMe().then((user) => {
      sessionStore.setUser(user);
    });
  }, []);

  return (
    <>
      {sessionStore.user?.collections ? (
        <>
          <div className="flex-grow flex flex-col gap-4">
            <h3 className="text-2xl font-semibold">COLLECTIONS</h3>
            <div className="flex flex-col gap-2">
              {sessionStore.user?.collections.map((collection) => {
                return (
                  <Link
                    key={collection.id}
                    className="flex justify-between items-center border-b-2 p-2"
                    href={`/collection/${collection.id}`}
                  >
                    <div className="">{collection.name}</div>
                    <button
                      className="button-red"
                      onClick={(event) =>
                        handleDeleteButton(event, collection.id)
                      }
                    >
                      <FontAwesomeIcon icon={faTrashCan} />
                    </button>
                  </Link>
                );
              })}

              <Link
                href={"/collection/add"}
                className="button-green text-center"
              >
                Add Collection <FontAwesomeIcon icon={faAdd} />
              </Link>
            </div>
          </div>
        </>
      ) : (
        <>LOADING...</>
      )}
    </>
  );
});

export default ProfileCollectionTable;
