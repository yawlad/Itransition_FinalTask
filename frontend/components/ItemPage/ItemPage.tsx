"use client";
import ItemService from "@/services/ItemService";
import Item from "@/types/Item";
import { useEffect, useState } from "react";
import ItemPageCardEdit from "./ItemPageCardEdit";
import ItemPageCard from "./ItemPageCard";

interface ItemPageProps {
  id: number;
}

const ItemPage = ({ id }: ItemPageProps) => {
  const [item, setItem] = useState<Item>();
  const [editMode, setEditMode] = useState<boolean>(false);
  useEffect(() => {
    ItemService.getItem(id).then((item) => {
      setItem(item);
    });
  }, []);
  return (
    <div className="container m-auto flex flex-col flex-wrap gap-8 md:p-10 p-4 justify-center items-center">
      {item ? (
        <>
          {editMode ? (
            <ItemPageCardEdit
              item={item}
              setEditMode={setEditMode}
              setItem={setItem}
            />
          ) : (
            <ItemPageCard
              item={item}
              setEditMode={setEditMode}
              setItem={setItem}
            />
          )}
        </>
      ) : (
        <div className="w-full">LOADING...</div>
      )}
    </div>
  );
};

export default ItemPage;
