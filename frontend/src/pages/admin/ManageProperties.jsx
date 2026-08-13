import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ManageProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const res = await axios.get("/api/properties?limit=100");
      setProperties(res.data.properties);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await axios.delete(`/api/properties/${id}`);
        setProperties(properties.filter((p) => p._id !== id));
      } catch (error) {
        alert("Delete failed");
      }
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Manage Properties</h1>
        <Link
          to="/admin/properties/new"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add New Property
        </Link>
      </div>
      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-2 text-left">Image</th>
              <th className="p-2 text-left">Title</th>
              <th className="p-2 text-left">pricePerNight (TND)</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((prop) => (
              <tr key={prop._id} className="border-t">
                <td className="p-2">
                  {prop.images[0] ? (
                    <img
                      src={prop.images[0].url}
                      alt=""
                      className="h-12 w-12 object-cover rounded"
                    />
                  ) : (
                    <div className="h-12 w-12 bg-gray-200 rounded" />
                  )}
                </td>
                <td className="p-2">{prop.title}</td>
                <td className="p-2">{prop.pricePerNight.toLocaleString()} TND</td>
                <td className="p-2">{prop.status}</td>
                <td className="p-2 flex gap-2">
                  <Link
                    to={`/admin/properties/${prop._id}/edit`}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(prop._id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageProperties;
