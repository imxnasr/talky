"use client";

import { FormEvent } from "react";
import Link from "next/link";
import { Input } from "@/components";

const LoginContent = () => {
  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
  };
  return (
    <>
      <form onSubmit={handleLogin} className="flex-1 flex flex-col gap-y-2">
        <h1 className="text-4xl mb-3">Login</h1>
        <Input type="text" name="username" placeholder="Username or Email" required />
        <Input type="password" name="password" placeholder="Password" required />
        <button className="bg-transparent hover:bg-primary border border-primary text-primary hover:text-color rounded-xl p-2 my-3" type="submit">
          Login
        </button>
      </form>
      <p className="text-colorSecondary">
        Don't have an account?{" "}
        <Link href="/register" className="underline font-bold text-primary">
          Register
        </Link>
      </p>
    </>
  );
};

export default LoginContent;
