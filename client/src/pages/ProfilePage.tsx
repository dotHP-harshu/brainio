import { useContext } from "react";
import { UserContext } from "../context/userContext";
import { User } from "lucide-react";

function ProfilePage() {
  const { user } = useContext(UserContext)!;

  return (
    <main>
      <div className="w-full max-w-3xl mx-auto p-4 mt-10">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight">
            User Settings
          </h2>
          <p className="text-lg text-text-muted ">
            Customize your AI-powered learning experience and student profile.
          </p>
        </div>
        {/* profile information */}
        <div className="box box-shadow w-full space-y-2 mt-10">
          <div className="bg-secondary/50 border-b-2 border-text flex gap-2 items-center p-6">
            <User />
            <span className="text-xl font-semibold tracking-tight">
              Profile Information
            </span>
          </div>
          <div className="p-6 space-y-6">
            <div className="flex gap-4">
              <div className="w-20 aspect-square overflow-hidden space-y-2">
                <img
                  src={user?.photos}
                  className="w-full object-cover object-center"
                  alt="user Photo"
                />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold tracking-tight">
                  Upload Avatar
                </h3>
                <p className="text-base text-text-muted">
                  JPG or PNG, max 2MB. Recommended 400x400.
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <h2 className="text-base uppercase font-semibold text-text-muted">Full Name</h2>
              <p className="box box-shadow p-2 font-semibold ">{user?.userName}</p>
            </div>
            <div className="space-y-2">
              <h2 className="text-base uppercase font-semibold text-text-muted">Email Address</h2>
              <p className="box box-shadow p-2 font-semibold ">{user?.email}</p>
            </div>
          </div>
        </div>
        {/* profile information */}
      </div>
    </main>
  );
}

export default ProfilePage;
