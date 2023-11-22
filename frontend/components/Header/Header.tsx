"use client";

import Link from "next/link";
import AuthorizedHeaderPart from "./AuthorizedHeaderPart";
import NonAuthorizedHeaderPart from "./NonAuthorizedHeaderPart";
import { observer } from "mobx-react-lite";
import sessionStore from "@/stores/SessionStore";
import { FormEvent, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import ItemService from "@/services/ItemService";
import searchStore from "@/stores/SearchStore";

const Header = observer(() => {
  const [searchParams, setSearchParams] = useState<{ search: string }>();
  const router = useRouter();
  const path = usePathname();

  const handleInputChange = (value: string) => {
    setSearchParams({ search: value });
  };
  const handleSearchSubmit = (event: FormEvent) => {
    event.preventDefault();
    ItemService.getItems(searchParams).then((items) => {
      searchStore.setItemsResults(items);
    });
    if (path != "/search") {
      router.replace("/search");
    }
  };
  return (
    <>
      <div className="md:hidden flex justify-between container m-auto p-2 gap-10 items-center">
        <Link href={"/"}>CollectionApp</Link>
        {sessionStore.isLoggedIn() ? (
          <AuthorizedHeaderPart username={sessionStore.getUser().username} />
        ) : (
          <NonAuthorizedHeaderPart />
        )}
      </div>

      <div className="flex justify-between container m-auto p-2 md:p-4 gap-10 items-center">
        <div className="hidden md:block">
          <Link href={"/"}>CollectionApp</Link>
        </div>
        <div className="flex-grow-[1]">
          <form
            className="relative text-gray-600 w-full"
            onSubmit={handleSearchSubmit}
          >
            <input
              type="search"
              name="serch"
              placeholder="Search"
              className="bg-white h-10 px-5 pr-8 rounded-full text-sm focus:outline-none w-full"
              value={searchParams?.search}
              onChange={(event) => {
                handleInputChange(event.target.value);
              }}
            />
            <button type="submit" className="absolute right-0 top-0 mt-3 mr-4">
              <svg
                className="h-4 w-4 fill-current"
                id="Capa_1"
                viewBox="0 0 56.966 56.966"
                width="512px"
                height="512px"
              >
                <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
              </svg>
            </button>
          </form>
        </div>
        <div className="hidden md:block">
          {sessionStore.isLoggedIn() ? (
            <AuthorizedHeaderPart username={sessionStore.getUser().username} />
          ) : (
            <NonAuthorizedHeaderPart />
          )}
        </div>
      </div>
    </>
  );
});

export default Header;
