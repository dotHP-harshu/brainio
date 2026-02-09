import { Info } from "lucide-react";

interface SubmitModalProps {
  setShowSubmitModal: (state: boolean) => void;
  doNext:()=>void
}

function SubmitModal({ setShowSubmitModal, doNext }: SubmitModalProps) {
  return (
    <div className="w-screen h-screen top-0 left-0 fixed z-30 bg-white/0 backdrop-blur-md flex justify-center items-center p-4">
      <div className="box box-shadow p-6 flex justify-center items-center flex-col gap-6 w-full max-w-xs bg-secondary/80">
        <div className="">
          <Info size={50} className="fill-success text-text" />
        </div>

        <h2 className="font-sans font-bold text-3xl text-center">
          Ready to Submit?
        </h2>
        <p className="text-base text-text-muted text-center leading-none">
          Once you submit, you won't be able to change your answers. 
        </p>
        <p className="text-base text-text-muted text-center -mt-4 leading-none">
          Please, review your answers once.
        </p>
        <button onClick={doNext} className="box box-shadow bg-primary text-text w-full p-4 font-bold font-sans select-none cursor-pointer capitalize">
          yes, submit test
        </button>
        <button
          onClick={()=>setShowSubmitModal(false)}
          className="box text-text w-full p-4 font-bold font-sans select-none cursor-pointer capitalize"
        >
          no, keep working
        </button>
      </div>
    </div>
  );
}

export default SubmitModal;
