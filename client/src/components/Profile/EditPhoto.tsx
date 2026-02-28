import { CircleUserRound, Loader2 } from "lucide-react";
import { useState } from "react";
import { changePhotoApi } from "../../service/serverApi";
import { useUser } from "../../hooks/useUser";
import ErrorCompo from "../ErrorCompo";

const PROFILE_URLS = [
  "https://res.cloudinary.com/dzzlezrnw/image/upload/v1772273521/profile-6_g6zhal.png",
  "https://res.cloudinary.com/dzzlezrnw/image/upload/v1772273521/profile-11_m5y4fj.png",
  "https://res.cloudinary.com/dzzlezrnw/image/upload/v1772273520/profile-10_lllwsg.png",
  "https://res.cloudinary.com/dzzlezrnw/image/upload/v1772273519/profile-7_ayryrh.png",
  "https://res.cloudinary.com/dzzlezrnw/image/upload/v1772273515/profile-9_hbg7ag.png",
  "https://res.cloudinary.com/dzzlezrnw/image/upload/v1772273514/profile-4_b9zrpb.png",
  "https://res.cloudinary.com/dzzlezrnw/image/upload/v1772273512/profile-5_jc5luw.png",
  "https://res.cloudinary.com/dzzlezrnw/image/upload/v1772273507/profile-1_a2pvl2.png",
  "https://res.cloudinary.com/dzzlezrnw/image/upload/v1772273506/profile-8_bscpbm.png",
  "https://res.cloudinary.com/dzzlezrnw/image/upload/v1772273504/default-profile_vselxi.png",
  "https://res.cloudinary.com/dzzlezrnw/image/upload/v1772273496/profile-2_zmxhjs.png",
  "https://res.cloudinary.com/dzzlezrnw/image/upload/v1772273496/profile-3_jwbsya.png",
];

interface EditPhotoProps {
  userPhoto: string;
  hideEditPhoto: () => void;
}

function EditPhoto({ userPhoto, hideEditPhoto }: EditPhotoProps) {
  const [selectedAvatar, setSelectedAvatar] = useState<string>(userPhoto);
  const [changingPhoto, setChangingPhoto] = useState(false);
  const [changingError, setChangingError] = useState("");

  const { refresh } = useUser();

  const changePhotoFunc = async (url: string) => {
    setChangingError("");
    setChangingPhoto(true);
    const res = await changePhotoApi(url);
    if (res.error) {
      setChangingError(res.error);
      return setChangingPhoto(false);
    } else if (res.data) {
      refresh();
      setChangingPhoto(false);
      hideEditPhoto();
    }
  };

  return (
    <div
      onClick={hideEditPhoto}
      className="fixed w-screen h-screen z-20 bg-[#ffffff22] backdrop-blur-sm inset-0 flex justify-center items-center select-none"
    >
      {changingError !== "" && (
        <ErrorCompo
          errorMsg={changingError}
          hideError={() => setChangingError("")}
          retryFunc={() => changePhotoFunc(selectedAvatar)}
        />
      )}
      <div
        onClick={(e) => e.stopPropagation()}
        className="box box-shadow max-w-sm w-full flex justify-center items-center flex-col gap-6 p-6 bg-secondary"
      >
        <div className="grid grid-cols-4 w-fit gap-2">
          {PROFILE_URLS.map((url) => (
            <div
              onClick={() => setSelectedAvatar(url)}
              key={url}
              className={`aspect-square border-2 max-w-20 w-full cursor-pointer shadow-[4px_4px_0px_transparent] relative ${url === selectedAvatar ? "border-primary border-2  shadow-primary" : "border-text"}`}
            >
              {userPhoto === url && (
                <span className="absolute top-0 left-0 -translate-1/2 text-white bg-primary rounded-full ">
                  <CircleUserRound size={16} />
                </span>
              )}
              <img src={url} alt="profile-img" />
            </div>
          ))}
        </div>
        {/* buttons */}
        <div className="w-full gap-4 grid grid-cols-2 max-sm:grid-cols-1">
          <button
            onClick={hideEditPhoto}
            className="w-full box box-shadow p-2 outline-none cursor-pointer hover:scale-95 transition-transform duration-300 bg-white"
          >
            Cancel
          </button>
          <button
            onClick={() => changePhotoFunc(selectedAvatar)}
            disabled={userPhoto === selectedAvatar || changingPhoto}
            className={`w-full box box-shadow p-2 outline-none cursor-pointer hover:scale-95 transition-transform duration-300 flex justify-center items-center bg-primary ${userPhoto === selectedAvatar ? "opacity-70" : ""}`}
          >
            {changingPhoto ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              "Change"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditPhoto;
