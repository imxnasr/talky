import { FC } from "react";
import { Avatar, Input } from "./";
import { Link } from "@remix-run/react";

interface SearchSectionProps {
  loading: boolean;
  data: any;
  q: string;
  setQ: React.Dispatch<React.SetStateAction<string>>;
}

export const SearchSection: FC<SearchSectionProps> = ({ loading, data, q, setQ }) => {
  return (
    <div className="flex-1">
      <Input type="text" name="search" id="search" placeholder="Search..." value={q} onChange={(e) => setQ(e.target.value)} noLabel className="mb-4" />
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : data?.users?.length > 0 ? (
        <div className="flex flex-col gap-4">
          {data?.users.map((user: any, index: number) => (
            <Link to={`some-chat-${index + 1}`} key={index}>
              <div className="flex gap-4 items-center">
                <Avatar twSize={14} />
                <p>{user.name}</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center">No results found</div>
      )}
    </div>
  );
};
