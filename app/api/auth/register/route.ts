import connect from "@/utils/connect";
import { User } from "@/models";
import { NextResponse } from "next/server";
import { sha1 } from "@/utils/functions";

export const POST = async (request: Request) => {
  try {
    await connect();
    const body = await request.json();
    const user = {
      name: body.name,
      username: body.username,
      email: body.email,
      password: sha1(body.password),
    };
    const checkUsername = await User.findOne({ username: user.username });
    const checkEmail = await User.findOne({ email: user.email });
    if (checkUsername) return NextResponse.json({ error: "Username already exists" }, { status: 401 });
    if (checkEmail) return NextResponse.json({ error: "Email already exists" }, { status: 401 });
    await User.create(user);
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
};
