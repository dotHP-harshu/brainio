import { KeyRound, User } from "lucide-react";
import { useUser } from "../hooks/useUser";
import { useState } from "react";
import EditPhoto from "../components/Profile/EditPhoto";
import DeleteAccModal from "../components/DeleteAccModal";
import AccountManagement from "../components/Profile/AccountManagement";
import Preference from "../components/Profile/Preference";
import ProfileNavigations from "../components/Profile/ProfileNavigations";
import Header from "../components/Header";

function ProfilePage() {
  const { user } = useUser()!;
  if (!user) return;
  const [editPhoto, setEditPhoto] = useState(false);
  const [showingDeleteModal, setShowingDeleteModal] = useState(false);

  return (
    <>
    <Header/>
    <main>
      {editPhoto && (
        <EditPhoto
          userPhoto={user.photos}
          hideEditPhoto={() => setEditPhoto(false)}
        />
      )}
      {showingDeleteModal && (
        <DeleteAccModal
          userName={user.userName}
          hideModal={() => setShowingDeleteModal(false)}
        />
      )}
      <div className="w-full max-w-3xl mx-auto p-4 mt-10">
      <ProfileNavigations/>
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
              <div className="w-20 aspect-square overflow-hidden space-y-2 box box-shadow">
                <img
                  src={user.photos}
                  className="w-full object-cover object-center"
                  alt="user Photo"
                />
              </div>
              <div className="space-y-2 flex justify-center items-end">
                <button
                  className="box px-4 py-1 font-semibold font-sans outline-none cursor-pointer"
                  onClick={() => setEditPhoto(true)}
                >
                  Change Avatar
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <h2 className="text-base uppercase font-semibold text-text-muted">
                Full Name
              </h2>
              <p className="box box-shadow p-2 font-semibold ">
                {user.userName}
              </p>
            </div>
            <div className="space-y-2">
              <h2 className="text-base uppercase font-semibold text-text-muted">
                Email Address
              </h2>
              <p className="box box-shadow p-2 font-semibold ">{user.email}</p>
            </div>
          </div>
        </div>
        {/* profile information */}
      </div>
      <div className="w-full max-w-3xl mx-auto p-4">
        <div className="box box-shadow w-full space-y-2 mt-10">
          <div className="bg-secondary/50 border-b-2 border-text flex gap-2 items-center p-6">
            <KeyRound />
            <span className="text-xl font-semibold tracking-tight">
              Account & Preference
            </span>
          </div>
          <div className="p-6 space-y-6">
            <Preference />
            <hr />
            <AccountManagement />
          </div>
        </div>
      </div>
      {/* danger zone */}
      <div className="w-full max-w-3xl mx-auto p-4">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight">Danger Zone</h2>
        </div>
        <div className="mt-10 border-2 border-error p-4 shadow-[5px_5px_0px_var(--color-error)] space-y-6">
          <h3 className="text-2xl font-extrabold text-error">Delete Account</h3>
          <p className="text-base text-error">
            Deleting your account is permanent. This will erase all your brainio
            account details and tests history across all devices.
          </p>
          <button
            onClick={() => setShowingDeleteModal(true)}
            className="outline-none border-error border-2 shadow-[2px_2px_0px_var(--color-error)] px-4 py-1 cursor-pointer text-error hover:bg-error hover:text-white hover:shadow-none transition-all duration-300"
          >
            Delete My Brainio Account
          </button>
        </div>
      </div>
    </main>
    </>
  );
}

export default ProfilePage;
