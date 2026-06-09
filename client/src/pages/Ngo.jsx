import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import { miscService } from '../services/miscService.js';

export default function Ngo() {
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = async (values) => {
    await miscService.registerNgo(values);
    toast.success('NGO registered. Admin verification pending.');
    reset();
  };
  return (
    <div className="bg-background">
      <Navbar />
      <main className="mx-auto max-w-2xl px-4 py-12">
        <form className="card space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <h1 className="text-3xl font-bold">NGO Partnership</h1>
          <input className="input" placeholder="NGO name" {...register('name', { required: true })} />
          <input className="input" type="email" placeholder="Email" {...register('email', { required: true })} />
          <input className="input" placeholder="Phone" {...register('phone', { required: true })} />
          <input className="input" placeholder="Registration number" {...register('registrationNumber', { required: true })} />
          <input className="input" placeholder="Contact person" {...register('contactPerson', { required: true })} />
          <textarea className="input" placeholder="Address" rows="3" {...register('address', { required: true })} />
          <button className="btn-primary">Register NGO</button>
        </form>
      </main>
      <Footer />
    </div>
  );
}
