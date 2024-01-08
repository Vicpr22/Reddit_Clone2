import { fetchUser } from "@/lib/fetchUser.js";
import { prisma } from "@/lib/prisma.jsx";
import { NextResponse } from "next/server.js";

export async function PUT(req, res) {
  try {
    const { postId } = res.params;
    const { title, message } = await req.json();
    const user = await fetchUser();

    if (!user.id) {
      return NextResponse.json({
        success: false,
        message: "Please Login to Edit!",
      });
    }

    const _post = await prisma.post.findFirst({
      where: {
        id: postId,
      },
    });

    if (!_post) {
      return NextResponse.json({
        success: false,
        message: "No post with that ID found.",
      });
    }

    if (_post.userId !== user.id) {
      return NextResponse.json({
        success: false,
        message: "You must be the owner of this post to edit!",
      });
    }

    const post = await prisma.post.update({
      where: { id: postId },
      data: { title, message },
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

export async function DELETE(req, res) {
  try {
    const { postId } = res.params;
    const user = await fetchUser();

    if (!user.id) {
      return NextResponse.json({
        success: false,
        message: "Please login or register to create subreddit!",
      });
    }
    const _post = await prisma.post.findFirst({
      where: {
        id: postId,
      },
    });

    if (!_post) {
      return NextResponse.json({
        success: false,
        message: "No post with that ID found.",
      });
    }

    if (_post.userId !== user.id) {
      return NextResponse.json({
        success: false,
        message: "You must be the owner of this post to delete!",
      });
    }
    const post = await prisma.post.delete({ where: { id: postId } });

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
