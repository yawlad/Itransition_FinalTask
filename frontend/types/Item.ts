import Collection from "./Collection";
import Comment from "./Comment";
import CustomField from "./CustomField";
import Like from "./Like";
import Tag from "./Tag";

type Item = {
  id: number;
  name: string;
  created_at: string;
  collection: Collection;
  comments: Comment[];
  likes: Like[];
  tags: Tag[];
  custom_fields: CustomField[];
};

export interface PostItemData {
  name: string;
  collection: number;
  new_tags: string[];
  custom_fields: CustomField[];
}
export interface PutItemData {
  name?: string;
  collection?: number;
  new_tags?: string[];
  custom_fields?: CustomField[];
}

export default Item;
