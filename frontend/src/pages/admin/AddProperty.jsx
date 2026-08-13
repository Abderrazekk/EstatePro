import { useNavigate } from "react-router-dom";
import PropertyForm from "../../components/PropertyForm";
import axios from "axios";

const AddProperty = () => {
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      await axios.post("/api/properties", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/admin/properties");
    } catch (error) {
      console.error("Error creating guest house:", error);
      alert("Erreur lors de la création de la maison d'hôte");
    }
  };

  return <PropertyForm onSubmit={handleSubmit} isEdit={false} />;
};

export default AddProperty;
