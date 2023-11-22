import { instance } from "./service.api.config";
import Collection from "@/types/Collection";

const CollectionService = {
  getCollections() {
    return instance
      .get("/collections/")
      .then((response) => {
        return response.data as Collection[];
      })
      .catch((error) => {
        console.error(error);
        return [];
      });
  },
  getCollection(id: number) {
    return instance
      .get(`/collections/${id}/`)
      .then((response) => {
        return response.data as Collection;
      })
      .catch((error) => {
        console.error(error);
        return undefined;
      });
  },
  deleteCollection(id: number) {
    return instance
      .delete(`/collections/${id}/`)
      .then((response) => {
        return;
      })
      .catch((error) => {
        console.error(error);
      });
  },
};

export default CollectionService;
