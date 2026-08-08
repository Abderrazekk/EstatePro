const Enquiry = require("../models/Enquiry");

// @desc    Create enquiry (client)
// @route   POST /api/enquiries
// @access  Private (client)
exports.createEnquiry = async (req, res) => {
  try {
    const { propertyId, message, meetingDate, meetingTime } = req.body;

    // Validate required fields
    if (!propertyId || !message) {
      return res
        .status(400)
        .json({ message: "Property and message are required" });
    }

    const enquiry = await Enquiry.create({
      client: req.user._id,
      property: propertyId,
      message,
      meetingDate: meetingDate || null,
      meetingTime: meetingTime || null,
    });

    res.status(201).json(enquiry);
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
