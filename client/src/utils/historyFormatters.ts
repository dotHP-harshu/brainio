// Date formatter
export const formatDate = (date: Date): string => {
  const month = date.toLocaleString('en-US', { month: 'short' });
  const day = date.getDate();
  const year = date.getFullYear();
  return `${month}\n${day},\n${year}`;
};

// Duration formatter
export const formatDuration = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes}m ${secs}s`;
};

// Time spent formatter (for stats)
export const formatTimeSpent = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  if (hours === 0 && minutes === 0) return `${secs}s`;
  if (hours === 0) return `${minutes}m ${secs}s`;
  if (minutes === 0) return `${hours}h ${secs}s`;
  return `${hours}h ${minutes}m ${secs}s`;
};

// Score color helper
export const getScoreColor = (score: number): 'success' | 'secondary' | 'error' => {
  if (score >= 85) return 'success';
  if (score >= 70) return 'secondary';
  return 'error';
};
