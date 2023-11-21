import Item from "@/types/Item";
import { instance } from "./service.api.config";
import Tag from "@/types/Tag";

const ItemService = {
  getItems() {
    return instance
      .get("/items/")
      .then((response) => {
        return response.data as Item[];
      })
      .catch((error) => {
        console.error(error);
        return [];
      });
  },
  getItem(id: number) {
    return instance
      .get(`/item/${id}/`)
      .then((response) => {
        return response.data as Item;
      })
      .catch((error) => {
        console.error(error);
        return {};
      });
  },
  getTags() {
    return instance
      .get("/items/tags/")
      .then((response) => {
        return response.data as Tag[];
      })
      .catch((error) => {
        console.error(error);
        return [];
      });
  },
};

export default ItemService;
