import { Link, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaBell, FaHandsHelping } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext.jsx';
import LanguageSwitcher from './LanguageSwitcher.jsx';
import AccessibilityToggle from './AccessibilityToggle.jsx';

export default function Navbar() {
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  return (
    <header className="sticky top-0 z-40 border-b bg-white/95 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3" aria-label="Main navigation">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold text-primary">
          <FaHandsHelping aria-hidden="true" /> {t('brand')}
        </Link>
        <div className="flex flex-wrap items-center gap-3">
          {user ? (
            <>
              <NavLink to="/dashboard" className="font-medium hover:text-primary">{t('dashboard')}</NavLink>
              <NavLink to="/requests" className="font-medium hover:text-primary">{t('requests')}</NavLink>
              {user.role === 'volunteer' && <NavLink to="/nearby" className="font-medium hover:text-primary">{t('nearby')}</NavLink>}
              {user.role === 'admin' && <NavLink to="/admin" className="font-medium hover:text-primary">{t('admin')}</NavLink>}
              <NavLink to="/profile" className="font-medium hover:text-primary">{t('profile')}</NavLink>
              <FaBell aria-label="Notifications" className="text-slate-500" />
              <button className="btn-secondary" onClick={logout}>{t('logout')}</button>
            </>
          ) : (
            <>
              <NavLink to="/login" className="font-medium hover:text-primary">{t('login')}</NavLink>
              <NavLink to="/register" className="btn-primary">{t('register')}</NavLink>
            </>
          )}
          <LanguageSwitcher />
          <AccessibilityToggle />
        </div>
      </nav>
    </header>
  );
}
