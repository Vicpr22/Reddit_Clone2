import { prisma } from "@/lib/prisma.jsx";
import Post from "./Post.jsx";

export default async function CommentSection({ post, user, isSingle }) {
  const children = await prisma.post.findMany({
    where: { parentId: post.id },
    include: {
      user: true,
      subreddit: true,
      votes: true,
    },
  });

  return (
    <div>
      {children.map((comment) => (
        <div key={comment.id} className="single-comment-container">
          <Post post={comment} user={user} isSingle={isSingle} />

          <CommentSection
            post={comment}
            user={user}
            isComment={true}
            isSingle={isSingle}
          />
        </div>
      ))}
    </div>
  );
}
