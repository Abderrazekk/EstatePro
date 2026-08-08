import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import PropertyForm from "../../components/PropertyForm";

const EditProperty = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await axios.get(`/api/properties/${id}`);
        setProperty(res.data);
      } catch (error) {
        console.error(error);
        alert("Failed to load property");
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
  }, [id]);

  const handleDeleteImage = async (imageId) => {
    if (!window.confirm("Delete this image?")) return;
    try {
      await axios.delete(`/api/properties/${id}/images/${imageId}`);
      setProperty((prev) => ({
        ...prev,
        images: prev.images.filter((img) => img._id !== imageId),
      }));
    } catch (error) {
      alert("Failed to delete image");
    }
  };

  const handleSetFeatured = async (imageId) => {
    try {
      await axios.put(`/api/properties/${id}/images/${imageId}/feature`);
      setProperty((prev) => ({
        ...prev,
        images: prev.images.map((img) => ({
          ...img,
          isFeatured: img._id === imageId,
        })),
      }));
    } catch (error) {
      alert("Failed to set featured image");
    }
  };

  const handleSubmit = async (formData) => {
    try {
      await axios.put(`/api/properties/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/admin/properties");
    } catch (error) {
      console.error(error);
      alert("Update failed");
    }
  };

  if (loading) return <div className="p-8">Loading...</div>;
  if (!property) return <div className="p-8">Property not found.</div>;

  return (
    <div>
      {/* Existing Images Management */}
      <div className="bg-white p-6 rounded shadow mb-6">
        <h2 className="text-xl font-bold mb-4">Property Images</h2>
        {property.images.length === 0 ? (
          <p>No images yet.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {property.images.map((img) => (
              <div
                key={img._id}
                className="relative border rounded overflow-hidden group"
              >
                <img
                  src={img.url}
                  alt=""
                  className="w-full h-32 object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-1 flex justify-between opacity-0 group-hover:opacity-100 transition">
                  <button
                    onClick={() => handleSetFeatured(img._id)}
                    className={`text-xs px-2 py-1 rounded ${img.isFeatured ? "bg-green-500 text-white" : "bg-gray-200"}`}
                  >
                    {img.isFeatured ? "Featured" : "Set Featured"}
                  </button>
                  <button
                    onClick={() => handleDeleteImage(img._id)}
                    className="text-xs bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Edit Form (new images/video + fields) */}
      <PropertyForm
        initialData={property}
        onSubmit={handleSubmit}
        isEdit={true}
      />
    </div>
  );
};

export default EditProperty;
