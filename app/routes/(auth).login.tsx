import { ActionFunctionArgs } from "@remix-run/node";
import { Form, Link, redirect, useActionData, useNavigation } from "@remix-run/react";
import { Input } from "~/components";
import { commitSession, getSession } from "~/sessions";
import { comparePassword } from "~/utils/functions";
import prisma from "~/utils/prisma";

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData: FormData = await request.formData();
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  // Check input's validity
  if (!username || !password) return { error: "Please enter all fields" };

  // Check if username or email already exists.
  try {
    const session = await getSession(request.headers.get("Cookie"));
    const user = (await prisma.user.findUnique({ where: { username } })) || (await prisma.user.findUnique({ where: { email: username } }));
    if (!user) return { error: "Username or email is incorrect" };

    const checkPassword = await comparePassword(password, user.password as string);
    if (!checkPassword) return { error: "Password is incorrect" };

    session.set("id", user.id);
    session.set("username", user.username);
    session.set("email", user.email);
    return redirect("/chats", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  } catch (error) {
    return { error: "Something went wrong" };
  }
};

export default () => {
  const data = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <>
      <Form method="post" className="flex-1 flex flex-col gap-y-2">
        <h1 className="text-4xl mb-3">Login</h1>
        <Input type="text" name="username" placeholder="Username or Email" required />
        <Input type="password" name="password" placeholder="Password" required />
        <button className="bg-transparent hover:bg-primary border border-primary text-primary hover:text-color rounded-xl p-2 my-3" type="submit">
          {isSubmitting ? "Loading..." : "Login"}
        </button>
      </Form>
      <p className="text-colorSecondary">
        Don't have an account?{" "}
        <Link to="/register" className="underline font-bold text-primary">
          Register
        </Link>
      </p>
    </>
  );
};
