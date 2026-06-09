import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext.jsx';
import { AccessibilityProvider } from './contexts/AccessibilityContext.jsx';
import AppLayout from './layouts/AppLayout.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Landing from './pages/Landing.jsx';
import AuthPage from './pages/AuthPage.jsx';
import Dashboard from './pages/Dashboard.jsx';
import CreateRequest from './pages/CreateRequest.jsx';
import Requests from './pages/Requests.jsx';
import TaskDetails from './pages/TaskDetails.jsx';
import Profile from './pages/Profile.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import Survey from './pages/Survey.jsx';
import Ngo from './pages/Ngo.jsx';
import ResetPassword from './pages/ResetPassword.jsx';

export default function App() {
  return (
    <AccessibilityProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<AuthPage mode="login" />} />
            <Route path="/register" element={<AuthPage mode="register" />} />
            <Route path="/forgot-password" element={<AuthPage mode="forgot" />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/survey" element={<Survey />} />
            <Route path="/ngo" element={<Ngo />} />
            <Route element={<ProtectedRoute />}>
              <Route element={<AppLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/requests/new" element={<ProtectedRoute roles={['seeker', 'ngo', 'admin']}><CreateRequest /></ProtectedRoute>} />
                <Route path="/requests" element={<Requests />} />
                <Route path="/nearby" element={<ProtectedRoute roles={['volunteer', 'admin']}><Requests nearby /></ProtectedRoute>} />
                <Route path="/accepted" element={<ProtectedRoute roles={['volunteer', 'admin']}><Requests accepted /></ProtectedRoute>} />
                <Route path="/tasks/:id" element={<TaskDetails />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/admin" element={<ProtectedRoute roles={['admin']}><AdminDashboard /></ProtectedRoute>} />
              </Route>
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </AccessibilityProvider>
  );
}
