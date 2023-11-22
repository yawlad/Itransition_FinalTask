interface TagItemData {
  tagName: string;
}
const TagItem = ({ tagName }: TagItemData) => {
  return <div className="px-4 py-2 border rounded-full cursor-pointer">{tagName}</div>;
};

export default TagItem;
