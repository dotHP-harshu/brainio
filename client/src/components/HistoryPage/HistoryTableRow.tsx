import type { HistoryItem } from '../../pages/HistoryPage';
import ScoreBadge from './ScoreBadge';
import { formatDate, formatDuration } from '../../utils/historyFormatters';

interface HistoryTableRowProps {
  item: HistoryItem;
  onReview: (id: string) => void;
  onRetake: (id: string) => void;
}

function HistoryTableRow({ item, onReview, onRetake }: HistoryTableRowProps) {

  return (
    <tr className="border-t-2 border-text">
      <td className="p-4 max-sm:p-2">
        <span className="font-bold max-sm:text-xs">{item.topicName}</span>
      </td>
      <td className="p-4 max-sm:p-2 max-sm:hidden">
        <span className="font-bold max-sm:text-xs">{item.type}</span>
      </td>
      <td className="p-4 max-sm:p-2">
        <ScoreBadge score={item.score} />
      </td>
      <td className="p-4 max-sm:p-2">
        <div className="whitespace-pre-line text-sm max-sm:text-xs">
          {formatDate(item.date)}
        </div>
      </td>
      <td className="p-4 max-sm:p-2">
        <span className="font-bold max-sm:text-xs">{formatDuration(item.duration)}</span>
      </td>
      <td className="p-4 max-sm:hidden">
        <div className="flex gap-2">
          <button
            onClick={() => onReview(item.id)}
            className="bg-error px-4 py-2 text-white font-bold text-sm uppercase cursor-pointer hover:bg-error/90 transition-colors"
          >
            REVIEW
          </button>
          <button
            onClick={() => onRetake(item.id)}
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
