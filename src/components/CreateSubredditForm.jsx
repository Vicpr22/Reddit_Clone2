"use client";
import { useRouter } from "next/navigation.js";
import { useState } from "react";

const CreateSubredditForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const handleToggleForm = () => {
    setShowForm((prevShowForm) => !prevShowForm);
  };

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await fetch("/api/subreddits", {
      method: "POST",
      body: JSON.stringify({ name, description }),
    });
    const info = await res.json();
    console.log(info);
    if (info.error) {
      return setError(info.error);
    }
    setName("");
    setDescription("");
    setShowForm(false);
    router.push("/");
    router.refresh();
  }

  return (
    <div className={`create-subreddit-form${showForm ? " open" : ""}`}>
      <button onClick={handleToggleForm} className="toggle-button">
        {showForm ? "Close Form" : "Create a New Subreddit"}
      </button>

      {showForm && (
        <div className="form-container">
          <h2>Create a Community</h2>
          {error && <p className="error-message">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>
                Community Name
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </label>
            </div>

            <div className="form-group">
              <label>
                Description
                <textarea
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </label>
            </div>

            <button type="submit">Create Community</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default CreateSubredditForm;
