export default function StatCard({ label, value, tone = 'primary' }) {
  const tones = { primary: 'text-primary', secondary: 'text-secondary', accent: 'text-accent' };
  return (
    <div className="card">
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p className={`mt-2 text-3xl font-bold ${tones[tone] || tones.primary}`}>{value ?? 0}</p>
    </div>
  );
}
