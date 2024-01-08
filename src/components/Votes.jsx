"use client";

import { useRouter } from "next/navigation.js";
import { useEffect, useState } from "react";

export default function Votes({ post, user }) {
  const [upvoted, setUpvoted] = useState(false);
  const [downvoted, setDownvoted] = useState(false);
  const upvotesCount = post.votes.filter((vote) => vote.isUpvote).length;
  const downvotesCount = post.votes.filter((vote) => !vote.isUpvote).length;

  const router = useRouter();

  async function handleVote(bool) {
    try {
      // Optimistic UI update
      if (bool) {
        setUpvoted(true);
        setDownvoted(false);
      } else {
        setUpvoted(false);
        setDownvoted(true);
      }

      const res = await fetch("/api/votes", {
        method: "POST",
        body: JSON.stringify({
          postId: post.id,
          isUpvote: bool,
        }),
      });

      const info = await res.json();

      // Refresh only if the request was successful
      if (!info.error) {
        router.refresh();
      }
    } catch (error) {
      console.log(error);
      // Handle error, e.g., display an error message to the user
    }
  }

  useEffect(() => {
    // Check if the user has upvoted or downvoted
    const hasUpvoted = post.votes.some(
      (vote) => vote.isUpvote && vote.userId === user.id
    );
    const hasDownvoted = post.votes.some(
      (vote) => !vote.isUpvote && vote.userId === user.id
    );

    setUpvoted(hasUpvoted);
    setDownvoted(hasDownvoted);
  }, [post, user]);

  return (
    <div className="votes-container">
      <div
        className={`upvote ${upvoted ? "voted" : ""}`}
        onClick={() => handleVote(true)}
      >
        ⬆{upvotesCount}
      </div>
      <div
        className={`downvote ${downvoted ? "voted" : ""}`}
        onClick={() => handleVote(false)}
      >
        ⬇{downvotesCount}
      </div>
    </div>
  );
}
