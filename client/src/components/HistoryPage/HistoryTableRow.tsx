import type { HistoryItem } from '../../pages/HistoryPage';
import ScoreBadge from './ScoreBadge';
import { formatDate, formatDuration } from '../../utils/historyFormatters';
import type { completedTestInterface } from '../../types/types';

interface HistoryTableRowProps {
  item: completedTestInterface;
  onReview: (id: string) => void;
  onRetake: (id: string) => void;
}

function HistoryTableRow({ item, onReview, onRetake }: HistoryTableRowProps) {

  return (
    <tr className="border-t-2 border-text">
      <td className="p-4 max-sm:p-2">
        <span className="font-bold max-sm:text-xs">{item.title}</span>
      </td>
      <td className="p-4 max-sm:p-2 max-sm:hidden">
        <span className="font-bold max-sm:text-xs">{item.type}</span>
      </td>
      <td className="p-4 max-sm:p-2">
        <ScoreBadge score={item.accuracyRate} />
      </td>
      <td className="p-4 max-sm:p-2">
        <div className="whitespace-pre-line text-sm max-sm:text-xs">
          {formatDate(new Date(item.createdAt))}
        </div>
      </td>
      <td className="p-4 max-sm:p-2">
        <span className="font-bold max-sm:text-xs">{formatDuration(item.timeSpent)}</span>
      </td>
      <td className="p-4 max-sm:hidden hidden">
        <div className="flex gap-2">
          <button
            onClick={() => onReview(item._id)}
            className="bg-error px-4 py-2 text-white font-bold text-sm uppercase cursor-pointer hover:bg-error/90 transition-colors"
          >
            REVIEW
          </button>
          <button
            onClick={() => onRetake(item._id)}
            className="box px-4 py-2 font-bold text-sm uppercase cursor-pointer hover:bg-gray-50 transition-colors"
          >
            RETAKE
          </button>
        </div>
      </td>
    </tr>
  );
}

export default HistoryTableRow;
