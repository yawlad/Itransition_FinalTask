import Item from "@/types/Item";
import Link from "next/link";

interface CollectionCardData {
  item: Item;
}

const ItemCard = ({ item }: CollectionCardData) => {
  return (
    <Link
      href={`/item/${item.id}`}
      className="flex flex-col gap-2 border p-4 pb-5 rounded-md relative bg-white break-all"
    >
      <h4 className="text-2xl text-center font-semibold">{item.name}</h4>
      <h5 className="text-center">{item.collection.name}</h5>

      <div className="absolute bottom-0 right-0 translate-y-1/2 translate-x-4 px-2 py-1 rounded-md text-sm bg-white border">
        By {item.collection.creator.username}
      </div>
    </Link>
  );
};

export default ItemCard;
