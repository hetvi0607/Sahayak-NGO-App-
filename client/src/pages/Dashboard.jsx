import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import { taskService } from '../services/taskService.js';
import { adminService } from '../services/adminService.js';
import StatCard from '../components/StatCard.jsx';
import NotificationPanel from '../components/NotificationPanel.jsx';
import Badge from '../components/Badge.jsx';

export default function Dashboard() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (user.role === 'admin') adminService.stats().then(setStats);
    taskService.list(user.role === 'volunteer' ? { mine: 'accepted' } : {}).then(setTasks).catch(() => setTasks([]));
  }, [user.role]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold">Welcome, {user.name}</h1>
          <p className="text-slate-600">Role: {user.role}</p>
        </div>
        {user.role === 'volunteer' && <Badge completedTasks={user.completedTasks} />}
        {(user.role === 'seeker' || user.role === 'ngo') && <Link className="btn-primary" to="/requests/new">Create Request</Link>}
      </div>
      {user.role === 'admin' && stats && (
        <div className="grid gap-4 md:grid-cols-5">
          <StatCard label="Users" value={stats.totalUsers} />
          <StatCard label="Volunteers" value={stats.totalVolunteers} tone="secondary" />
          <StatCard label="Seekers" value={stats.totalSeekers} />
          <StatCard label="Tasks" value={stats.totalTasks} tone="accent" />
          <StatCard label="Completed" value={stats.completedTasks} tone="secondary" />
        </div>
      )}
      <div className="grid gap-6 lg:grid-cols-3">
        <section className="card lg:col-span-2">
          <h2 className="text-xl font-bold">Recent Requests</h2>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead><tr className="border-b"><th className="py-2">Title</th><th>Status</th><th>Category</th></tr></thead>
              <tbody>
                {tasks.slice(0, 6).map((task) => <tr className="border-b" key={task._id}><td className="py-2">{task.title}</td><td>{task.status}</td><td>{task.category}</td></tr>)}
              </tbody>
            </table>
          </div>
        </section>
        <NotificationPanel />
      </div>
    </div>
  );
}
