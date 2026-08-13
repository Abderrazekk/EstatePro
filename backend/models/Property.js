const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    pricePerNight: {
      type: Number,
      required: true,
      min: 0,
    },
    location: {
      type: String, // e.g., "Sidi Bou Saïd", "Djerba", "Tozeur", "Hammamet"
      required: true,
    },
    address: {
      street: { type: String, default: "" },
      city: { type: String, default: "" },
      state: { type: String, default: "" },
      zipCode: { type: String, default: "" },
      country: { type: String, default: "Tunisia" },
      formattedAddress: { type: String, default: "" },
    },
    coordinates: {
      lat: { type: Number, default: 36.8065 }, // Default centered in Tunisia
      lng: { type: Number, default: 10.1815 },
    },
    type: {
      type: String,
      enum: [
        "Maison d'Hôte",
        "Dar Traditionnelle",
        "Villa de Charme",
        "Gîte Rural",
        "Chambre d'Hôte",
      ],
      default: "Maison d'Hôte",
      required: true,
    },
    status: {
      type: String,
      enum: ["Available", "Maintenance", "Unavailable"],
      default: "Available",
    },
    maxGuests: {
      type: Number,
      required: true,
      min: 1,
      default: 2,
    },
    bedrooms: {
      type: Number,
      required: true,
      min: 1,
      default: 1,
    },
    bathrooms: {
      type: Number,
      required: true,
      min: 1,
      default: 1,
    },
    minNights: {
      type: Number,
      default: 1,
      min: 1,
    },
    images: [
      {
        url: { type: String, required: true },
        publicId: { type: String, required: true },
        isFeatured: { type: Boolean, default: false },
        order: { type: Number, default: 0 },
      },
    ],
    video: {
      url: { type: String, default: "" },
      publicId: { type: String, default: "" },
      thumbnail: { type: String, default: "" },
      duration: { type: Number, default: 0 },
    },
    features: [String], // e.g., ["Vue sur mer", "Patio traditionnel", "Jardin"]
    amenities: [String], // e.g., ["Piscine", "Petit-déjeuner inclus", "Wi-Fi", "Climatisation", "Table d'hôte"]
    host: {
      name: { type: String, default: "" },
      email: { type: String, default: "" },
      phone: { type: String, default: "" },
      image: { type: String, default: "" },
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Property", propertySchema);
