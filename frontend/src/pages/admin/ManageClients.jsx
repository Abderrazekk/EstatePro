import { useState, useEffect } from 'react';
import axios from 'axios';

const ManageClients = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  useEffect(() => {
    fetchClients();
  }, [page, search]);

  const fetchClients = async () => {
    setLoading(true);
    try {
      const params = { page, limit: 10 };
      if (search) params.search = search;
      const res = await axios.get('/api/admin/clients', { params });
      setClients(res.data.clients);
      setPages(res.data.pages);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1); // reset page
  };

  const handleToggleActive = async (id) => {
    try {
      await axios.put(`/api/admin/clients/${id}`);
      fetchClients(); // refresh list
    } catch (error) {
      alert('Failed to update client');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this client? This action cannot be undone.')) return;
    try {
      await axios.delete(`/api/admin/clients/${id}`);
      fetchClients();
    } catch (error) {
      alert('Failed to delete client');
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Manage Clients</h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by name or email..."
        value={search}
        onChange={handleSearch}
        className="border px-3 py-2 rounded mb-4 w-full md:w-1/3"
      />

      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="bg-white rounded shadow overflow-x-auto">
            <table className="min-w-full text-left">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-3">Name</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Joined</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((client) => (
                  <tr key={client._id} className="border-t">
                    <td className="p-3 font-medium">{client.name}</td>
                    <td className="p-3 text-gray-600">{client.email}</td>
                    <td className="p-3">{new Date(client.createdAt).toLocaleDateString()}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded text-sm ${
                          client.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {client.isActive ? 'Active' : 'Suspended'}
                      </span>
                    </td>
                    <td className="p-3 flex gap-2">
                      <button
                        onClick={() => handleToggleActive(client._id)}
                        className={`px-3 py-1 rounded text-sm ${
                          client.isActive
                            ? 'bg-yellow-500 text-white hover:bg-yellow-600'
                            : 'bg-green-500 text-white hover:bg-green-600'
                        }`}
                      >
                        {client.isActive ? 'Suspend' : 'Activate'}
                      </button>
                      <button
                        onClick={() => handleDelete(client._id)}
                        className="px-3 py-1 rounded text-sm bg-red-500 text-white hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {clients.length === 0 && (
                  <tr>
                    <td colSpan="5" className="p-3 text-center text-gray-500">
                      No clients found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {pages > 1 && (
            <div className="flex justify-center mt-4 gap-2">
              {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`px-3 py-1 rounded ${
                    page === p ? 'bg-blue-600 text-white' : 'bg-gray-200'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ManageClients;