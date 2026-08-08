import { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import MapPicker from "./MapPicker";

const PropertyForm = ({ initialData, onSubmit, isEdit }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    type: "House",
    status: "For Sale",
    beds: 0,
    baths: 0,
    sqft: 0,
    yearBuilt: "",
    features: [],
    amenities: [],
    agentName: "",
    agentEmail: "",
    agentPhone: "",
    "address.street": "",
    "address.city": "",
    "address.state": "",
    "address.zipCode": "",
    "address.country": "",
    isFeatured: false,
    isPublished: true,
  });
  const [images, setImages] = useState([]);
  const [video, setVideo] = useState(null);
  const [position, setPosition] = useState({ lat: 40.7128, lng: -74.006 });
  const [previewImages, setPreviewImages] = useState([]);
  const [featureInput, setFeatureInput] = useState("");
  const [amenityInput, setAmenityInput] = useState("");

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        description: initialData.description || "",
        price: initialData.price || "",
        location: initialData.location || "",
        type: initialData.type || "House",
        status: initialData.status || "For Sale",
        beds: initialData.beds || 0,
        baths: initialData.baths || 0,
        sqft: initialData.sqft || 0,
        yearBuilt: initialData.yearBuilt || "",
        features: initialData.features || [],
        amenities: initialData.amenities || [],
        agentName: initialData.agent?.name || "",
        agentEmail: initialData.agent?.email || "",
        agentPhone: initialData.agent?.phone || "",
        "address.street": initialData.address?.street || "",
        "address.city": initialData.address?.city || "",
        "address.state": initialData.address?.state || "",
        "address.zipCode": initialData.address?.zipCode || "",
        "address.country": initialData.address?.country || "",
        isFeatured: initialData.isFeatured || false,
        isPublished:
          initialData.isPublished !== undefined
            ? initialData.isPublished
            : true,
      });
      setPosition({
        lat: initialData.coordinates?.lat || 40.7128,
        lng: initialData.coordinates?.lng || -74.006,
      });
      setPreviewImages([]); // don't show existing images in dropzone
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
      className="space-y-6 bg-white p-6 rounded shadow"
    >
      <h2 className="text-2xl font-bold">
        {isEdit ? "Edit Property" : "Add New Property"}
      </h2>

      {/* Basic fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1">Title</label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Price (TND)</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div className="col-span-2">
          <label className="block mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="4"
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Location (city/area)</label>
          <input
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Property Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          >
            <option>House</option>
            <option>Apartment</option>
            <option>Condo</option>
            <option>Villa</option>
            <option>Townhouse</option>
            <option>Commercial</option>
          </select>
        </div>
        <div>
          <label className="block mb-1">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          >
            <option>For Sale</option>
            <option>For Rent</option>
            <option>Sold</option>
            <option>Rented</option>
          </select>
        </div>
        <div>
          <label className="block mb-1">Bedrooms</label>
          <input
            type="number"
            name="beds"
            value={formData.beds}
            onChange={handleChange}
            min="0"
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Bathrooms</label>
          <input
            type="number"
            name="baths"
            value={formData.baths}
            onChange={handleChange}
            min="0"
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Area (m²)</label>
          <input
            type="number"
            name="sqft"
            value={formData.sqft}
            onChange={handleChange}
            min="0"
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Year Built</label>
          <input
            type="number"
            name="yearBuilt"
            value={formData.yearBuilt}
            onChange={handleChange}
            min="0"
            className="w-full border px-3 py-2 rounded"
          />
        </div>
      </div>

      {/* Address fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          placeholder="Street"
          name="address.street"
          value={formData["address.street"]}
          onChange={handleChange}
          className="border px-3 py-2 rounded"
        />
        <input
          placeholder="City"
          name="address.city"
          value={formData["address.city"]}
          onChange={handleChange}
          className="border px-3 py-2 rounded"
        />
        <input
          placeholder="State"
          name="address.state"
          value={formData["address.state"]}
          onChange={handleChange}
          className="border px-3 py-2 rounded"
        />
        <input
          placeholder="Zip Code"
          name="address.zipCode"
          value={formData["address.zipCode"]}
          onChange={handleChange}
          className="border px-3 py-2 rounded"
        />
        <input
          placeholder="Country"
          name="address.country"
          value={formData["address.country"]}
          onChange={handleChange}
          className="border px-3 py-2 rounded"
        />
      </div>

      {/* Map picker */}
      <div>
        <label className="block mb-1">Pinpoint Location on Map</label>
        <MapPicker
          position={position}
          setPosition={setPosition}
          address={`${formData["address.street"]}, ${formData["address.city"]}`}
        />
      </div>

      {/* Images upload (new only) */}
      <div>
        <label className="block mb-1">
          Images (max 10) {isEdit && "(add new images)"}
        </label>
        <div
          {...getImageRootProps()}
          className="border-dashed border-2 p-4 text-center cursor-pointer"
        >
          <input {...getImageInputProps()} />
          <p>Drag & drop images here, or click to select</p>
        </div>
        <div className="flex gap-2 mt-2">
          {previewImages.map((src, idx) => (
            <img
              key={idx}
              src={src}
              alt="new preview"
              className="h-20 w-20 object-cover rounded"
            />
          ))}
        </div>
      </div>

      {/* Video upload */}
      <div>
        <label className="block mb-1">
          Video (optional) {isEdit && "(replace existing)"}
        </label>
        <div
          {...getVideoRootProps()}
          className="border-dashed border-2 p-4 text-center cursor-pointer"
        >
          <input {...getVideoInputProps()} />
          <p>Drag & drop a video here</p>
        </div>
        {video && <p className="text-sm mt-1">{video.name}</p>}
      </div>

      {/* Features */}
      <div>
        <label className="block mb-1">Features</label>
        <div className="flex gap-2 mb-2">
          <input
            value={featureInput}
            onChange={(e) => setFeatureInput(e.target.value)}
            className="border px-3 py-2 rounded flex-1"
            placeholder="e.g. Pool"
          />
          <button
            type="button"
            onClick={addFeature}
            className="bg-blue-600 text-white px-4 rounded"
          >
            Add
          </button>
        </div>
        <ul className="flex flex-wrap gap-2">
          {formData.features.map((feat, idx) => (
            <li
              key={idx}
              className="bg-gray-200 px-3 py-1 rounded flex items-center gap-2"
            >
              {feat}{" "}
              <button
                type="button"
                onClick={() => removeFeature(idx)}
                className="text-red-500"
              >
                &times;
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Amenities */}
      <div>
        <label className="block mb-1">Amenities</label>
        <div className="flex gap-2 mb-2">
          <input
            value={amenityInput}
            onChange={(e) => setAmenityInput(e.target.value)}
            className="border px-3 py-2 rounded flex-1"
            placeholder="e.g. Gym"
          />
          <button
            type="button"
            onClick={addAmenity}
            className="bg-blue-600 text-white px-4 rounded"
          >
            Add
          </button>
        </div>
        <ul className="flex flex-wrap gap-2">
          {formData.amenities.map((am, idx) => (
            <li
              key={idx}
              className="bg-gray-200 px-3 py-1 rounded flex items-center gap-2"
            >
              {am}{" "}
              <button
                type="button"
                onClick={() => removeAmenity(idx)}
                className="text-red-500"
              >
                &times;
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Agent info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          placeholder="Agent Name"
          name="agentName"
          value={formData.agentName}
          onChange={handleChange}
          className="border px-3 py-2 rounded"
        />
        <input
          placeholder="Agent Email"
          name="agentEmail"
          value={formData.agentEmail}
          onChange={handleChange}
          className="border px-3 py-2 rounded"
        />
        <input
          placeholder="Agent Phone"
          name="agentPhone"
          value={formData.agentPhone}
          onChange={handleChange}
          className="border px-3 py-2 rounded"
        />
      </div>

      {/* Checkboxes */}
      <div className="flex gap-4">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isFeatured"
            checked={formData.isFeatured}
            onChange={handleChange}
          />
          Featured Property
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isPublished"
            checked={formData.isPublished}
            onChange={handleChange}
          />
          Published
        </label>
      </div>

      <button
        type="submit"
        className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
      >
        {isEdit ? "Update Property" : "Add Property"}
      </button>
    </form>
  );
};

export default PropertyForm;
