"use client";
import { useRouter } from "next/navigation.js";
import { useEffect, useState } from "react";

export default function CreatePost({ subreddit }) {
  const [subreddits, setSubreddits] = useState([]);
  const [selectedSubredditId, setSelectedSubredditId] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const router = useRouter();

  async function fetchSubreddits() {
    const res = await fetch("/api/subreddits", {});
    const info = await res.json();
    setSubreddits(info.subreddits);
  }

  async function handleCreatePost(e) {
    e.preventDefault();

    setIsPosting(true);

    if (!selectedSubredditId || !message) {
      return setError(
        "Please select a subreddit and enter text to create a post!"
      );
    }

    const res = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({ selectedSubredditId, title, message }),
    });

    setIsPosting(false);

    const info = await res.json();

    if (info.error) {
      return setError(info.error);
    }

    setSelectedSubredditId("");
    setTitle("");
    setMessage("");
    setError("");

    if (subreddit) {
      router.push(`/subreddits/${subreddit.id}`);
    } else {
      router.push("/");
    }

    router.refresh();
  }

  useEffect(() => {
    fetchSubreddits();
  }, []);

  useEffect(() => {
    if (subreddit) {
      setSelectedSubredditId(subreddit.id);
    }
  }, [subreddit]);

  const toggleFormVisibility = () => {
    setIsFormVisible((prevIsFormVisible) => !prevIsFormVisible);
  };

  return (
    <div className="post-form">
      <button onClick={toggleFormVisibility}>
        {isFormVisible ? "Cancel" : "Create Post"}
      </button>

      {isFormVisible && (
        <form onSubmit={handleCreatePost}>
          {subreddit ? (
            <div>Post to {subreddit.name}</div>
          ) : (
            <div>
              {" "}
              <label htmlFor="subreddit">Select Subreddit:</label>
              <select
                id="subreddit"
                value={selectedSubredditId}
                onChange={(e) => setSelectedSubredditId(e.target.value)}
              >
                {subreddits.map((sub) => (
                  <option key={sub.id} value={sub.id}>
                    {sub.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>

          <button type="submit" disabled={isPosting}>
            {isPosting ? "Posting..." : "Create Post"}
          </button>
        </form>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
