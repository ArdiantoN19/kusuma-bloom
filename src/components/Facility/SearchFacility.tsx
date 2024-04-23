"use client";

import React, { ElementRef, useEffect, useRef } from "react";
import { MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";
import { useRouter, useSearchParams } from "next/navigation";

type CustomFormEvent = React.FormEvent<HTMLFormElement>;

const SearchFacility = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchRef = useRef<ElementRef<"input">>(null);

  useEffect(() => {
    if (searchParams.get("s")) {
      searchRef.current?.setAttribute("value", searchParams.get("s")!);
    }
  }, [searchParams]);

  const onSearchHandler = (e: CustomFormEvent) => {
    e.preventDefault();
    const search = e.currentTarget.search.value.trim();
    if (!search) router.push("/facility");
    router.push(`/facility?s=${search}`);
  };

  return (
    <div className="w-full md:w-1/2">
      <form onSubmit={onSearchHandler} className="w-full ">
        <div className="md:float-end flex items-center w-full lg:w-[15rem]">
          <input
            type="text"
            placeholder="Search..."
            className="outline-none rounded-s bg-white border px-4 py-3 text-sm w-full shadow-sm"
            name="search"
            ref={searchRef}
          />
          <button
            type="submit"
            className="bg-gradient-primary p-3 rounded-r border border-black btn-shadow"
          >
            <MagnifyingGlass size={20} className="text-white" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchFacility;
