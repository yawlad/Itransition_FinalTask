"use client";
import Collection, { PutCollectionData } from "@/types/Collection";
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

interface CollectionPageCardEditProps {
  collection: Collection;
  setEditMode: (value: boolean) => void;
  setCollection: (collection: Collection) => void;
}

const CollectionPageCardEdit = ({
  collection,
  setEditMode,
  setCollection,
}: CollectionPageCardEditProps) => {
  const [editData, setEditData] = useState<PutCollectionData>({
    name: collection.name,
    description: collection.description,
    custom_fields_classes: collection.custom_fields_classes,
    theme: collection.theme.id,
    image: null,
  });

  const [image, setImage] = useState<File>();

  const [themes, setThemes] = useState<CollectionTheme[]>([]);

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();
    CollectionService.patchCollection(collection.id, editData).then(
      (collectionRes) => {
        if (image) {
          CollectionService.patchImageCollection(collectionRes.id, {
            image: image,
          }).then((col) => {
            setEditMode(false);
            col.theme = themes.filter(
              (theme) => theme.id == (col.theme as unknown)
            )[0];
            setCollection(col);
          });
        } else {
          setEditMode(false);
          collectionRes.theme = themes.filter(
            (theme) => theme.id == (collectionRes.theme as unknown)
          )[0];
          setCollection(collectionRes);
        }
      }
    );
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

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) setImage(file);
  };

  useEffect(() => {
    CollectionService.getThemes().then((themesRes) => {
      setThemes(themesRes);
    });
  }, []);

  return (
    <form
      className="flex flex-col gap-4 justify-center items-center border p-6 relative w-full mt-6 md:mt-0"
      onSubmit={submitHandler}
    >
      <div className="absolute bottom-full bg-white shadow-md border rounded-md px-4 py-1 translate-y-1/2 w-[90%]">
        <select
          name="theme"
          value={editData.theme}
          onChange={(e) => handleInputChange("theme", e.target.value)}
          className="w-full"
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
          src={collection.image_url || "/no-image.svg"}
          alt=""
          priority={true}
        />
        <input className="max-w-xs" type="file" onChange={handleImageChange} />
      </div>

      <div className="w-full flex flex-col gap-2">
        <h2 className="font-semibold border-b-2 w-full text-center p-2 bg-gray-100">
          <input
            className="text-4xl text-center w-full"
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
        <button
          className="button-red"
          onClick={(e) => {
            e.preventDefault();
            setEditMode(false);
          }}
        >
          Cancel <FontAwesomeIcon icon={faCancel} />
        </button>
      </div>
    </form>
  );
};

export default CollectionPageCardEdit;
