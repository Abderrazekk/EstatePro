const Banner = require("../models/Banner");
const cloudinary = require("../config/cloudinary");

// @desc    Get the active banner
// @route   GET /api/banners
// @access  Public
exports.getBanner = async (req, res) => {
  try {
    // We only need the most recent banner
    const banner = await Banner.findOne().sort({ createdAt: -1 });
    res.status(200).json(banner);
  } catch (error) {
    console.error("Error fetching banner:", error);
    res.status(500).json({ message: "Server error fetching banner" });
  }
};

// @desc    Upload or replace the banner
// @route   POST /api/banners
// @access  Private/Admin
exports.uploadBanner = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    // Find if a banner already exists
    const existingBanner = await Banner.findOne();

    // If it exists, delete the old image from Cloudinary and remove it from DB
    if (existingBanner) {
      await cloudinary.uploader.destroy(existingBanner.cloudinaryId);
      await Banner.deleteMany({}); // Clear collection to ensure only 1 banner exists
    }

    // Convert multer buffer to base64 for Cloudinary upload
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const dataURI = "data:" + req.file.mimetype + ";base64," + b64;

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(dataURI, {
      folder: "darhote_banners",
    });

    // Save new banner to DB
    const newBanner = new Banner({
      imageUrl: result.secure_url,
      cloudinaryId: result.public_id,
    });

    await newBanner.save();
    res.status(201).json(newBanner);
  } catch (error) {
    console.error("Error uploading banner:", error);
    res.status(500).json({ message: "Server error uploading banner" });
  }
};

// @desc    Delete the banner
// @route   DELETE /api/banners/:id
// @access  Private/Admin
exports.deleteBanner = async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);

    if (!banner) {
      return res.status(404).json({ message: "Banner not found" });
    }

    // Delete image from Cloudinary
    await cloudinary.uploader.destroy(banner.cloudinaryId);

    // Delete document from database
    await banner.deleteOne();

    res.status(200).json({ message: "Banner deleted successfully" });
  } catch (error) {
    console.error("Error deleting banner:", error);
    res.status(500).json({ message: "Server error deleting banner" });
  }
};
