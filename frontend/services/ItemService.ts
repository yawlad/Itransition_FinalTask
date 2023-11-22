import Item from "@/types/Item";
import { instance } from "./service.api.config";
import Tag from "@/types/Tag";
import handleAxiosError from "@/utils/handleAxiosError";

const ItemService = {
  getItems(params?: { search?: string; tag?: string }) {
    return instance
      .get("/items/", { params })
      .then((response) => {
        return response.data as Item[];
      })
      .catch(handleAxiosError);
  },
  getItem(id: number) {
    return instance
      .get(`/item/${id}/`)
      .then((response) => {
        return response.data as Item;
      })
      .catch(handleAxiosError);
  },
  getTags() {
    return instance
      .get("/items/tags/")
      .then((response) => {
        return response.data as Tag[];
      })
      .catch(handleAxiosError);
  },
};

export default ItemService;
