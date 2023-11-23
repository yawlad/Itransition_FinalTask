"use client";
import CollectionService from "@/services/CollectionService";
import ItemService from "@/services/ItemService";
import Collection from "@/types/Collection";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

interface AddItemPageProps {
  collectionId: number;
}

const AddItemPage = ({ collectionId }: AddItemPageProps) => {
  const router = useRouter();
  const [collection, setCollection] = useState<Collection>();
  const [itemData, setItemData] = useState();

  useEffect(() => {
    CollectionService.getCollection(collectionId).then((collection) => {
      setCollection(collection);
    });
  }, []);

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();
    // ItemService.postItem(itemData).then((item) => {
    //   router.replace("/profile/");
    // });
  };

  return (
    <>
      {collection ? (
        <>
          <div className="container m-auto flex flex-col gap-8 md:p-10 p-4 justify-center items-center">
            <form
              className="flex flex-col gap-4 justify-center items-center border p-6 relative w-full"
              onSubmit={submitHandler}
            >
              <h2 className="font-semibold border-b-2 w-full text-center p-2 bg-gray-100 text-2xl">
                Item for {collection.name}
              </h2>
            </form>
          </div>
        </>
      ) : (
        <>LOADING...</>
      )}
    </>
  );
};

export default AddItemPage;
