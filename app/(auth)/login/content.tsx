"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { Input } from "@/components";
import { useRouter } from "next/navigation";

const LoginContent = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const data = res.json();
    if (res.status === 200) {
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
      <form onSubmit={handleLogin} className="flex-1 flex flex-col gap-y-2">
        <h1 className="text-4xl mb-3">Login</h1>
        <Input type="text" name="username" placeholder="Username or Email" required value={username} onChange={(e) => setUsername(e.target.value)} />
        <Input type="password" name="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="bg-transparent hover:bg-primary border border-primary text-primary hover:text-color rounded-xl p-2 my-3" type="submit">
          {isLoading ? "Loading..." : "Login"}
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
