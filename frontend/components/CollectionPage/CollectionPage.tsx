"use client";
import CollectionService from "@/services/CollectionService";
import Collection from "@/types/Collection";
import { useEffect, useState } from "react";
import CollectionPageCard from "./CollectionPageCard";
import sessionStore from "@/stores/SessionStore";

interface CollectionPageProps {
  id: number;
}

const CollectionPage = ({ id }: CollectionPageProps) => {
  const [collection, setCollection] = useState<Collection>();
  const [editMode, setEditMode] = useState<boolean>(false);
  useEffect(() => {
    CollectionService.getCollection(id).then((collection) => {
      setCollection(collection);
      
    });
  }, []);
  return (
    <div className="container m-auto flex flex-col flex-wrap gap-8 md:p-10 p-4 justify-center items-center">
      {collection ? (
        <>
          {editMode ? (
            ""
          ) : (
            <CollectionPageCard
              collection={collection}
              setEditMode={setEditMode}
            />
          )}
        </>
      ) : (
        <div className="w-full">LOADING...</div>
      )}
    </div>
  );
};

export default CollectionPage;
