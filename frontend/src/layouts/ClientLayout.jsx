import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ClientLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="text-xl font-bold text-blue-600">
            Estate<span className="text-gray-800">Pro</span>
          </div>
          <nav className="flex items-center gap-4">
            <NavLink to="/dashboard" end className="text-gray-700 hover:text-blue-600">
              Home
            </NavLink>
            <NavLink to="/dashboard/properties" className="text-gray-700 hover:text-blue-600">
              Browse Properties
            </NavLink>
            <NavLink to="/dashboard/profile" className="text-gray-700 hover:text-blue-600">
              Profile
            </NavLink>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-4">
        © {new Date().getFullYear()} EstatePro. All rights reserved.
      </footer>
    </div>
  );
};

export default ClientLayout;