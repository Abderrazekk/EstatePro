const Property = require("../models/Property");
const cloudinary = require("../config/cloudinary"); // already configured
const streamifier = require("streamifier");
const geocodeAddress = require("../utils/geocoder");

// Helper to upload a buffer to Cloudinary
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

// @desc    Create property
// @route   POST /api/properties
// @access  Private/Admin
exports.createProperty = async (req, res) => {
  try {
    // ----- UPLOAD IMAGES -----
    let images = [];
    if (req.files && req.files.images) {
      const imagePromises = req.files.images.map((file) =>
        uploadToCloudinary(file.buffer, {
          folder: "realestate/properties/images",
        }),
      );
      const results = await Promise.all(imagePromises);
      images = results.map((result, index) => ({
        url: result.secure_url,
        publicId: result.public_id,
        order: index,
      }));
    }

    // ----- UPLOAD VIDEO -----
    let video = {};
    if (req.files && req.files.video && req.files.video[0]) {
      const result = await uploadToCloudinary(req.files.video[0].buffer, {
        resource_type: "video",
        folder: "realestate/properties/videos",
      });
      video = {
        url: result.secure_url,
        publicId: result.public_id,
      };
    }

    // ----- BUILD ADDRESS -----
    const address = {
      street: req.body["address.street"] || "",
      city: req.body["address.city"] || "",
      state: req.body["address.state"] || "",
      zipCode: req.body["address.zipCode"] || "",
      country: req.body["address.country"] || "",
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

    // ----- GEOCODE -----
    let coordinates = { lat: 0, lng: 0 };
    if (req.body.lat && req.body.lng) {
      coordinates = {
        lat: parseFloat(req.body.lat),
        lng: parseFloat(req.body.lng),
      };
    } else {
      const geoResult = await geocodeAddress(address);
      if (geoResult) coordinates = geoResult;
    }

    // ----- CREATE PROPERTY DOCUMENT -----
    const propertyData = {
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      location: req.body.location,
      address,
      coordinates,
      type: req.body.type,
      status: req.body.status || "For Sale",
      beds: req.body.beds,
      baths: req.body.baths,
      sqft: req.body.sqft,
      yearBuilt: req.body.yearBuilt || null,
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
      agent: {
        name: req.body.agentName || "",
        email: req.body.agentEmail || "",
        phone: req.body.agentPhone || "",
      },
      createdBy: req.user._id,
      isFeatured: req.body.isFeatured === "true",
      isPublished: req.body.isPublished !== "false", // default true
    };

    const property = await Property.create(propertyData);
    res.status(201).json(property);
  } catch (error) {
    console.error("Create property error:", error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update property
// @route   PUT /api/properties/:id
// @access  Private/Admin
exports.updateProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property)
      return res.status(404).json({ message: "Property not found" });

    // ----- NEW IMAGES -----
    if (req.files && req.files.images) {
      const imagePromises = req.files.images.map((file) =>
        uploadToCloudinary(file.buffer, {
          folder: "realestate/properties/images",
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

    // ----- NEW VIDEO (replaces old) -----
    if (req.files && req.files.video && req.files.video[0]) {
      if (property.video.publicId) {
        await cloudinary.uploader.destroy(property.video.publicId, {
          resource_type: "video",
        });
      }
      const result = await uploadToCloudinary(req.files.video[0].buffer, {
        resource_type: "video",
        folder: "realestate/properties/videos",
      });
      property.video = {
        url: result.secure_url,
        publicId: result.public_id,
      };
    }

    // ----- UPDATE TEXT FIELDS (if provided) -----
    if (req.body.title) property.title = req.body.title;
    if (req.body.description) property.description = req.body.description;
    if (req.body.price) property.price = req.body.price;
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
    if (req.body.beds) property.beds = req.body.beds;
    if (req.body.baths) property.baths = req.body.baths;
    if (req.body.sqft) property.sqft = req.body.sqft;
    if (req.body.yearBuilt) property.yearBuilt = req.body.yearBuilt;
    if (req.body.features)
      property.features = Array.isArray(req.body.features)
        ? req.body.features
        : JSON.parse(req.body.features);
    if (req.body.amenities)
      property.amenities = Array.isArray(req.body.amenities)
        ? req.body.amenities
        : JSON.parse(req.body.amenities);
    if (req.body.agentName) property.agent.name = req.body.agentName;
    if (req.body.agentEmail) property.agent.email = req.body.agentEmail;
    if (req.body.agentPhone) property.agent.phone = req.body.agentPhone;
    property.isFeatured = req.body.isFeatured === "true";
    property.isPublished = req.body.isPublished !== "false";

    const updatedProperty = await property.save();
    res.json(updatedProperty);
  } catch (error) {
    console.error("Update property error:", error);
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
      return res.status(404).json({ message: "Property not found" });

    for (const img of property.images) {
      await cloudinary.uploader.destroy(img.publicId);
    }
    if (property.video.publicId) {
      await cloudinary.uploader.destroy(property.video.publicId, {
        resource_type: "video",
      });
    }

    await Property.findByIdAndDelete(req.params.id);
    res.json({ message: "Property removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete an image from property
// @route   DELETE /api/properties/:id/images/:imageId
// @access  Private/Admin
exports.deleteImage = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property)
      return res.status(404).json({ message: "Property not found" });

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

// @desc    Get all properties (public)
// @route   GET /api/properties
exports.getProperties = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;

    let query = {};
    if (req.query.status) query.status = req.query.status;
    if (req.query.search) {
      query.$or = [
        { title: { $regex: req.query.search, $options: "i" } },
        { description: { $regex: req.query.search, $options: "i" } },
        { location: { $regex: req.query.search, $options: "i" } }, // added for more comprehensive search
      ];
    }
    if (req.query.minPrice)
      query.price = { $gte: parseFloat(req.query.minPrice) };
    if (req.query.maxPrice)
      query.price = { ...query.price, $lte: parseFloat(req.query.maxPrice) };
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

// @desc    Get single property
// @route   GET /api/properties/:id
exports.getProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate(
      "createdBy",
      "name email",
    );
    if (!property)
      return res.status(404).json({ message: "Property not found" });
    property.views += 1;
    await property.save();
    res.json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
