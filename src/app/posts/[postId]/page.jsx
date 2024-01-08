import CommentSection from "@/components/CommentSection.jsx";
import Post from "@/components/Post.jsx";
import { fetchUser } from "@/lib/fetchUser.js";
import { prisma } from "@/lib/prisma.jsx";

export default async function SinglePost({ params }) {
  const { postId } = params;
  const user = await fetchUser();

  const post = await prisma.post.findFirst({
    where: { id: postId },
    include: {
      user: true,
      votes: true,
    },
  });

  return (
    <div>
      <h1>{post.title}</h1>
      <Post post={post} isSingle={true} />
      <h3>Post Replies</h3>
      <CommentSection post={post} user={user} isSingle={true} />
    </div>
  );
}
