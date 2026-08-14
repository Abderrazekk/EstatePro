const Sponsor = require("../models/Sponsor");
const cloudinary = require("../config/cloudinary"); // Adjust path if needed

// @desc    Get all sponsors
// @route   GET /api/sponsors
// @access  Public
exports.getSponsors = async (req, res) => {
  try {
    const sponsors = await Sponsor.find().sort({ createdAt: -1 });
    res.status(200).json(sponsors);
  } catch (error) {
    console.error("Error fetching sponsors:", error);
    res.status(500).json({ message: "Server error fetching sponsors" });
  }
};

// @desc    Add a new sponsor
// @route   POST /api/sponsors
// @access  Private/Admin
exports.addSponsor = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || !req.file) {
      return res.status(400).json({ message: "Name and image are required" });
    }

    // Convert multer buffer to base64 for Cloudinary upload
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const dataURI = "data:" + req.file.mimetype + ";base64," + b64;

    // Upload to Cloudinary using your config
    const result = await cloudinary.uploader.upload(dataURI, {
      folder: "darhote_sponsors", // Creates a specific folder in your Cloudinary
    });

    // Save to database
    const newSponsor = new Sponsor({
      name,
      imageUrl: result.secure_url,
      cloudinaryId: result.public_id,
    });

    await newSponsor.save();
    res.status(201).json(newSponsor);
  } catch (error) {
    console.error("Error adding sponsor:", error);
    res.status(500).json({ message: "Server error adding sponsor" });
  }
};

// @desc    Delete a sponsor
// @route   DELETE /api/sponsors/:id
// @access  Private/Admin
exports.deleteSponsor = async (req, res) => {
  try {
    const sponsor = await Sponsor.findById(req.params.id);
    
    if (!sponsor) {
      return res.status(404).json({ message: "Sponsor not found" });
    }

    // Delete image from Cloudinary
    await cloudinary.uploader.destroy(sponsor.cloudinaryId);

    // Delete document from database
    await sponsor.deleteOne();
    
    res.status(200).json({ message: "Sponsor deleted successfully" });
  } catch (error) {
    console.error("Error deleting sponsor:", error);
    res.status(500).json({ message: "Server error deleting sponsor" });
  }
};