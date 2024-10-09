import { LoaderFunctionArgs } from "@remix-run/node";
import prisma from "~/utils/prisma";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId") as string;
  const q = searchParams.get("q") as string;
  if (!userId) {
    return new Response(JSON.stringify({ error: "User not found" }));
  }
  if (q === "") {
    return new Response(JSON.stringify({ users: [] }));
  }
  console.log(q);
  const users = await prisma.user.findMany({
    where: {
      id: { not: userId },
      name: { contains: q },
    },
  });
  return new Response(JSON.stringify({ users }));
};
