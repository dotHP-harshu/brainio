import { SlidersHorizontal, SquarePen, TrendingUp } from "lucide-react";

function HowItWork() {
  return (
    <section className="py-24 bg-gray-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-text uppercase inline-block relative">
            How Brainio Works
            <span className="absolute top-0 -right-8 text-teal-500 text-6xl font-hand transform rotate-12">
              ?
            </span>
          </h2>
        </div>
        <div className="relative">
          <div className="hidden md:block absolute top-1/2 left-0 w-full border-t-4 border-dashed border-text transform -translate-y-1/2 z-0"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
            <div className="relative group">
              <div className="bg-white border-4 border-black p-8 rounded-2xl shadow-[8px_8px_0px_0px_tranparent] shadow-teal-500 text-center h-full flex flex-col items-center transition-transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-text text-white text-3xl font-bold flex items-center justify-center rounded-full mb-6 absolute -top-8 border-4 border-white">
                  1
                </div>
                <span className="material-symbols-outlined text-6xl mb-4 text-teal-500">
                  <SquarePen size={40} />
                </span>
                <h3 className="text-2xl font-bold mb-3 uppercase">
                  Define Mission
                </h3>
                <p className="text-gray-700 font-medium">
                  Type your topic (e.g., "Photosynthesis") and set your question
                  count.
                </p>
              </div>
            </div>
            <div className="relative group mt-12 md:mt-0">
              <div className="bg-white border-4 border-black p-8 rounded-2xl shadow-[8px_8px_0px_0px_var(--brutal-yellow)] shadow-secondary text-center h-full flex flex-col items-center transition-transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-text text-white text-3xl font-bold flex items-center justify-center rounded-full mb-6 absolute -top-8 border-4 border-white">
                  2
                </div>
                <span className="material-symbols-outlined text-6xl mb-4 text-secondary">
                  <SlidersHorizontal size={40} />
                </span>
                <h3 className="text-2xl font-bold mb-3 uppercase">Configure</h3>
                <p className="text-gray-700 font-medium">
                  Dial in the difficulty from "Easy" to "Hard" to match your
                  skill level.
                </p>
              </div>
            </div>
            <div className="relative group mt-12 md:mt-0">
              <div className="bg-white border-4 border-black p-8 rounded-2xl shadow-[8px_8px_0px_0px_var(--brutal-coral)] shadow-primary text-center h-full flex flex-col items-center transition-transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-text text-white text-3xl font-bold flex items-center justify-center rounded-full mb-6 absolute -top-8 border-4 border-white">
                  3
                </div>
                <span className="material-symbols-outlined text-6xl mb-4 text-primary">
                  <TrendingUp size={40} />
                </span>
                <h3 className="text-2xl font-bold mb-3 uppercase">
                  Analyze &amp; Adapt
                </h3>
                <p className="text-gray-700 font-medium">
                  Review your session history to see your duration and accuracy
                  trends.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWork;
