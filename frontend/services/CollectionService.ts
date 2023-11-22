import handleAxiosError from "@/utils/handleAxiosError";
import { instance } from "./service.api.config";
import Collection from "@/types/Collection";

const CollectionService = {
  getCollections() {
    return instance
      .get("/collections/")
      .then((response) => {
        return response.data as Collection[];
      })
      .catch(handleAxiosError);
  },
  getCollection(id: number) {
    return instance
      .get(`/collections/${id}/`)
      .then((response) => {
        return response.data as Collection;
      })
      .catch(handleAxiosError);
  },
  deleteCollection(id: number) {
    return instance
      .delete(`/collections/${id}/`)
      .then((response) => {
        return;
      })
      .catch(handleAxiosError);
  },
};

export default CollectionService;
