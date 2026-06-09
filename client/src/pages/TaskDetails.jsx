import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext.jsx';
import { taskService } from '../services/taskService.js';
import FileUpload from '../components/FileUpload.jsx';

export default function TaskDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const [task, setTask] = useState(null);
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const load = () => taskService.get(id).then(setTask);
  useEffect(() => { load(); }, [id]);

  const accept = async () => {
    await taskService.accept(id);
    toast.success('Task accepted');
    load();
  };

  const complete = async (values) => {
    const form = new FormData();
    form.append('completionNote', values.completionNote || '');
    if (values.proofImage?.[0]) form.append('proofImage', values.proofImage[0]);
    await taskService.complete(id, form);
    toast.success('Task completed. Help score updated.');
    navigate('/accepted');
  };

  if (!task) return <p>Loading...</p>;

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <section className="card lg:col-span-2">
        <h1 className="text-3xl font-bold">{task.title}</h1>
        <p className="mt-2 text-slate-600">{task.description}</p>
        <dl className="mt-6 grid gap-3 md:grid-cols-2">
          <div><dt className="font-bold">Category</dt><dd>{task.category}</dd></div>
          <div><dt className="font-bold">Status</dt><dd>{task.status}</dd></div>
          <div><dt className="font-bold">Address</dt><dd>{task.address}</dd></div>
          <div><dt className="font-bold">Phone</dt><dd>{task.phone}</dd></div>
        </dl>
        {task.proofImage && <img className="mt-6 max-h-80 rounded-md object-cover" src={`${import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000'}${task.proofImage}`} alt="Completion proof" />}
      </section>
      <aside className="card space-y-4">
        <h2 className="text-xl font-bold">Actions</h2>
        {user.role === 'volunteer' && task.status === 'pending' && <button className="btn-primary w-full" onClick={accept}>Accept Task</button>}
        {user.role === 'volunteer' && task.status === 'accepted' && String(task.volunteerId?._id || task.volunteerId) === user.id && (
          <form className="space-y-4" onSubmit={handleSubmit(complete)}>
            <textarea className="input" rows="4" placeholder="Completion notes" {...register('completionNote', { required: true })} />
            <FileUpload label="Proof image" name="proofImage" register={register} />
            <button className="btn-secondary w-full">Complete Task</button>
          </form>
        )}
        {user.role === 'seeker' && task.status === 'completed' && <p className="rounded-md bg-teal-50 p-3 text-teal-700">This request is complete.</p>}
      </aside>
    </div>
  );
}
