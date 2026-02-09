import { ClockFading } from "lucide-react";

interface TimeOverModalProps {
  doNext: () => void;
}

function TimeOverModal({ doNext }: TimeOverModalProps) {
  return (
    <div className="w-screen h-screen top-0 left-0 fixed z-30 bg-white/0 backdrop-blur-md flex justify-center items-center p-4">
      <div className="box box-shadow p-6 flex justify-center items-center flex-col gap-6 w-full max-w-xs bg-secondary/80">
        <div className=" w-fit h-fit bg-error rounded-full">
          <ClockFading size={50} className="text-text" />
        </div>

        <h2 className="font-sans font-bold text-3xl text-center">Time Over</h2>
        <p className="text-base text-text-muted text-center leading-none">
          The time is over now.
        </p>
        <button
          onClick={doNext}
          className="box box-shadow bg-primary text-text w-full p-4 font-bold font-sans select-none cursor-pointer capitalize"
        >
          Submit Test
        </button>
      </div>
    </div>
  );
}

export default TimeOverModal;
