import { fetchUser } from "@/lib/fetchUser.js";
import { prisma } from "@/lib/prisma.jsx";
import { NextResponse } from "next/server.js";

export async function POST(req, res) {
  const user = await fetchUser();

  const { name, description } = await req.json();
  const subreddit = await prisma.subreddit.create({
    data: { name, description, userId: user.id },
  });

  return NextResponse.json({ success: true, subreddit });
}

export async function GET() {
  try {
    const subreddits = await prisma.subreddit.findMany({
      include: { posts: true },
    });

    return NextResponse.json({
      success: true,
      subreddits,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message,
    });
  }
}
