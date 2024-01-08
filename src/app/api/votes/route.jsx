import { NextResponse } from "next/server.js";
import { fetchUser } from "@/lib/fetchUser.js";
import { prisma } from "@/lib/prisma.jsx";

export async function POST(req, res) {
  try {
    const { postId, isUpvote } = await req.json();

    const user = await fetchUser();

    // Check if the user is authenticated
    if (!user.id) {
      return NextResponse.json({
        success: false,
        message: "User not authenticated. Please login or register to vote.",
      });
    }

    // Check if the user has an existing vote for the post
    const existingVote = await prisma.vote.findUnique({
      where: {
        userId_postId: {
          userId: user.id,
          postId: postId,
        },
      },
    });

    let vote;

    if (existingVote) {
      // Update or delete the existing vote based on user's action
      if (existingVote.isUpvote === isUpvote) {
        vote = await prisma.vote.delete({
          where: {
            id: existingVote.id,
          },
        });
      } else {
        vote = await prisma.vote.update({
          where: {
            id: existingVote.id,
          },
          data: {
            isUpvote,
          },
        });
      }
    } else {
      // Create a new vote if the user hasn't voted on the post before
      vote = await prisma.vote.create({
        data: {
          postId,
          userId: user.id,
          isUpvote,
        },
      });
    }

    return NextResponse.json({
      success: true,
      vote,
    });
  } catch (error) {
    console.error("Error processing vote:", error);

    return NextResponse.json({
      success: false,
      message:
        "Internal server error while processing vote. Please try again later.",
    });
  }
}
