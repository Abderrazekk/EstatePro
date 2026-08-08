import { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get('/api/admin/stats');
        setStats(res.data);
      } catch (err) {
        console.error('Failed to fetch stats', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <div>Loading stats...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-lg font-semibold text-gray-600">Total Properties</h2>
          <p className="text-4xl font-bold text-blue-600">{stats?.totalProperties}</p>
        </div>
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-lg font-semibold text-gray-600">Total Clients</h2>
          <p className="text-4xl font-bold text-green-600">{stats?.totalClients}</p>
        </div>
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-lg font-semibold text-gray-600">Enquiries</h2>
          <p className="text-4xl font-bold text-purple-600">{stats?.totalEnquiries}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;