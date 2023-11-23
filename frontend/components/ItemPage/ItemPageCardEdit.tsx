"use client"
import Item from "@/types/Item";

interface ItemPageCardEditProps {
  item: Item;
  setEditMode: (value: boolean) => void;
  setItem: (collection: Item) => void;
}

const ItemPageCardEdit = ({
  item,
  setEditMode,
  setItem,
}: ItemPageCardEditProps) => {
  return <></>;
};

export default ItemPageCardEdit;
