import { useEffect, useState } from "react";
import SearchInput from "../components/HistoryPage/SearchInput";
import HistoryTable from "../components/HistoryPage/HistoryTable";
import Pagination from "../components/HistoryPage/Pagination";
import StatsCard from "../components/HistoryPage/StatsCard";
import ProTip from "../components/HistoryPage/ProTip";
import { getHistoryStateApi, getTestsApi } from "../service/serverApi";
import BanterLoader from "../components/BanterLoader";
import type {
  completedTestsHistoryInterface,
  HistoryStatsInterface,
} from "../types/types";
import { Search } from "lucide-react";

export type TestType = "MCQ" | "Q&A";
export type TopicIcon = "beaker" | "book" | "calculator";

export interface HistoryItem {
  id: string;
  topicName: string;
  topicIcon: TopicIcon;
  type: TestType;
  score: number;
  date: Date;
  duration: number; // in seconds
}

export interface HistoryPageData {
  items: HistoryItem[];
  stats: HistoryStatsInterface;
  totalPages: number;
  currentPage: number;
}
// const mockHistoryData: HistoryPageData = {
//   items: [
//     {
//       id: "1",
//       topicName: "Organic Chemistry",
//       topicIcon: "beaker",
//       type: "MCQ",
//       score: 92,
//       date: new Date(2023, 9, 24),
//       duration: 930, // 15m 30s
//     },
//     {
//       id: "2",
//       topicName: "World History",
//       topicIcon: "book",
//       type: "Q&A",
//       score: 78,
//       date: new Date(2023, 9, 22),
//       duration: 1330, // 22m 10s
//     },
//     {
//       id: "3",
//       topicName: "World History",
//       topicIcon: "book",
//       type: "Q&A",
//       score: 78,
//       date: new Date(2023, 9, 22),
//       duration: 1330, // 22m 10s
//     },
//     {
//       id: "4",
//       topicName: "World History",
//       topicIcon: "book",
//       type: "Q&A",
//       score: 78,
//       date: new Date(2023, 9, 22),
//       duration: 1330, // 22m 10s
//     },
//     {
//       id: "5",
//       topicName: "World History",
//       topicIcon: "book",
//       type: "Q&A",
//       score: 78,
//       date: new Date(2023, 9, 22),
//       duration: 1330, // 22m 10s
//     },
//     {
//       id: "6",
//       topicName: "Linear Algebra",
//       topicIcon: "calculator",
//       type: "MCQ",
//       score: 54,
//       date: new Date(2023, 9, 20),
//       duration: 765, // 12m 45s
//     },
//   ],
//   stats: {
//     totalQuizzes: 142,
//     timeSpentLearning: 173581, // 48h 12m
//     topPerformingTopic: "Microbiology",
//   },
//   totalPages: 2,
//   currentPage: 1,
// };

function HistoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [testsLimit, setTestLimit] = useState(5);
  const [isLoadingTests, setIsLoadingTests] = useState(true);
  const [isLoadingPage, setIsLoadingPage] = useState(true);
  const [historyState, setHistoryState] =
    useState<HistoryStatsInterface | null>(null);

  const [testsHistory, setTestsHistory] =
    useState<completedTestsHistoryInterface | null>(null);

  const handleReview = (id: string) => {
    console.log("Review test:", id);
    // Navigate to review page or show review modal
  };

  const handleRetake = (id: string) => {
    console.log("Retake test:", id);
    // Navigate to test page with retake flow
  };

  const handleExport = () => {
    console.log("Export history");
    // Trigger export functionality
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Fetch new data for the page
    getTests(testsLimit, page, searchQuery);
  };

  


  // get tests
  const getTests = async (
    testsLimit: number,
    currentPage: number,
    search: string = "",
  ) => {
    setIsLoadingTests(true);
    const { error, data } = await getTestsApi(
      "699f221036ff6d535103c67a",
      testsLimit,
      currentPage,
      search,
    );
    if (error) {
      console.log(error);
      return setIsLoadingTests(false);
    } else if (data) {
      console.log(data);
      const testsHistory = data as completedTestsHistoryInterface;
      setTestsHistory(testsHistory);
      setIsLoadingTests(false);
    }
  };

  // get states
  const getHistoryStates = async () => {
    const { data, error } = await getHistoryStateApi(
      "699f221036ff6d535103c67a",
    );
    if (error) {
      console.log(error);
      return setIsLoadingPage(false);
    } else if (data) {
      console.log(data);
      const states = data as {
        completedTests: string[];
        createdAt: string;
        totalTests: number;
        totalTime: number;
        updatedAt: string;
        userId: string;
        __v: number;
        _id: string;
      };
      setHistoryState({
        totalTests: states.totalTests,
        totalTime: states.totalTime,
      });
      setIsLoadingPage(false);
    }
  };

  useEffect(() => {
    getHistoryStates();
  }, []);

  useEffect(() => {
    getTests(testsLimit, currentPage, searchQuery);
  }, []);

  // optional rendering
  if (isLoadingPage) {
    return (
      <div className="w-screen h-screen fixed top-0 left-0 z-50 bg-secondary/30 backdrop-blur-3xl flex justify-center items-center">
        <BanterLoader para="Loading History" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {historyState && (
        <main className="max-w-7xl mx-auto px-6 py-8">
          {/* Page Title */}
          <h1 className="text-5xl font-bold mb-8">YOUR TEST HISTORY</h1>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Table and Pagination */}
            <div className="lg:col-span-2 max-lg:order-2">
              {/* Search and Filters */}
              <div className="flex gap-4 mb-8">
                <SearchInput value={searchQuery} onChange={setSearchQuery} />
                <button
                  onClick={() => {
                    setCurrentPage(1);
                    getTests(testsLimit, currentPage, searchQuery);
                  }}
                  className="bg-primary box box-shadow p-2 flex justify-center items-center gap-2 font-sans font-semibold uppercase cursor-pointer"
                >
                  <span>
                    <Search />
                  </span>
                  <span className="max-sm:hidden">Search</span>
                </button>
              </div>

              {isLoadingTests && <div>Loading tests...</div>}
              {!isLoadingPage && testsHistory && (
                <>
                  <HistoryTable
                    items={testsHistory?.tests}
                    onReview={handleReview}
                    onRetake={handleRetake}
                  />
                  <Pagination
                    currentPage={currentPage}
                    totalPages={testsHistory.totalPage}
                    onPageChange={handlePageChange}
                  />
                </>
              )}
            </div>

            {/* Right Column - Stats and Pro Tip */}
            <div className="space-y-6 max-lg:order-1">
              <StatsCard stats={historyState} onExport={handleExport} />
              <ProTip />
            </div>
          </div>
        </main>
      )}
    </div>
  );
}

export default HistoryPage;
