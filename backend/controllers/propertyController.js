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
      video = { url: result.secure_url, publicId: result.public_id };
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
      property.video = { url: result.secure_url, publicId: result.public_id };
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

// @desc    Get all guest houses with ADVANCED filters
// @route   GET /api/properties
exports.getProperties = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;

    let query = { isPublished: true };

    // Exact Matches
    if (req.query.status) query.status = req.query.status;
    if (req.query.type) query.type = req.query.type;

    // Text/Regex Matches
    if (req.query.location)
      query.location = { $regex: req.query.location, $options: "i" };
    if (req.query.search) {
      query.$or = [
        { title: { $regex: req.query.search, $options: "i" } },
        { description: { $regex: req.query.search, $options: "i" } },
        { location: { $regex: req.query.search, $options: "i" } },
        { "address.city": { $regex: req.query.search, $options: "i" } },
      ];
    }

    // Number Ranges (Pricing & Layout)
    if (req.query.minPrice || req.query.maxPrice) {
      query.pricePerNight = {};
      if (req.query.minPrice)
        query.pricePerNight.$gte = parseFloat(req.query.minPrice);
      if (req.query.maxPrice)
        query.pricePerNight.$lte = parseFloat(req.query.maxPrice);
    }
    if (req.query.guests)
      query.maxGuests = { $gte: parseInt(req.query.guests) };
    if (req.query.bedrooms)
      query.bedrooms = { $gte: parseInt(req.query.bedrooms) };
    if (req.query.bathrooms)
      query.bathrooms = { $gte: parseInt(req.query.bathrooms) };
    if (req.query.minNights)
      query.minNights = { $lte: parseInt(req.query.minNights) };

    // Arrays Matches ($all ensures property has ALL selected amenities)
    if (req.query.amenities) {
      const amenitiesArray = req.query.amenities
        .split(",")
        .map((a) => a.trim());
      query.amenities = { $all: amenitiesArray };
    }
    if (req.query.features) {
      const featuresArray = req.query.features.split(",").map((f) => f.trim());
      query.features = { $all: featuresArray };
    }

    if (req.query.isFeatured === "true") query.isFeatured = true;

    // Sorting Logic
    let sortOption = { createdAt: -1 };
    if (req.query.sort) {
      switch (req.query.sort) {
        case "price_asc":
          sortOption = { pricePerNight: 1 };
          break;
        case "price_desc":
          sortOption = { pricePerNight: -1 };
          break;
        case "popular":
          sortOption = { views: -1 };
          break;
        case "newest":
          sortOption = { createdAt: -1 };
          break;
        default:
          sortOption = { createdAt: -1 };
      }
    }

    const properties = await Property.find(query)
      .populate("createdBy", "name email")
      .sort(sortOption)
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

