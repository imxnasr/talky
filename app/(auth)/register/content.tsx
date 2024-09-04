"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { Input } from "@/components";
import { useRouter } from "next/navigation";

const RegisterContent = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });
    const data = await res.json();
    if (res.status === 201) {
      // TODO signIn(data);
      router.push("/");
    } else {
      // TODO show error
      // throw new Error(data.error);
    }
    setIsLoading(false);
  };
  return (
    <>
      <form onSubmit={handleRegister} className="flex-1 flex flex-col gap-y-2">
        <h1 className="text-4xl mb-3">Register</h1>
        <Input type="text" name="username" placeholder="Username" required value={username} onChange={(e) => setUsername(e.target.value)} />
        <Input type="email" name="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input type="password" name="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="bg-transparent hover:bg-primary border border-primary text-primary hover:text-color rounded-xl p-2 my-3" type="submit">
          {isLoading ? "Loading..." : "Register"}
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
