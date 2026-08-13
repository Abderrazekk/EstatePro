const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { admin } = require("../middleware/adminMiddleware");
const {
  createEnquiry,
  getEnquiries,
  getMyEnquiries,
  updateEnquiry,
  getBookedDates, // <-- IMPORT THIS
} = require("../controllers/enquiryController");

const router = express.Router();

// Public route (Calendar needs to see this without logging in)
router.get("/property/:propertyId/booked-dates", getBookedDates);

// Client routes
router.post("/", protect, createEnquiry);
router.get("/mine", protect, getMyEnquiries);

// Admin routes
router.get("/", protect, admin, getEnquiries);
router.put("/:id", protect, admin, updateEnquiry);

module.exports = router;
