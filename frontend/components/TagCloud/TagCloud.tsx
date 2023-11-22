import TagItem from "./TagItem";

const coll = [1, 2, 3, 4, 5, 6, , 7, 8, 9, 10];

interface TagCloudData {
  tags: string[];
}

const TagCloud = ({ tags }: TagCloudData) => {
  return (
    <div className="container m-auto flex flex-row flex-wrap gap-2 p-10 pt-0 justify-center">
      {tags.map((tag) => {
        return (
          <>
            <TagItem tagName={tag} />
          </>
        );
      })}
    </div>
  );
};

export default TagCloud;
