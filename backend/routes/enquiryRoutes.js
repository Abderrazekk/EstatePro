const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { admin } = require("../middleware/adminMiddleware");
const {
  createEnquiry,
  getEnquiries,
  getMyEnquiries, // ✅ new
  updateEnquiry,
} = require("../controllers/enquiryController");

const router = express.Router();

// Client routes
router.post("/", protect, createEnquiry);
router.get("/mine", protect, getMyEnquiries); // ✅ client's own enquiries

// Admin routes
router.get("/", protect, admin, getEnquiries);
router.put("/:id", protect, admin, updateEnquiry);

module.exports = router;
