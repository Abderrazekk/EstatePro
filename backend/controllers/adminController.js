const User = require("../models/User");
const Property = require("../models/Property");
const Enquiry = require("../models/Enquiry");
const Sponsor = require("../models/Sponsor");

// @desc    Get complete admin dashboard analytics with period filtering
// @route   GET /api/admin/stats
// @access  Private/Admin
exports.getDashboardStats = async (req, res) => {
  try {
    const { period = "all" } = req.query;
    const now = new Date();

    // Calculate start date based on selected period filter
    let dateFilter = {};
    if (period === "week") {
      const startOfWeek = new Date(now);
      startOfWeek.setHours(0, 0, 0, 0);
      const day = startOfWeek.getDay();
      const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1); // Monday start
      startOfWeek.setDate(diff);
      dateFilter = { createdAt: { $gte: startOfWeek } };
    } else if (period === "month") {
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      dateFilter = { createdAt: { $gte: startOfMonth } };
    } else if (period === "year") {
      const startOfYear = new Date(now.getFullYear(), 0, 1);
      dateFilter = { createdAt: { $gte: startOfYear } };
    }

    // Revenue Match Query (Confirmed reservations within date range)
    const revenueMatch = {
      status: "confirmed",
      ...dateFilter,
    };

    const [
      totalClients,
      activeClients,
      totalProperties,
      availableProperties,
      maintenanceProperties,
      featuredProperties,
      totalEnquiries,
      pendingEnquiries,
      confirmedEnquiries,
      refusedEnquiries,
      totalSponsors,
      filteredRevenueResult,
      allTimeRevenueResult,
      recentEnquiries,
      topProperties,
      propertyTypeAgg,
    ] = await Promise.all([
      User.countDocuments({ role: "client" }),
      User.countDocuments({ role: "client", isActive: true }),
      Property.countDocuments(),
      Property.countDocuments({ status: "Available" }),
      Property.countDocuments({ status: "Maintenance" }),
      Property.countDocuments({ isFeatured: true }),
      Enquiry.countDocuments(),
      Enquiry.countDocuments({ status: "pending" }),
      Enquiry.countDocuments({ status: "confirmed" }),
      Enquiry.countDocuments({ status: "refused" }),
      Sponsor.countDocuments(),
      // Filtered Revenue
      Enquiry.aggregate([
        { $match: revenueMatch },
        { $group: { _id: null, totalRevenue: { $sum: "$totalPrice" } } },
      ]),
      // All-Time Revenue Baseline
      Enquiry.aggregate([
        { $match: { status: "confirmed" } },
        { $group: { _id: null, totalRevenue: { $sum: "$totalPrice" } } },
      ]),
      Enquiry.find()
        .populate("client", "name email phone avatar")
        .populate("property", "title location images pricePerNight")
        .sort({ createdAt: -1 })
        .limit(5),
      Property.find()
        .select("title location pricePerNight views status images type")
        .sort({ views: -1 })
        .limit(5),
      Property.aggregate([{ $group: { _id: "$type", count: { $sum: 1 } } }]),
    ]);

    const periodRevenue =
      filteredRevenueResult.length > 0
        ? filteredRevenueResult[0].totalRevenue
        : 0;

    const allTimeRevenue =
      allTimeRevenueResult.length > 0
        ? allTimeRevenueResult[0].totalRevenue
        : 0;

    res.json({
      period,
      stats: {
        totalClients,
        activeClients,
        totalProperties,
        availableProperties,
        maintenanceProperties,
        featuredProperties,
        totalEnquiries,
        pendingEnquiries,
        confirmedEnquiries,
        refusedEnquiries,
        totalSponsors,
        periodRevenue,
        allTimeRevenue,
      },
      recentEnquiries,
      topProperties,
      propertyTypeAgg,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all clients (with search/pagination)
// @route   GET /api/admin/clients
// @access  Private/Admin
exports.getClients = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    let query = { role: "client" };

    if (req.query.search) {
      query.$or = [
        { name: { $regex: req.query.search, $options: "i" } },
        { email: { $regex: req.query.search, $options: "i" } },
      ];
    }

    const clients = await User.find(query)
      .select("-password")
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
    if (!client || client.role !== "client") {
      return res.status(404).json({ message: "Client not found" });
    }

    client.isActive = !client.isActive;
    await client.save();

    res.json({
      message: `Client ${client.isActive ? "activated" : "suspended"}`,
    });
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
    if (!client || client.role !== "client") {
      return res.status(404).json({ message: "Client not found" });
    }

    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "Client deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
