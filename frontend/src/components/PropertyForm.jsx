import { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import MapPicker from "./MapPicker";
import {
  AMENITIES_CATEGORIES,
  FEATURES_CATEGORIES,
} from "../constants/propertyOptions";
import {
  Check,
  Plus,
  X,
  Sparkles,
  ShieldCheck,
  Wifi,
  Waves,
  Wind,
  Car,
  Utensils,
  Tv,
  Trees,
  Coffee,
  Shirt,
  Flame,
  Dog,
  Laptop,
  Sun,
  Palmtree,
  Mountain,
  Award,
  Compass,
  CheckCircle2,
} from "lucide-react";

// Helper function to dynamically map property option keywords to Lucide icons
const getOptionIcon = (label = "") => {
  const normalized = label.toLowerCase().trim();

  if (normalized.includes("wifi") || normalized.includes("internet"))
    return Wifi;
  if (normalized.includes("piscine") || normalized.includes("pool"))
    return Waves;
  if (
    normalized.includes("clim") ||
    normalized.includes("air") ||
    normalized.includes("ventilation")
  )
    return Wind;
  if (
    normalized.includes("park") ||
    normalized.includes("garage") ||
    normalized.includes("voiture")
  )
    return Car;
  if (
    normalized.includes("cuisin") ||
    normalized.includes("kitchen") ||
    normalized.includes("repas")
  )
    return Utensils;
  if (
    normalized.includes("tv") ||
    normalized.includes("télé") ||
    normalized.includes("television")
  )
    return Tv;
  if (
    normalized.includes("jardin") ||
    normalized.includes("parc") ||
    normalized.includes("espace vert")
  )
    return Trees;
  if (
    normalized.includes("déjeuner") ||
    normalized.includes("café") ||
    normalized.includes("breakfast")
  )
    return Coffee;
  if (
    normalized.includes("linge") ||
    normalized.includes("laver") ||
    normalized.includes("machine") ||
    normalized.includes("lave")
  )
    return Shirt;
  if (
    normalized.includes("chauffage") ||
    normalized.includes("cheminée") ||
    normalized.includes("feu") ||
    normalized.includes("bbq") ||
    normalized.includes("barbecue")
  )
    return Flame;
  if (
    normalized.includes("sécurit") ||
    normalized.includes("garde") ||
    normalized.includes("alarme")
  )
    return ShieldCheck;
  if (
    normalized.includes("animaux") ||
    normalized.includes("pet") ||
    normalized.includes("chien") ||
    normalized.includes("chat")
  )
    return Dog;
  if (
    normalized.includes("travail") ||
    normalized.includes("bureau") ||
    normalized.includes("workspace")
  )
    return Laptop;
  if (
    normalized.includes("terrasse") ||
    normalized.includes("balcon") ||
    normalized.includes("sun")
  )
    return Sun;
  if (
    normalized.includes("plage") ||
    normalized.includes("mer") ||
    normalized.includes("beach")
  )
    return Palmtree;
  if (normalized.includes("montagne") || normalized.includes("vue"))
    return Mountain;
  if (
    normalized.includes("jacuzzi") ||
    normalized.includes("spa") ||
    normalized.includes("luxe")
  )
    return Sparkles;
  if (normalized.includes("authent") || normalized.includes("tradition"))
    return Award;
  if (normalized.includes("calme") || normalized.includes("tranquille"))
    return Compass;

  return CheckCircle2;
};

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
  const [customFeatureInput, setCustomFeatureInput] = useState("");
  const [customAmenityInput, setCustomAmenityInput] = useState("");

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

  const toggleItem = (item, key) => {
    setFormData((prev) => {
      const exists = prev[key].includes(item);
      return {
        ...prev,
        [key]: exists
          ? prev[key].filter((i) => i !== item)
          : [...prev[key], item],
      };
    });
  };

  const addCustomItem = (value, key, setInput) => {
    const trimmed = value.trim();
    if (trimmed && !formData[key].includes(trimmed)) {
      setFormData((prev) => ({ ...prev, [key]: [...prev[key], trimmed] }));
      setInput("");
    }
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
      className="space-y-8 bg-white p-6 sm:p-8 rounded-3xl shadow-xl shadow-stone-200/50 border border-stone-200/80"
    >
      <div className="border-b border-stone-100 pb-5 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-stone-900 tracking-tight">
            {isEdit ? "Modifier la Maison d'Hôte" : "Nouvelle Maison d'Hôte"}
          </h2>
          <p className="text-xs text-stone-500 mt-1">
            Complétez les informations pour publier ou mettre à jour la
            résidence.
          </p>
        </div>
        <Sparkles className="w-6 h-6 text-stone-400" />
      </div>

      {/* Main Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block mb-1.5 font-bold text-xs uppercase tracking-wider text-stone-700">
            Titre de la Propriété *
          </label>
          <input
            name="title"
            placeholder="ex: Dar Sidi Bou Saïd"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full border border-stone-200 px-4 py-3 rounded-2xl text-sm focus:ring-2 focus:ring-stone-900 outline-none transition"
          />
        </div>

        <div>
          <label className="block mb-1.5 font-bold text-xs uppercase tracking-wider text-stone-700">
            Prix par Nuitée (TND) *
          </label>
          <input
            type="number"
            name="pricePerNight"
            placeholder="ex: 250"
            value={formData.pricePerNight}
            onChange={handleChange}
            required
            className="w-full border border-stone-200 px-4 py-3 rounded-2xl text-sm focus:ring-2 focus:ring-stone-900 outline-none transition"
          />
        </div>

        <div className="col-span-1 md:col-span-2">
          <label className="block mb-1.5 font-bold text-xs uppercase tracking-wider text-stone-700">
            Description *
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="4"
            placeholder="Décrivez l'histoire, le charme et le cadre unique de cette maison..."
            className="w-full border border-stone-200 p-4 rounded-2xl text-sm focus:ring-2 focus:ring-stone-900 outline-none transition"
          />
        </div>

        <div>
          <label className="block mb-1.5 font-bold text-xs uppercase tracking-wider text-stone-700">
            Gouvernorat / Région *
          </label>
          <input
            name="location"
            placeholder="ex: Djerba, Nabeul, Tozeur..."
            value={formData.location}
            onChange={handleChange}
            required
            className="w-full border border-stone-200 px-4 py-3 rounded-2xl text-sm focus:ring-2 focus:ring-stone-900 outline-none transition"
          />
        </div>

        <div>
          <label className="block mb-1.5 font-bold text-xs uppercase tracking-wider text-stone-700">
            Type de Logement *
          </label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full border border-stone-200 px-4 py-3 rounded-2xl text-sm focus:ring-2 focus:ring-stone-900 outline-none cursor-pointer"
          >
            <option value="Maison d'Hôte">Maison d'Hôte</option>
            <option value="Dar Traditionnelle">Dar Traditionnelle</option>
            <option value="Villa de Charme">Villa de Charme</option>
            <option value="Gîte Rural">Gîte Rural</option>
            <option value="Chambre d'Hôte">Chambre d'Hôte</option>
          </select>
        </div>

        <div>
          <label className="block mb-1.5 font-bold text-xs uppercase tracking-wider text-stone-700">
            Statut
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border border-stone-200 px-4 py-3 rounded-2xl text-sm focus:ring-2 focus:ring-stone-900 outline-none cursor-pointer"
          >
            <option value="Available">Disponible</option>
            <option value="Maintenance">Maintenance</option>
            <option value="Unavailable">Indisponible</option>
          </select>
        </div>

        <div>
          <label className="block mb-1.5 font-bold text-xs uppercase tracking-wider text-stone-700">
            Capacité (Voyageurs max)
          </label>
          <input
            type="number"
            name="maxGuests"
            value={formData.maxGuests}
            onChange={handleChange}
            min="1"
            className="w-full border border-stone-200 px-4 py-3 rounded-2xl text-sm focus:ring-2 focus:ring-stone-900 outline-none transition"
          />
        </div>

        <div>
          <label className="block mb-1.5 font-bold text-xs uppercase tracking-wider text-stone-700">
            Nombre de Chambres
          </label>
          <input
            type="number"
            name="bedrooms"
            value={formData.bedrooms}
            onChange={handleChange}
            min="1"
            className="w-full border border-stone-200 px-4 py-3 rounded-2xl text-sm focus:ring-2 focus:ring-stone-900 outline-none transition"
          />
        </div>

        <div>
          <label className="block mb-1.5 font-bold text-xs uppercase tracking-wider text-stone-700">
            Salles de Bain
          </label>
          <input
            type="number"
            name="bathrooms"
            value={formData.bathrooms}
            onChange={handleChange}
            min="1"
            className="w-full border border-stone-200 px-4 py-3 rounded-2xl text-sm focus:ring-2 focus:ring-stone-900 outline-none transition"
          />
        </div>

        <div>
          <label className="block mb-1.5 font-bold text-xs uppercase tracking-wider text-stone-700">
            Nuitées Minimum
          </label>
          <input
            type="number"
            name="minNights"
            value={formData.minNights}
            onChange={handleChange}
            min="1"
            className="w-full border border-stone-200 px-4 py-3 rounded-2xl text-sm focus:ring-2 focus:ring-stone-900 outline-none transition"
          />
        </div>
      </div>

      {/* Address */}
      <div className="pt-4 border-t border-stone-100">
        <label className="block mb-3 font-bold text-xs uppercase tracking-wider text-stone-700">
          Adresse physique
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            placeholder="Rue / Adresse"
            name="address.street"
            value={formData["address.street"]}
            onChange={handleChange}
            className="border border-stone-200 px-4 py-2.5 rounded-xl text-sm focus:ring-2 focus:ring-stone-900 outline-none"
          />
          <input
            placeholder="Ville"
            name="address.city"
            value={formData["address.city"]}
            onChange={handleChange}
            className="border border-stone-200 px-4 py-2.5 rounded-xl text-sm focus:ring-2 focus:ring-stone-900 outline-none"
          />
          <input
            placeholder="Gouvernorat"
            name="address.state"
            value={formData["address.state"]}
            onChange={handleChange}
            className="border border-stone-200 px-4 py-2.5 rounded-xl text-sm focus:ring-2 focus:ring-stone-900 outline-none"
          />
          <input
            placeholder="Code Postal"
            name="address.zipCode"
            value={formData["address.zipCode"]}
            onChange={handleChange}
            className="border border-stone-200 px-4 py-2.5 rounded-xl text-sm focus:ring-2 focus:ring-stone-900 outline-none"
          />
        </div>
      </div>

      {/* Map picker */}
      <div>
        <label className="block mb-2 font-bold text-xs uppercase tracking-wider text-stone-700">
          Emplacement sur la carte
        </label>
        <MapPicker
          position={position}
          setPosition={setPosition}
          address={`${formData["address.street"]}, ${formData["address.city"]}`}
        />
      </div>

      {/* CATEGORIZED AMENITIES SELECTOR */}
      <div className="pt-6 border-t border-stone-100 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-black text-stone-900">
              Équipements Inclus & Services
            </h3>
            <p className="text-xs text-stone-500">
              Sélectionnez les équipements disponibles dans la résidence.
            </p>
          </div>
          <span className="text-xs font-bold bg-stone-100 text-stone-800 px-3 py-1 rounded-full">
            {formData.amenities.length} sélectionné(s)
          </span>
        </div>

        <div className="space-y-6 bg-stone-50/50 p-5 rounded-2xl border border-stone-200/60">
          {AMENITIES_CATEGORIES.map((cat, idx) => (
            <div key={idx} className="space-y-2.5">
              <h4 className="text-xs font-extrabold uppercase tracking-widest text-stone-500">
                {cat.category}
              </h4>
              <div className="flex flex-wrap gap-2">
                {cat.items.map((item) => {
                  const isSelected = formData.amenities.includes(item);
                  const OptionIcon = getOptionIcon(item);
                  return (
                    <button
                      type="button"
                      key={item}
                      onClick={() => toggleItem(item, "amenities")}
                      className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 border ${
                        isSelected
                          ? "bg-stone-900 text-white border-stone-900 shadow-sm"
                          : "bg-white text-stone-600 border-stone-200 hover:border-stone-400"
                      }`}
                    >
                      <OptionIcon
                        className={`w-4 h-4 ${isSelected ? "text-white" : "text-stone-500"}`}
                      />
                      <span>{item}</span>
                      {isSelected ? (
                        <Check className="w-3.5 h-3.5 ml-0.5 text-emerald-400" />
                      ) : (
                        <Plus className="w-3.5 h-3.5 text-stone-400" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Custom Amenity Adder */}
          <div className="pt-2 border-t border-stone-200/60">
            <label className="block mb-1.5 text-xs font-bold text-stone-700">
              Ajouter un équipement personnalisé
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={customAmenityInput}
                onChange={(e) => setCustomAmenityInput(e.target.value)}
                placeholder="Ex: Borne de recharge solaire..."
                className="flex-1 bg-white border border-stone-200 rounded-xl px-3.5 py-2 text-xs text-stone-900 outline-none focus:ring-2 focus:ring-stone-900"
              />
              <button
                type="button"
                onClick={() =>
                  addCustomItem(
                    customAmenityInput,
                    "amenities",
                    setCustomAmenityInput,
                  )
                }
                className="bg-stone-900 text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-stone-800 transition"
              >
                Ajouter
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* CATEGORIZED FEATURES SELECTOR */}
      <div className="pt-6 border-t border-stone-100 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-black text-stone-900">
              Caractéristiques & Style
            </h3>
            <p className="text-xs text-stone-500">
              Sélectionnez l'architecture, le cadre et le concept de
              l'établissement.
            </p>
          </div>
          <span className="text-xs font-bold bg-stone-100 text-stone-800 px-3 py-1 rounded-full">
            {formData.features.length} sélectionnée(s)
          </span>
        </div>

        <div className="space-y-6 bg-stone-50/50 p-5 rounded-2xl border border-stone-200/60">
          {FEATURES_CATEGORIES.map((cat, idx) => (
            <div key={idx} className="space-y-2.5">
              <h4 className="text-xs font-extrabold uppercase tracking-widest text-stone-500">
                {cat.category}
              </h4>
              <div className="flex flex-wrap gap-2">
                {cat.items.map((item) => {
                  const isSelected = formData.features.includes(item);
                  const OptionIcon = getOptionIcon(item);
                  return (
                    <button
                      type="button"
                      key={item}
                      onClick={() => toggleItem(item, "features")}
                      className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 border ${
                        isSelected
                          ? "bg-stone-900 text-white border-stone-900 shadow-sm"
                          : "bg-white text-stone-600 border-stone-200 hover:border-stone-400"
                      }`}
                    >
                      <OptionIcon
                        className={`w-4 h-4 ${isSelected ? "text-white" : "text-stone-500"}`}
                      />
                      <span>{item}</span>
                      {isSelected ? (
                        <Check className="w-3.5 h-3.5 ml-0.5 text-emerald-400" />
                      ) : (
                        <Plus className="w-3.5 h-3.5 text-stone-400" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Custom Feature Adder */}
          <div className="pt-2 border-t border-stone-200/60">
            <label className="block mb-1.5 text-xs font-bold text-stone-700">
              Ajouter une caractéristique personnalisée
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={customFeatureInput}
                onChange={(e) => setCustomFeatureInput(e.target.value)}
                placeholder="Ex: Fontaine en marbre antique..."
                className="flex-1 bg-white border border-stone-200 rounded-xl px-3.5 py-2 text-xs text-stone-900 outline-none focus:ring-2 focus:ring-stone-900"
              />
              <button
                type="button"
                onClick={() =>
                  addCustomItem(
                    customFeatureInput,
                    "features",
                    setCustomFeatureInput,
                  )
                }
                className="bg-stone-900 text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-stone-800 transition"
              >
                Ajouter
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Selected Items Tags Preview with Icons */}
      {(formData.amenities.length > 0 || formData.features.length > 0) && (
        <div className="p-4 bg-stone-100/70 rounded-2xl border border-stone-200/50 space-y-3">
          <p className="text-xs font-bold text-stone-700 uppercase tracking-wider">
            Récapitulatif des choix
          </p>
          <div className="flex flex-wrap gap-2">
            {formData.amenities.map((item) => {
              const OptionIcon = getOptionIcon(item);
              return (
                <span
                  key={item}
                  className="bg-white border border-stone-300 text-stone-800 px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-2 shadow-xs"
                >
                  <OptionIcon className="w-3.5 h-3.5 text-stone-600" />
                  <span>{item}</span>
                  <X
                    className="w-3.5 h-3.5 text-red-500 cursor-pointer hover:scale-110 ml-0.5 transition-transform"
                    onClick={() => toggleItem(item, "amenities")}
                  />
                </span>
              );
            })}
            {formData.features.map((item) => {
              const OptionIcon = getOptionIcon(item);
              return (
                <span
                  key={item}
                  className="bg-stone-900 text-white px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-2 shadow-xs"
                >
                  <OptionIcon className="w-3.5 h-3.5 text-stone-300" />
                  <span>{item}</span>
                  <X
                    className="w-3.5 h-3.5 text-red-400 cursor-pointer hover:scale-110 ml-0.5 transition-transform"
                    onClick={() => toggleItem(item, "features")}
                  />
                </span>
              );
            })}
          </div>
        </div>
      )}

      {/* Images Upload */}
      <div className="pt-4 border-t border-stone-100">
        <label className="block mb-2 font-bold text-xs uppercase tracking-wider text-stone-700">
          Photos principales {isEdit && "(Ajouter de nouvelles photos)"}
        </label>
        <div
          {...getImageRootProps()}
          className="border-dashed border-2 border-stone-300 p-6 rounded-2xl text-center cursor-pointer hover:border-stone-900 transition-colors bg-stone-50/50"
        >
          <input {...getImageInputProps()} />
          <p className="text-xs font-medium text-stone-600">
            Glissez-déposez vos images ici, ou cliquez pour parcourir
          </p>
        </div>
        <div className="flex gap-2 mt-3 overflow-x-auto">
          {previewImages.map((src, idx) => (
            <img
              key={idx}
              src={src}
              alt="Aperçu"
              className="h-20 w-20 object-cover rounded-xl border border-stone-200"
            />
          ))}
        </div>
      </div>

      {/* Video Upload */}
      <div>
        <label className="block mb-2 font-bold text-xs uppercase tracking-wider text-stone-700">
          Vidéo de Présentation (Optionnel)
        </label>
        <div
          {...getVideoRootProps()}
          className="border-dashed border-2 border-stone-300 p-4 rounded-2xl text-center cursor-pointer bg-stone-50/50"
        >
          <input {...getVideoInputProps()} />
          <p className="text-xs font-medium text-stone-600">
            Glissez une vidéo de présentation
          </p>
        </div>
        {video && (
          <p className="text-xs text-stone-900 font-bold mt-1">{video.name}</p>
        )}
      </div>

      {/* Host Information */}
      <div className="border-t border-stone-100 pt-5">
        <h3 className="text-sm font-extrabold text-stone-900 uppercase tracking-wider mb-3">
          Informations Hôte / Contact
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            placeholder="Nom de l'Hôte"
            name="hostName"
            value={formData.hostName}
            onChange={handleChange}
            className="border border-stone-200 px-4 py-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-stone-900"
          />
          <input
            placeholder="Email de l'Hôte"
            name="hostEmail"
            value={formData.hostEmail}
            onChange={handleChange}
            className="border border-stone-200 px-4 py-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-stone-900"
          />
          <input
            placeholder="Téléphone (+216)"
            name="hostPhone"
            value={formData.hostPhone}
            onChange={handleChange}
            className="border border-stone-200 px-4 py-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-stone-900"
          />
        </div>
      </div>

      {/* Toggles */}
      <div className="flex gap-6 pt-2 border-t border-stone-100">
        <label className="flex items-center gap-2 text-xs font-bold text-stone-800 cursor-pointer">
          <input
            type="checkbox"
            name="isFeatured"
            checked={formData.isFeatured}
            onChange={handleChange}
            className="w-4 h-4 rounded text-stone-900 focus:ring-stone-900"
          />
          Mettre en avant (Featured)
        </label>
        <label className="flex items-center gap-2 text-xs font-bold text-stone-800 cursor-pointer">
          <input
            type="checkbox"
            name="isPublished"
            checked={formData.isPublished}
            onChange={handleChange}
            className="w-4 h-4 rounded text-stone-900 focus:ring-stone-900"
          />
          Publier sur le site
        </label>
      </div>

      <button
        type="submit"
        className="w-full bg-stone-900 text-white font-bold px-6 py-4 rounded-2xl hover:bg-stone-800 active:scale-[0.99] transition shadow-lg shadow-stone-900/10"
      >
        {isEdit ? "Enregistrer les modifications" : "Publier la Maison d'Hôte"}
      </button>
    </form>
  );
};

export default PropertyForm;
