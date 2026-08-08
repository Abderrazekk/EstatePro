import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="p-4 text-2xl font-bold border-b border-gray-700">
          EstatePro <span className="text-blue-400">Admin</span>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <NavLink
            to="/admin/dashboard"
            end
            className={({ isActive }) =>
              `block px-3 py-2 rounded hover:bg-gray-700 ${isActive ? "bg-gray-700" : ""}`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/admin/properties"
            className={({ isActive }) =>
              `block px-3 py-2 rounded hover:bg-gray-700 ${isActive ? "bg-gray-700" : ""}`
            }
          >
            Manage Properties
          </NavLink>
          <NavLink
            to="/admin/clients"
            className={({ isActive }) =>
              `block px-3 py-2 rounded hover:bg-gray-700 ${isActive ? "bg-gray-700" : ""}`
            }
          >
            Manage Clients
          </NavLink>
          <NavLink
            to="/admin/enquiries"
            className={({ isActive }) =>
              `block px-3 py-2 rounded hover:bg-gray-700 ${isActive ? "bg-gray-700" : ""}`
            }
          >
            Enquiries
          </NavLink>
        </nav>
        <div className="p-4 border-t border-gray-700">
          <p className="text-sm text-gray-400">Logged in as:</p>
          <p className="font-medium">{user?.name}</p>
          <button
            onClick={handleLogout}
            className="mt-2 w-full text-left text-red-400 hover:text-red-300 text-sm"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main content area */}
      <main className="flex-1 p-6">
        <Outlet /> {/* Child routes render here */}
      </main>
    </div>
  );
};

export default AdminLayout;
