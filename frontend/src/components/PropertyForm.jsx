import { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import MapPicker from "./MapPicker";

const PropertyForm = ({ initialData, onSubmit, isEdit }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    pricePerNight: "",
    location: "",
    type: "Maison d'Hôte",
    status: "Available",
    maxGuests: 2,
    bedrooms: 1,
    bathrooms: 1,
    minNights: 1,
    features: [],
    amenities: [],
    hostName: "",
    hostEmail: "",
    hostPhone: "",
    "address.street": "",
    "address.city": "",
    "address.state": "",
    "address.zipCode": "",
    "address.country": "Tunisia",
    isFeatured: false,
    isPublished: true,
  });
  const [images, setImages] = useState([]);
  const [video, setVideo] = useState(null);
  const [position, setPosition] = useState({ lat: 36.8065, lng: 10.1815 });
  const [previewImages, setPreviewImages] = useState([]);
  const [featureInput, setFeatureInput] = useState("");
  const [amenityInput, setAmenityInput] = useState("");

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        description: initialData.description || "",
        pricePerNight: initialData.pricePerNight || "",
        location: initialData.location || "",
        type: initialData.type || "Maison d'Hôte",
        status: initialData.status || "Available",
        maxGuests: initialData.maxGuests || 2,
        bedrooms: initialData.bedrooms || 1,
        bathrooms: initialData.bathrooms || 1,
        minNights: initialData.minNights || 1,
        features: initialData.features || [],
        amenities: initialData.amenities || [],
        hostName: initialData.host?.name || "",
        hostEmail: initialData.host?.email || "",
        hostPhone: initialData.host?.phone || "",
        "address.street": initialData.address?.street || "",
        "address.city": initialData.address?.city || "",
        "address.state": initialData.address?.state || "",
        "address.zipCode": initialData.address?.zipCode || "",
        "address.country": initialData.address?.country || "Tunisia",
        isFeatured: initialData.isFeatured || false,
        isPublished:
          initialData.isPublished !== undefined
            ? initialData.isPublished
            : true,
      });
      setPosition({
        lat: initialData.coordinates?.lat || 36.8065,
        lng: initialData.coordinates?.lng || 10.1815,
      });
      setPreviewImages([]);
      setImages([]);
    }
  }, [initialData]);

  const onDropImages = (acceptedFiles) => {
    setImages(acceptedFiles);
    setPreviewImages(acceptedFiles.map((file) => URL.createObjectURL(file)));
  };
  const onDropVideo = (acceptedFiles) => {
    setVideo(acceptedFiles[0]);
  };

  const { getRootProps: getImageRootProps, getInputProps: getImageInputProps } =
    useDropzone({
      accept: { "image/*": [] },
      onDrop: onDropImages,
      multiple: true,
    });
  const { getRootProps: getVideoRootProps, getInputProps: getVideoInputProps } =
    useDropzone({
      accept: { "video/*": [] },
      onDrop: onDropVideo,
      multiple: false,
    });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const addFeature = () => {
    if (featureInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        features: [...prev.features, featureInput.trim()],
      }));
      setFeatureInput("");
    }
  };
  const removeFeature = (index) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  const addAmenity = () => {
    if (amenityInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        amenities: [...prev.amenities, amenityInput.trim()],
      }));
      setAmenityInput("");
    }
  };
  const removeAmenity = (index) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "features" || key === "amenities") {
        fd.append(key, JSON.stringify(formData[key]));
      } else if (key.startsWith("address.")) {
        fd.append(key, formData[key]);
      } else {
        fd.append(key, formData[key]);
      }
    });
    fd.append("lat", position.lat);
    fd.append("lng", position.lng);
    images.forEach((file) => fd.append("images", file));
    if (video) fd.append("video", video);
    onSubmit(fd);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white p-6 rounded-xl shadow-sm border border-gray-100"
    >
      <h2 className="text-2xl font-bold text-gray-900">
        {isEdit ? "Modifier la Maison d'Hôte" : "Ajouter une Maison d'Hôte"}
      </h2>

      {/* Main Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-medium text-sm text-gray-700">
            Titre
          </label>
          <input
            name="title"
            placeholder="ex: Dar Sidi Bou Saïd"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded-lg"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium text-sm text-gray-700">
            Prix par Nuitée (TND)
          </label>
          <input
            type="number"
            name="pricePerNight"
            placeholder="ex: 250"
            value={formData.pricePerNight}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded-lg"
          />
        </div>
        <div className="col-span-2">
          <label className="block mb-1 font-medium text-sm text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="4"
            className="w-full border px-3 py-2 rounded-lg"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium text-sm text-gray-700">
            Gouvernorat / Région
          </label>
          <input
            name="location"
            placeholder="ex: Djerba, Nabeul, Tozeur..."
            value={formData.location}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded-lg"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium text-sm text-gray-700">
            Type de Logement
          </label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-lg"
          >
            <option>Maison d'Hôte</option>
            <option>Dar Traditionnelle</option>
            <option>Villa de Charme</option>
            <option>Gîte Rural</option>
            <option>Chambre d'Hôte</option>
          </select>
        </div>
        <div>
          <label className="block mb-1 font-medium text-sm text-gray-700">
            Statut
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-lg"
          >
            <option value="Available">Disponible</option>
            <option value="Maintenance">Maintenance</option>
            <option value="Unavailable">Indisponible</option>
          </select>
        </div>
        <div>
          <label className="block mb-1 font-medium text-sm text-gray-700">
            Capacité (Nombre Max de Personnes)
          </label>
          <input
            type="number"
            name="maxGuests"
            value={formData.maxGuests}
            onChange={handleChange}
            min="1"
            className="w-full border px-3 py-2 rounded-lg"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium text-sm text-gray-700">
            Nombre de Chambres
          </label>
          <input
            type="number"
            name="bedrooms"
            value={formData.bedrooms}
            onChange={handleChange}
            min="1"
            className="w-full border px-3 py-2 rounded-lg"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium text-sm text-gray-700">
            Salles de Bain
          </label>
          <input
            type="number"
            name="bathrooms"
            value={formData.bathrooms}
            onChange={handleChange}
            min="1"
            className="w-full border px-3 py-2 rounded-lg"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium text-sm text-gray-700">
            Nuitées Minimum
          </label>
          <input
            type="number"
            name="minNights"
            value={formData.minNights}
            onChange={handleChange}
            min="1"
            className="w-full border px-3 py-2 rounded-lg"
          />
        </div>
      </div>

      {/* Address */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          placeholder="Rue / Adresse"
          name="address.street"
          value={formData["address.street"]}
          onChange={handleChange}
          className="border px-3 py-2 rounded-lg"
        />
        <input
          placeholder="Ville"
          name="address.city"
          value={formData["address.city"]}
          onChange={handleChange}
          className="border px-3 py-2 rounded-lg"
        />
        <input
          placeholder="Gouvernorat"
          name="address.state"
          value={formData["address.state"]}
          onChange={handleChange}
          className="border px-3 py-2 rounded-lg"
        />
        <input
          placeholder="Code Postal"
          name="address.zipCode"
          value={formData["address.zipCode"]}
          onChange={handleChange}
          className="border px-3 py-2 rounded-lg"
        />
      </div>

      {/* Map picker */}
      <div>
        <label className="block mb-1 font-medium text-sm text-gray-700">
          Localisation Carte
        </label>
        <MapPicker
          position={position}
          setPosition={setPosition}
          address={`${formData["address.street"]}, ${formData["address.city"]}`}
        />
      </div>

      {/* Images Upload */}
      <div>
        <label className="block mb-1 font-medium text-sm text-gray-700">
          Photos (max 10) {isEdit && "(Ajouter de nouvelles photos)"}
        </label>
        <div
          {...getImageRootProps()}
          className="border-dashed border-2 border-gray-300 p-6 rounded-lg text-center cursor-pointer hover:border-blue-500 transition-colors"
        >
          <input {...getImageInputProps()} />
          <p className="text-gray-500">
            Glissez-déposez vos images ici, ou cliquez pour sélectionner
          </p>
        </div>
        <div className="flex gap-2 mt-3 overflow-x-auto">
          {previewImages.map((src, idx) => (
            <img
              key={idx}
              src={src}
              alt="Aperçu"
              className="h-20 w-20 object-cover rounded-lg border"
            />
          ))}
        </div>
      </div>

      {/* Video Upload */}
      <div>
        <label className="block mb-1 font-medium text-sm text-gray-700">
          Vidéo (Optionnel)
        </label>
        <div
          {...getVideoRootProps()}
          className="border-dashed border-2 border-gray-300 p-4 rounded-lg text-center cursor-pointer"
        >
          <input {...getVideoInputProps()} />
          <p className="text-sm text-gray-500">
            Déposer une vidéo de présentation
          </p>
        </div>
        {video && <p className="text-xs text-blue-600 mt-1">{video.name}</p>}
      </div>

      {/* Features */}
      <div>
        <label className="block mb-1 font-medium text-sm text-gray-700">
          Caractéristiques Spéciales
        </label>
        <div className="flex gap-2 mb-2">
          <input
            value={featureInput}
            onChange={(e) => setFeatureInput(e.target.value)}
            className="border px-3 py-2 rounded-lg flex-1 text-sm"
            placeholder="ex: Vue sur mer, Architecture arabo-andalouse..."
          />
          <button
            type="button"
            onClick={addFeature}
            className="bg-blue-600 text-white px-4 rounded-lg text-sm font-medium hover:bg-blue-700"
          >
            Ajouter
          </button>
        </div>
        <ul className="flex flex-wrap gap-2">
          {formData.features.map((feat, idx) => (
            <li
              key={idx}
              className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-2"
            >
              {feat}
              <button
                type="button"
                onClick={() => removeFeature(idx)}
                className="text-red-500 font-bold"
              >
                &times;
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Amenities */}
      <div>
        <label className="block mb-1 font-medium text-sm text-gray-700">
          Équipements & Services
        </label>
        <div className="flex gap-2 mb-2">
          <input
            value={amenityInput}
            onChange={(e) => setAmenityInput(e.target.value)}
            className="border px-3 py-2 rounded-lg flex-1 text-sm"
            placeholder="ex: Piscine, Petit-déjeuner inclus, Wi-Fi, Climatisation..."
          />
          <button
            type="button"
            onClick={addAmenity}
            className="bg-blue-600 text-white px-4 rounded-lg text-sm font-medium hover:bg-blue-700"
          >
            Ajouter
          </button>
        </div>
        <ul className="flex flex-wrap gap-2">
          {formData.amenities.map((am, idx) => (
            <li
              key={idx}
              className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-2"
            >
              {am}
              <button
                type="button"
                onClick={() => removeAmenity(idx)}
                className="text-red-500 font-bold"
              >
                &times;
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Host Information */}
      <div className="border-t pt-4">
        <h3 className="text-base font-semibold mb-3">
          Informations de l'Hôte / Propriétaire
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            placeholder="Nom de l'Hôte"
            name="hostName"
            value={formData.hostName}
            onChange={handleChange}
            className="border px-3 py-2 rounded-lg"
          />
          <input
            placeholder="Email de l'Hôte"
            name="hostEmail"
            value={formData.hostEmail}
            onChange={handleChange}
            className="border px-3 py-2 rounded-lg"
          />
          <input
            placeholder="Téléphone (+216)"
            name="hostPhone"
            value={formData.hostPhone}
            onChange={handleChange}
            className="border px-3 py-2 rounded-lg"
          />
        </div>
      </div>

      {/* Toggles */}
      <div className="flex gap-6 pt-2">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <input
            type="checkbox"
            name="isFeatured"
            checked={formData.isFeatured}
            onChange={handleChange}
            className="rounded text-blue-600 focus:ring-blue-500"
          />
          Mettre en avant (Featured)
        </label>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <input
            type="checkbox"
            name="isPublished"
            checked={formData.isPublished}
            onChange={handleChange}
            className="rounded text-blue-600 focus:ring-blue-500"
          />
          Publié sur le site
        </label>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white font-medium px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
      >
        {isEdit ? "Mettre à jour la Maison d'Hôte" : "Publier la Maison d'Hôte"}
      </button>
    </form>
  );
};

export default PropertyForm;
