import CreatePost from "@/components/CreatePost.jsx";
import Posts from "@/components/Posts.jsx";
import Subreddits from "@/components/Subreddits.jsx";

export default function Home() {
  return (
    <div id="home-body-container">
      <h1 id="welcome-tag">
        Welcome to <img src="/images/RedditIcon.jpg" width={100} />
      </h1>
      <Posts />
      {/* <CreatePost /> */}
    </div>
  );
}
