"use client";
import CollectionService from "@/services/CollectionService";
import ItemService from "@/services/ItemService";
import Collection from "@/types/Collection";
import { PostItemData } from "@/types/Item";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

interface AddItemPageProps {
  collectionId: number;
}

const AddItemPage = ({ collectionId }: AddItemPageProps) => {
  const router = useRouter();
  const [collection, setCollection] = useState<Collection>();
  const [itemData, setItemData] = useState<PostItemData>({
    name: "",
    collection: -1,
    new_tags: [],
    custom_fields: [],
  });

  const [tagInput, setTagInput] = useState<string>("");

  useEffect(() => {
    CollectionService.getCollection(collectionId).then((collection) => {
      setCollection(collection);
      setItemData({
        ...itemData,
        ["collection"]: collection.id,
        ["custom_fields"]: collection.custom_fields_classes.map((cl) => {
          return { name: cl.name, value: "", type: cl.type };
        }),
      });
    });
  }, []);

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();
    console.log(itemData);
    ItemService.postItem(itemData).then((item) => {
      router.replace(`/item/${item.id}`);
    });
  };

  const tagsSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (tagInput && !itemData.new_tags.includes(tagInput))
      setItemData({
        ...itemData,
        ["new_tags"]: [...itemData.new_tags, tagInput],
      });
  };

  const handleCustomChange = (name: string, value: string) => {
    itemData.custom_fields.filter((f) => f.name == name)[0].value = value;
    setItemData({ ...itemData });
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
              <input
                type="text"
                placeholder="Name"
                className="w-full"
                onChange={(e) =>
                  setItemData({ ...itemData, ["name"]: e.target.value })
                }
              />
              <div className="w-full">
                <input
                  className="w-full"
                  type="text"
                  placeholder="Tag"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                />
                <button className="button-green mt-2" onClick={tagsSubmit}>
                  Add
                </button>
              </div>
              <div className="container m-auto flex flex-row flex-wrap gap-2 p-2 justify-center">
                {itemData.new_tags.map((tag, index) => {
                  return (
                    <div key={tag} className="px-4 py-2 border rounded-full">
                      {tag}{" "}
                      <FontAwesomeIcon
                        icon={faTrashCan}
                        className="duration-200 hover:text-red-400 cursor-pointer"
                        onClick={() => {
                          itemData.new_tags.splice(index, 1);
                          setItemData({ ...itemData });
                        }}
                      />
                    </div>
                  );
                })}
              </div>
              <div className="w-full">
                {collection.custom_fields_classes.map((field_class, index) => {
                  let tp = field_class.type;
                  if (tp == "textarea") {
                    return (
                      <div className="flex flex-col" key={index}>
                        <span>{field_class.name}: </span>
                        <textarea
                          key={index}
                          onChange={(e) =>
                            handleCustomChange(field_class.name, e.target.value)
                          }
                        ></textarea>
                      </div>
                    );
                  }
                  return (
                    <div className="flex flex-col" key={index}>
                      <span>{field_class.name}: </span>

                      <input
                        type={tp == "integer" ? "number" : tp}
                        onChange={(e) =>
                          handleCustomChange(
                            field_class.name,
                            tp == "checkbox"
                              ? String(e.target.checked)
                              : e.target.value
                          )
                        }
                      />
                    </div>
                  );
                })}
              </div>
              <button type="submit" className="button-green">
                Add
              </button>
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
