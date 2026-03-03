import { useUser } from "../hooks/useUser";
import BrainioLogo from "./BrainioLogo";
import { useNavigate } from "react-router-dom";

function Header() {
  const { user } = useUser();
  const navigate= useNavigate()
  return (
    <header className="w-full">
      <div className="w-full max-w-7xl mx-auto flex justify-between items-center p-4">
        <div onClick={()=>navigate("/", {replace:true})} className="w-30 max-sm:w-20 cursor-pointer">
          <BrainioLogo />
        </div>
        <div>
          {user ? (
            <span onClick={()=>navigate("/profile", {replace:true})} className="w-fit cursor-pointer aspect-square box box-shadow inline-block">
              <img src={user.photos} alt="user" className="w-10 h-10 aspect-square object-center object-cover" />
            </span>
          ) : (
            <button onClick={()=>navigate("/login", {replace:true})} className="box box-shadow px-6 py-1 font-semibold bg-secondary cursor-pointer select-none ">
              Login
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
