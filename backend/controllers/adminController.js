const User = require('../models/User');

// @desc    Get all clients (with search/pagination)
// @route   GET /api/admin/clients
// @access  Private/Admin
exports.getClients = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    let query = { role: 'client' };

    if (req.query.search) {
      query.$or = [
        { name: { $regex: req.query.search, $options: 'i' } },
        { email: { $regex: req.query.search, $options: 'i' } },
      ];
    }

    const clients = await User.find(query)
      .select('-password')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await User.countDocuments(query);

    res.json({
      clients,
      page,
      pages: Math.ceil(total / limit),
      total,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Toggle client active status
// @route   PUT /api/admin/clients/:id
// @access  Private/Admin
exports.toggleActive = async (req, res) => {
  try {
    const client = await User.findById(req.params.id);
    if (!client || client.role !== 'client') {
      return res.status(404).json({ message: 'Client not found' });
    }

    client.isActive = !client.isActive;
    await client.save();

    res.json({ message: `Client ${client.isActive ? 'activated' : 'suspended'}` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete client
// @route   DELETE /api/admin/clients/:id
// @access  Private/Admin
exports.deleteClient = async (req, res) => {
  try {
    const client = await User.findById(req.params.id);
    if (!client || client.role !== 'client') {
      return res.status(404).json({ message: 'Client not found' });
    }

    // Optional: also delete associated data (wishlist, enquiries, etc.)
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'Client deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};