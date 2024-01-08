"use client";
import { useRouter } from "next/navigation.js";
import { useState } from "react";

export default function CreateComment({ post }) {
  const [isCommenting, setIsCommenting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();

    if (!message) {
      return setError("You cannot submit an empty field");
    }
    const res = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({
        selectedSubredditId: post.subredditId,
        message,
        parentId: post.id,
      }),
    });

    const info = await res.json();
    console.log(info);
    if (info.error) {
      return setError(info.error);
    }
    setError("");
    setMessage("");
    setIsCommenting(false);
    router.refresh();
  }

  return (
    <div className="create-comment">
      {isCommenting ? (
        <form className="comment-form" onSubmit={handleSubmit}>
          <textarea
            type="text"
            placeholder="Text.."
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          />
          <button>Post</button>
          <button type="button" onClick={() => setIsCommenting(false)}>
            Cancel
          </button>
          <p>{error}</p>
        </form>
      ) : (
        <button onClick={() => setIsCommenting(true)}>Reply</button>
      )}
    </div>
  );
}
