import {
  Trophy,
  CheckCircle2,
  Timer,
  Zap,
  Sparkles,
  LayoutDashboard,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  FileText,
} from "lucide-react";
import { useState } from "react";
import { useResultContext } from "../context/resultContext";
import ResultNotFound from "../components/Result/ResultNotFound";
import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import HelmetSeo from "../components/HelmetSeo";
import ExplanationModal from "../components/Modals/ExplanationModal";
import CheatSheetModal from "../components/Modals/CheatSheetModal";
import type { AnswerInterface } from "../types/types";

// const RESULT_DATA = {
//     title: "Advanced Algebra II",
//     result: "Passed", // Changed from result to result like "Passed" | "Failed"
//     resultLabel: "Excellent", // Changed from resultLabel to resultLabel like "Excellent" | "Good" | "Average" | "Poor"
//     correctAnswers: 18,
//     totalQuestions: 20,
//     timeSpent: 2000, // in seconds
//     accuracyRate: 90,
//     aiInsight: "You're a natural at Algebra! Your speed on basic equations is top-tier. Focus a bit more on Quadratic Equations next time to hit that 100%."
// }

const testResultsMetadata = {
  title: "Test Results - Brainio",
  description:
    "View your test results, including scores, accuracy rate, and personalized feedback to help you improve.",
  keywords:
    "test results, accuracy rate, test performance, Brainio feedback, learning insights",
};

