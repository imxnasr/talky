"use client";

import { FormEvent } from "react";
import Link from "next/link";
import { Input } from "@/components";

const RegisterContent = () => {
  const handleRegister = (e: FormEvent) => {
    e.preventDefault();
  };
  return (
    <>
      <form onSubmit={handleRegister} className="flex-1 flex flex-col gap-y-2">
        <h1 className="text-4xl mb-3">Register</h1>
        <Input type="text" name="username" placeholder="Username" required />
        <Input type="email" name="email" placeholder="Email" required />
        <Input type="password" name="password" placeholder="Password" required />
        <button className="bg-transparent hover:bg-primary border border-primary text-primary hover:text-color rounded-xl p-2 my-3" type="submit">
          Register
        </button>
      </form>
      <p className="text-colorSecondary">
        Have an account?{" "}
        <Link href="/login" className="underline font-bold text-primary">
          Login
        </Link>
      </p>
    </>
  );
};

export default RegisterContent;
