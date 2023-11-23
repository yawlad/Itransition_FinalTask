import CollectionTheme from "./CollectionTheme";
import Creator from "./Creator";
import CustomFieldClass from "./CustomFieldClass";
import Item from "./Item";

type Collection = {
  id: number;
  name: string;
  description: string;
  created_at: string;
  image_url: string;
  creator: Creator;
  items: Item[];
  custom_fields_classes: CustomFieldClass[];
  theme: CollectionTheme;
};

export interface PostCollectionData {
  name: string;
  description: string;
  theme: number;
  custom_fields_classes: CustomFieldClass[];
  image: null;
}

export interface PutCollectionData {
  name?: string;
  description?: string;
  theme?: number;
  custom_fields_classes?: CustomFieldClass[];
  image: null;
}

export default Collection;
