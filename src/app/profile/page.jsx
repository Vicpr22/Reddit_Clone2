import Profile from "@/components/Profile.jsx";
import { fetchUser } from "@/lib/fetchUser.js";

const ProfilePage = async () => {
  const user = fetchUser();

  return (
    <div>
      <Profile />
    </div>
  );
};

export default ProfilePage;
