import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { taskService } from '../services/taskService.js';
import { miscService } from '../services/miscService.js';
import useCurrentLocation from '../hooks/useCurrentLocation.js';
import TaskMap from '../components/TaskMap.jsx';

export default function Requests({ nearby = false, accepted = false }) {
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({ search: '', category: '', status: '', distance: 5 });
  const { coords } = useCurrentLocation();

  const load = () => {
    const params = { ...filters };
    if (nearby) {
      return taskService.nearby({ ...params, latitude: coords.latitude, longitude: coords.longitude }).then(setTasks);
    }
    if (accepted) params.mine = 'accepted';
    return taskService.list(params).then(setTasks);
  };

  useEffect(() => { miscService.categories().then(setCategories); }, []);
  useEffect(() => { load().catch(() => toast.error('Could not load tasks')); }, [nearby, accepted, coords.latitude, coords.longitude]);

  return (
    <div className="space-y-5">
      <h1 className="text-3xl font-bold">{nearby ? 'Nearby Tasks' : accepted ? 'Accepted Tasks' : 'Requests'}</h1>
      <div className="card grid gap-3 md:grid-cols-5">
        <input className="input" placeholder="Search title or address" value={filters.search} onChange={(e) => setFilters({ ...filters, search: e.target.value })} />
        <select className="input" value={filters.category} onChange={(e) => setFilters({ ...filters, category: e.target.value })}>
          <option value="">All categories</option>
          {categories.map((cat) => <option key={cat._id || cat.name} value={cat.name}>{cat.name}</option>)}
        </select>
        <select className="input" value={filters.status} onChange={(e) => setFilters({ ...filters, status: e.target.value })}>
          <option value="">All status</option>
          <option value="pending">Pending</option>
          <option value="accepted">Accepted</option>
          <option value="completed">Completed</option>
        </select>
        <select className="input" value={filters.distance} onChange={(e) => setFilters({ ...filters, distance: e.target.value })}>
          <option value="2">2 KM</option>
          <option value="5">5 KM</option>
          <option value="10">10 KM</option>
        </select>
        <button className="btn-primary" onClick={load}>Apply</button>
      </div>
      <TaskMap tasks={tasks} center={[coords.latitude, coords.longitude]} />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {tasks.map((task) => (
          <article className="card" key={task._id}>
            <div className="flex justify-between gap-2">
              <h2 className="text-lg font-bold">{task.title}</h2>
              <span className="rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-primary">{task.status}</span>
            </div>
            <p className="mt-2 text-sm text-slate-600">{task.description}</p>
            <p className="mt-3 text-sm"><strong>{task.category}</strong> · {task.address}</p>
            <Link className="mt-4 inline-block text-primary font-semibold" to={`/tasks/${task._id}`}>View details</Link>
          </article>
        ))}
      </div>
    </div>
  );
}
