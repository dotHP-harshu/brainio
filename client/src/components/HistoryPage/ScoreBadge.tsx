import { getScoreColor } from '../../utils/historyFormatters';

interface ScoreBadgeProps {
  score: number;
}

function ScoreBadge({ score }: ScoreBadgeProps) {
  const colorClass = getScoreColor(score);
  
  return (
    <div className={`bg-${colorClass} px-4 py-1 text-base font-bold inline-block rounded-full max-sm:text-xs max-sm:px-2 max-sm:py-0.5`}>
      {score}%
    </div>
  );
}

export default ScoreBadge;
