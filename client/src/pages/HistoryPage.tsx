import { useState } from 'react';
import SearchInput from '../components/HistoryPage/SearchInput';
import HistoryTable from '../components/HistoryPage/HistoryTable';
import Pagination from '../components/HistoryPage/Pagination';
import StatsCard from '../components/HistoryPage/StatsCard';
import ProTip from '../components/HistoryPage/ProTip';

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

export interface HistoryStats {
  totalQuizzes: number;
  timeSpentLearning: number; // in seconds
  topPerformingTopic: string;
}

export interface HistoryPageData {
  items: HistoryItem[];
  stats: HistoryStats;
  totalPages: number;
  currentPage: number;
}
const mockHistoryData: HistoryPageData = {
  items: [
    {
      id: '1',
      topicName: 'Organic Chemistry',
      topicIcon: 'beaker',
      type: 'MCQ',
      score: 92,
      date: new Date(2023, 9, 24),
      duration: 930 // 15m 30s
    },
    {
      id: '2',
      topicName: 'World History',
      topicIcon: 'book',
      type: 'Q&A',
      score: 78,
      date: new Date(2023, 9, 22),
      duration: 1330 // 22m 10s
    },
    {
      id: '3',
      topicName: 'World History',
      topicIcon: 'book',
      type: 'Q&A',
      score: 78,
      date: new Date(2023, 9, 22),
      duration: 1330 // 22m 10s
    },
    {
      id: '4',
      topicName: 'World History',
      topicIcon: 'book',
      type: 'Q&A',
      score: 78,
      date: new Date(2023, 9, 22),
      duration: 1330 // 22m 10s
    },
    {
      id: '5',
      topicName: 'World History',
      topicIcon: 'book',
      type: 'Q&A',
      score: 78,
      date: new Date(2023, 9, 22),
      duration: 1330 // 22m 10s
    },
    {
      id: '6',
      topicName: 'Linear Algebra',
      topicIcon: 'calculator',
      type: 'MCQ',
      score: 54,
      date: new Date(2023, 9, 20),
      duration: 765 // 12m 45s
    }
  ],
  stats: {
    totalQuizzes: 142,
    timeSpentLearning: 173581, // 48h 12m
    topPerformingTopic: 'Microbiology'
  },
  totalPages: 2,
  currentPage: 1
};


function HistoryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const handleReview = (id: string) => {
    console.log('Review test:', id);
    // Navigate to review page or show review modal
  };

  const handleRetake = (id: string) => {
    console.log('Retake test:', id);
    // Navigate to test page with retake flow
  };

  const handleExport = () => {
    console.log('Export history');
    // Trigger export functionality
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Fetch new data for the page
  };

  // Filter items based on search query
  const filteredItems = mockHistoryData.items.filter((item) =>
    item.topicName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen">

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
            </div>

            <HistoryTable
              items={filteredItems}
              onReview={handleReview}
              onRetake={handleRetake}
            />
            <Pagination
              currentPage={currentPage}
              totalPages={mockHistoryData.totalPages}
              onPageChange={handlePageChange}
            />
          </div>

          {/* Right Column - Stats and Pro Tip */}
          <div className="space-y-6 max-lg:order-1">
            <StatsCard stats={mockHistoryData.stats} onExport={handleExport} />
            <ProTip />
          </div>
        </div>
      </main>
    </div>
  );
}

export default HistoryPage;
