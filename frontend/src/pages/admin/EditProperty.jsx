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
        alert("Impossible de charger la maison d'hôte");
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
  }, [id]);

  const handleDeleteImage = async (imageId) => {
    if (!window.confirm("Supprimer cette photo ?")) return;
    try {
      await axios.delete(`/api/properties/${id}/images/${imageId}`);
      setProperty((prev) => ({
        ...prev,
        images: prev.images.filter((img) => img._id !== imageId),
      }));
    } catch (error) {
      alert("Erreur lors de la suppression de l'image");
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
      alert("Erreur lors de la sélection de l'image principale");
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
      alert("Mise à jour échouée");
    }
  };

  if (loading) return <div className="p-8">Chargement...</div>;
  if (!property) return <div className="p-8">Maison d'Hôte introuvable.</div>;

  return (
    <div>
      {/* Existing Images Management */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
        <h2 className="text-xl font-bold mb-4">Photos Actuelles</h2>
        {property.images.length === 0 ? (
          <p className="text-gray-500">Aucune photo enregistrée.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {property.images.map((img) => (
              <div
                key={img._id}
                className="relative border rounded-lg overflow-hidden group"
              >
                <img
                  src={img.url}
                  alt=""
                  className="w-full h-32 object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-2 flex justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    type="button"
                    onClick={() => handleSetFeatured(img._id)}
                    className={`text-xs px-2 py-1 rounded ${
                      img.isFeatured
                        ? "bg-green-500 text-white"
                        : "bg-white text-gray-800"
                    }`}
                  >
                    {img.isFeatured ? "Principale" : "Définir Principale"}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteImage(img._id)}
                    className="text-xs bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <PropertyForm
        initialData={property}
        onSubmit={handleSubmit}
        isEdit={true}
      />
    </div>
  );
};

export default EditProperty;
