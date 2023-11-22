"use client";

import { useEffect, useState } from "react";
import CollectionCard from "./CollectionCard";
import ItemCard from "./ItemCard";
import TagItem from "../TagCloud/TagItem";
import CollectionService from "@/services/CollectionService";
import Collection from "@/types/Collection";
import Item from "@/types/Item";
import ItemService from "@/services/ItemService";
import Tag from "@/types/Tag";
import compareByDates from "@/utils/compareDates";

const MainPage = () => {
  let [largestCollections, setLargestCollections] = useState<Collection[]>([]);
  let [lastItems, setLastItems] = useState<Item[]>([]);
  let [tags, setTags] = useState<Tag[]>([]);

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
    ItemService.getTags().then((tags) => {
      setTags(tags.slice(-50));
    });
  }, []);

  return (
    <main>
      <div className="container m-auto flex flex-row flex-wrap gap-2 p-10 pt-0 justify-center">
        {tags.map((tag) => {
          return <TagItem tagName={tag.name} key={`tag_${tag.id}`} />;
        })}
      </div>
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
};

export default MainPage;
