"use client";

import { useState } from "react";
import { useRouter } from "next/navigation.js";

export default function EditPost({ post, isSingle }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(post.title);
  const [message, setMessage] = useState(post.message);
  const [error, setError] = useState("");

  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();

    if (!message) {
      return setError("Please provide both title and message to submit!");
    }

    const res = await fetch(`/api/posts/${post.id}`, {
      method: "PUT",
      body: JSON.stringify({ title, message }),
    });

    const info = await res.json();
    console.log(info);

    if (info.error) {
      return setError(info.error);
    }

    setIsEditing(false);
    router.refresh();
  }

  function handleCancel() {
    setMessage(post.message);
    setTitle(post.title);
    setError("");
    setIsEditing(false);
  }

  return (
    <div>
      {!isEditing ? (
        <button onClick={() => setIsEditing(true)}>Edit Post</button>
      ) : (
        <form onSubmit={handleSubmit}>
          {!isSingle && (
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          )}

          <textarea
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <div className="buttons-container">
            <button type="submit">Edit</button>
            <button type="button" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      )}
      <p>{error}</p>
    </div>
  );
}
