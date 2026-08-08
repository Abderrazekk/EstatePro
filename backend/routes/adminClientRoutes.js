const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');
const {
  getClients,
  toggleActive,
  deleteClient,
} = require('../controllers/adminController');

const router = express.Router();

router.route('/')
  .get(protect, admin, getClients);

router.route('/:id')
  .put(protect, admin, toggleActive)
  .delete(protect, admin, deleteClient);

module.exports = router;