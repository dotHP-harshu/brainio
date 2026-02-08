import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import BrainioLogo from "../components/BrainioLogo";
import ObjectiveQuestion from "../components/TestPage/ObjectiveQuestion";
import SubjectiveQuestion from "../components/TestPage/SubjectiveQuestion";



function TestPage() {
  return (
    <>
      <header className="bg-white/50">
        <div className="max-w-7xl mx-auto px-6 py-2 flex justify-between items-center">
          <div className="w-20">
            <BrainioLogo />
          </div>
          <div className="space-x-6 flex">
            <div className="bg-secondary px-4 py-1 ">
                <p className="font-bold">12:20</p>
            </div>
            <button className="box shadow-[2px_2px_var(--color-text)] px-4 py-1 outline-none cursor-pointer text-base font-bold transition-shadow duration-300 select-none hover:shadow-none">
              Exit
            </button>
          </div>
        </div>
      </header>
      <main className="mt-10 select-none py-10 px-4">
        <div className="box box-shadow px-4 py-2 w-fit mx-auto">
          <h2 className="text-xl font-bold tracking-tight font-sans">
            Question <span className="text-primary">3 </span>of 10
          </h2>
        </div>
        <div className="max-w-4xl w-full mx-auto mt-10">
          <div className="p-6 box box-shadow w-full space-y-6 max-xs:p-2">
            <ObjectiveQuestion/>
            {/* navigation  */}
            <div className="mt-6 flex items-center justify-between w-full">
              <button className="box shadow-[2px_2px_var(--color-text)] px-4 py-1 outline-none cursor-pointer text-base font-bold transition-shadow duration-300 select-none hover:shadow-none flex justify-center items-center gap-2">
               <span><ArrowLeft/></span>
                <span className="max-xs:hidden">Previous</span>
              </button>
              <button className="box shadow-[2px_2px_var(--color-text)] px-4 py-1 outline-none cursor-pointer text-base font-bold transition-shadow duration-300 select-none hover:shadow-none bg-primary/50 flex justify-center items-center gap-2">
               <span className="max-xs:hidden">Next</span>
               <span><ArrowRight/></span>
              </button>
            </div>
            {/* navigation  */}
          </div>
          {/* submit  */}
          <div className="w-full flex items-center justify-end mt-10">
            <button className="box shadow-[2px_2px_var(--color-text)] px-4 py-2 outline-none cursor-pointer text-base font-bold transition-shadow duration-300 select-none hover:shadow-none bg-success uppercase flex justify-center items-center gap-4">
              <span>
                <CheckCircle2 size={20}/>
              </span>
              <span>Submit test</span>
            </button>
          </div>
          {/* submit  */}
        </div>
      </main>
    </>
  );
}

export default TestPage;
