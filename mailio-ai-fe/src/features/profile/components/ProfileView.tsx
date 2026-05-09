import { ProfileForm } from "./ProfileForm";
import { AccountInfoCard } from "./AccountInfoCard";

export function ProfileView() {
  return (
    <div className="max-w-2xl space-y-4">
      <ProfileForm />
      <AccountInfoCard />
    </div>
  );
}
