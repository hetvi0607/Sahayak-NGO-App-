import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import Sidebar from '../components/Sidebar.jsx';
import Footer from '../components/Footer.jsx';

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="mx-auto flex max-w-7xl">
        <Sidebar />
        <main className="min-h-[calc(100vh-160px)] flex-1 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
}
