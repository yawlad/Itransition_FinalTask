"use client";
import ItemService from "@/services/ItemService";
import searchStore from "@/stores/SearchStore";
import Tag from "@/types/Tag";
import { usePathname, useRouter } from "next/navigation";

interface TagItemData {
  tag: Tag;
}
const TagItem = ({ tag }: TagItemData) => {
  const router = useRouter();
  const path = usePathname();

  const handleClick = (tag: Tag) => {
    const params = { tag: tag.name };
    ItemService.getItems(params).then((items) => {
      searchStore.setItemsResults(items);
    });

    if (path != "/search") {
      router.replace("/search");
    }
  };
  return (
    <div
      className="px-4 py-2 border rounded-full cursor-pointer"
      onClick={() => handleClick(tag)}
    >
      {tag.name}
    </div>
  );
};

export default TagItem;
