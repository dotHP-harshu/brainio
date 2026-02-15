import { useState } from "react";
import type {
  AnswerActionInterface,
  ObjectiveQuestionInterface,
} from "../../types/types";
import HintModal from "../Modals/HintModal";
import { Bot } from "lucide-react";

const OPTION_LABELS = ["A", "B", "C", "D"];

interface ObjectiveProps {
  question: ObjectiveQuestionInterface;
  answerDispatch: (action: AnswerActionInterface) => void;
  answer: string;
}

function ObjectiveQuestion({
  question,
  answerDispatch,
  answer,
}: ObjectiveProps) {
  const [isShowingHint, setIsShowingHint] = useState<boolean>(false)
  return (
    <>
      {
        isShowingHint && <HintModal hint={question.hint} hideModal={() => setIsShowingHint(false)} />
      }
      {/* Question  */}
      <h3 className="font-bold text-2xl font-sans max-xs:text-xl leading-none">
        {question.question}
      </h3>
      {/* Question  */}
      {/* options  */}
      <div className="grid grid-cols-2 gap-2 max-xs:grid-cols-1">
        {question.options.map((opt, index) => (
          <label
            htmlFor={`opt-${question.id}-${index}`}
            key={`opt-${question.id}-${index}`}
            className="box flex p-2 gap-2 items-center justify-start cursor-pointer has-checked:bg-secondary group"
          >
            <input
              checked={answer === opt}
              onChange={() =>
                answerDispatch({
                  type: "SET_ANSWER",
                  payload: { id: question.id, ans: opt },
                })
              }
              type="radio"
              name={"opt"}
              value={`opt-${question.id}`}
              id={`opt-${question.id}-${index}`}
              className="appearance-none peer"
            />
            <p className="border border-text px-1 font-sans font-bold peer-checked:bg-primary group-hover:bg-text group-hover:text-white peer-checked:group-hover:text-text">
              {OPTION_LABELS[index]}
            </p>
            <p className="text-base font-bold tracking-tight break-all">
              {opt}
            </p>
          </label>
        ))}
      </div>
      {/* options  */}
      <button onClick={() => setIsShowingHint(true)} className="flex justify-center items-center outline-none border border-text shadow-[2px_2px_var(--color-text)] w-fit ml-auto m-4 px-4 py-2 gap-4 cursor-pointer">
        <span>
          <Bot />
        </span>
        <span className="font-bold tracking-tight uppercase max-xs:hidden">
          ai assistant hint
        </span>
      </button>

    </>
  );
}

export default ObjectiveQuestion;
