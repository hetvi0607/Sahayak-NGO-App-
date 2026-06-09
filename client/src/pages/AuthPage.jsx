import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Navbar from '../components/Navbar.jsx';
import { useAuth } from '../contexts/AuthContext.jsx';
import { authService } from '../services/authService.js';

export default function AuthPage({ mode }) {
  const { register: registerUser, login } = useAuth();
  const { register, handleSubmit } = useForm({ defaultValues: { role: 'seeker' } });
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();
  const isRegister = mode === 'register';
  const isForgot = mode === 'forgot';

  const onSubmit = async (values) => {
    setBusy(true);
    try {
      if (isForgot) {
        await authService.forgotPassword(values.email);
        toast.success('Reset link sent if account exists');
        navigate('/login');
      } else {
        const user = isRegister ? await registerUser(values) : await login(values);
        navigate(user.role === 'admin' ? '/admin' : '/dashboard');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-md px-4 py-12">
        <form className="card space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <h1 className="text-2xl font-bold">{isForgot ? 'Forgot Password' : isRegister ? 'Create Account' : 'Login'}</h1>
          {isRegister && <input className="input" placeholder="Full name" aria-label="Full name" {...register('name', { required: true })} />}
          <input className="input" type="email" placeholder="Email" aria-label="Email" {...register('email', { required: true })} />
          {!isForgot && <input className="input" type="password" placeholder="Password" aria-label="Password" {...register('password', { required: true })} />}
          {isRegister && (
            <>
              <input className="input" placeholder="Phone" aria-label="Phone" {...register('phone', { required: true })} />
              <input className="input" placeholder="Address" aria-label="Address" {...register('address')} />
              <div className="grid grid-cols-2 gap-3">
                <input className="input" type="number" step="any" placeholder="Latitude" aria-label="Latitude" {...register('latitude')} />
                <input className="input" type="number" step="any" placeholder="Longitude" aria-label="Longitude" {...register('longitude')} />
              </div>
              <select className="input" aria-label="Role" {...register('role')}>
                <option value="seeker">Seeker</option>
                <option value="volunteer">Volunteer</option>
                <option value="ngo">NGO User</option>
              </select>
            </>
          )}
          <button className="btn-primary w-full" disabled={busy}>{isForgot ? 'Send Reset Link' : isRegister ? 'Register' : 'Login'}</button>
          {!isForgot && <Link className="block text-center text-primary" to="/forgot-password">Forgot password?</Link>}
          <Link className="block text-center text-slate-600" to={isRegister ? '/login' : '/register'}>{isRegister ? 'Already have an account?' : 'Need an account?'}</Link>
        </form>
      </main>
    </div>
  );
}
