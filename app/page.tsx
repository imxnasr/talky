import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async () => {
  const session = await getServerSession();
  return session ? redirect("/chats") : redirect("/login");
  // if (session) return redirect("/chats");
  // else return redirect("/login");
};
