"use client";

import { useRouter } from "next/navigation.js";
import { useState } from "react";

export default function DeletePost({ post }) {
  const [error, setError] = useState("");
  const router = useRouter();
  console.log(post);
  async function handleDelete() {
    const res = await fetch(`/api/posts/${post.id}`, {
      method: "DELETE",
    });
    const info = await res.json();
    console.log(info);
    if (info.error) {
      return setError(info.error);
    }

    router.push(`/subreddits/${post.subredditId}`);
    router.refresh();
  }

  return (
    <div>
      <button onClick={handleDelete}>Delete Post</button>
    </div>
  );
}
