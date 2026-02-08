import { SlidersHorizontal } from "lucide-react";
import { usePromptContext } from "../../hooks/usePromptContext";
import type { TestDifficultyTypes, TestStyleType } from "../../types/types";

const DIFFICULTY_OPTIONS: TestDifficultyTypes[] = ["Easy", "Medium", "Hard"];
const QUESTION_TYPES: TestStyleType[] = ["Q&A", "MCQ"];
const QUESTION_COUNT = [5, 10, 15, 20];
function ConfigurationBox() {
  const { prompt, changeDifficulty, changeTestType, changeQuestionCount } =
    usePromptContext();
  return (
    <aside className="box box-shadow p-4 bg-secondary/10 space-y-6">
      <div className="border-b-2 border-text py-2 flex justify-between items-center">
        <h2 className="text-lg font-semibold">Configuration</h2>
        <span>
          <SlidersHorizontal />
        </span>
      </div>
      {/* ----------------- Filter Options ------------------  */}
      <div className="space-y-6">
        {/* filter  */}
        <div className="space-y-2">
          <h4 className="text-base font-semibold tracking-tight leading-none inline-block">
            Question Count
          </h4>
          <select
            id="question-count"
            className="box p-2 w-full flex justify-between items-center"
            onChange={(e) => changeQuestionCount(Number(e.target.value))}
            value={prompt.questionCount}
          >
            {QUESTION_COUNT.map((op) => (
              <option key={`${op} Questions`} value={op}>
                {op} Questions
              </option>
            ))}
          </select>
        </div>
        {/* filter  */}
        {/* filter  */}
        <div className="space-y-2">
          <h4 className="text-base font-semibold tracking-tight leading-none inline-block">
            Difficulty
          </h4>

          <div>
            {DIFFICULTY_OPTIONS.map((op) => (
              <label
                className="flex items-center gap-2 cursor-pointer select-none"
                key={op}
              >
                <span className="w-5 h-5 border border-text aspect-square flex justify-center items-center">
                  <input
                    onChange={(e) =>
                      changeDifficulty(e.target.value as TestDifficultyTypes)
                    }
                    checked={prompt.difficulty === op}
                    value={op}
                    type="radio"
                    name="difficulty"
                    className=" appearance-none w-3 h-3 checked:bg-primary"
                  />
                </span>
                <span>{op}</span>
              </label>
            ))}
          </div>
        </div>
        {/* filter  */}
        {/* filter  */}
        <div className="space-y-2">
          <h4 className="text-base font-semibold tracking-tight leading-none inline-block">
            Test Style
          </h4>
          <div>
            {QUESTION_TYPES.map((op) => (
              <label
                className="flex items-center gap-2 cursor-pointer select-none"
                key={op}
              >
                <span className="w-5 h-5 border border-text aspect-square flex justify-center items-center">
                  <input
                    onChange={(e) =>
                      changeTestType(e.target.value as TestStyleType)
                    }
                    value={op}
                    checked={prompt.testType === op}
                    type="radio"
                    name="test-type"
                    className=" appearance-none w-3 h-3 checked:bg-primary"
                  />
                </span>
                <span>{op}</span>
              </label>
            ))}
          </div>
        </div>
        {/* filter  */}
      </div>
      {/* ----------------- Filter Options ------------------  */}
    </aside>
  );
}

export default ConfigurationBox;
