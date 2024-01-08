import { fetchUser } from "@/lib/fetchUser.js";
import { prisma } from "@/lib/prisma.jsx";
import { NextResponse } from "next/server.js";

export async function POST(req, res) {
  try {
    const user = await fetchUser();

    if (!user.id) {
      return NextResponse.json({
        success: false,
        message: "Please login or register to create subreddit!",
      });
    }
    const { selectedSubredditId, message, title, parentId } = await req.json();

    if (!selectedSubredditId || !message) {
      return NextResponse.json({
        success: false,
        message: "Please provide text and a subredditId to create a post!",
      });
    }
    const post = await prisma.post.create({
      data: {
        userId: user.id,
        subredditId: selectedSubredditId,
        message,
        title,
        parentId,
      },
    });

    return NextResponse.json({
      success: true,
      post,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message,
    });
  }
}
