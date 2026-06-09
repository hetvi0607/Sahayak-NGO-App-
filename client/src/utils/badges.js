export function badgeFor(completedTasks = 0) {
  if (completedTasks >= 100) return { label: 'Platinum', className: 'bg-slate-900 text-white' };
  if (completedTasks >= 50) return { label: 'Gold', className: 'bg-yellow-400 text-slate-900' };
  if (completedTasks >= 20) return { label: 'Silver', className: 'bg-slate-300 text-slate-900' };
  if (completedTasks >= 5) return { label: 'Bronze', className: 'bg-amber-700 text-white' };
  return { label: 'New Helper', className: 'bg-blue-100 text-primary' };
}
