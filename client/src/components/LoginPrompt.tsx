import { ArrowRightIcon, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface LoginPromptProps {
  hidePrompt: () => void;
}
function LoginPrompt({ hidePrompt }: LoginPromptProps) {
  const navigate = useNavigate();

  const redirectLogin = () => {
    sessionStorage.setItem("Brainio_login_prompt", "shown");
    navigate("/login", { replace: true });
  };

  return (
    <div
      onClick={() => {
        sessionStorage.setItem("Brainio_login_prompt", "shown");
        return hidePrompt();
      }}
      className="w-screen h-screen top-0 left-0 fixed z-30 bg-white/0 backdrop-blur-md flex justify-center items-center p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="box box-shadow p-4 max-w-sm bg-secondary/40"
      >
        {/* icon  */}
        <div className="my-4">
          <span className="block w-fit aspect-square bg-primary/50 p-2 border mx-auto">
            <UserPlus />
          </span>
        </div>
        <div className="space-y-4 py-6">
          <p className="italic uppercase text-lg text-center leading-none">
            You can take this test as a guest, but your progress and AI feedback
            won't be saved.
          </p>
          <p className="text-center font-semibold ">
            Sign in now to save your session data.
          </p>
        </div>

        <div>
          <button
            onClick={redirectLogin}
            className="border uppercase bg-white w-full p-2 outline-none cursor-pointer flex justify-center items-center gap-4 select-none hover:shadow-[5px_5px_var(--color-text)] hover:-translate-[5px] transition duration-300"
          >
            sign in
          </button>
          <div className="flex items-center justify-center gap-4 my-6">
            <div className="flex-1 h-px bg-text-muted"></div>
            <p className="text-sm font-bold whitespace-nowrap text-text-muted uppercase">
              or keep exploring
            </p>
            <div className="flex-1 h-px bg-text-muted"></div>
          </div>
          <button
            onClick={() => {
              sessionStorage.setItem("Brainio_login_prompt", "shown");
              return hidePrompt();
            }}
            className="flex justify-center items-center mx-auto w-fit cursor-pointer uppercase font-bold gap-2 outline-none"
          >
            <span>continue as guest</span>
            <span>
              <ArrowRightIcon />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPrompt;
