const Property = require("../models/Property");
const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");
const geocodeAddress = require("../utils/geocoder");

const uploadToCloudinary = (buffer, options = {}) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      options,
      (error, result) => {
        if (result) resolve(result);
        else reject(error);
      },
    );
    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
};

// @desc    Create Maison d'Hôte
// @route   POST /api/properties
// @access  Private/Admin
exports.createProperty = async (req, res) => {
  try {
    let images = [];
    if (req.files && req.files.images) {
      const imagePromises = req.files.images.map((file) =>
        uploadToCloudinary(file.buffer, {
          folder: "maison_hote/properties/images",
        }),
      );
      const results = await Promise.all(imagePromises);
      images = results.map((result, index) => ({
        url: result.secure_url,
        publicId: result.public_id,
        order: index,
      }));
    }

    let video = {};
    if (req.files && req.files.video && req.files.video[0]) {
      const result = await uploadToCloudinary(req.files.video[0].buffer, {
        resource_type: "video",
        folder: "maison_hote/properties/videos",
      });
      video = {
        url: result.secure_url,
        publicId: result.public_id,
      };
    }

    const address = {
      street: req.body["address.street"] || "",
      city: req.body["address.city"] || "",
      state: req.body["address.state"] || "",
      zipCode: req.body["address.zipCode"] || "",
      country: req.body["address.country"] || "Tunisia",
    };
    address.formattedAddress =
      [
        address.street,
        address.city,
        address.state,
        address.zipCode,
        address.country,
      ]
        .filter(Boolean)
        .join(", ") || "";

    let coordinates = { lat: 36.8065, lng: 10.1815 };
    if (req.body.lat && req.body.lng) {
      coordinates = {
        lat: parseFloat(req.body.lat),
        lng: parseFloat(req.body.lng),
      };
    } else {
      const geoResult = await geocodeAddress(address);
      if (geoResult) coordinates = geoResult;
    }

    const propertyData = {
      title: req.body.title,
      description: req.body.description,
      pricePerNight: parseFloat(req.body.pricePerNight),
      location: req.body.location,
      address,
      coordinates,
      type: req.body.type || "Maison d'Hôte",
      status: req.body.status || "Available",
      maxGuests: parseInt(req.body.maxGuests) || 2,
      bedrooms: parseInt(req.body.bedrooms) || 1,
      bathrooms: parseInt(req.body.bathrooms) || 1,
      minNights: parseInt(req.body.minNights) || 1,
      images,
      video,
      features: req.body.features
        ? Array.isArray(req.body.features)
          ? req.body.features
          : JSON.parse(req.body.features)
        : [],
      amenities: req.body.amenities
        ? Array.isArray(req.body.amenities)
          ? req.body.amenities
          : JSON.parse(req.body.amenities)
        : [],
      host: {
        name: req.body.hostName || "",
        email: req.body.hostEmail || "",
        phone: req.body.hostPhone || "",
      },
      createdBy: req.user._id,
      isFeatured: req.body.isFeatured === "true",
      isPublished: req.body.isPublished !== "false",
    };

    const property = await Property.create(propertyData);
    res.status(201).json(property);
  } catch (error) {
    console.error("Create Maison d'Hôte error:", error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update Maison d'Hôte
// @route   PUT /api/properties/:id
// @access  Private/Admin
exports.updateProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property)
      return res.status(404).json({ message: "Maison d'Hôte not found" });

    if (req.files && req.files.images) {
      const imagePromises = req.files.images.map((file) =>
        uploadToCloudinary(file.buffer, {
          folder: "maison_hote/properties/images",
        }),
      );
      const newImages = await Promise.all(imagePromises);
      property.images.push(
        ...newImages.map((img, i) => ({
          url: img.secure_url,
          publicId: img.public_id,
          order: property.images.length + i,
        })),
      );
    }

    if (req.files && req.files.video && req.files.video[0]) {
      if (property.video.publicId) {
        await cloudinary.uploader.destroy(property.video.publicId, {
          resource_type: "video",
        });
      }
      const result = await uploadToCloudinary(req.files.video[0].buffer, {
        resource_type: "video",
        folder: "maison_hote/properties/videos",
      });
      property.video = {
        url: result.secure_url,
        publicId: result.public_id,
      };
    }

    if (req.body.title) property.title = req.body.title;
    if (req.body.description) property.description = req.body.description;
    if (req.body.pricePerNight)
      property.pricePerNight = parseFloat(req.body.pricePerNight);
    if (req.body.location) property.location = req.body.location;
    if (req.body["address.street"])
      property.address.street = req.body["address.street"];
    if (req.body["address.city"])
      property.address.city = req.body["address.city"];
    if (req.body["address.state"])
      property.address.state = req.body["address.state"];
    if (req.body["address.zipCode"])
      property.address.zipCode = req.body["address.zipCode"];
    if (req.body["address.country"])
      property.address.country = req.body["address.country"];

    property.address.formattedAddress =
      [
        property.address.street,
        property.address.city,
        property.address.state,
        property.address.zipCode,
        property.address.country,
      ]
        .filter(Boolean)
        .join(", ") || "";

    if (req.body.lat && req.body.lng) {
      property.coordinates = {
        lat: parseFloat(req.body.lat),
        lng: parseFloat(req.body.lng),
      };
    }

    if (req.body.type) property.type = req.body.type;
    if (req.body.status) property.status = req.body.status;
    if (req.body.maxGuests) property.maxGuests = parseInt(req.body.maxGuests);
    if (req.body.bedrooms) property.bedrooms = parseInt(req.body.bedrooms);
    if (req.body.bathrooms) property.bathrooms = parseInt(req.body.bathrooms);
    if (req.body.minNights) property.minNights = parseInt(req.body.minNights);

    if (req.body.features)
      property.features = Array.isArray(req.body.features)
        ? req.body.features
        : JSON.parse(req.body.features);
    if (req.body.amenities)
      property.amenities = Array.isArray(req.body.amenities)
        ? req.body.amenities
        : JSON.parse(req.body.amenities);

    if (req.body.hostName) property.host.name = req.body.hostName;
    if (req.body.hostEmail) property.host.email = req.body.hostEmail;
    if (req.body.hostPhone) property.host.phone = req.body.hostPhone;

    property.isFeatured = req.body.isFeatured === "true";
    property.isPublished = req.body.isPublished !== "false";

    const updatedProperty = await property.save();
    res.json(updatedProperty);
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete property
// @route   DELETE /api/properties/:id
// @access  Private/Admin
exports.deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property)
      return res.status(404).json({ message: "Maison d'Hôte not found" });

    for (const img of property.images) {
      await cloudinary.uploader.destroy(img.publicId);
    }
    if (property.video.publicId) {
      await cloudinary.uploader.destroy(property.video.publicId, {
        resource_type: "video",
      });
    }

    await Property.findByIdAndDelete(req.params.id);
    res.json({ message: "Maison d'Hôte removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete image
// @route   DELETE /api/properties/:id/images/:imageId
// @access  Private/Admin
exports.deleteImage = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property)
      return res.status(404).json({ message: "Maison d'Hôte not found" });

    const image = property.images.id(req.params.imageId);
    if (!image) return res.status(404).json({ message: "Image not found" });

    await cloudinary.uploader.destroy(image.publicId);
    image.remove();
    await property.save();
    res.json({ message: "Image removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all guest houses with reservation filters
// @route   GET /api/properties
exports.getProperties = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;

    let query = { isPublished: true };
    if (req.query.status) query.status = req.query.status;
    if (req.query.search) {
      query.$or = [
        { title: { $regex: req.query.search, $options: "i" } },
        { description: { $regex: req.query.search, $options: "i" } },
        { location: { $regex: req.query.search, $options: "i" } },
      ];
    }
    if (req.query.minPrice)
      query.pricePerNight = { $gte: parseFloat(req.query.minPrice) };
    if (req.query.maxPrice)
      query.pricePerNight = {
        ...query.pricePerNight,
        $lte: parseFloat(req.query.maxPrice),
      };
    if (req.query.guests)
      query.maxGuests = { $gte: parseInt(req.query.guests) };
    if (req.query.type) query.type = req.query.type;
    if (req.query.location)
      query.location = { $regex: req.query.location, $options: "i" };
    if (req.query.isFeatured === "true") {
      query.isFeatured = true;
    }

    const properties = await Property.find(query)
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Property.countDocuments(query);
    res.json({ properties, page, pages: Math.ceil(total / limit), total });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single guest house
// @route   GET /api/properties/:id
exports.getProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate(
      "createdBy",
      "name email",
    );
    if (!property)
      return res.status(404).json({ message: "Maison d'Hôte not found" });
    property.views += 1;
    await property.save();
    res.json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
