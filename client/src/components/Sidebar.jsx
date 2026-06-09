import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaChartPie, FaClipboardList, FaMapMarkedAlt, FaPlus, FaUser } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext.jsx';

const linkClass = ({ isActive }) =>
  `flex items-center gap-2 rounded-md px-3 py-2 font-medium ${isActive ? 'bg-primary text-white' : 'text-slate-700 hover:bg-blue-50'}`;

export default function Sidebar() {
  const { t } = useTranslation();
  const { user } = useAuth();
  return (
    <aside className="hidden w-64 border-r bg-white p-4 md:block" aria-label="Dashboard navigation">
      <div className="space-y-2">
        <NavLink to="/dashboard" className={linkClass}><FaChartPie /> {t('dashboard')}</NavLink>
        {(user?.role === 'seeker' || user?.role === 'ngo' || user?.role === 'admin') && <NavLink to="/requests/new" className={linkClass}><FaPlus /> {t('createRequest')}</NavLink>}
        <NavLink to="/requests" className={linkClass}><FaClipboardList /> {t('requests')}</NavLink>
        {user?.role === 'volunteer' && <NavLink to="/nearby" className={linkClass}><FaMapMarkedAlt /> {t('nearby')}</NavLink>}
        {user?.role === 'volunteer' && <NavLink to="/accepted" className={linkClass}><FaClipboardList /> {t('accepted')}</NavLink>}
        {user?.role === 'admin' && <NavLink to="/admin" className={linkClass}><FaChartPie /> {t('admin')}</NavLink>}
        <NavLink to="/profile" className={linkClass}><FaUser /> {t('profile')}</NavLink>
      </div>
    </aside>
  );
}
