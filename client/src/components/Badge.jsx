import { badgeFor } from '../utils/badges.js';

export default function Badge({ completedTasks }) {
  const badge = badgeFor(completedTasks);
  return <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${badge.className}`}>{badge.label}</span>;
}
