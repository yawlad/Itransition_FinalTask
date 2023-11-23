"use client";

import { useEffect, useState } from "react";
import CollectionCard from "./CollectionCard";
import ItemCard from "./ItemCard";
import CollectionService from "@/services/CollectionService";
import Collection from "@/types/Collection";
import Item from "@/types/Item";
import ItemService from "@/services/ItemService";
import compareByDates from "@/utils/compareDates";
import searchStore from "@/stores/SearchStore";
import TagCloud from "../TagCloud/TagCloud";
import { observer } from "mobx-react-lite";

const MainPage = observer(() => {
  const [largestCollections, setLargestCollections] = useState<Collection[]>(
    []
  );
  const [lastItems, setLastItems] = useState<Item[]>([]);
  const tags = searchStore.getItemTags();
  useEffect(() => {
    CollectionService.getCollections().then((collections) => {
      setLargestCollections(
        collections.sort((a, b) => a.items.length - b.items.length).slice(-5)
      );
    });

    ItemService.getItems().then((items) => {
      setLastItems(
        items
          .sort((a, b) => compareByDates(a.created_at, b.created_at))
          .slice(-5)
      );
    });
  }, []);

  return (
    <main>
      <TagCloud tags={tags} />
      <h2 className="text-4xl font-semibold text-center my-4">Last items</h2>
      <div className="container m-auto flex flex-row-reverse flex-wrap gap-8 p-10 justify-around">
        {lastItems.map((item) => {
          return <ItemCard key={`item_${item.id}`} item={item} />;
        })}
      </div>
      <h2 className="text-4xl font-semibold text-center my-4">
        TOP 5 Largest collections
      </h2>
      <div className="container m-auto flex flex-col-reverse flex-wrap gap-8 p-10 justify-around">
        {largestCollections.map((collection) => {
          return (
            <CollectionCard
              key={`collection_${collection.id}`}
              collection={collection}
            />
          );
        })}
      </div>
    </main>
  );
});

export default MainPage;
