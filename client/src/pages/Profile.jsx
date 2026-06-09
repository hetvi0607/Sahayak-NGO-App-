import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import api from '../services/api.js';
import { useAuth } from '../contexts/AuthContext.jsx';
import Badge from '../components/Badge.jsx';

export default function Profile() {
  const { user, setUser } = useAuth();
  const { register, handleSubmit } = useForm({ defaultValues: user });
  const onSubmit = async (values) => {
    const form = new FormData();
    ['name', 'phone', 'address', 'latitude', 'longitude'].forEach((key) => values[key] && form.append(key, values[key]));
    if (values.profileImage?.[0]) form.append('profileImage', values.profileImage[0]);
    const { data } = await api.put('/users/profile', form, { headers: { 'Content-Type': 'multipart/form-data' } });
    setUser(data);
    localStorage.setItem('sahayak_user', JSON.stringify(data));
    toast.success('Profile updated');
  };
  return (
    <form className="card mx-auto max-w-2xl space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Profile</h1>
        {user.role === 'volunteer' && <Badge completedTasks={user.completedTasks} />}
      </div>
      <input className="input" placeholder="Name" {...register('name')} />
      <input className="input" placeholder="Phone" {...register('phone')} />
      <input className="input" placeholder="Address" {...register('address')} />
      <div className="grid gap-3 md:grid-cols-2">
        <input className="input" type="number" step="any" placeholder="Latitude" {...register('latitude')} />
        <input className="input" type="number" step="any" placeholder="Longitude" {...register('longitude')} />
      </div>
      <input className="input" type="file" accept="image/*" {...register('profileImage')} />
      <p className="text-sm text-slate-600">Help score: {user.helpScore || 0}</p>
      <button className="btn-primary">Update Profile</button>
    </form>
  );
}
