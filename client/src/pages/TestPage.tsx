import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import BrainioLogo from "../components/BrainioLogo";
import ObjectiveQuestion from "../components/TestPage/ObjectiveQuestion";
import SubjectiveQuestion from "../components/TestPage/SubjectiveQuestion";
import { useEffect, useState } from "react";
import type {
  ObjectiveQuestionInterface,
  SubjectiveQuestionInterface,
} from "../types/types";
import StartTestModal from "../components/Modals/StartTestModal";
import SubmitModal from "../components/Modals/SubmitModal";
import ExitModal from "../components/Modals/ExitModal";
import TimeOverModal from "../components/Modals/TimeOverModal";

interface TestDataInterface {
  testTitle: string;
  questions: ObjectiveQuestionInterface[] | SubjectiveQuestionInterface[];
}

const TEST_DATA: TestDataInterface = {
  testTitle: "Python Fundamentals - Easy",
  questions: [
    {
      id: 1,
      type: "objective",
      question: "What is the correct way to print 'Hello, World!' in Python?",
      options: [
        "print('Hello, World!')",
        "System.out.println('Hello, World!')",
        "console.log('Hello, World!')",
        "echo 'Hello, World!'",
      ],
      correctAnswer: "print('Hello, World!')",
      expectedPoints: 1,
    },
    {
      id: 2,
      type: "objective",
      question: "Which data type is used to store whole numbers in Python?",
      options: ["float", "string", "int", "boolean"],
      correctAnswer: "int",
      expectedPoints: 1,
    },
    {
      id: 3,
      type: "objective",
      question: "What is the purpose of the 'input()' function in Python?",
      options: [
        "To display output to the console",
        "To read input from the user",
        "To define a function",
        "To create a variable",
      ],
      correctAnswer: "To read input from the user",
      expectedPoints: 1,
    },
    {
      id: 4,
      type: "objective",
      question: "Which of the following is a valid variable name in Python?",
      options: ["1st_variable", "my-variable", "my_variable", "variable$"],
      correctAnswer: "my_variable",
      expectedPoints: 1,
    },
    {
      id: 5,
      type: "objective",
      question: "What does the '%' operator do in Python?",
      options: [
        "Multiplication",
        "Division",
        "Modulo (remainder)",
        "Exponentiation",
      ],
      correctAnswer: "Modulo (remainder)",
      expectedPoints: 1,
    },
    {
      id: 6,
      type: "objective",
      question: "What is the output of the following code: `print(2 + 2 * 2)`?",
      options: ["4", "6", "8", "10"],
      correctAnswer: "6",
      expectedPoints: 1,
    },
    {
      id: 7,
      type: "objective",
      question: "Which keyword is used to define a function in Python?",
      options: ["function", "def", "define", "func"],
      correctAnswer: "def",
      expectedPoints: 1,
    },
    {
      id: 8,
      type: "objective",
      question: "What is the purpose of comments in Python code?",
      options: [
        "To make the code run faster",
        "To explain the code to others",
        "To define variables",
        "To create loops",
      ],
      correctAnswer: "To explain the code to others",
      expectedPoints: 1,
    },
    {
      id: 9,
      type: "objective",
      question: "What is the data type of the value `True` in Python?",
      options: ["int", "string", "boolean", "float"],
      correctAnswer: "boolean",
      expectedPoints: 1,
    },
    {
      id: 10,
      type: "objective",
      question:
        "Which of the following is used to check if two values are equal in Python?",
      options: ["=", "==", "!=", "<>="],
      correctAnswer: "==",
      expectedPoints: 1,
    },
  ],
};

function TestPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [isStartedTest, setIsStartedTest] = useState<boolean>(false);
  const [showSubmitModal, setShowSubmitModal] = useState<boolean>(false);
  const [showExitModal, setShowExitModal] = useState<boolean>(false);
  const [timeOver, setTimeOver] = useState<boolean>(false);

  const [time, setTime] = useState<number>(TEST_DATA.questions.length * 60);

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
  };

  const handleTestExit = () => {
    console.log("Exitted");
  };

  if (!isStartedTest) {
    return <StartTestModal doNext={startTest} />;
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
            {TEST_DATA.questions[currentQuestionIndex].type ===
              "subjective" && (
              <SubjectiveQuestion
                question={TEST_DATA.questions[currentQuestionIndex]}
              />
            )}
            {TEST_DATA.questions[currentQuestionIndex].type === "objective" && (
              <ObjectiveQuestion
                question={TEST_DATA.questions[currentQuestionIndex]}
              />
            )}
            {/* navigation  */}
            <div className="mt-6 flex items-center justify-between w-full">
              <button
                onClick={() => setCurrentQuestionIndex((prev) => prev - 1)}
                disabled={currentQuestionIndex + 1 <= 1}
                className={`${currentQuestionIndex + 1 <= 1 ? "opacity-25" : ""} box shadow-[2px_2px_var(--color-text)] px-4 py-1 outline-none cursor-pointer text-base font-bold transition-shadow duration-300 select-none hover:shadow-none flex justify-center items-center gap-2`}
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
                className={` ${currentQuestionIndex + 1 >= TEST_DATA.questions.length ? "opacity-25" : ""} box shadow-[2px_2px_var(--color-text)] px-4 py-1 outline-none cursor-pointer text-base font-bold transition-shadow duration-300 select-none hover:shadow-none bg-primary/50 flex justify-center items-center gap-2`}
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
