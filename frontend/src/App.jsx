// frontend/src/App.jsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import PropertiesList from "./pages/PropertiesList";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageProperties from "./pages/admin/ManageProperties";
import AddProperty from "./pages/admin/AddProperty"; // <-- ensure this exists
import EditProperty from "./pages/admin/EditProperty"; // <-- ensure this exists
import ManageClients from "./pages/admin/ManageClients";
import PropertyDetail from "./pages/PropertyDetail";
import Wishlist from "./pages/Wishlist";
import AdminEnquiries from "./pages/admin/AdminEnquiries";
import MyEnquiries from "./pages/client/MyEnquiries";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/properties" element={<PropertiesList />} />
        <Route path="/property/:id" element={<PropertyDetail />} />
        <Route
          path="/wishlist"
          element={
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          }
        />
        <Route
          path="/enquiries"
          element={
            <ProtectedRoute>
              <MyEnquiries />
            </ProtectedRoute>
          }
        />

        {/* Protected client routes */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* Admin routes - wrapped in AdminLayout */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="properties" element={<ManageProperties />} />
          <Route path="properties/new" element={<AddProperty />} />
          <Route path="properties/:id/edit" element={<EditProperty />} />
          <Route path="clients" element={<ManageClients />} />
          <Route path="enquiries" element={<AdminEnquiries />} />
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
