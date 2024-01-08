import Link from "next/link";
import { fetchUser } from "@/lib/fetchUser.js";
import Logout from "./Logout.jsx";
import ProfilePage from "./ProfilePage.jsx";

export default async function Navbar() {
  const user = await fetchUser();
  return (
    <div className="navbar">
      <Link href={"/"}>Home</Link>
      <Link href={"/subreddits"}>Subreddits</Link>
      {user.id && (
        <>
          {/* <Link href={"/profile"}>Profile</Link> */}
          <Logout />
          <span>Welcome {user.username}</span>
        </>
      )}
      {!user.id && (
        <>
          <Link href={"/login"}>Login</Link>
          <Link href={"/register"}>Register</Link>
        </>
      )}
    </div>
  );
}
