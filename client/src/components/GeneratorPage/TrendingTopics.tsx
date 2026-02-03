import type { TrendingTopicInterface } from "../../types/types";

const TRENDING_TOPICS: TrendingTopicInterface[] = [
  {
    name: "Introduction to Organic Chemistry",
    questions: 15,
    testType: "Q&A",
    difficulty: "Hard",
  },
  {
    name: "JavaScript ES6 Features",
    questions: 10,
    testType: "Q&A",
    difficulty: "Medium",
  },
  {
    name: "European History: The Renaissance",
    questions: 10,
    testType: "MCQ",
    difficulty: "Easy",
  },
];

function TrendingTopics() {
  return (
    <section>
      <div className="flex gap-4 h-max">
        <span className="inline-block w-3 min-h-4 bg-text"></span>
        <h3 className="text-xl font-semibold font-sans tracking-tight leading-none">
          Trending Topics
        </h3>
      </div>
      <div className="space-y-6 p-6">
        {TRENDING_TOPICS.map((topic) => (
          <div key={topic.name} className="box box-shadow p-4 flex justify-between items-center max-xs:flex-col max-xs:gap-4 max-xs:items-start">
            <div className="space-y-2">
              <h3 className="text-base font-sans font-semibold">
                {topic.name}
              </h3>
              <div className="gap-2 flex justify-start flex-wrap">
                <span className="text-cyan-900 bg-cyan-500/30 border border-text shadow-[2px_2px_var(--color-text)] p-1">
                  {topic.questions} Qs
                </span>
                <span className="text-purple-900 bg-purple-500/30 border border-text shadow-[2px_2px_var(--color-text)] p-1">
                  {topic.difficulty}
                </span>
                <span className="text-rose-900 bg-rose-500/30 border border-text shadow-[2px_2px_var(--color-text)] p-1">
                  {topic.testType}
                </span>
              </div>
            </div>
            <button className="select-none box shadow-[2px_2px_var(--color-text)] bg-primary text-white text-base font-sans font-semibold self-end px-4 py-1 cursor-pointer transition-shadow hover:shadow-none duration-300 ">
              Try Test
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default TrendingTopics;
