import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { miscService } from '../services/miscService.js';
import { taskService } from '../services/taskService.js';
import useCurrentLocation from '../hooks/useCurrentLocation.js';

export default function CreateRequest() {
  const [categories, setCategories] = useState([]);
  const { coords, error } = useCurrentLocation();
  const { register, handleSubmit, setValue } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    miscService.categories().then(setCategories).catch(() => setCategories([]));
  }, []);
  useEffect(() => {
    setValue('latitude', coords.latitude);
    setValue('longitude', coords.longitude);
  }, [coords, setValue]);

  const onSubmit = async (values) => {
    try {
      await taskService.create(values);
      toast.success('Request created');
      navigate('/requests');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not create request');
    }
  };

  return (
    <form className="card mx-auto max-w-3xl space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-2xl font-bold">Create Help Request</h1>
      {error && <p className="rounded-md bg-amber-50 p-3 text-sm text-amber-800">{error}</p>}
      <select className="input" aria-label="Category" {...register('category', { required: true })}>
        <option value="">Select category</option>
        {categories.map((cat) => <option key={cat._id || cat.name} value={cat.name}>{cat.name}</option>)}
      </select>
      <input className="input" placeholder="Title" aria-label="Title" {...register('title', { required: true })} />
      <textarea className="input" rows="4" placeholder="Description" aria-label="Description" {...register('description', { required: true })} />
      <input className="input" placeholder="Address" aria-label="Address" {...register('address', { required: true })} />
      <input className="input" placeholder="Phone" aria-label="Phone" {...register('phone', { required: true })} />
      <div className="grid gap-3 md:grid-cols-2">
        <input className="input" type="number" step="any" placeholder="Latitude" aria-label="Latitude" {...register('latitude', { required: true })} />
        <input className="input" type="number" step="any" placeholder="Longitude" aria-label="Longitude" {...register('longitude', { required: true })} />
      </div>
      <button className="btn-primary">Submit Request</button>
    </form>
  );
}
