import Tag from "@/types/Tag";
import TagItem from "./TagItem";

interface TagCloudData {
  tags: Tag[];
}

const TagCloud = ({ tags }: TagCloudData) => {
  return (
    <div className="container m-auto flex flex-row flex-wrap gap-2 p-4 justify-center">
      {tags.map((tag) => {
        return <TagItem tag={tag} key={tag.id} />;
      })}
    </div>
  );
};

export default TagCloud;
