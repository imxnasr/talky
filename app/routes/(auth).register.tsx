import { PrismaClient } from "@prisma/client";
import { ActionFunctionArgs } from "@remix-run/node";
import { Form, json, Link, useActionData } from "@remix-run/react";
import { useEffect, useState } from "react";
import { Input } from "~/components";
import { hashPassword } from "~/utils/functions";
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
    const users = await prisma.user.findMany();
    return json({ users });
  } catch (error) {
    return json({ error });
  }
  // try {
  //   const checkUsername = await prisma.user.findUnique({ where: { username } });
  //   if (checkUsername) return { error: "Username already exists" };

  //   const checkEmail = await prisma.user.findUnique({ where: { email } });
  //   if (checkEmail) return { error: "Email already exists" };

  //   const hashedPassword = await hashPassword(password);
  //   const user = await prisma.user.create({ data: { username, name: username, email, password: hashedPassword } });

  //   // TODO: return redirect with a cookieSessionStorage
  //   return { success: "User registered successfully", user };
  // } catch (error) {
  //   return { error: "Something went wrong" };
  // } finally {
  //   await prisma.$disconnect();
  // }
};

export default () => {
  const [isLoading, setIsLoading] = useState(false);
  const data = useActionData<typeof action>();
  useEffect(() => {
    console.log(data);
    setIsLoading(false);
  }, [data]);
  return (
    <>
      <Form onSubmit={() => setIsLoading(true)} method="post" className="flex-1 flex flex-col gap-y-2">
        <h1 className="text-4xl mb-3">Register</h1>
        <Input type="text" name="username" placeholder="Username" required />
        <Input type="email" name="email" placeholder="Email" required />
        <Input type="password" name="password" placeholder="Password" required />
        <button className="bg-transparent hover:bg-primary border border-primary text-primary hover:text-color rounded-xl p-2 my-3" type="submit">
          {isLoading ? "Loading..." : "Register"}
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
