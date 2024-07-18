import { Search } from "@/components";

export default () => {
  return (
    <main className="flex">
      {/* Chats Section */}
      <section className="flex flex-col min-w-64">
        <Search />
      </section>
    </main>
  );
};
