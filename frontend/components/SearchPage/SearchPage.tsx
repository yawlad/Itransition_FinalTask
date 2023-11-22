"use client";

import { observer } from "mobx-react-lite";
import TagCloud from "../TagCloud/TagCloud";
import searchStore from "@/stores/SearchStore";
import Link from "next/link";

interface SearchItemRowProps {
  name: string;
  value: string | number;
}

const SearchItemRow = ({ name, value }: SearchItemRowProps) => {
  return (
    <div className="flex">
      <div className="w-1/2 border-b-2 bg-gray-50 p-2 hyphens-auto">
        {name}:
      </div>
      <div className="w-1/2 border-b-2  p-2 flex justify-end items-center break-all">
        {value}
      </div>
    </div>
  );
};

const SearchPage = observer(() => {
  const searchResults = searchStore.getItemsResults();
  const tags = searchStore.getItemTags();
  return (
    <main>
      <TagCloud tags={tags} />
      <div className="container m-auto flex flex-col flex-wrap gap-2 p-10 pt-0 justify-center">
        <h2 className="text-4xl font-semibold border-b-4 p-4">Results:</h2>
        <div className="flex flex-col gap-2 ">
          {searchResults.map((item) => (
            <Link href={`/item/${item.id}`} className="border-b mt-4">
              <SearchItemRow name="Name" value={item.name} />
              <SearchItemRow name="Collection" value={item.collection.name} />
              <SearchItemRow
                name="Created by"
                value={item.collection.creator.username}
              />
              <SearchItemRow name="Comments" value={item.comments.length} />
              <SearchItemRow name="Likes" value={item.likes.length} />
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
});

export default SearchPage;
