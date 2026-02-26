import type { HistoryItem } from '../../pages/HistoryPage';
import HistoryTableRow from './HistoryTableRow';

interface HistoryTableProps {
  items: HistoryItem[];
  onReview: (id: string) => void;
  onRetake: (id: string) => void;
}

function HistoryTable({ items, onReview, onRetake }: HistoryTableProps) {
  return (
    <div className="box box-shadow overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b-2 border-text">
            <th className="p-4 max-sm:p-2 max-sm:text-xs text-left text-sm font-bold uppercase tracking-wide">TOPIC NAME</th>
            <th className="p-4 max-sm:p-2 max-sm:text-xs text-left text-sm font-bold uppercase tracking-wide max-sm:hidden">TYPE</th>
            <th className="p-4 max-sm:p-2 max-sm:text-xs text-left text-sm font-bold uppercase tracking-wide max-sm:hidden">SCORE</th>
            <th className="p-4 max-sm:p-2 max-sm:text-xs text-left text-sm font-bold uppercase tracking-wide max-sm:hidden">DATE</th>
            <th className="p-4 max-sm:p-2 max-sm:text-xs text-left text-sm font-bold uppercase tracking-wide max-sm:hidden">DURATION</th>
            <th className="p-4 max-sm:p-2 max-sm:text-xs text-left text-sm font-bold uppercase tracking-wide max-sm:hidden">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <HistoryTableRow
              key={item.id}
              item={item}
              onReview={onReview}
              onRetake={onRetake}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default HistoryTable;
