import { prisma } from "@/lib/prisma.jsx";

import Link from "next/link.js";
import CreateSubredditForm from "@/components/CreateSubredditForm.jsx";

export async function Subreddits() {
  const subreddits = await prisma.subreddit.findMany();

  return (
    <div className="subreddits-box">
      {/* Render the CreateSubredditForm at the top */}
      <CreateSubredditForm />

      <h1>Subreddits</h1>
      {/* Display existing subreddits underneath the form */}
      {subreddits.map((subreddit) => (
        <div key={subreddit.id} className="single-subreddit-box">
          <Link href={`/subreddits/${subreddit.id}`}>{subreddit.name}</Link>
        </div>
      ))}
    </div>
  );
}

export default Subreddits;
