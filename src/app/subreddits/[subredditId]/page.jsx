import CreatePost from "@/components/CreatePost.jsx";
import Post from "@/components/Post.jsx";
import { prisma } from "@/lib/prisma.jsx";
import Link from "next/link.js";

export default async function Subreddit({ params }) {
  const { subredditId } = params;

  const subreddit = await prisma.subreddit.findFirst({
    where: { id: subredditId },
  });

  const posts = await prisma.post.findMany({
    where: { subredditId, parentId: null },
    include: { user: true, votes: true },
  });

  return (
    <div className="subreddits-container">
      <h3 className="sr-header">{subreddit.name}</h3>
      <p className="subreddit-description">{subreddit.description}</p>
      <CreatePost subreddit={subreddit} />
      {posts.map((post) => (
        <div key={post.id} className="post">
          <Link href={`/posts/${post.id}`} className="post-link">
            <Post key={post.id} post={post} />
          </Link>
        </div>
      ))}
    </div>
  );
}
