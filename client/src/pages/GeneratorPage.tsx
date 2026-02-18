import { useEffect, useRef, useState } from "react";
import BanterLoader from "../components/BanterLoader";
import ConfigurationBox from "../components/GeneratorPage/ConfigurationBox";
import HowItWorks from "../components/GeneratorPage/HowItWorks";
import InputSection from "../components/GeneratorPage/InputSection";
import TrendingTopics from "../components/GeneratorPage/TrendingTopics";
import { generateTestApi } from "../service/serverApi";
import { usePromptContext } from "../hooks/usePromptContext";
import { useTestContext } from "../context/testContext";
import type { TestDataInterface } from "../types/types";
import { useNavigate } from "react-router-dom";

function GeneratorPage() {
  const [generating, setGenerating] = useState<boolean>(false);
  const [testGenerationError, setTestGenerationError] = useState<string>("");
  const { prompt, resetPrompt } = usePromptContext()
  const errorBoxRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const { setTest } = useTestContext()

  const generateTest = async () => {
    setTestGenerationError("");
    if (prompt.userQuery.trim() === "") return;
    setGenerating(true);
    const { data, error } = await generateTestApi(prompt);

    if (error) {
      console.log(error);
      setTestGenerationError(error);
      return setGenerating(false);
    }
    if (data) {
      console.log(data);
      setTest(data as TestDataInterface)
      navigate("/test");
      resetPrompt();
      return setGenerating(false);
    }
  };

  useEffect(() => {
    const hideErrorBox = (e: MouseEvent) => {
      if (errorBoxRef.current && !errorBoxRef.current.contains(e.target as Node)) {
        setTestGenerationError("")
      }
    }

    window.addEventListener("click", hideErrorBox)

    return () => {
      window.removeEventListener("click", hideErrorBox)
    }
  }, [testGenerationError])


  if (generating) {
    return (
      <div className="w-screen h-screen fixed top-0 left-0 z-50 bg-secondary/30 backdrop-blur-3xl flex justify-center items-center">
        <BanterLoader />
      </div>
    );
  }

  return (
    <main>
      {testGenerationError.trim() !== "" && (
        <div className="w-screen h-screen fixed top-0 left-0 flex justify-center items-center px-6 z-40 backdrop-blur-md bg-black/30">
          <div 
            ref={errorBoxRef} 
            className="relative bg-error w-full max-w-lg p-6 box box-shadow transform transition-all duration-300 animate-in fade-in zoom-in"
          >
            {/* Close Button */}
            <button
              onClick={() => setTestGenerationError("")}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center  cursor-pointer select-none"
              aria-label="Close error"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* Error Icon */}
            <div className="flex items-center gap-1 mb-4">
              <div className="flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold font-sans">
                Oops! Something went wrong
              </h4>
            </div>
            
            {/* Error Message */}
            <p className="text-text/70 text-base font-mono mb-6 leading-relaxed">
              {testGenerationError}
            </p>
            
            {/* Action Buttons */}
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setTestGenerationError("")}
                className="px-4 py-2 bg-white/20 hover:bg-white/30 transition-colors cursor-pointer select-none font-medium"
              >
                Cancel
              </button>
              <button
                onClick={generateTest}
                className="px-6 py-2 bg-text text-error font-bold uppercase cursor-pointer select-none hover:bg-gray-100 transition-colors shadow-lg"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      )}
      {/* main Heading */}
      <div className="max-w-5xl w-full p-6 mx-auto">
        <h2 className="text-4xl font-bold font-sans text-center">
          Master Any Subject with AI
        </h2>
        <p className="text-text-muted text-base text-center">
          Instantly generate quizzes, get evaluated, and track your progress.
        </p>
      </div>
      {/* main Heading */}
      <div
        id="container"
        className="flex justify-center max-w-7xl w-full mx-auto max-lg:flex-col-reverse"
      >
        {/* left side  */}
        <div className="w-[25%] p-6 lg:space-y-10 max-lg:w-full max-lg:grid max-lg:grid-cols-2 max-lg:gap-4 max-xs:grid-cols-1">
          {/* ----------- Configuration  box container ------------ */}
          <ConfigurationBox />
          {/* ----------- Configuration box container ------------ */}
          {/* ----------- How it Works Section------------ */}
          <HowItWorks />
          {/* ----------- How it Works Section------------ */}
        </div>
        {/* left side  */}
        {/* right side  */}
        <div className="w-[75%] p-6 space-y-10 max-lg:w-full">
          <InputSection generateTest={generateTest} />
          {/* Trending Topics */}
          <TrendingTopics />
          {/* Trending Topics */}
        </div>
        {/* right side  */}
      </div>
    </main>
  );
}

export default GeneratorPage;
