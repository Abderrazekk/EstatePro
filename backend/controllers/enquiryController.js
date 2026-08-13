const Enquiry = require("../models/Enquiry");

// @desc    Create reservation request
// @route   POST /api/enquiries
// @access  Private (client)
exports.createEnquiry = async (req, res) => {
  try {
    const { propertyId, message, checkIn, checkOut, totalPrice } = req.body;

    if (!propertyId || !checkIn || !checkOut || !totalPrice) {
      return res
        .status(400)
        .json({ message: "All booking fields are required" });
    }

    // Check if dates overlap with an already CONFIRMED reservation
    const overlapping = await Enquiry.findOne({
      property: propertyId,
      status: "confirmed",
      $or: [
        {
          checkIn: { $lt: new Date(checkOut) },
          checkOut: { $gt: new Date(checkIn) },
        },
      ],
    });

    if (overlapping) {
      return res
        .status(400)
        .json({ message: "These dates are already booked." });
    }

    const enquiry = await Enquiry.create({
      client: req.user._id,
      property: propertyId,
      message,
      checkIn,
      checkOut,
      totalPrice,
    });

    res.status(201).json(enquiry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get booked dates for a specific property
// @route   GET /api/enquiries/property/:propertyId/booked-dates
// @access  Public
exports.getBookedDates = async (req, res) => {
  try {
    const { propertyId } = req.params;
    const confirmedBookings = await Enquiry.find({
      property: propertyId,
      status: "confirmed",
    }).select("checkIn checkOut -_id");

    res.json(confirmedBookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all enquiries (admin)
// @route   GET /api/enquiries
// @access  Private/Admin
exports.getEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find({})
      .populate("client", "name email")
      .populate("property", "title")
      .sort({ createdAt: -1 });

    res.json(enquiries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update enquiry status (mark as read / confirm)
// @route   PUT /api/enquiries/:id
// @access  Private/Admin
exports.updateEnquiry = async (req, res) => {
  try {
    const enquiry = await Enquiry.findById(req.params.id);
    if (!enquiry) return res.status(404).json({ message: "Enquiry not found" });

    if (req.body.status) enquiry.status = req.body.status;
    if (req.body.meetingDate) enquiry.meetingDate = req.body.meetingDate;
    if (req.body.meetingTime) enquiry.meetingTime = req.body.meetingTime;
    if (req.body.rejectionReason !== undefined)
      enquiry.rejectionReason = req.body.rejectionReason;

    await enquiry.save();
    res.json(enquiry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get current client's enquiries
// @route   GET /api/enquiries/mine
// @access  Private (client)
exports.getMyEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find({ client: req.user._id })
      .populate("property", "title images status price location")
      .sort({ createdAt: -1 });
    res.json(enquiries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
