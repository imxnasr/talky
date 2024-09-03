import connect from "@/utils/connect";
import { Conversation } from "@/models";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  try {
    await connect();
    const { searchParams } = new URL(request.url);
    const forUser = searchParams.get("forUser");
    let conversations;
    if (forUser) {
      conversations = await Conversation.find({
        users: { $in: [forUser] },
      });
    } else {
      conversations = await Conversation.find();
    }
    return NextResponse.json(conversations, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
};

export const POST = async (request: Request) => {
  try {
    await connect();
    const body = await request.json();
    const conversation = await Conversation.create(body);
    return NextResponse.json(conversation, { status: 201 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
};
