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
      className="rounded-md border w-full cursor-pointer relative"
    >
      <div className="md:flex-row flex-col flex justify-evenly items-center md:p-10 p-2 gap-4 relative border-b">
        <Image
          width={320}
          height={320}
          className="md:max-w-xs w-full h-fit"
          src={collection.image_url || "/no-image.svg"}
          alt=""
          priority={true}
        />{" "}
        <h3 className="text-4xl font-semibold flex-grow text-center p-4 break-all">
          {collection.name}
        </h3>
        <div className="absolute right-0 bottom-0 bg-white p-1 border rounded-md translate-y-1/2 translate-x-[10%]">
          Items: {collection.items.length}
        </div>
      </div>

      <div className="absolute top-0 right-0 rounded-md bg-gray-50 px-2 py-1 translate-x-2 -translate-y-1/4">
        {collection.theme.name}
      </div>

      <div className="flex flex-col gap-2 p-6">
        <MarkdownWrapper>{collection.description}</MarkdownWrapper>
      </div>
    </Link>
  );
};

export default CollectionCard;
