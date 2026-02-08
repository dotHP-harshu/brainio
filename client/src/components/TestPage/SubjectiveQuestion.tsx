import { Bot } from "lucide-react";

function SubjectiveQuestion() {
  return (
    <>
      {/* Question  */}
      <h3 className="font-bold text-2xl max-xs:text-xl leading-none ">
        Describe the main differences between UX and UI design in a few
        sentences.
      </h3>
      {/* Question  */}
      {/* answer box */}
      <div className="w-full border border-text  ">
        <textarea
          placeholder="Type your answer here...."
          className="placeholder:text-text-muted w-full resize-none outline-none p-4 placeholder:font-semibold placeholder:font-sans max-xs:p-2"
          rows={8}
        ></textarea>
        <div className="flex justify-center items-center border border-text shadow-[2px_2px_var(--color-text)] w-fit ml-auto m-4 px-4 py-2 gap-4 cursor-pointer"> 
          <span>
            <Bot />
          </span>
          <span className="font-bold tracking-tight uppercase max-xs:hidden">ai assistant hint</span>
        </div>
      </div>
      {/* answer box */}
    </>
  );
}

export default SubjectiveQuestion;
