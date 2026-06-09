import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { adminService } from '../services/adminService.js';
import { taskService } from '../services/taskService.js';
import StatCard from '../components/StatCard.jsx';
import Badge from '../components/Badge.jsx';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);

  const load = async () => {
    const [s, a, u, t] = await Promise.all([adminService.stats(), taskService.analytics(), adminService.users(), taskService.list()]);
    setStats(s); setAnalytics(a); setUsers(u); setTasks(t);
  };
  useEffect(() => { load(); }, []);

  const ban = async (id) => { await adminService.banUser(id); toast.success('User banned'); load(); };
  const removeUser = async (id) => { await adminService.deleteUser(id); toast.success('User deleted'); load(); };
  const removeTask = async (id) => { await adminService.deleteTask(id); toast.success('Task deleted'); load(); };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      {stats && <div className="grid gap-4 md:grid-cols-5"><StatCard label="Total Users" value={stats.totalUsers} /><StatCard label="Volunteers" value={stats.totalVolunteers} tone="secondary" /><StatCard label="Seekers" value={stats.totalSeekers} /><StatCard label="Tasks" value={stats.totalTasks} tone="accent" /><StatCard label="Completed" value={stats.completedTasks} tone="secondary" /></div>}
      <section className="grid gap-6 lg:grid-cols-2">
        <div className="card">
          <h2 className="text-xl font-bold">Monthly Task Chart</h2>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={(analytics?.monthly || []).map((m) => ({ month: m._id, tasks: m.count }))}>
              <CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="month" /><YAxis allowDecimals={false} /><Tooltip /><Bar dataKey="tasks" fill="#2563EB" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="card">
          <h2 className="text-xl font-bold">Volunteer Performance</h2>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={stats?.topVolunteers || []}>
              <CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="name" /><YAxis allowDecimals={false} /><Tooltip /><Bar dataKey="helpScore" fill="#14B8A6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>
      <section className="card overflow-x-auto">
        <h2 className="text-xl font-bold">User Table</h2>
        <table className="mt-4 w-full text-left text-sm">
          <thead><tr className="border-b"><th>Name</th><th>Email</th><th>Role</th><th>Badge</th><th>Actions</th></tr></thead>
          <tbody>{users.map((u) => <tr className="border-b" key={u.id}><td className="py-2">{u.name}</td><td>{u.email}</td><td>{u.role}</td><td><Badge completedTasks={u.completedTasks} /></td><td className="space-x-2"><button className="text-accent" onClick={() => ban(u.id)}>Ban</button><button className="text-red-600" onClick={() => removeUser(u.id)}>Delete</button></td></tr>)}</tbody>
        </table>
      </section>
      <section className="card overflow-x-auto">
        <h2 className="text-xl font-bold">Task Table</h2>
        <table className="mt-4 w-full text-left text-sm">
          <thead><tr className="border-b"><th>Title</th><th>Status</th><th>Category</th><th>Actions</th></tr></thead>
          <tbody>{tasks.map((task) => <tr className="border-b" key={task._id}><td className="py-2">{task.title}</td><td>{task.status}</td><td>{task.category}</td><td><button className="text-red-600" onClick={() => removeTask(task._id)}>Delete</button></td></tr>)}</tbody>
        </table>
      </section>
    </div>
  );
}
