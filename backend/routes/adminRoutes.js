const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { admin } = require("../middleware/adminMiddleware");
const { getDashboardStats } = require("../controllers/adminController");

const router = express.Router();

// @desc    Get complete admin dashboard analytics with optional ?period= query
// @route   GET /api/admin/stats
// @access  Private/Admin
router.get("/stats", protect, admin, getDashboardStats);

module.exports = router;
