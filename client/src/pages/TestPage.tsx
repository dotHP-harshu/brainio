import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import BrainioLogo from "../components/BrainioLogo";
import ObjectiveQuestion from "../components/TestPage/ObjectiveQuestion";
import SubjectiveQuestion from "../components/TestPage/SubjectiveQuestion";
import { useEffect, useReducer, useState } from "react";
import type { AnswerInterface } from "../types/types";
import StartTestModal from "../components/Modals/StartTestModal";
import SubmitModal from "../components/Modals/SubmitModal";
import ExitModal from "../components/Modals/ExitModal";
import TimeOverModal from "../components/Modals/TimeOverModal";
import { answerReducer } from "../utils/answerReducer";
import { useTestContext } from "../context/testContext";
import TestNotFound from "../components/TestPage/TestNotFound";
import { useNavigate } from "react-router-dom";

function TestPage() {
  const { test: TEST_DATA, setTest } = useTestContext();

  if (!TEST_DATA) {
    return (
      <TestNotFound />
    );
  }

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [isStartedTest, setIsStartedTest] = useState<boolean>(false);
  const [showSubmitModal, setShowSubmitModal] = useState<boolean>(false);
  const [showExitModal, setShowExitModal] = useState<boolean>(false);
  const [timeOver, setTimeOver] = useState<boolean>(false);

  const [time, setTime] = useState<number>(TEST_DATA.questions.length * 60);

  const [answers, answerDispatch] = useReducer(
    answerReducer,
    TEST_DATA.questions.map(
      (q): AnswerInterface => ({ question: q, userAnswer: "" })
    )
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (!isStartedTest) return;

    if (time <= 0) {
      return setTimeOver(true);
    }

    const counter = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);

    return () => {
      clearInterval(counter);
    };
  }, [isStartedTest, time]);

  useEffect(() => {
    console.log("reRender");
  }, []);

  const startTest = () => {
    setIsStartedTest(true);
  };

  const handleTestSubmit = () => {
    console.log("submitted");
    console.log(answers);
  };

  const handleTestExit = () => {
    navigate("/generator");
    setTest(null)
    console.log("Exitted");
  };

  if (!isStartedTest) {
    return (
      <StartTestModal
        topicName={TEST_DATA.testTitle}
        questions={TEST_DATA.questions.length}
        difficulty={TEST_DATA.difficulty}
        time={TEST_DATA.questions.length}
        doNext={startTest}
      />
    );
  }
  if (timeOver) {
    return <TimeOverModal doNext={handleTestSubmit} />;
  }

  return (
    <>
      {showSubmitModal && (
        <SubmitModal
          doNext={handleTestSubmit}
          setShowSubmitModal={setShowSubmitModal}
        />
      )}
      {showExitModal && (
        <ExitModal
          doNext={handleTestExit}
          setShowExitModal={setShowExitModal}
        />
      )}
      <header className="bg-white/50">
        <div className="max-w-7xl mx-auto px-6 py-2 flex justify-between items-center">
          <div className="w-20">
            <BrainioLogo />
          </div>
          <div className="space-x-6 flex">
            <div className="bg-secondary px-4 py-1 ">
              <p className="font-bold flex justify-center items-center gap-0.5">
                <span>
                  {Math.floor(time / 60)
                    .toString()
                    .padStart(2, "0")}
                </span>{" "}
                {/* minutes */}
                <span>:</span>
                <span>{(time % 60).toString().padStart(2, "0")}</span>{" "}
                {/* seconds */}
              </p>
            </div>
            <button
              onClick={() => setShowExitModal(true)}
              className="box shadow-[2px_2px_var(--color-text)] px-4 py-1 outline-none cursor-pointer text-base font-bold transition-shadow duration-300 select-none hover:shadow-none"
            >
              Exit
            </button>
          </div>
        </div>
      </header>
      <main className="mt-10 select-none py-10 px-4">
        <div className="box box-shadow px-4 py-2 w-fit mx-auto">
          <h2 className="text-xl font-bold tracking-tight font-sans">
            Question{" "}
            <span className="text-primary">{currentQuestionIndex + 1} </span>of
            10
          </h2>
        </div>
        <div className="max-w-4xl w-full mx-auto mt-10">
          <div className="p-6 box box-shadow w-full space-y-6 max-xs:p-2">
            {answers[currentQuestionIndex].question.type === "subjective" && (
              <SubjectiveQuestion
                question={answers[currentQuestionIndex].question}
                answer={answers[currentQuestionIndex].userAnswer}
                answerDispatch={answerDispatch}
              />
            )}
            {answers[currentQuestionIndex].question.type === "objective" && (
              <ObjectiveQuestion
                question={answers[currentQuestionIndex].question}
                answer={answers[currentQuestionIndex].userAnswer}
                answerDispatch={answerDispatch}
              />
            )}
            {/* navigation  */}
            <div className="mt-6 flex items-center justify-between w-full">
              <button
                onClick={() => setCurrentQuestionIndex((prev) => prev - 1)}
                disabled={currentQuestionIndex + 1 <= 1}
                className={`${currentQuestionIndex + 1 <= 1 ? "opacity-25" : ""
                  } box shadow-[2px_2px_var(--color-text)] px-4 py-1 outline-none cursor-pointer text-base font-bold transition-shadow duration-300 select-none hover:shadow-none flex justify-center items-center gap-2`}
              >
                <span>
                  <ArrowLeft />
                </span>
                <span className="max-xs:hidden">Previous</span>
              </button>
              <button
                onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
                disabled={
                  currentQuestionIndex + 1 >= TEST_DATA.questions.length
                }
                className={` ${currentQuestionIndex + 1 >= TEST_DATA.questions.length
                  ? "opacity-25"
                  : ""
                  } box shadow-[2px_2px_var(--color-text)] px-4 py-1 outline-none cursor-pointer text-base font-bold transition-shadow duration-300 select-none hover:shadow-none bg-primary/50 flex justify-center items-center gap-2`}
              >
                <span className="max-xs:hidden">Next</span>
                <span>
                  <ArrowRight />
                </span>
              </button>
            </div>
            {/* navigation  */}
          </div>
          {/* submit  */}
          <div className="w-full flex items-center justify-end mt-10">
            <button
              onClick={() => setShowSubmitModal(true)}
              className="box shadow-[2px_2px_var(--color-text)] px-4 py-2 outline-none cursor-pointer text-base font-bold transition-shadow duration-300 select-none hover:shadow-none bg-success uppercase flex justify-center items-center gap-4"
            >
              <span>
                <CheckCircle2 size={20} />
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