// @desc    Get all unique available locations from DB dynamically
// @route   GET /api/properties/locations
// @access  Public
exports.getLocations = async (req, res) => {
  try {
    const locations = await Property.distinct("location", {
      isPublished: true,
    });
    const cities = await Property.distinct("address.city", {
      isPublished: true,
    });

    const combined = [...new Set([...locations, ...cities])].filter(Boolean);
    res.json(
      combined.length > 0 ? combined : ["Djerba", "Sidi Bou Said", "Hammamet"],
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// --- HELPER DE NORMALISATION TEXTUELLE ---
const normalizeText = (str) => {
  if (!str) return "";
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Enlève les accents
    .replace(/[^a-z0-9\s]/g, " ") // Enlève les caractères spéciaux
    .replace(/\s+/g, " ") // Réduit les espaces multiples
    .trim();
};

// Dictionnaire de correspondance intelligente pour les Équipements et Caractéristiques
const KEYWORD_MAP = {
  // --- ÉQUIPEMENTS & SERVICES (amenities) ---
  wifi: { field: "amenities", regex: /wi-fi|wifi|internet/i },
  piscine: { field: "amenities", regex: /piscine/i },
  "piscine privee": { field: "amenities", regex: /piscine privée/i },
  "piscine chauffee": { field: "amenities", regex: /piscine chauffée/i },
  hammam: { field: "amenities", regex: /hammam/i },
  jacuzzi: { field: "amenities", regex: /jacuzzi|spa/i },
  clim: { field: "amenities", regex: /climatisation/i },
  climatisation: { field: "amenities", regex: /climatisation/i },
  chauffage: { field: "amenities", regex: /chauffage/i },
  cheminee: { field: "amenities", regex: /cheminée/i },
  "petit dejeuner": { field: "amenities", regex: /petit-déjeuner/i },
  "table d'hote": { field: "amenities", regex: /table d'hôte/i },
  "chef prive": { field: "amenities", regex: /chef privé/i },
  barbecue: { field: "amenities", regex: /barbecue/i },
  "lave linge": { field: "amenities", regex: /lave-linge/i },

  // --- CARACTÉRISTIQUES & STYLE (features) ---
  patio: { field: "features", regex: /patio/i },
  fontaine: { field: "features", regex: /fontaine/i },
  troglodyte: { field: "features", regex: /troglodyte/i },
  menzel: { field: "features", regex: /menzel|houch/i },
  houch: { field: "features", regex: /houch|menzel/i },
  rooftop: { field: "features", regex: /roof-top|terrasse/i },
  "roof top": { field: "features", regex: /roof-top|terrasse/i },
  terrasse: { field: "features", regex: /terrasse/i },
  "vue mer": { field: "features", regex: /vue.*mer|plage/i },
  medina: { field: "features", regex: /médina/i },
  palmeraie: { field: "features", regex: /palmeraie|oasis/i },
  oasis: { field: "features", regex: /oasis|palmeraie/i },
  montagne: { field: "features", regex: /montagne/i },
  jardin: { field: "features", regex: /jardin/i },
  romantique: { field: "features", regex: /romantique/i },
  calme: { field: "features", regex: /calme/i },
};

// @desc    Recherche Avancée pour Chatbot (Gouvernorat, Adresse, Équipements, Style)
// @route   POST /api/properties/bot-search
// @access  Public
exports.botSearch = async (req, res) => {
  try {
    const {
      text,
      location,
      type,
      maxPrice,
      minPrice,
      guests,
      amenities,
      features,
    } = req.body;

    let query = { isPublished: true };
    const andConditions = [];

    // 1. Filtres structurés directs (Boutons / Quick replies)
    if (location) {
      andConditions.push({
        $or: [
          { location: { $regex: location, $options: "i" } },
          { "address.state": { $regex: location, $options: "i" } },
          { "address.city": { $regex: location, $options: "i" } },
          { "address.street": { $regex: location, $options: "i" } },
        ],
      });
    }

    if (type) query.type = type;
    if (guests) query.maxGuests = { $gte: parseInt(guests) };

    if (minPrice || maxPrice) {
      query.pricePerNight = {};
      if (minPrice) query.pricePerNight.$gte = parseFloat(minPrice);
      if (maxPrice) query.pricePerNight.$lte = parseFloat(maxPrice);
    }

    if (amenities && Array.isArray(amenities) && amenities.length > 0) {
      query.amenities = { $all: amenities };
    }

    if (features && Array.isArray(features) && features.length > 0) {
      query.features = { $all: features };
    }

    // 2. Traitement du Texte Libre en Langage Naturel
    if (text && text.trim().length > 0) {
      const lowerText = text.toLowerCase().trim();
      const normInput = normalizeText(lowerText);

      // A. Extraire le nombre de personnes (ex: "pour 4 personnes", "6 voyageurs")
      const guestsMatch = lowerText.match(
        /(\d+)\s*(?:personnes|personne|invités|invite|voyageurs|pax)/i,
      );
      if (guestsMatch && guestsMatch[1] && !guests) {
        query.maxGuests = { $gte: parseInt(guestsMatch[1]) };
      }

      // B. Extraire le Prix Max (ex: "moins de 400 tnd", "budget 300 dt")
      const priceMatch = lowerText.match(
        /(?:moins de|under|<|budget|max)?\s*(\d+)\s*(?:tnd|dinars|dinar|dt)?/i,
      );
      if (priceMatch && priceMatch[1] && !maxPrice) {
        const extractedPrice = parseFloat(priceMatch[1]);
        if (extractedPrice > 30) {
          // évite de confondre le nombre de personnes avec le prix
          query.pricePerNight = {
            ...(query.pricePerNight || {}),
            $lte: extractedPrice,
          };
        }
      }

      // C. Détection Dynamique de la Localisation (Gouvernorat / Ville / Rue)
      const dbLocations = await Property.distinct("location", {
        isPublished: true,
      });
      const dbStates = await Property.distinct("address.state", {
        isPublished: true,
      });
      const dbCities = await Property.distinct("address.city", {
        isPublished: true,
      });

      const allLocations = [
        ...new Set([...dbLocations, ...dbStates, ...dbCities]),
      ].filter(Boolean);

      let matchedLocation = null;
      for (const dbLoc of allLocations) {
        const normDbLoc = normalizeText(dbLoc);
        if (
          normDbLoc &&
          normDbLoc.length > 2 &&
          normInput.includes(normDbLoc)
        ) {
          matchedLocation = dbLoc;
          break;
        }
      }

      if (matchedLocation) {
        andConditions.push({
          $or: [
            { location: { $regex: matchedLocation, $options: "i" } },
            { "address.state": { $regex: matchedLocation, $options: "i" } },
            { "address.city": { $regex: matchedLocation, $options: "i" } },
            { "address.street": { $regex: matchedLocation, $options: "i" } },
          ],
        });
      }

      // D. Détection des Équipements et Caractéristiques/Styles
      const matchedAmenities = [];
      const matchedFeatures = [];

      Object.keys(KEYWORD_MAP).forEach((key) => {
        if (normInput.includes(key)) {
          const config = KEYWORD_MAP[key];
          if (config.field === "amenities") {
            matchedAmenities.push(config.regex);
          } else if (config.field === "features") {
            matchedFeatures.push(config.regex);
          }
        }
      });

      if (matchedAmenities.length > 0) {
        andConditions.push({
          $or: [
            { amenities: { $in: matchedAmenities } },
            { description: { $in: matchedAmenities } },
          ],
        });
      }

      if (matchedFeatures.length > 0) {
        andConditions.push({
          $or: [
            { features: { $in: matchedFeatures } },
            { description: { $in: matchedFeatures } },
          ],
        });
      }

      // E. Mots-clés restants pour recherche Titre / Description
      const stopWords = [
        "je",
        "cherche",
        "une",
        "un",
        "maison",
        "dhote",
        "d'hôte",
        "hote",
        "à",
        "a",
        "de",
        "dans",
        "avec",
        "pour",
        "le",
        "la",
        "les",
        "du",
        "tnd",
        "dt",
        "dinars",
        "svp",
        "bonjour",
        "trouver",
        "disponible",
        "personnes",
        "personne",
        "voyageurs",
        "avec",
        "et",
        "ou",
      ];

      // Nettoyer la phrase de la ville repérée
      let textRemaining = normInput;
      if (matchedLocation) {
        textRemaining = textRemaining.replace(
          normalizeText(matchedLocation),
          "",
        );
      }

      const cleanKeywords = textRemaining
        .split(" ")
        .filter((w) => w.length > 2 && !stopWords.includes(w));

      if (
        cleanKeywords.length > 0 &&
        !matchedLocation &&
        matchedAmenities.length === 0 &&
        matchedFeatures.length === 0
      ) {
        const keywordRegexes = cleanKeywords.map((k) => new RegExp(k, "i"));
        andConditions.push({
          $or: [
            { title: { $in: keywordRegexes } },
            { description: { $in: keywordRegexes } },
            { location: { $in: keywordRegexes } },
            { "address.city": { $in: keywordRegexes } },
            { "address.state": { $in: keywordRegexes } },
            { amenities: { $in: keywordRegexes } },
            { features: { $in: keywordRegexes } },
          ],
        });
      }
    }

    if (andConditions.length > 0) {
      query.$and = andConditions;
    }

    // Récupérer les propriétés avec TOUTES les informations nécessaires
    const properties = await Property.find(query)
      .select(
        "title location address pricePerNight images maxGuests bedrooms bathrooms type amenities features coordinates description",
      )
      .sort({ createdAt: -1 })
      .limit(6);

    res.json({ success: true, count: properties.length, properties });
  } catch (error) {
    console.error("Bot search error:", error);
    res.status(500).json({ message: error.message });
  }
};
