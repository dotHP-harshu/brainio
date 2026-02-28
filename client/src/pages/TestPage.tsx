import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import BrainioLogo from "../components/BrainioLogo";
import ObjectiveQuestion from "../components/TestPage/ObjectiveQuestion";
import SubjectiveQuestion from "../components/TestPage/SubjectiveQuestion";
import { useEffect, useReducer, useState } from "react";
import type { AnswerInterface, SubmitTestInterface, TestResultInterface } from "../types/types";
import StartTestModal from "../components/Modals/StartTestModal";
import SubmitModal from "../components/Modals/SubmitModal";
import ExitModal from "../components/Modals/ExitModal";
import TimeOverModal from "../components/Modals/TimeOverModal";
import { answerReducer } from "../utils/answerReducer";
import { useTestContext } from "../context/testContext";
import TestNotFound from "../components/TestPage/TestNotFound";
import { useNavigate } from "react-router-dom";
import { evaluateTestApi, setTestApi } from "../service/serverApi";
import BanterLoader from "../components/BanterLoader";
import ErrorCompo from "../components/ErrorCompo";
import { useResultContext } from "../context/resultContext";
import { useUser } from "../hooks/useUser";

function TestPage() {

  // contexts
  const { test: TEST_DATA, setTest } = useTestContext();
  const { setTestResult } = useResultContext()

  if (!TEST_DATA) {
    return (
      <TestNotFound />
    );
  }

  // page states
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [isStartedTest, setIsStartedTest] = useState<boolean>(false);
  const [showSubmitModal, setShowSubmitModal] = useState<boolean>(false);
  const [showExitModal, setShowExitModal] = useState<boolean>(false);
  const [timeOver, setTimeOver] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false)
  const [testPageError, setTestPageError] = useState<string>("")
  const [time, setTime] = useState<number>(TEST_DATA.questions.length * 60);

  const [answers, answerDispatch] = useReducer(
    answerReducer,
    TEST_DATA.questions.map(
      (q): AnswerInterface => ({ question: q, userAnswer: "" })
    )
  );

  const { user } = useUser()

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

  const handleTestSubmit = async () => {
    console.log("submitted");

    const testToSubmit: SubmitTestInterface = {
      title: TEST_DATA.testTitle,
      timeSpent: (TEST_DATA.questions.length * 60) - time,
      numberOfQuestions: TEST_DATA.questions.length,
      answers: answers,
      difficulty: TEST_DATA.difficulty
    }
    console.log(testToSubmit)
    setSubmitting(true)
    const { data, error } = await evaluateTestApi(testToSubmit);
    if (error) {
      setSubmitting(false)
      return setTestPageError(error)
    }
    if (data) {
      const result = data as TestResultInterface;
      setTestResult(result);
      // save result if user is logged in
      if (user) {
        const { error } = await setTestApi(user._id, result.title, result.result, result.resultLabel, result.correctAnswers, result.totalQuestions, "mcq", result.timeSpent, result.accuracyRate, result.aiInsight);
        if (error) {
          return console.log(error)
        }
      }
      navigate("/result")
    }

  };

  const handleTestExit = () => {
    navigate("/generator");
    setTest(null)
    console.log("Exitted");
  };


  // conditional rendering
  if (submitting) {
    return (
      <div className="w-screen h-screen fixed top-0 left-0 z-50 bg-secondary/30 backdrop-blur-3xl flex justify-center items-center">
        <BanterLoader para="Analysing your test" />
      </div>
    )
  }

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
      {
        testPageError !== "" && <ErrorCompo errorMsg={testPageError} hideError={() => setTestPageError("")} retryFunc={handleTestSubmit} />
      }
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
            <span className="text-primary">{currentQuestionIndex + 1} </span>of{" "}
            {TEST_DATA.questions.length}
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
