import { Trophy, CheckCircle2, Timer, Zap, Sparkles, LayoutDashboard, ArrowLeft } from "lucide-react";
import { useResultContext } from "../context/resultContext";
import ResultNotFound from "../components/Result/ResultNotFound";

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


const ResultPage = () => {
    const { testResult: RESULT_DATA } = useResultContext()


    if (!RESULT_DATA) {
        return (
            <ResultNotFound />
        )
    }

    return (
        <div className="min-h-screen bg-[#F3F4F0] text-black pb-10">

            <main className="max-w-4xl mx-auto px-4 pt-12 flex flex-col items-center">
                {/* Test Completed Header */}
                <div className="flex flex-col items-center mb-8">
                    <div className="box box-shadow bg-secondary p-3 mb-4">
                        <Trophy size={40} strokeWidth={2.5} />
                    </div>
                    <h1 className="text-5xl md:text-6xl font-black italic tracking-tighter flex items-center gap-3 uppercase">
                        Test Completed! 🏆
                    </h1>
                    <div className="mt-4 box bg-[#FAD9D1] px-6 py-2 font-bold text-sm tracking-tight border-black uppercase">
                        Test: {RESULT_DATA.title}
                    </div>
                </div>

                {/* Final Score Card */}
                <div className="w-full box box-shadow bg-white flex flex-col items-center py-12 mb-8 relative">
                    <div className="absolute top-0 left-0 w-full h-2 bg-[#FF6B35]"></div>
                    <p className="uppercase font-bold text-gray-500 tracking-widest text-xs mb-2">Final Score</p>
                    <h2 className="text-[120px] font-black leading-none text-[#FF6B35] tracking-tighter mb-6">{RESULT_DATA.accuracyRate}%</h2>
                    <div className="bg-[#008000] text-white font-bold px-6 py-2 box border-[#000000] uppercase tracking-wider text-sm">
                        {RESULT_DATA.resultLabel} • {RESULT_DATA.result}
                    </div>
                </div>

                {/* Stats Row */}
                <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="box box-shadow bg-white p-6 flex flex-col gap-4">
                        <div className="flex items-center gap-2 text-[#FF6B35]">
                            <CheckCircle2 size={18} fill="currentColor" className="text-white" />
                            <span className="uppercase font-bold text-[10px] tracking-widest text-black">Correct Answers</span>
                        </div>
                        <p className="text-4xl font-bold tracking-tighter">{RESULT_DATA.correctAnswers}/{RESULT_DATA.totalQuestions}</p>
                    </div>

                    <div className="box box-shadow bg-white p-6 flex flex-col gap-4">
                        <div className="flex items-center gap-2">
                            <Timer size={18} className="text-[#FF6B35]" />
                            <span className="uppercase font-bold text-[10px] tracking-widest">Time Spent</span>
                        </div>
                        <p className="text-4xl font-bold tracking-tighter">{Math.floor(RESULT_DATA.timeSpent / 60)}m {RESULT_DATA.timeSpent % 60}s</p>
                    </div>

                    <div className="box box-shadow bg-white p-6 flex flex-col gap-4">
                        <div className="flex items-center gap-2">
                            <Zap size={18} className="text-[#FF6B35]" />
                            <span className="uppercase font-bold text-[10px] tracking-widest">Accuracy Rate</span>
                        </div>
                        <p className="text-4xl font-bold tracking-tighter">{RESULT_DATA.accuracyRate}   </p>
                    </div>
                </div>

                {/* AI Insight Section */}
                <div className="w-full box box-shadow bg-white flex flex-col md:flex-row mb-12">
                    <div className="md:w-1/3 bg-[#FDF2F0] p-10 flex flex-col items-center justify-center border-b-2 md:border-b-0 md:border-r-2 border-black">
                        <div className="box bg-white p-4 mb-4">
                            <Sparkles className="text-[#FF6B35]" size={32} />
                        </div>
                        <p className="uppercase font-bold text-[10px] tracking-widest text-center leading-tight">AI Performance Insight</p>
                    </div>
                    <div className="md:w-2/3 p-8 flex flex-col justify-center">
                        <h3 className="italic font-black text-2xl uppercase mb-4 tracking-tighter">Brainio's Take</h3>
                        <p className="text-lg leading-snug mb-6">
                            {/* You're a natural at <span className="bg-secondary px-1 font-bold border-b-2 border-black">Algebra</span>! Your speed on basic equations is top-tier. Focus a bit more on <span className="bg-[#FDF2F0] border-b-2 border-[#FF6B35] font-bold">Quadratic Equations</span> next time to hit that 100%. */}
                            {RESULT_DATA.aiInsight}
                        </p>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                    <button className="box box-shadow bg-[#FF6B35] text-white p-4 flex items-center justify-center gap-3 font-bold text-lg uppercase tracking-wider hover:-translate-y-1 transition-transform cursor-pointer">
                        <ArrowLeft size={20} /> Generate Another
                    </button>
                    <button className="box box-shadow bg-white text-black p-4 flex items-center justify-center gap-3 font-bold text-lg uppercase tracking-wider hover:-translate-y-1 transition-transform cursor-pointer">
                        <LayoutDashboard size={20} /> Back to Dashboard
                    </button>
                </div>

            </main>

        </div>
    );
};

export default ResultPage;
