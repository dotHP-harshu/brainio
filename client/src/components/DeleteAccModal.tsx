import { Loader2 } from "lucide-react";
import { useState } from "react";
import { deleteAccountApi } from "../service/serverApi";
import ErrorCompo from "./ErrorCompo";
import { useNavigate } from "react-router-dom";

interface DeleteAccModalProps {
  userName: string;
  hideModal: () => void;
}
function DeleteAccModal({ userName, hideModal }: DeleteAccModalProps) {
  const [userNameTyped, setUserNameTyped] = useState("");
  const [userNameMisMatch, setUserNameMisMatch] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deletionError, setDeletionError] = useState("");
  const navigate = useNavigate();

  const handleDeletion = async () => {
    setDeletionError("");
    setUserNameMisMatch(false);

    // username validation
    if (userName !== userNameTyped) {
      setUserNameMisMatch(true);
      return;
    }

    try {
      setDeleting(true);

      await deleteAccountApi();

      navigate("/login");
    } catch (err) {
      console.error(err);
      setDeletionError("Failed to delete account");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      {deletionError && (
        <ErrorCompo
          errorMsg={deletionError}
          retryFunc={() => handleDeletion()}
          hideError={() => setDeletionError("")}
        />
      )}
      <div
        onClick={hideModal}
        className="fixed w-screen h-screen z-20 bg-[#ffffff22] backdrop-blur-sm inset-0 flex justify-center items-center select-none"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="box box-shadow p-4 space-y-4 bg-secondary/50 max-w-sm"
        >
          <h3 className="text-2xl font-extrabold ">Account Deletion</h3>
          <p className="text-base ">
            Deleting your account is permanent. This will erase all your brainio
            account details and tests history across all devices.
          </p>
          <p className="text-sm mt-6">
            Type '<span className="font-bold">{userName}</span>' and hit{" "}
            <span className="font-semibold">delete account</span> button to
            delete.
          </p>
          <input
            value={userNameTyped}
            onChange={(e) => {
              setUserNameMisMatch(false);
              setUserNameTyped(e.target.value);
            }}
            type="text"
            placeholder="Enter your user name"
            className={`border-2 w-full px-4 py-0.5 outline-none focus:shadow-none transition-shadow duration-300 ${userNameMisMatch ? "border-error shadow-none text-error" : "border-text shadow-[2px_2px_0px_var(--color-text)]"}`}
          />
          <div className="w-full py-4 space-y-4">
            <button
              disabled={userNameTyped === ""}
              onClick={handleDeletion}
              className="flex justify-center items-centeroutline-none w-full bg-error shadow-[2px_2px_0px_var(--color-error)] px-4 py-1 cursor-pointer text-white hover:shadow-none transition-shadow duration-300"
            >
              {deleting ? (
                <span>
                  <Loader2 className="animate-spin" size={16} />
                </span>
              ) : (
                "Delete Account"
              )}
            </button>
            <button
              onClick={hideModal}
              className="outline-none w-full border-text border-2 shadow-[2px_2px_0px_var(--color-text)] px-4 py-1 cursor-pointer text-text hover:shadow-none transition-shadow duration-300"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default DeleteAccModal;
