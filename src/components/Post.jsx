import { fetchUser } from "@/lib/fetchUser.js";
import EditPost from "./EditPost.jsx";
import DeletePost from "./DeletePost.jsx";
import Votes from "./Votes.jsx";
import CreateComment from "./CreateComment.jsx";

export default async function Post({ post, isSingle }) {
  const user = await fetchUser();
  const _user = user.id === post.user.id;

  return (
    <div className="single-post-box">
      <Votes user={user} post={post} />
      <div className="post-content">
        <h3>{post.title && <p>{post.title}</p>}</h3>
        <div>{post.message}</div>
        {_user && isSingle && (
          <div className="buttons-container">
            <EditPost post={post} isSingle={isSingle} />
            <DeletePost post={post} />
          </div>
        )}
        <div className="post-footer">
          {post.subreddit && (
            <p className="subreddit-name">subreddit: {post.subreddit.name}</p>
          )}
          <p className="posted-by">posted by: {post.user.username}</p>
        </div>
      </div>
      {isSingle && <CreateComment post={post} />}
    </div>
  );
}
