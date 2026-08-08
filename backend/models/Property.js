const mongoose = require('mongoose');

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
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    location: {
      type: String,
      required: true,
    },
    address: {
      street: { type: String, default: '' },
      city: { type: String, default: '' },
      state: { type: String, default: '' },
      zipCode: { type: String, default: '' },
      country: { type: String, default: '' },
      formattedAddress: { type: String, default: '' },
    },
    coordinates: {
      lat: { type: Number, default: 0 },
      lng: { type: Number, default: 0 },
    },
    type: {
      type: String,
      enum: ['House', 'Apartment', 'Condo', 'Villa', 'Townhouse', 'Commercial'],
      required: true,
    },
    status: {
      type: String,
      enum: ['For Sale', 'For Rent', 'Sold', 'Rented'],
      default: 'For Sale',
    },
    beds: {
      type: Number,
      required: true,
      min: 0,
    },
    baths: {
      type: Number,
      required: true,
      min: 0,
    },
    sqft: {
      type: Number,
      required: true,
      min: 0,
    },
    yearBuilt: {
      type: Number,
      default: null,
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
      url: { type: String, default: '' },
      publicId: { type: String, default: '' },
      thumbnail: { type: String, default: '' },
      duration: { type: Number, default: 0 },
    },
    features: [String],
    amenities: [String],
    agent: {
      name: { type: String, default: '' },
      email: { type: String, default: '' },
      phone: { type: String, default: '' },
      image: { type: String, default: '' },
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
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
  { timestamps: true }
);

module.exports = mongoose.model('Property', propertySchema);