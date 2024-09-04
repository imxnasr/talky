import connect from "@/utils/connect";
import { User } from "@/models";
import { NextResponse } from "next/server";
import { sha1 } from "@/utils/functions";

export const POST = async (request: Request) => {
  try {
    await connect();
    const body = await request.json();
    const user = (await User.findOne({ username: body.username, password: sha1(body.password) })) || (await User.findOne({ email: body.username, password: sha1(body.password) }));
    if (!user) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
