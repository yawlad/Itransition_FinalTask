"use client";
import Item from "@/types/Item";
import UniversalItemRow from "../UniversalItemRow";
import formatDate from "@/utils/formatDate";
import TagCloud from "../TagCloud/TagCloud";
import sessionStore from "@/stores/SessionStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faEdit,
  faThumbsDown,
  faThumbsUp,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import mergeArrays from "@/utils/mergeArrays";
import ItemService from "@/services/ItemService";
import { useRouter } from "next/navigation";
import { observer } from "mobx-react-lite";

interface ItemPageCardProps {
  item: Item;
  setEditMode: (value: boolean) => void;
  setItem: (value: Item) => void;
}

const ItemPageCard = observer(
  ({ item, setEditMode, setItem }: ItemPageCardProps) => {
    
    const router = useRouter();
    const mergedFields = mergeArrays(
      item.collection.custom_fields_classes,
      item.custom_fields
    );

    function handleDeleteButton(id: any): void {
      ItemService.deleteItem(id).then(() => {
        router.replace(`/collection/${item.collection.id}`);
      });
    }

    function handleLike(itemId: number) {
      ItemService.postLike({ item: itemId }).then((like) => {
        item.likes.push(like);
        setItem({ ...item });
      });
    }

    function handleUnLike() {
      const likeID = item.likes.filter(
        (like) => like.creator.id == sessionStore.getUser().id
      )[0].id;
      ItemService.deleteLike(likeID).then(() => {
        item.likes = item.likes.filter(
          (like) => like.creator.id != sessionStore.getUser().id
        );
        setItem({ ...item });
      });
    }

    return (
      <div className="flex flex-col gap-4 justify-center items-center border p-6 relative w-full">
        <div className="text-center p-4 font-semibold bg-gray-100 w-full text-2xl">
          {item.name}
        </div>
        <div className="w-full">
          <UniversalItemRow
            name={"Creator"}
            value={item.collection.creator.username}
          />
          <UniversalItemRow name={"Collection"} value={item.collection.name} />
          <UniversalItemRow
            name={"Created"}
            value={formatDate(item.created_at)}
          />
          <UniversalItemRow name={"Likes amount"} value={item.likes.length} />
          <UniversalItemRow
            name={"Comments amount"}
            value={item.comments.length}
          />

          {item.tags.length ? (
            <>
              <div className="text-center p-4 font-semibold bg-gray-100 w-full text-xl ">
                Tags
              </div>
              <TagCloud tags={item.tags} />
            </>
          ) : (
            <></>
          )}
          {item.custom_fields.length ? (
            <>
              <div className="text-center p-4 font-semibold bg-gray-100 w-full text-xl">
                Custom fields
              </div>
              <div></div>
            </>
          ) : (
            <></>
          )}

          {sessionStore.isLoggedIn() ? (
            <div className="flex justify-around w-full p-4">
              {sessionStore.isUserOwnerOrSuperUser(
                item.collection.creator.id
              ) ? (
                <>
                  <button
                    className="button-standart"
                    onClick={() => setEditMode(true)}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                </>
              ) : (
                <></>
              )}

              {!item.likes.some(
                (like) => like.creator.id == sessionStore.getUser().id
              ) ? (
                <>
                  <button
                    className="button-green"
                    onClick={() => handleLike(item.id)}
                  >
                    Like <FontAwesomeIcon icon={faThumbsUp} />
                  </button>
                </>
              ) : (
                <>
                  <button className="button-red" onClick={() => handleUnLike()}>
                    UnLike <FontAwesomeIcon icon={faThumbsDown} />
                  </button>
                </>
              )}

              {sessionStore.isUserOwnerOrSuperUser(
                item.collection.creator.id
              ) ? (
                <>
                  <button
                    className="button-red"
                    onClick={() => handleDeleteButton(item.id)}
                  >
                    <FontAwesomeIcon icon={faTrashCan} />
                  </button>
                </>
              ) : (
                <></>
              )}
            </div>
          ) : (
            ""
          )}

          <>
            <div className="text-center p-4 font-semibold bg-gray-100 w-full text-xl">
              Comments
            </div>
            <div className="p-2 flex flex-col gap-2">
              {item.comments.map((comment) => (
                <div className="p-4 bg-gray-50 relative rounded-md">
                  <div className="absolute bg-gray-50 top-0 right-0 -translate-y-1/2 py-1 px-3 rounded-md">
                    {comment.creator.username}
                  </div>
                  <div className="bg-gray-100 p-2">{comment.content}</div>
                </div>
              ))}
            </div>
          </>
          {sessionStore.isLoggedIn() ? (
            <>
              <hr />
              <div className="p-4 bg-gray-50 relative rounded-md mt-2">
                <textarea className="bg-gray-100 p-2 w-full rounded-md">
                  asdsad
                </textarea>
                <button className="button-green" type="submit">
                  Post <FontAwesomeIcon icon={faComment} />
                </button>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    );
  }
);

export default ItemPageCard;