const ResultPage = () => {
  const { testResult: RESULT_DATA } = useResultContext();
  const navigate = useNavigate();

  const { user } = useUser();

  const [showReview, setShowReview] = useState(false);
  const [explanationQuestion, setExplanationQuestion] = useState<{
    question: string;
    correctAnswer: string;
    userAnswer: string;
  } | null>(null);
  const [showCheatSheet, setShowCheatSheet] = useState(false);

  const savedAnswers: AnswerInterface[] = JSON.parse(
    sessionStorage.getItem("brainio_test_answers") || "[]",
  );

  if (!RESULT_DATA) {
    return <ResultNotFound />;
  }

  return (
    <>
      <HelmetSeo
        title={testResultsMetadata.title}
        description={testResultsMetadata.description}
        keywords={testResultsMetadata.keywords}
      />
      <div className="min-h-screen bg-secondary/20 text-black pb-10">
        <main className="max-w-4xl mx-auto px-4 pt-12 flex flex-col items-center">
          {/* Test Completed Header */}
          <div className="flex flex-col items-center mb-8">
            <div className="box box-shadow bg-secondary p-3 mb-4">
              <Trophy size={40} strokeWidth={2.5} />
            </div>
            <h1 className="text-5xl md:text-6xl max-sm:text-4xl text-center font-black italic tracking-tighter flex items-center gap-3 uppercase">
              Test Completed! 🏆
            </h1>
            <div className="mt-4 box bg-[#FAD9D1] px-6 py-2 font-bold text-sm tracking-tight border-black uppercase">
              Test: {RESULT_DATA.title}
            </div>
          </div>

          {/* Final Score Card */}
          <div className="w-full box box-shadow bg-white flex flex-col items-center py-12 mb-8 relative">
            <div className="absolute top-0 left-0 w-full h-2 bg-primary"></div>
            <p className="uppercase font-bold text-gray-500 tracking-widest text-xs mb-2">
              Final Score
            </p>
            <h2 className="text-[120px] font-black leading-none text-primary tracking-tighter mb-6">
              {RESULT_DATA.accuracyRate}%
            </h2>
            <div className="bg-gray-400 text-white font-bold px-6 py-2 box border-[#000000] uppercase tracking-wider text-sm">
              {RESULT_DATA.resultLabel} • {RESULT_DATA.result}
            </div>
          </div>

          {/* Stats Row */}
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="box box-shadow bg-white p-6 flex flex-col gap-4">
              <div className="flex items-center gap-2 text-primary">
                <CheckCircle2 size={18} className="text-primary" />
                <span className="uppercase font-bold text-[10px] tracking-widest text-black">
                  Correct Answers
                </span>
              </div>
              <p className="text-4xl font-bold tracking-tighter">
                {RESULT_DATA.correctAnswers}/{RESULT_DATA.totalQuestions}
              </p>
            </div>

            <div className="box box-shadow bg-white p-6 flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <Timer size={18} className="text-primary" />
                <span className="uppercase font-bold text-[10px] tracking-widest">
                  Time Spent
                </span>
              </div>
              <p className="text-4xl font-bold tracking-tighter">
                {Math.floor(RESULT_DATA.timeSpent / 60)}m{" "}
                {RESULT_DATA.timeSpent % 60}s
              </p>
            </div>

            <div className="box box-shadow bg-white p-6 flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <Zap size={18} className="text-primary" />
                <span className="uppercase font-bold text-[10px] tracking-widest">
                  Accuracy Rate
                </span>
              </div>
              <p className="text-4xl font-bold tracking-tighter">
                {RESULT_DATA.accuracyRate}{" "}
              </p>
            </div>
          </div>

          {/* AI Insight Section */}
          <div className="w-full box box-shadow bg-white flex flex-col md:flex-row mb-12">
            <div className="md:w-1/3 bg-[#FDF2F0] p-10 flex flex-col items-center justify-center border-b-2 md:border-b-0 md:border-r-2 border-black">
              <div className="box bg-white p-4 mb-4">
                <Sparkles className="text-primary" size={32} />
              </div>
              <p className="uppercase font-bold text-[10px] tracking-widest text-center leading-tight">
                AI Performance Insight
              </p>
            </div>
            <div className="md:w-2/3 p-8 flex flex-col justify-center">
              <h3 className="italic font-black text-2xl uppercase mb-4 tracking-tighter">
                Brainio's Take
              </h3>
              <p className="text-lg leading-snug mb-6">
                {/* You're a natural at <span className="bg-secondary px-1 font-bold border-b-2 border-black">Algebra</span>! Your speed on basic equations is top-tier. Focus a bit more on <span className="bg-[#FDF2F0] border-b-2 border-[#FF6B35] font-bold">Quadratic Equations</span> next time to hit that 100%. */}
                {RESULT_DATA.aiInsight}
              </p>
            </div>
          </div>

          {/* Review Answers Section */}
          {savedAnswers.length > 0 && (
            <div className="w-full mb-12">
              <button
                onClick={() => setShowReview(!showReview)}
                className="w-full box box-shadow bg-white p-4 flex items-center justify-between font-bold text-lg uppercase tracking-wider cursor-pointer"
              >
                <span className="flex items-center gap-3">
                  <CheckCircle2 size={20} /> Review Your Answers
                </span>
                {showReview ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              {showReview && (
                <div className="mt-4 space-y-4">
                  {savedAnswers.map((item, idx) => (
                    <div
                      key={idx}
                      className="box box-shadow bg-white p-6"
                    >
                      <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">
                        Q{idx + 1} — {item.question.type === "subjective" ? "Subjective" : "Objective"}
                      </p>
                      <p className="font-bold text-lg mb-3">{item.question.question}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-bold uppercase text-[10px] tracking-widest text-gray-500">Your Answer:</span>
                          <p className="mt-1">{item.userAnswer || "(No answer)"}</p>
                        </div>
                        <div>
                          <span className="font-bold uppercase text-[10px] tracking-widest text-gray-500">Correct Answer:</span>
                          <p className="mt-1">{item.question.correctAnswer}</p>
                        </div>
                      </div>
                      {item.question.type === "subjective" &&
                        item.userAnswer.toLowerCase().trim() !== item.question.correctAnswer.toLowerCase().trim() && (
                          <button
                            onClick={() =>
                              setExplanationQuestion({
                                question: item.question.question,
                                correctAnswer: item.question.correctAnswer,
                                userAnswer: item.userAnswer,
                              })
                            }
                            className="mt-4 box box-shadow bg-secondary px-4 py-2 flex items-center gap-2 font-bold text-sm uppercase cursor-pointer"
                          >
                            <HelpCircle size={16} /> Why am I wrong?
                          </button>
                        )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {explanationQuestion && (
            <ExplanationModal
              question={explanationQuestion.question}
              correctAnswer={explanationQuestion.correctAnswer}
              userAnswer={explanationQuestion.userAnswer}
              hideModal={() => setExplanationQuestion(null)}
            />
          )}

          {showCheatSheet && (
            <CheatSheetModal
              topic={RESULT_DATA.title}
              difficulty={RESULT_DATA.difficulty}
              hideModal={() => setShowCheatSheet(false)}
            />
          )}

          {/* Action Buttons */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <button
              onClick={() => setShowCheatSheet(true)}
              className="box box-shadow bg-secondary text-black p-4 flex items-center justify-center gap-3 font-bold text-lg uppercase tracking-wider hover:-translate-y-1 transition-transform cursor-pointer"
            >
              <FileText size={20} /> Generate Cheat Sheet
            </button>
            <button
              onClick={() => navigate("/generator", { replace: true })}
              className="box box-shadow bg-primary text-white p-4 flex items-center justify-center gap-3 font-bold text-lg uppercase tracking-wider hover:-translate-y-1 transition-transform cursor-pointer"
            >
              <ArrowLeft size={20} /> Generate Another
            </button>
            {user && (
              <button
                onClick={() => navigate("/history", { replace: true })}
                className="box box-shadow bg-white text-black p-4 flex items-center justify-center gap-3 font-bold text-lg uppercase tracking-wider hover:-translate-y-1 transition-transform cursor-pointer"
              >
                <LayoutDashboard size={20} /> Back to History
              </button>
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default ResultPage;
