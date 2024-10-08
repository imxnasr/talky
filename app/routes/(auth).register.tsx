import { ActionFunctionArgs } from "@remix-run/node";
import { Form, Link, redirect, useActionData, useNavigation } from "@remix-run/react";
import { useEffect, useState } from "react";
import { Input } from "~/components";
import { commitSession, getSession } from "~/sessions";
import { hashPassword } from "~/utils/auth";
import prisma from "~/utils/prisma";

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData: FormData = await request.formData();
  const username = formData.get("username") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // Check input's validity
  if (!username || !email || !password) return { error: "Please enter all fields" };
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(String(email))) return { error: "Please enter a valid email" };

  // Check if username or email already exists. If not, create a new user
  try {
    const session = await getSession(request.headers.get("Cookie"));
    const checkUsername = await prisma.user.findUnique({ where: { username } });
    if (checkUsername) return { error: "Username already exists" };

    const checkEmail = await prisma.user.findUnique({ where: { email } });
    if (checkEmail) return { error: "Email already exists" };

    const hashedPassword = await hashPassword(password);
    const user = await prisma.user.create({ data: { username, name: username, email, password: hashedPassword } });

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
        <h1 className="text-4xl mb-3">Register</h1>
        <Input type="text" name="username" placeholder="Username" required />
        <Input type="email" name="email" placeholder="Email" required />
        <Input type="password" name="password" placeholder="Password" required />
        <button className="bg-transparent hover:bg-primary border border-primary text-primary hover:text-color rounded-xl p-2 my-3" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Loading..." : "Register"}
        </button>
      </Form>
      <p className="text-colorSecondary">
        Have an account?{" "}
        <Link to="/login" className="underline font-bold text-primary">
          Login
        </Link>
      </p>
    </>
  );
};
