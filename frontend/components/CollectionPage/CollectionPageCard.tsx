"use client";
import Collection from "@/types/Collection";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faEdit, faAdd } from "@fortawesome/free-solid-svg-icons";
import MarkdownWrapper from "../MarkdownWrapper";
import mergeArrays from "@/utils/MergeFieldArrays";
import UniversalItemRow from "../UniversalItemRow";
import Link from "next/link";
import formatDate from "@/utils/formatDate";
import sessionStore from "@/stores/SessionStore";
import Image from "next/image";
import CollectionService from "@/services/CollectionService";
import { useRouter } from "next/navigation";

interface CollectionPageCardProps {
  collection: Collection;
  setEditMode: (value: boolean) => void;
}

const CollectionPageCard = ({
  collection,
  setEditMode,
}: CollectionPageCardProps) => {
  const router = useRouter();
  const handleDeleteButton = (id: number) => {
    CollectionService.deleteCollection(id).then(() => {
      router.replace("/profile/");
      sessionStore.deleteCollection(id);
    });
  };
  return (
    <div className="flex flex-col gap-4 justify-center items-center border p-6 relative w-full">
      <div className="absolute bottom-full bg-white shadow-md border rounded-md px-4 py-1 translate-y-1/2">
        {collection.theme.name}
      </div>
      <Image
        width={300}
        height={300}
        className="max-w-xs rounded-md"
        src={collection.image_url || "/no-image.svg"}
        alt=""
        priority={true}
      />
      <h2 className="text-4xl font-semibold border-b-2 w-full text-center p-2 bg-gray-100">
        {collection.name}
      </h2>
      <div className="w-full">
        <MarkdownWrapper>{collection.description}</MarkdownWrapper>
      </div>
      <div className="w-full">
        <UniversalItemRow
          name={"Creator"}
          value={collection.creator.username}
        />
        <UniversalItemRow
          name={"Created"}
          value={formatDate(collection.created_at)}
        />
        <UniversalItemRow
          name={"Items amount"}
          value={collection.items.length}
        />
      </div>
      {collection.custom_fields_classes.length ? (
        <div className="w-full">
          <div className="text-center p-4 font-semibold bg-gray-100">
            Custom Fields:
          </div>
          <div>
            {collection.custom_fields_classes.map((field) => (
              <UniversalItemRow
                key={`custom_${field.name}`}
                name={field.name}
                value={field.type}
              />
            ))}
          </div>
        </div>
      ) : (
        <></>
      )}
      {sessionStore.isUserOwnerOrSuperUser(collection.creator.id) ? (
        <div className="flex justify-between w-full">
          <button className="button-standart" onClick={() => setEditMode(true)}>
            <FontAwesomeIcon icon={faEdit} />
          </button>
          <button
            className="button-green"
            onClick={() =>
              router.replace(`/collection/${collection.id}/additem`)
            }
          >
            Add Item <FontAwesomeIcon icon={faAdd} />
          </button>
          <button
            className="button-red"
            onClick={() => handleDeleteButton(collection.id)}
          >
            <FontAwesomeIcon icon={faTrashCan} />
          </button>
        </div>
      ) : (
        ""
      )}
      <div className="w-full flex flex-col gap-4">
        {collection.items.map((item) => {
          const fields = mergeArrays(
            collection.custom_fields_classes,
            item.custom_fields
          );
          return (
            <Link href={`/item/${item.id}`} key={item.id}>
              <div className="text-center p-4 font-semibold bg-gray-200 text-2xl">
                {item.name}
              </div>
              <UniversalItemRow
                name={"Created"}
                value={formatDate(item.created_at)}
              />
              <UniversalItemRow name={"Likes"} value={item.likes.length} />
              <UniversalItemRow
                name={"Comments"}
                value={item.comments.length}
              />
              <div className="text-center p-4 font-semibold bg-gray-100">
                Custom Fields:
              </div>
              {fields.map((field) => {
                return (
                  <div key={`${item.id}_${field.name}`}>
                    <UniversalItemRow name={field.name} value={field.value} />
                  </div>
                );
              })}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default CollectionPageCard;
