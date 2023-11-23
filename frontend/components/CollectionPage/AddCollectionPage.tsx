"use client";
import Collection, {
  PostCollectionData,
  PutCollectionData,
} from "@/types/Collection";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSave,
  faCancel,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import React, { FormEvent, useEffect, useState } from "react";
import FieldType, { fieldTypes } from "@/types/FieldType";
import CollectionService from "@/services/CollectionService";
import CollectionTheme from "@/types/CollectionTheme";
import Link from "next/link";
import { useRouter } from "next/navigation";
import sessionStore from "@/stores/SessionStore";

const CollectionPageCardEdit = () => {
  const router = useRouter();
  const [editData, setEditData] = useState<PostCollectionData>({
    name: "",
    description: "",
    custom_fields_classes: [],
    theme: 1,
    image: null,
  });

  const [themes, setThemes] = useState<CollectionTheme[]>([]);

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();
    CollectionService.postCollection(editData).then((collectionRes) => {
      sessionStore.addCollection(collectionRes);
      router.replace("/profile/");
    });
  };

  const handleInputChange = (name: string, value: string) => {
    setEditData({ ...editData, [name]: value });
  };

  const handleCustomFieldsChange = (
    index: number,
    {
      name,
      type,
    }: {
      name: string;
      type: FieldType;
    }
  ) => {
    if (editData.custom_fields_classes) {
      editData.custom_fields_classes[index].name = name;
      editData.custom_fields_classes[index].type = type;
    }
    setEditData({ ...editData });
  };

  const handleAddFieldButton = (event: React.MouseEvent) => {
    event.preventDefault();
    editData.custom_fields_classes?.push({ name: "", type: "integer" });
    setEditData({ ...editData });
  };

  const handleRemoveFieldButton = (event: React.MouseEvent, index: number) => {
    event.preventDefault();
    editData.custom_fields_classes?.splice(index, 1);
    setEditData({ ...editData });
  };

  useEffect(() => {
    CollectionService.getThemes().then((themesRes) => {
      setThemes(themesRes);
    });
  }, []);

  return (
    <div className="container m-auto flex flex-col gap-8 md:p-10 p-4 justify-center items-center">
      <form
        className="flex flex-col gap-4 justify-center items-center border p-6 relative w-full"
        onSubmit={submitHandler}
      >
        <div className="absolute bottom-full bg-white shadow-md border rounded-md px-4 py-1 translate-y-1/2">
          <select
            name="theme"
            value={editData.theme}
            onChange={(e) => handleInputChange("theme", e.target.value)}
          >
            {themes.map((theme) => (
              <option key={theme.name} value={theme.id}>
                {theme.name}
              </option>
            ))}
          </select>
        </div>
        <div className="relative">
          <Image
            width={320}
            height={320}
            className="max-w-xs rounded-md"
            src={"/no-image.svg"}
            alt=""
            priority={true}
          />
          <input
            className="max-w-xs"
            type="file"
            onChange={(e) => handleInputChange("image", e.target.value)}
          />
        </div>

        <div className="w-full flex flex-col gap-2">
          <h2 className="font-semibold border-b-2 w-full text-center p-2 bg-gray-100">
            <input
              className="text-4xl text-center"
              type="text"
              value={editData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
            />
          </h2>
          <textarea
            className="w-full min-h-[45rem]"
            name="description"
            onChange={(event) =>
              handleInputChange("description", event.target.value)
            }
            value={editData.description as string}
          />
        </div>
        <div className="w-full">
          <div className="text-center p-4 font-semibold bg-gray-100">
            Custom Fields:
          </div>
          <div className="flex flex-col gap-4">
            {editData.custom_fields_classes?.map((field, index) => (
              <div key={`field_${index}`} className="border-b-2">
                <div className="flex">
                  <div className="w-1/2 border-b-2 bg-gray-50 p-2 hyphens-auto">
                    Name:
                  </div>
                  <input
                    className="w-1/2 border-b-2 p-2 flex justify-end items-center break-all"
                    type="text"
                    value={field.name}
                    onChange={(e) =>
                      handleCustomFieldsChange(index, {
                        name: e.target.value,
                        type: field.type,
                      })
                    }
                  />
                </div>
                <div className="flex">
                  <div className="w-1/2 border-b-2 bg-gray-50 p-2 hyphens-auto">
                    Type:
                  </div>
                  <select
                    className="w-1/2 border-b-2 p-2 flex justify-end items-center break-all"
                    value={field.type}
                    onChange={(e) =>
                      handleCustomFieldsChange(index, {
                        name: field.name,
                        type: e.target.value as FieldType,
                      })
                    }
                  >
                    {fieldTypes.map((type) => (
                      <option key={`type_${type}`} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="p-2 w-full flex justify-center items-center">
                  <button
                    className="button-red text-2xl"
                    onClick={(e) => handleRemoveFieldButton(e, index)}
                  >
                    <FontAwesomeIcon icon={faTrashCan} />
                  </button>
                </div>
              </div>
            ))}
            <button
              className="button-standart text-2xl w-fit m-auto"
              onClick={handleAddFieldButton}
            >
              +
            </button>
          </div>
        </div>
        <div className="flex justify-between w-full">
          <button className="button-green" type="submit">
            Save <FontAwesomeIcon icon={faSave} />
          </button>
          <Link href={"/profile/"} className="button-red">
            Cancel <FontAwesomeIcon icon={faCancel} />
          </Link>
        </div>
      </form>
    </div>
  );
};

export default CollectionPageCardEdit;
