import { Bot, ChartBarIncreasing, CloudBackup, FileQuestionMark, Lightbulb } from "lucide-react";

function FeatureSection() {
  return (
    <section className="py-20 bg-white border-y-4 border-text relative">
      <div className="absolute inset-0 grid-bg-pattern"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black uppercase mb-4 bg-white inline-block px-4 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            Built for Retention
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 md:gap-8 auto-rows-[minmax(200px,auto)]">
          <div className="col-span-1 md:col-span-4 neo-card bg-teal-500 p-8  flex flex-col md:flex-row items-center gap-6 overflow-hidden relative group">
            <div className="flex-1 relative z-10 text-white">
              <div className="w-16 h-16 bg-white border-4 border-black rounded-full flex items-center justify-center mb-4 text-text">
                <span>
                  <Lightbulb />
                </span>
              </div>
              <h3 className="text-3xl font-bold mb-3">AI-Generated Hints</h3>
              <p className="text-lg opacity-90 font-medium">
                Stuck on a tough one? Our AI Assistant provides context-aware
                hints to guide your thinking without spoiling the answer.
              </p>
            </div>
            <div className="w-full md:w-1/3 bg-white border-4 border-black p-4  transform rotate-3 group-hover:rotate-0 transition-transform">
              <div className="flex items-start gap-2 mb-2">
                <span className="text-teal-500">
                  <Bot />
                </span>
                <div className="bg-gray-100 p-2 rounded text-sm font-bold">
                  Hint: Think about carbon bonds...
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-1 md:col-span-2 neo-card bg-secondary p-8  flex flex-col justify-between">
            <div>
              <span>
                <CloudBackup />
              </span>
              <h3 className="text-2xl font-bold mb-2">
                Local &amp; Cloud Sync
              </h3>
              <p className="font-medium">
                Save locally or sync to your Google account.
              </p>
            </div>
          </div>
          <div className="col-span-1 md:col-span-2 neo-card bg-gray-300 p-8  flex flex-col justify-between">
            <div>
              <span className="text-primary"> 
                <FileQuestionMark/>
              </span>
              <h3 className="text-2xl font-bold mb-2">
                Subjective &amp; Objective Flex
              </h3>
              <p className="font-medium text-gray-600">
                MCQs for facts, Q&amp;A for depth.
              </p>
            </div>
          </div>
          <div className="col-span-1 md:col-span-4 neo-card bg-primary p-8  text-white relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-white bg-black">
                    <ChartBarIncreasing/>
                </span>
                <h3 className="text-3xl font-bold">Brainio's Take</h3>
              </div>
              <p className="text-xl font-medium mb-4">
                Get more than just a grade. Receive high-fidelity insights on
                your speed, accuracy, and specific areas for improvement.
              </p>
              <div className="flex gap-4 mt-6">
                <div className="bg-white text-black border-2 border-black px-4 py-2 rounded font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  Speed: 95%
                </div>
                <div className="bg-white text-black border-2 border-black px-4 py-2 rounded font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  Accuracy: 88%
                </div>
              </div>
            </div>
            <span className="material-symbols-outlined absolute -bottom-10 -right-10 text-[10rem] opacity-20 text-black">
              insights
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeatureSection;
