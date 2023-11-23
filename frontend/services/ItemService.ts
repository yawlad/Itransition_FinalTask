import Item, { PostItemData, PutItemData } from "@/types/Item";
import { instance } from "./service.api.config";
import Tag from "@/types/Tag";
import handleAxiosError from "@/utils/handleAxiosError";
import Like from "@/types/Like";

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
      .get(`/items/${id}/`)
      .then((response) => {
        return response.data as Item;
      })
      .catch(handleAxiosError);
  },
  postItem(data: PostItemData) {
    return instance
      .post(`/items/`, data)
      .then((response) => {
        return response.data as Item;
      })
      .catch(handleAxiosError);
  },
  patchItem(id: number, data: PutItemData) {
    return instance
      .patch(`/items/${id}`, data)
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
  deleteItem(id: number) {
    return instance
      .delete(`/items/${id}`)
      .then((response) => {
        return true;
      })
      .catch(handleAxiosError);
  },
  deleteLike(id: number) {
    return instance
      .delete(`/items/likes/${id}`)
      .then((response) => {
        return true;
      })
      .catch(handleAxiosError);
  },
  postLike(data: { item: number }) {
    return instance
      .post(`/items/likes/`, data)
      .then((response) => {
        return response.data as Like;
      })
      .catch(handleAxiosError);
  },
};

export default ItemService;
