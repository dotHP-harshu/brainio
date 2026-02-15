import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import BrainioLogo from "../components/BrainioLogo";
import ObjectiveQuestion from "../components/TestPage/ObjectiveQuestion";
import SubjectiveQuestion from "../components/TestPage/SubjectiveQuestion";
import { useEffect, useReducer, useState } from "react";
import type {
  AnswerInterface,
  TestDataInterface,
} from "../types/types";
import StartTestModal from "../components/Modals/StartTestModal";
import SubmitModal from "../components/Modals/SubmitModal";
import ExitModal from "../components/Modals/ExitModal";
import TimeOverModal from "../components/Modals/TimeOverModal";
import { answerReducer } from "../utils/answerReducer";

const TEST_DATA: TestDataInterface = {
  difficulty: "Easy",
  testTitle: "Python Proficiency Test - Medium Level",
  questions: [
    {
      id: 1,
      type: "objective",
      question: "Which of the following data types is immutable in Python?",
      options: ["list", "dictionary", "set", "tuple"],
      hint: "Think about objects that cannot be changed after creation.",
      correctAnswer: "tuple",
      expectedPoints: 1,
    },
    {
      id: 2,
      type: "objective",
      question: "What is the output of: print(type([]) is list)",
      options: ["True", "False", "None", "Error"],
      hint: "type([]) returns the class of the empty list.",
      correctAnswer: "True",
      expectedPoints: 1,
    },
    {
      id: 3,
      type: "objective",
      question:
        "Which of the following statements correctly opens a file for appending?",
      options: [
        "open('data.txt', 'r')",
        "open('data.txt', 'w')",
        "open('data.txt', 'a')",
        "open('data.txt', 'x')",
      ],
      hint: "Appending adds data to the end without truncating the file.",
      correctAnswer: "open('data.txt', 'a')",
      expectedPoints: 1,
    },
    {
      id: 4,
      type: "objective",
      question:
        "What will be the value of x after executing the following code?\n\nx = [1, 2, 3]\nx += [4, 5]\n",
      options: ["[1, 2, 3, 4, 5]", "[1, 2, 3, [4, 5]]", "[4, 5]", "Error"],
      hint: "The += operator extends the list in place.",
      correctAnswer: "[1, 2, 3, 4, 5]",
      expectedPoints: 1,
    },
    {
      id: 5,
      type: "objective",
      question:
        "Which built-in function can be used to convert an integer to its binary representation as a string?",
      options: ["bin()", "hex()", "oct()", "format()"],
      hint: "The function starts with 'b' and returns a string prefixed with '0b'.",
      correctAnswer: "bin()",
      expectedPoints: 2,
    },
    {
      id: 6,
      type: "objective",
      question:
        "Consider the following code snippet:\n\ndef foo(a, b=[]):\n    b.append(a)\n    return b\n\nprint(foo(1))\nprint(foo(2))\nWhat is the output?",
      options: ["[1]\\n[2]", "[1]\\n[1, 2]", "[1, 2]\\n[1, 2]", "Error"],
      hint: "Default mutable arguments are evaluated once at function definition time.",
      correctAnswer: "[1]\\n[1, 2]",
      expectedPoints: 2,
    },
    {
      id: 7,
      type: "objective",
      question:
        "Which of the following statements about Python's GIL (Global Interpreter Lock) is true?",
      options: [
        "It allows multiple native threads to execute Python bytecode simultaneously.",
        "It prevents any form of concurrency in Python programs.",
        "It ensures that only one thread executes Python bytecode at a time.",
        "It is only present in Python implementations written in Java.",
      ],
      hint: "The GIL is a mutex that protects access to Python objects.",
      correctAnswer:
        "It ensures that only one thread executes Python bytecode at a time.",
      expectedPoints: 2,
    },
    {
      id: 8,
      type: "objective",
      question:
        "What is the result of the following list comprehension?\n\n[ (x, y) for x in [1, 2] for y in [3, 4] if x != y ]",
      options: [
        "[(1, 3), (1, 4), (2, 3), (2, 4)]",
        "[(1, 3), (2, 4)]",
        "[(1, 3), (1, 4), (2, 3), (2, 4), (1, 1), (2, 2)]",
        "[]",
      ],
      hint: "The condition filters out pairs where the two elements are equal.",
      correctAnswer: "[(1, 3), (1, 4), (2, 3), (2, 4)]",
      expectedPoints: 2,
    },
    {
      id: 9,
      type: "objective",
      question:
        "Which of the following statements will correctly create a generator that yields squares of numbers from 0 to 4?",
      options: [
        "[x**2 for x in range(5)]",
        "(x**2 for x in range(5))",
        "{x**2 for x in range(5)}",
        "list(x**2 for x in range(5))",
      ],
      hint: "Generators use parentheses, not brackets.",
      correctAnswer: "(x**2 for x in range(5))",
      expectedPoints: 2,
    },
    {
      id: 10,
      type: "objective",
      question: "In Python, what does the expression 'a is b' evaluate?",
      options: [
        "Whether a equals b in value",
        "Whether a and b refer to the same object in memory",
        "Whether a is greater than b",
        "Whether a is a subclass of b",
      ],
      hint: "The 'is' operator checks identity, not equality.",
      correctAnswer: "Whether a and b refer to the same object in memory",
      expectedPoints: 2,
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

  const [answers, answerDispatch] = useReducer(
    answerReducer,
    TEST_DATA.questions.map(
      (q): AnswerInterface => ({ question: q, userAnswer: "" })
    )
  );

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
                className={`${
                  currentQuestionIndex + 1 <= 1 ? "opacity-25" : ""
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
                className={` ${
                  currentQuestionIndex + 1 >= TEST_DATA.questions.length
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
