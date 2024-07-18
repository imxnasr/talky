"use client";

import { FC, FormEvent, useState } from "react";
import { FiSearch } from "react-icons/fi";

interface SearchProps {}

export const Search: FC<SearchProps> = () => {
  const [search, setSearch] = useState("");
  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    console.log("SEARCH:", search);
  };
  return (
    <form className="bg-slateSecondary flex items-center py-2 px-4 rounded-xl text-colorSecondary h-12" onSubmit={handleSearch}>
      <FiSearch className="size-6 mr-2" />
      <input className="bg-transparent w-36 h-full" type="text" name="search" placeholder="Search" defaultValue={search} onChange={(e) => setSearch(e.target.value)} />
    </form>
  );
};
