const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { admin } = require("../middleware/adminMiddleware");
const upload = require("../middleware/upload"); // now just multer
const {
  createProperty,
  getProperties,
  getProperty,
  updateProperty,
  deleteProperty,
  deleteImage,
} = require("../controllers/propertyController");

const router = express.Router();

// Public
router.get("/", getProperties);
router.get("/:id", getProperty);

// Admin only
router.post(
  "/",
  protect,
  admin,
  upload.fields([
    { name: "images", maxCount: 10 },
    { name: "video", maxCount: 1 },
  ]),
  createProperty,
);

router.put(
  "/:id",
  protect,
  admin,
  upload.fields([
    { name: "images", maxCount: 10 },
    { name: "video", maxCount: 1 },
  ]),
  updateProperty,
);

router.delete("/:id", protect, admin, deleteProperty);
router.delete("/:id/images/:imageId", protect, admin, deleteImage);

// @desc    Set image as featured
// @route   PUT /api/properties/:id/images/:imageId/feature
router.put("/:id/images/:imageId/feature", protect, admin, async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property)
      return res.status(404).json({ message: "Property not found" });

    const image = property.images.id(req.params.imageId);
    if (!image) return res.status(404).json({ message: "Image not found" });

    // Un-set all other images as featured
    property.images.forEach((img) => (img.isFeatured = false));
    // Set this image as featured
    image.isFeatured = true;

    await property.save();
    res.json({ message: "Featured image updated", property });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
