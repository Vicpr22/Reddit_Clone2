import { prisma } from "@/lib/prisma.jsx";
import Post from "./Post.jsx";
import { fetchUser } from "@/lib/fetchUser.js";

export default async function Posts() {
  const user = await fetchUser();

  const posts = await prisma.post.findMany({
    where: { parentId: null },
    include: { subreddit: true, user: true, votes: true },
    orderBy: {
      CreatedAt: "desc",
    },
  });

  return (
    <div id="posts-container">
      <h1>Recent Posts!</h1>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}
