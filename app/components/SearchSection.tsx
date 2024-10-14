import { FC } from "react";
import { Input } from "./";

interface SearchSectionProps {
  loading: boolean;
  data: any;
  q: string;
  setQ: React.Dispatch<React.SetStateAction<string>>;
}

export const SearchSection: FC<SearchSectionProps> = ({ loading, data, q, setQ }) => {
  return (
    <div className="flex-1">
      <Input type="text" name="search" id="search" placeholder="Search..." value={q} onChange={(e) => setQ(e.target.value)} noLabel />
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : data?.users?.length > 0 ? (
        <div className="flex flex-col gap-4">
          {data?.users.map((user: any, index: number) => (
            <div key={index} className="flex gap-4 items-center">
              <img className="w-12 h-12 rounded-full" src={user.avatar || "avatar.jpg"} alt={user.name} />
              <p>{user.name}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center">No results found</div>
      )}
    </div>
  );
};
