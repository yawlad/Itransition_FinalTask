"use client";

import { observer } from "mobx-react-lite";
import TagCloud from "../TagCloud/TagCloud";
import searchStore from "@/stores/SearchStore";
import Link from "next/link";
import UniversalItemRow from "../UniversalItemRow";

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
            <Link
              key={item.id}
              href={`/item/${item.id}`}
              className="border-b mt-4"
            >
              <UniversalItemRow name="Name" value={item.name} />
              <UniversalItemRow
                name="Collection"
                value={item.collection.name}
              />
              <UniversalItemRow
                name="Created by"
                value={item.collection.creator.username}
              />
              <UniversalItemRow name="Comments" value={item.comments.length} />
              <UniversalItemRow name="Likes" value={item.likes.length} />
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
});

export default SearchPage;
