import CollectionTheme from "./CollectionTheme";
import Creator from "./Creator";
import CustomFieldClass from "./CustomFieldClass";

type Collection = {
  id: number;
  name: string;
  description: string;
  creator: Creator;
  created_at: string;
  image_url: string;
  custom_fields_classes: CustomFieldClass[];
  theme: CollectionTheme;
};
export default Collection;
