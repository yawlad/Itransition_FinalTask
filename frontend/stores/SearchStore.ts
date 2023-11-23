import ItemService from "@/services/ItemService";
import Item from "@/types/Item";
import Tag from "@/types/Tag";
import { makeAutoObservable } from "mobx";

class SearchStore {
  itemsResults: Item[] | [] = [];
  tags: Tag[] | [] = [];
  constructor() {
    makeAutoObservable(this);
    ItemService.getTags().then((tags) => (this.tags = tags));
  }

  setItemsResults(itemsResults: Item[] | []) {
    this.itemsResults = itemsResults;
  }

  getItemsResults() {
    return this.itemsResults as Item[];
  }

  getItemTags() {
    return this.tags as Tag[];
  }
}

const searchStore = new SearchStore();

export default searchStore;
