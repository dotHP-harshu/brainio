import { Cross } from "lucide-react";

interface ExitModalProps{
    doNext:()=>void;
    setShowExitModal:(state:boolean)=>void
}

function ExitModal({doNext, setShowExitModal}:ExitModalProps) {
  return (
    <div className="w-screen h-screen top-0 left-0 fixed z-30 bg-white/0 backdrop-blur-md flex justify-center items-center p-4">
      <div className="box box-shadow p-6 flex justify-center items-center flex-col gap-6 w-full max-w-xs bg-secondary/80">
        <div className="">
          <Cross size={50} className="fill-error rotate-45 text-text" />
        </div>

        <h2 className="font-sans font-bold text-3xl text-center">Exit Quiz?</h2>
        <p className="text-base text-center -mt-4 leading-none">
          Are you sure you want to exit?
        </p>
        <button onClick={()=>setShowExitModal(false)} className="box box-shadow bg-primary text-text w-full p-4 font-bold font-sans select-none cursor-pointer capitalize">
          stay & finish
        </button>
        <button onClick={doNext}  className="box text-text w-full p-4 font-bold font-sans select-none cursor-pointer capitalize">
          Exit Now
        </button>
      </div>
    </div>
  );
}

export default ExitModal;
