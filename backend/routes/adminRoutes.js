const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');
const User = require('../models/User');
const Property = require('../models/Property');
// Property model will be added later – for now we'll use dummy values.

const router = express.Router();

// @desc    Get admin dashboard stats
// @route   GET /api/admin/stats
// @access  Private/Admin
router.get('/stats', protect, admin, async (req, res) => {
  try {
    const totalClients = await User.countDocuments({ role: 'client' });
    const totalProperties = await Property.countDocuments();
    // Later we can add property counts, etc.
    res.json({
      totalClients,
      totalProperties: 0,      // placeholder until property model exists
      totalEnquiries: 0,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;