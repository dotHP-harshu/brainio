import type { ObjectiveQuestionInterface } from "../../types/types";


const OPTION_LABELS = ["A", "B", "C", "D"];

interface ObjectiveProps {
  question: ObjectiveQuestionInterface;
}

function ObjectiveQuestion({ question }: ObjectiveProps) {
  return (
    <>
      {/* Question  */}
      <h3 className="font-bold text-2xl max-xs:text-xl leading-none">
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
              type="radio"
              name={"opt"}
              value={`opt-${question.id}`}
              id={`opt-${question.id}-${index}`}
              className="appearance-none peer"
            />
            <p className="border border-text px-1 font-sans font-bold peer-checked:bg-primary group-hover:bg-text group-hover:text-white peer-checked:group-hover:text-text">
              {OPTION_LABELS[index]}
            </p>
            <p className="text-base font-bold tracking-tight break-all">{opt}</p>
          </label>
        ))}
      </div>
      {/* options  */}
    </>
  );
}

export default ObjectiveQuestion;
