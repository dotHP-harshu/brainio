import ConfigurationBox from "../components/GeneratorPage/ConfigurationBox";
import HowItWorks from "../components/GeneratorPage/HowItWorks";
import InputSection from "../components/GeneratorPage/InputSection";
import TrendingTopics from "../components/GeneratorPage/TrendingTopics";

function GeneratorPage() {
  return (
    <main>
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
          <InputSection />
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
