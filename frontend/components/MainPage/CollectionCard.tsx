import Collection from "@/types/Collection";
import Image from "next/image";
import MarkdownWrapper from "../MarkdownWrapper";
import Link from "next/link";

interface CollectionCardData {
  collection: Collection;
}

const CollectionCard = ({ collection }: CollectionCardData) => {
  return (
    <Link
      href={`/collection/${collection.id}`}
      className="rounded-md flex border w-full cursor-pointer relative"
    >
      <div className="absolute right-0 bottom-0 bg-white p-1 border rounded-md translate-y-1/2 translate-x-1/4">
        Items: {collection.items.length}
      </div>
      <Image
        width={300}
        height={300}
        className="w-80 h-fit"
        src={collection.image_url || "/no-image.svg"}
        alt=""
        priority={true}
      />
      <div className="flex flex-col gap-2 p-6 relative w-full">
        <div className="absolute top-0 right-0 rounded-md bg-gray-50 px-2 py-1 translate-x-2 -translate-y-1/4">
          {collection.theme.name}
        </div>
        <h3 className="text-2xl font-semibold">{collection.name}</h3>

        <div className="flex-grow-[1]">
          <MarkdownWrapper>{collection.description}</MarkdownWrapper>
        </div>
      </div>
    </Link>
  );
};

export default CollectionCard;
