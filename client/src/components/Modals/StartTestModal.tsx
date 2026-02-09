import { ArrowRight } from "lucide-react";
import BrainioLogo from "../BrainioLogo";
import { useNavigate } from "react-router-dom";

interface StartModalProps{
  doNext:()=>void
}


function StartTestModal({doNext}:StartModalProps) {
  const navigate = useNavigate()
  return (
    <div className="w-screen h-screen flex justify-center items-center p-6">
      <div className="box box-shadow p-6 flex flex-col justify-center items-center gap-6">
        <div className="w-10">
          <BrainioLogo />
        </div>
        <h2 className="text-4xl font-bold font-sans leading-none self-start">
          You're all set!
        </h2>

        <div className="border-4 border-dashed p-4 space-y-2">
          <h3 className="text-sm uppercase font-sans text-primary leading-none">
            topic
          </h3>
          <h2 className="font-semibold font-sans leading-none text-lg">Modern Architecture</h2>
          <hr className="w-full border my-2 inline-block" />
          <div className="grid grid-cols-3 gap-6 max-xs:grid-cols-1" >
            <div className="space-y-2 max-xs:space-y-0 max-xs:grid max-xs:grid-cols-2">
              <span className="block text-sm leading-none uppercase">questions</span>
              <span className="block leading-none font-bold text-lg capitalize">10</span>
            </div>
            <div className="space-y-2 max-xs:space-y-0 max-xs:grid max-xs:grid-cols-2">
              <span className="block text-sm leading-none uppercase">difficulty</span>
              <span className="block leading-none font-bold text-lg capitalize">hard</span>
            </div>
            <div className="space-y-2 max-xs:space-y-0 max-xs:grid max-xs:grid-cols-2">
              <span className="block text-sm leading-none uppercase">questions</span>
              <span className="block leading-none font-bold text-lg uppercase">mcq</span>
            </div>
          </div>
        </div>

        <button onClick={doNext} className="select-none w-full max-w-xs uppercase flex justify-center items-center gap-4 box box-shadow text-white bg-primary transition-color hover:bg-primary/80 group p-4 font-extrabold cursor-pointer">
          <span>begin test now</span>
          <span className="group-hover:translate-x-1.5 transition-transform duration-300">
            <ArrowRight />
          </span>
        </button>
        <button onClick={()=>navigate("/generator")} className="select-none uppercase underline text-sm font-bold transition-colors hover:text-primary cursor-pointer">
          Cancel & Return to Dashboard
        </button>
      </div>
    </div>
  );
}

export default StartTestModal;
