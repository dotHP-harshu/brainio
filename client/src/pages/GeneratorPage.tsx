import { useState } from "react";
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
  const {prompt, resetPrompt} = usePromptContext()
  const navigate = useNavigate();

  const {setTest} = useTestContext()

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

  if (generating) {
    return (
      <div className="w-screen h-screen fixed top-0 left-0 z-50 bg-secondary/30 backdrop-blur-3xl">
        <BanterLoader />
      </div>
    );
  }

  return (
    <main>
      {testGenerationError.trim() !== "" && (
        <div className="w-screen h-screen fixed top-0 left-0 flex justify-center items-center px-6 z-40">
          <div className="box box-shadow px-4 py-2 bg-error text-white w-full max-w-xl flex justify-between items-center max-xs:justify-center max-xs:flex-col gap-4">
            <h4 className=" text-lg font-bold font-mono tracking-tight">
              {testGenerationError}
            </h4>
            <button
              onClick={generateTest}
              className="bg-text px-4 py-1 uppercase cursor-pointer select-none "
            >
              retry
            </button>
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
