import { BarChart, Download, PlusCircle } from 'lucide-react';
import type { HistoryStats } from '../../pages/HistoryPage';
import { formatTimeSpent } from '../../utils/historyFormatters';

interface StatsCardProps {
  stats: HistoryStats;
  onExport: () => void;
}

function StatsCard({ stats, onExport }: StatsCardProps) {
  return (
    <div className="box box-shadow">
      {/* Header */}
      <div className="bg-primary/20 border-b-2 border-text p-4 flex items-center gap-2">
        <BarChart size={20} />
        <span className="text-base font-bold uppercase tracking-tight">
          HISTORY AT A GLANCE
        </span>
      </div>

      {/* Stats */}
      <div className="p-4 space-y-4">
        {/* Total Quizzes */}
        <div className="box p-4">
          <p className="text-xs uppercase font-bold text-text-muted tracking-wide mb-1">
            TOTAL QUIZZES
          </p>
          <p className="text-4xl font-bold">{stats.totalQuizzes}</p>
        </div>

        {/* Time Spent Learning */}
        <div className="box p-4">
          <p className="text-xs uppercase font-bold text-text-muted tracking-wide mb-1">
            TIME SPENT LEARNING
          </p>
          <p className="text-4xl font-bold">{formatTimeSpent(stats.timeSpentLearning)}</p>
        </div>
        {/* start new quiz */}
        <div className="box p-4 bg-primary">
          <p className="text-xs uppercase font-bold text-white tracking-wide mb-1 flex justify-center items-center gap-1">
            <span>
              <PlusCircle size={16} className='text-white' />
            </span>
            <span>
              start new quiz
            </span>
          </p>
        </div>
      </div>

      {/* Export Button */}
      <div className="p-4">
        <button
          onClick={onExport}
          className="w-full bg-secondary py-3 font-bold uppercase flex items-center justify-center gap-2 cursor-pointer hover:bg-secondary/90 transition-colors box box-shadow"
        >
          <Download size={20} />
          <span>EXPORT HISTORY</span>
        </button>
      </div>
    </div>
  );
}

export default StatsCard;
