import handleAxiosError from "@/utils/handleAxiosError";
import { instance } from "./service.api.config";
import Collection, {
  PostCollectionData,
  PutCollectionData,
} from "@/types/Collection";
import CollectionTheme from "@/types/CollectionTheme";

const CollectionService = {
  getCollections() {
    return instance
      .get("/collections/")
      .then((response) => {
        return response.data as Collection[];
      })
      .catch(handleAxiosError);
  },
  getThemes() {
    return instance
      .get("/collections/themes/")
      .then((response) => {
        return response.data as CollectionTheme[];
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
  patchCollection(id: number, data: PutCollectionData) {
    return instance
      .patch(`/collections/${id}/`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        return response.data as Collection;
      })
      .catch(handleAxiosError);
  },
  postCollection(data: PostCollectionData) {
    return instance
      .post("/collections/", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        return response.data as Collection;
      })
      .catch(handleAxiosError);
  },
};

export default CollectionService;
