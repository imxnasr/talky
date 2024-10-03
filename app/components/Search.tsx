import { useNavigate } from "@remix-run/react";
import { FC, FormEvent, useState } from "react";
import { FiSearch } from "react-icons/fi";

interface SearchProps {}

export const Search: FC<SearchProps> = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    console.log("SEARCH:", search);
    if (search.length === 0) return;
    return navigate(`/search?q=${search}`);
  };
  return (
    <form className="bg-slateSecondary flex items-center px-4 rounded-xl text-colorSecondary h-12" onSubmit={handleSearch}>
      <FiSearch className="size-6 mr-2" />
      <input className="bg-transparent w-full h-full " type="text" name="search" placeholder="Search" defaultValue={search} onChange={(e) => setSearch(e.target.value)} />
    </form>
  );
};
