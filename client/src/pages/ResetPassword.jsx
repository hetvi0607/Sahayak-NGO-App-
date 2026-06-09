import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import Navbar from '../components/Navbar.jsx';
import { authService } from '../services/authService.js';

export default function ResetPassword() {
  const { token } = useParams();
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const onSubmit = async ({ password }) => {
    await authService.resetPassword(token, password);
    toast.success('Password reset complete');
    navigate('/login');
  };
  return (
    <div>
      <Navbar />
      <main className="mx-auto max-w-md px-4 py-12">
        <form className="card space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <h1 className="text-2xl font-bold">Reset Password</h1>
          <input className="input" type="password" placeholder="New password" {...register('password', { required: true, minLength: 6 })} />
          <button className="btn-primary w-full">Reset Password</button>
        </form>
      </main>
    </div>
  );
}
