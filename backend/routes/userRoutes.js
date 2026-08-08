const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const {
  toggleWishlist,
  getWishlist,
  updateProfile,
} = require('../controllers/userController');
const upload = require('../middleware/upload'); // multer instance

const router = express.Router();

router.post('/wishlist/:propertyId', protect, toggleWishlist);
router.get('/wishlist', protect, getWishlist);
router.put('/profile', protect, upload.single('avatar'), updateProfile);

module.exports = router;