import { Bot } from "lucide-react";
import type {
  AnswerActionInterface,
  SubjectiveQuestionInterface,
} from "../../types/types";
import { useState } from "react";
import HintModal from "../Modals/HintModal";

interface SubjectiveQuestionProps {
  question: SubjectiveQuestionInterface;
  answerDispatch: (action: AnswerActionInterface) => void;
  answer: string;
}

function SubjectiveQuestion({
  question,
  answerDispatch,
  answer,
}: SubjectiveQuestionProps) {
  const [isShowingHint, setIsShowingHint] = useState<boolean>(false);

  return (
    <>
      {isShowingHint && (
        <HintModal
          hint={question.hint}
          hideModal={() => setIsShowingHint(false)}
        />
      )}
      {/* Question  */}
      <h3 className="font-bold font-sans text-2xl max-xs:text-xl leading-none ">
        {question.question}
      </h3>
      {/* Question  */}
      {/* answer box */}
      <div className="w-full border border-text  ">
        <textarea
          value={answer}
          onChange={(e) =>
            answerDispatch({
              type: "SET_ANSWER",
              payload: { ans: e.target.value, id: question.id },
            })
          }
          placeholder="Type your answer here...."
          className="placeholder:text-text-muted w-full resize-none outline-none p-4 placeholder:font-semibold placeholder:font-sans max-xs:p-2"
          rows={8}
        ></textarea>
        <button onClick={()=>setIsShowingHint(true)} className="flex justify-center items-center outline-none border border-text shadow-[2px_2px_var(--color-text)] w-fit ml-auto m-4 px-4 py-2 gap-4 cursor-pointer">
          <span>
            <Bot />
          </span>
          <span className="font-bold tracking-tight uppercase max-xs:hidden">
            ai assistant hint
          </span>
        </button>
      </div>
      {/* answer box */}
    </>
  );
}

export default SubjectiveQuestion;
