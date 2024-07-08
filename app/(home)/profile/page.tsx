import { ProfileView } from "./components/profile-view";
const userData = {
  id: "12345",
  username: "johndoe",
  email: "johndoe@example.com",
  avatarUrl: "https://github.com/shadcn.png",
};
export default function ProfilePage() {
  return <ProfileView userData={userData} />;
}
